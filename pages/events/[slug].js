import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { CalendarDays, MapPin, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function EventDetailPage() {
  const router = useRouter()
  const { slug } = router.query

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [enquiry, setEnquiry] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [enquirySubmitting, setEnquirySubmitting] = useState(false)
  const [enquirySuccess, setEnquirySuccess] = useState('')
  const [enquiryError, setEnquiryError] = useState('')

  useEffect(() => {
    if (!slug) return

    const loadEvent = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`/api/events/${slug}`)
        if (res.ok) {
          const data = await res.json()
          setEvent(data.event || null)
        } else if (res.status === 404) {
          setError('Event not found')
        } else {
          setError('Failed to load event')
        }
      } catch (err) {
        console.error('Error loading event:', err)
        setError('Failed to load event')
      } finally {
        setLoading(false)
      }
    }

    loadEvent()
  }, [slug])

  const pageTitle = event ? `${event.title} - Events | Rockhill Outdoors` : 'Event - Rockhill Outdoors'
  const pageDescription =
    (event && event.excerpt) ||
    'Event detail from Rockhill Outdoors.'

  const handleEnquirySubmit = async (e) => {
    e.preventDefault()
    setEnquiryError('')
    setEnquirySuccess('')

    if (!event || !event.id) {
      setEnquiryError('Unable to submit enquiry for this event right now.')
      return
    }

    if (!enquiry.name || !enquiry.email || !enquiry.phone) {
      setEnquiryError('Please fill in name, email and phone number.')
      return
    }

    setEnquirySubmitting(true)
    try {
      const res = await fetch('/api/event-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          name: enquiry.name,
          email: enquiry.email,
          phone: enquiry.phone,
          message: enquiry.message
        })
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setEnquiryError(data.error || 'Failed to submit enquiry. Please try again.')
        return
      }

      setEnquirySuccess('Thank you! Your enquiry has been sent.')
      setEnquiry({
        name: '',
        email: '',
        phone: '',
        message: ''
      })
    } catch (err) {
      console.error('Error submitting event enquiry:', err)
      setEnquiryError('Failed to submit enquiry. Please try again.')
    }
    setEnquirySubmitting(false)
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
              href="/events"
              className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-rockhill-pine"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all events
            </Link>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="py-16 text-center text-slate-500">Loading event...</div>
            ) : error ? (
              <div className="py-16 text-center">
                <p className="text-lg font-semibold text-slate-800 mb-2">{error}</p>
                <p className="text-slate-500">
                  Please return to the events page and try a different event.
                </p>
              </div>
            ) : !event ? (
              <div className="py-16 text-center">
                <p className="text-lg font-semibold text-slate-800 mb-2">Event not found</p>
              </div>
            ) : (
              <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] items-start">
                <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  {event.featuredImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={event.featuredImage}
                      alt={event.title}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                  )}

                  <div className="p-6 md:p-10">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4">
                      {event.eventDate && (
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="w-4 h-4 text-rockhill-pine" />
                          {new Date(event.eventDate).toLocaleDateString()}
                        </span>
                      )}
                      {event.category && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-50 text-rockhill-pine border border-slate-100">
                          <MapPin className="w-3 h-3" />
                          {event.category}
                        </span>
                      )}
                      {event.authorName && (
                        <span className="inline-flex items-center gap-1">
                          <User className="w-3 h-3" />
                          By {event.authorName}
                        </span>
                      )}
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                      {event.title}
                    </h1>

                    {event.excerpt && (
                      <p className="text-lg text-slate-600 mb-6">{event.excerpt}</p>
                    )}

                    {event.content && (
                      <div
                        className="prose prose-slate max-w-none text-sm md:text-base prose-ul:list-disc prose-ol:list-decimal"
                        // Content is authored in the admin by trusted users
                        dangerouslySetInnerHTML={{ __html: event.content }}
                      />
                    )}
                  </div>
                </article>

                {/* Enquiry form */}
                <aside className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-7 sticky top-24 self-start">

                  <h2 className="text-xl font-semibold text-slate-900 mb-2">
                    Enquire about this event
                  </h2>
                  <p className="text-sm text-slate-600 mb-4">
                    Share your details and we’ll get back to you with more information.
                  </p>

                  {enquirySuccess && (
                    <div className="mb-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-rockhill-pine-dark">
                      {enquirySuccess}
                    </div>
                  )}
                  {enquiryError && (
                    <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                      {enquiryError}
                    </div>
                  )}

                  <form onSubmit={handleEnquirySubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={enquiry.name}
                        onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })}
                        required
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-rockhill-pine focus:outline-none focus:ring-2 focus:ring-slate-100"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={enquiry.email}
                        onChange={(e) => setEnquiry({ ...enquiry, email: e.target.value })}
                        required
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-rockhill-pine focus:outline-none focus:ring-2 focus:ring-slate-100"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">
                        Phone number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={enquiry.phone}
                        onChange={(e) => setEnquiry({ ...enquiry, phone: e.target.value })}
                        required
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-rockhill-pine focus:outline-none focus:ring-2 focus:ring-slate-100"
                        placeholder="Contact number"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">
                        Additional info
                      </label>
                      <textarea
                        value={enquiry.message}
                        onChange={(e) => setEnquiry({ ...enquiry, message: e.target.value })}
                        rows={3}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-rockhill-pine focus:outline-none focus:ring-2 focus:ring-slate-100"
                        placeholder="Share any questions or details…"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={enquirySubmitting}
                      className="mt-1 inline-flex w-full items-center justify-center rounded-lg bg-rockhill-pine px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rockhill-pine disabled:opacity-60"
                    >
                      {enquirySubmitting ? 'Sending...' : 'Send enquiry'}
                    </button>
                  </form>
                </aside>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}

