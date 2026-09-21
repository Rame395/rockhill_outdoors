import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { CalendarDays, MapPin, User, ArrowLeft, Minus, Plus, Type } from 'lucide-react'
import Link from 'next/link'

export default function BlogDetailPage() {
  const router = useRouter()
  const { slug } = router.query

  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [fontSize, setFontSize] = useState('base') // 'small', 'base', 'large'

  useEffect(() => {
    if (!slug) return

    const loadBlog = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`/api/blogs/${slug}`)
        if (res.ok) {
          const data = await res.json()
          setBlog(data.blog || null)
        } else if (res.status === 404) {
          setError('Blog not found')
        } else {
          setError('Failed to load blog')
        }
      } catch (err) {
        console.error('Error loading blog:', err)
        setError('Failed to load blog')
      } finally {
        setLoading(false)
      }
    }

    loadBlog()
  }, [slug])

  const pageTitle = blog ? `${blog.title} - Journal | Rockhill Outdoors` : 'Journal Entry - Rockhill Outdoors'
  const pageDescription =
    (blog && blog.excerpt) ||
    'Journal entry from Rockhill Outdoors.'

  const getFontSizeClass = (size) => {
    switch (size) {
      case 'small':
        return 'text-xs md:text-sm'
      case 'large':
        return 'text-base md:text-lg'
      default:
        return 'text-sm md:text-base'
    }
  }

  const decreaseFontSize = () => {
    setFontSize(current => {
      if (current === 'large') return 'base'
      if (current === 'base') return 'small'
      return 'small'
    })
  }

  const increaseFontSize = () => {
    setFontSize(current => {
      if (current === 'small') return 'base'
      if (current === 'base') return 'large'
      return 'large'
    })
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <section className="py-6 md:py-8 bg-white border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-rockhill-pine"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all journal entries
            </Link>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="py-16 text-center text-slate-500">Loading journal entry...</div>
            ) : error ? (
              <div className="py-16 text-center">
                <p className="text-lg font-semibold text-slate-800 mb-2">{error}</p>
                <p className="text-slate-500">
                  Please return to the journal page and try a different entry.
                </p>
              </div>
            ) : !blog ? (
              <div className="py-16 text-center">
                <p className="text-lg font-semibold text-slate-800 mb-2">Journal entry not found</p>
              </div>
            ) : (
              <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Font Size Controls */}
                <div className="px-6 md:px-10 py-3 border-b border-slate-100 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Type className="w-4 h-4" />
                      <span className="font-medium">Text Size</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={decreaseFontSize}
                        disabled={fontSize === 'small'}
                        className="p-1.5 rounded hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        title="Decrease font size"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="px-3 py-1 text-xs font-medium text-slate-700 bg-white rounded border border-slate-200">
                        {fontSize === 'small' ? 'A' : fontSize === 'base' ? 'A' : 'A+'}
                      </div>
                      <button
                        onClick={increaseFontSize}
                        disabled={fontSize === 'large'}
                        className="p-1.5 rounded hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        title="Increase font size"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {blog.featuredImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                )}

                <div className="p-6 md:p-10">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4">
                    {blog.publishedDate && (
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="w-4 h-4 text-rockhill-pine" />
                        {new Date(blog.publishedDate).toLocaleDateString()}
                      </span>
                    )}
                    {blog.category && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-50 text-rockhill-pine border border-slate-100">
                        <MapPin className="w-3 h-3" />
                        {blog.category}
                      </span>
                    )}
                    {blog.authorName && (
                      <span className="inline-flex items-center gap-1">
                        <User className="w-3 h-3" />
                        By {blog.authorName}
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    {blog.title}
                  </h1>

                  {blog.excerpt && (
                    <p className="text-lg text-slate-600 mb-6">{blog.excerpt}</p>
                  )}

                  {blog.content && (
                    <div
                      className={`prose prose-slate max-w-none prose-ul:list-disc prose-ol:list-decimal ${getFontSizeClass(fontSize)}`}
                      // Content is authored in the admin by trusted users
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                  )}
                </div>
              </article>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
