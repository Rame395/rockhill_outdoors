import { useEffect, useState } from 'react'
import Head from 'next/head'
import { Star, Send } from 'lucide-react'
import HeroBackground from '../components/HeroBackground'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 5,
    title: '',
    content: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: '1',
        limit: '50'
      })
      const res = await fetch(`/api/reviews?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setReviews(data.reviews || [])
      }
    } catch (error) {
      console.error('Error loading reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!reviewForm.name || !reviewForm.email) {
      setError('Please fill in your name and email')
      return
    }

    if (!reviewForm.content || !reviewForm.rating) {
      setError('Please fill in rating and review content')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: reviewForm.name,
          email: reviewForm.email,
          rating: reviewForm.rating,
          title: reviewForm.title,
          content: reviewForm.content
        })
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to submit review')
        return
      }

      setSuccess('Thank you! Your review has been submitted and is pending approval.')
      setReviewForm({
        name: '',
        email: '',
        rating: 5,
        title: '',
        content: ''
      })
      setTimeout(() => setSuccess(''), 5000)
    } catch (err) {
      console.error('Submit review error:', err)
      setError('Failed to submit review. Please try again.')
    }
    setSubmitting(false)
  }

  return (
    <>
      <Head>
        <title>Reviews - Rockhill Outdoors</title>
        <meta name="description" content="Read reviews and share your experience with Rockhill Outdoors." />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-br from-rockhill-pine via-rockhill-pine to-rockhill-pine-dark text-white">
          <HeroBackground />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Reviews & Testimonials
            </h1>
            <p className="text-lg md:text-xl max-w-2xl text-slate-50">
              See what others are saying about their experiences with Rockhill Outdoors.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Review Form */}
            <div className="mb-8 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Share Your Experience</h2>
              <p className="text-sm text-slate-600 mb-6">
                We'd love to hear about your experience with Rockhill Outdoors. Your review will be reviewed before being published.
              </p>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      required
                      className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rockhill-pine focus:outline-none focus:ring-2 focus:ring-slate-100"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={reviewForm.email}
                      onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                      required
                      className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rockhill-pine focus:outline-none focus:ring-2 focus:ring-slate-100"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= reviewForm.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1">
                    Title (optional)
                  </label>
                  <input
                    type="text"
                    value={reviewForm.title}
                    onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rockhill-pine focus:outline-none focus:ring-2 focus:ring-slate-100"
                    placeholder="Review title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1">
                    Your Review <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={reviewForm.content}
                    onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })}
                    required
                    rows={5}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rockhill-pine focus:outline-none focus:ring-2 focus:ring-slate-100"
                    placeholder="Share your experience..."
                  />
                </div>

                {error && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>
                )}
                {success && (
                  <div className="text-sm text-rockhill-pine bg-slate-50 p-3 rounded-lg">{success}</div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-rockhill-pine text-white font-semibold rounded-lg hover:bg-rockhill-pine disabled:opacity-60 transition-colors"
                >
                  <Send className="w-5 h-5" />
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">All Reviews</h2>
              {loading ? (
                <div className="py-16 text-center text-slate-500">Loading reviews...</div>
              ) : reviews.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-lg font-semibold text-slate-800 mb-2">No reviews yet</p>
                  <p className="text-slate-500">
                    Be the first to share your experience!
                  </p>
                </div>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-slate-900">{review.userName || review.user_name}</p>
                        <p className="text-sm text-slate-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= review.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {review.title && (
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{review.title}</h3>
                    )}
                    <p className="text-slate-600 whitespace-pre-wrap">{review.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
