const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../pages/admin.js');
let content = fs.readFileSync(file, 'utf8');

// Replace blogForm initial states
content = content.replace(/publishedDate: ''\n\s*\}/g, "publishedDate: '',\n      linkedCategoryType: '',\n      linkedCategorySlug: ''\n    }");

// Replace startEditBlog
content = content.replace(/publishedDate: blog\.publishedDate \? blog\.publishedDate\.split\('T'\)\[0\] : ''\n\s*\}/g, "publishedDate: blog.publishedDate ? blog.publishedDate.split('T')[0] : '',\n      linkedCategoryType: blog.linkedCategoryType || '',\n      linkedCategorySlug: blog.linkedCategorySlug || ''\n    }");

// Add the UI
const targetUI = `                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">
                        Published Date
                      </label>
                      <input
                        type="date"
                        value={blogForm.publishedDate}
                        onChange={(e) => setBlogForm({ ...blogForm, publishedDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>`;

const replaceUI = `                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">
                        Published Date
                      </label>
                      <input
                        type="date"
                        value={blogForm.publishedDate}
                        onChange={(e) => setBlogForm({ ...blogForm, publishedDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">
                        Link to Type
                      </label>
                      <select
                        value={blogForm.linkedCategoryType}
                        onChange={(e) => setBlogForm({ ...blogForm, linkedCategoryType: e.target.value, linkedCategorySlug: '' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="">None (Standard Blog)</option>
                        <option value="learning">Learning Category</option>
                        <option value="lifestyle">Lifestyle Category</option>
                      </select>
                    </div>
                    {blogForm.linkedCategoryType && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">
                          Select Category
                        </label>
                        <select
                          value={blogForm.linkedCategorySlug}
                          onChange={(e) => setBlogForm({ ...blogForm, linkedCategorySlug: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          required
                        >
                          <option value="">Select a category...</option>
                          {blogForm.linkedCategoryType === 'learning' 
                            ? learningCategories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)
                            : lifestyleCategories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)
                          }
                        </select>
                      </div>
                    )}`;

content = content.replace(targetUI, replaceUI);

// Fix CRLF issue just in case
content = content.replace(/\r\n/g, '\n');

fs.writeFileSync(file, content, 'utf8');
console.log('Admin updated!');
