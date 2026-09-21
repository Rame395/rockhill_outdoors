import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { CalendarDays, MapPin, User } from 'lucide-react'

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const params = new URLSearchParams({
          page: '1',
          limit: '20'
        })
        const res = await fetch(`/api/blogs?${params.toString()}`)
        if (res.ok) {
          const data = await res.json()
          setBlogs(data.blogs || [])
        }
      } catch (error) {
        console.error('Error loading blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    loadBlogs()
  }, [])

  return (
    <>
      <Head>
        <title>Journal - Rockhill Outdoors</title>
        <meta
          name="description"
          content="Read our latest journal entries, stories, and insights from Rockhill Outdoors."
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-rockhill-pine via-rockhill-pine to-rockhill-pine-dark text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium mb-4">
              <CalendarDays className="w-4 h-4" />
              Latest stories & insights
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Journal & Stories from the Outdoors
            </h1>
            <p className="text-lg md:text-xl max-w-2xl text-slate-50">
              Read about our latest trips, learning programs, and community adventures—written like
              blog posts, crafted from the trail.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="py-16 text-center text-slate-500">Loading journal entries...</div>
            ) : blogs.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-lg font-semibold text-slate-800 mb-2">No journal entries yet</p>
                <p className="text-slate-500">
                  Check back soon for upcoming stories and insights from Rockhill Outdoors.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {blogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/blogs/${blog.slug}`}
                    className="block group"
                  >
                    <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group-hover:shadow-md transition-shadow h-full flex flex-col">
                      {blog.featuredImage && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={blog.featuredImage}
                          alt={blog.title}
                          className="w-full h-56 md:h-64 object-cover"
                        />
                      )}
                      <div className="p-5 md:p-6 flex flex-col h-full">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
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

                        <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-rockhill-pine transition-colors">
                          {blog.title}
                        </h2>

                        {blog.excerpt && (
                          <p className="text-slate-600 mb-2 line-clamp-2">{blog.excerpt}</p>
                        )}

                        <div className="flex-grow"></div><p className="text-sm font-medium text-rockhill-pine mt-4">
                          Read full story &rarr;
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
