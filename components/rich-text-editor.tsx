'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Image, Link } from 'lucide-react';

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

// These styles fight Tailwind's CSS reset so lists and headings actually render
const EDITOR_STYLES = `
  .rte-editor h2 { font-size: 1.5em; font-weight: 700; margin: 0.5em 0; line-height: 1.2; }
  .rte-editor h3 { font-size: 1.2em; font-weight: 600; margin: 0.4em 0; line-height: 1.3; }
  .rte-editor p  { margin: 0.25em 0; }
  .rte-editor ul { list-style-type: disc;    padding-left: 1.5em; margin: 0.4em 0; }
  .rte-editor ol { list-style-type: decimal; padding-left: 1.5em; margin: 0.4em 0; }
  .rte-editor li { display: list-item; margin: 0.15em 0; }
`;

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const savedRangeRef = useRef<Range | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [blockFormat, setBlockFormat] = useState('p');
  const [imageUploading, setImageUploading] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const notifyChange = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  // Save selection whenever the cursor moves inside the editor
  const saveSelection = useCallback(() => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
    }
    // Also update the block format indicator
    updateBlockFormat();
  }, []);

  // Restore the saved selection into the editor
  const restoreSelection = () => {
    editorRef.current?.focus();
    const sel = window.getSelection();
    if (sel && savedRangeRef.current) {
      sel.removeAllRanges();
      sel.addRange(savedRangeRef.current);
    }
  };

  // Detect what block tag the cursor is currently in and sync the select
  const updateBlockFormat = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    let node: Node | null = sel.getRangeAt(0).commonAncestorContainer;
    if (node.nodeType === Node.TEXT_NODE) node = node.parentElement;
    const editor = editorRef.current;
    while (node && node !== editor) {
      const tag = (node as Element).tagName?.toLowerCase();
      if (tag === 'h2') { setBlockFormat('h2'); return; }
      if (tag === 'h3') { setBlockFormat('h3'); return; }
      if (tag === 'p')  { setBlockFormat('p');  return; }
      node = (node as Element).parentElement;
    }
    setBlockFormat('p');
  };

  const runCommand = (fn: () => void) => {
    restoreSelection();
    fn();
    setTimeout(notifyChange, 0);
  };

  // ── Bold / Italic / Underline ─────────────────────────────────────────────
  const execFormat = (command: string) => {
    restoreSelection();
    document.execCommand(command, false);
    notifyChange();
  };

  // ── Block format ──────────────────────────────────────────────────────────
  const applyBlockFormat = (tag: string) => {
    runCommand(() => {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;

      const range = sel.getRangeAt(0);
      const editor = editorRef.current!;

      // Walk up to find the nearest block-level ancestor inside the editor
      let block: Node | null = range.commonAncestorContainer;
      if (block.nodeType === Node.TEXT_NODE) block = block.parentElement;
      while (block && block !== editor && !isBlockEl(block as Element)) {
        block = (block as Element).parentElement;
      }

      if (!block || block === editor) {
        const wrapper = document.createElement(tag);
        try { range.surroundContents(wrapper); } catch { /* partial selection */ }
        setBlockFormat(tag);
        return;
      }

      // Swap tag
      const newBlock = document.createElement(tag);
      newBlock.innerHTML = (block as Element).innerHTML;
      (block as Element).replaceWith(newBlock);

      // Restore cursor at end of new block
      const r = document.createRange();
      r.selectNodeContents(newBlock);
      r.collapse(false);
      sel.removeAllRanges();
      sel.addRange(r);
      savedRangeRef.current = r.cloneRange();
      setBlockFormat(tag);
    });
  };

  // ── Image Upload ─────────────────────────────────────────────────────────
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload/blog-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      insertImage(data.image_path);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setImageUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const insertImage = (imageUrl: string) => {
    runCommand(() => {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;

      const range = sel.getRangeAt(0);
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = '';
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      img.className = 'rounded-lg my-4';

      range.deleteContents();
      range.insertNode(img);

      // Create a new paragraph after the image
      const p = document.createElement('p');
      p.innerHTML = '<br>';
      img.parentNode?.insertBefore(p, img.nextSibling);

      // Move cursor to the new paragraph
      const newRange = document.createRange();
      newRange.selectNodeContents(p);
      newRange.collapse(false);
      sel.removeAllRanges();
      sel.addRange(newRange);
      savedRangeRef.current = newRange.cloneRange();
    });
  };

  // ── Link Creation ─────────────────────────────────────────────────────────
  const openLinkDialog = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const selectedText = sel.toString().trim();
      setLinkText(selectedText);
    }
    setShowLinkDialog(true);
  };

  const createLink = () => {
    if (!linkUrl.trim()) return;
    
    runCommand(() => {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;

      const range = sel.getRangeAt(0);
      const selectedText = sel.toString().trim() || linkText;
      
      const linkElement = document.createElement('a');
      linkElement.href = linkUrl;
      linkElement.target = '_blank';
      linkElement.rel = 'noopener noreferrer';
      linkElement.className = 'text-rockhill-pine hover:text-rockhill-pine underline';
      
      if (!selectedText) {
        // If no text selected, use the URL as text
        linkElement.textContent = linkUrl;
        range.deleteContents();
        range.insertNode(linkElement);
      } else {
        // Wrap selected text in link
        linkElement.textContent = selectedText;
        try {
          range.surroundContents(linkElement);
        } catch {
          // Fallback for complex selections
          range.deleteContents();
          range.insertNode(linkElement);
        }
      }

      // Move cursor after the link
      const newRange = document.createRange();
      newRange.selectNodeContents(linkElement);
      newRange.collapse(false);
      sel.removeAllRanges();
      sel.addRange(newRange);
      savedRangeRef.current = newRange.cloneRange();
    });

    // Reset dialog
    setShowLinkDialog(false);
    setLinkUrl('');
    setLinkText('');
  };

  // ── Lists ─────────────────────────────────────────────────────────────────
  const toggleList = (listTag: 'ul' | 'ol') => {
    runCommand(() => {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;

      const range = sel.getRangeAt(0);
      const editor = editorRef.current!;

      // Are we already inside this list type? → unwrap
      let node: Node | null = range.commonAncestorContainer;
      if (node.nodeType === Node.TEXT_NODE) node = node.parentElement;
      let existingList: Element | null = null;
      for (let cur: Node | null = node; cur && cur !== editor; cur = (cur as Element).parentElement) {
        if ((cur as Element).tagName?.toLowerCase() === listTag) {
          existingList = cur as Element;
          break;
        }
      }

      if (existingList) {
        const frag = document.createDocumentFragment();
        existingList.querySelectorAll('li').forEach((li) => {
          const p = document.createElement('p');
          p.innerHTML = li.innerHTML || '<br>';
          frag.appendChild(p);
        });
        existingList.replaceWith(frag);
        return;
      }

      const blocks = getSelectedBlocks(range, editor);
      const list = document.createElement(listTag);

      if (blocks.length > 0) {
        blocks.forEach((block) => {
          const li = document.createElement('li');
          li.innerHTML = (block as Element).innerHTML || '<br>';
          list.appendChild(li);
        });
        blocks[0].parentNode?.insertBefore(list, blocks[0]);
        blocks.forEach((b) => b.parentNode?.removeChild(b));
      } else {
        const li = document.createElement('li');
        li.innerHTML = '<br>';
        list.appendChild(li);
        range.deleteContents();
        range.insertNode(list);
      }

      const lastLi = list.lastElementChild!;
      const r = document.createRange();
      r.selectNodeContents(lastLi);
      r.collapse(false);
      sel.removeAllRanges();
      sel.addRange(r);
      savedRangeRef.current = r.cloneRange();
    });
  };

  return (
    <>
      {/* Inject styles once — scoped to .rte-editor so we don't pollute global CSS */}
      <style>{EDITOR_STYLES}</style>

      <div className="border border-gray-300 rounded-lg bg-white">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 px-2 py-1 border-b border-gray-200 bg-gray-50 text-xs text-gray-600">
          <select
            className="px-1 py-0.5 border border-gray-200 rounded bg-white text-xs"
            value={blockFormat}
            onChange={(e) => {
              applyBlockFormat(e.target.value);
            }}
          >
            <option value="p">Normal</option>
            <option value="h3">Medium</option>
            <option value="h2">Large</option>
          </select>

          <span className="mx-1 h-4 w-px bg-gray-200" />

          {[
            { label: 'B', cmd: 'bold',      cls: 'font-semibold' },
            { label: 'I', cmd: 'italic',    cls: 'italic' },
            { label: 'U', cmd: 'underline', cls: 'underline' },
          ].map(({ label, cmd, cls }) => (
            <button
              key={cmd}
              type="button"
              onMouseDown={(e) => { e.preventDefault(); saveSelection(); }}
              onClick={() => execFormat(cmd)}
              className={`px-2 py-1 rounded hover:bg-gray-100 ${cls}`}
            >
              {label}
            </button>
          ))}

          <span className="mx-1 h-4 w-px bg-gray-200" />

          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); saveSelection(); }}
            onClick={() => toggleList('ul')}
            className="px-2 py-1 rounded hover:bg-gray-100"
          >
            • List
          </button>
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); saveSelection(); }}
            onClick={() => toggleList('ol')}
            className="px-2 py-1 rounded hover:bg-gray-100"
          >
            1. List
          </button>

          <span className="mx-1 h-4 w-px bg-gray-200" />

          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); saveSelection(); }}
            onClick={() => fileInputRef.current?.click()}
            disabled={imageUploading}
            className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50 flex items-center gap-1"
          >
            <Image className="w-3 h-3" />
            {imageUploading ? 'Uploading...' : 'Image'}
          </button>

          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); saveSelection(); }}
            onClick={openLinkDialog}
            className="px-2 py-1 rounded hover:bg-gray-100 flex items-center gap-1"
          >
            <Link className="w-3 h-3" />
            Link
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Editor — the rte-editor class hooks into our scoped styles above */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={notifyChange}
          onKeyUp={saveSelection}
          onMouseUp={saveSelection}
          onSelect={saveSelection}
          className="rte-editor min-h-[160px] max-h-[420px] overflow-y-auto px-3 py-2 text-sm text-gray-900 focus:outline-none"
        />
      </div>

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Add Link</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link URL
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-rockhill-pine"
                  autoFocus
                />
              </div>
              {linkText && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link Text
                  </label>
                  <input
                    type="text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-rockhill-pine"
                  />
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={createLink}
                disabled={!linkUrl.trim()}
                className="flex-1 px-4 py-2 bg-rockhill-pine text-white rounded-lg hover:bg-rockhill-pine disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Link
              </button>
              <button
                onClick={() => {
                  setShowLinkDialog(false);
                  setLinkUrl('');
                  setLinkText('');
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const BLOCK_TAGS = new Set([
  'P','DIV','H1','H2','H3','H4','H5','H6',
  'LI','BLOCKQUOTE','PRE','SECTION','ARTICLE',
]);

function isBlockEl(el: Element): boolean {
  return BLOCK_TAGS.has(el.tagName?.toUpperCase());
}

function getSelectedBlocks(range: Range, editor: Element): Element[] {
  const blocks: Element[] = [];
  const walker = document.createTreeWalker(editor, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) =>
      isBlockEl(node as Element) && range.intersectsNode(node)
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP,
  });

  let node: Node | null;
  while ((node = walker.nextNode())) {
    const el = node as Element;
    // Only leaf blocks (skip wrappers that contain other blocks)
    if (!Array.from(el.children).some(isBlockEl)) blocks.push(el);
  }
  return blocks;
}
