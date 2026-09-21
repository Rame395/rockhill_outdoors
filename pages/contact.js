import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Sparkles, ArrowRight, HelpCircle, Building2, Send } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState('')
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    setSubmitSuccess('')

    if (!formData.name || !formData.email || !formData.message) {
      setSubmitError('Please fill in name, email, and message')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/contact-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (!res.ok) {
        setSubmitError(data.error || 'Failed to submit message')
        return
      }

      setSubmitSuccess('Thank you! Your message has been sent successfully.')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setSubmitSuccess(''), 5000)
    } catch (err) {
      console.error('Error submitting contact form:', err)
      setSubmitError('Failed to submit message. Please try again.')
    }
    setSubmitting(false)
  }

  return (
    <>
      <Head>
        <title>Contact Us - Rockhill Outdoors</title>
        <meta name="description" content="Get in touch with Rockhill Outdoors. Reach out for adventure planning, course inquiries, or general information." />
        <meta name="keywords" content="contact, support, adventure planning, inquiries" />
        </Head>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }

        .gradient-text {
          background: linear-gradient(135deg, #142E2B 0%, #39A2C6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .contact-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .contact-card:hover {
          transform: translateY(-8px);
        }

        .faq-card {
          transition: all 0.3s ease;
        }

        .faq-card:hover {
          transform: translateX(4px);
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.2;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-rockhill-pine via-rockhill-pine to-rockhill-pine-dark text-white overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium text-sm mb-6 animate-fade-in-up">
            <Sparkles className="w-4 h-4" />
            <span>We're Here to Help</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up stagger-1">
            Get In <span className="text-slate-200">Touch</span>
          </h1>

          <p className="text-xl opacity-95 max-w-2xl font-light leading-relaxed animate-fade-in-up stagger-2">
            Have questions about our courses, trips, or services? We're here to help. Reach out to our team and let's start planning your next adventure.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 via-transparent to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {/* Email Card */}
            <div className="contact-card group bg-white border border-slate-200 rounded-2xl p-8 text-center hover:border-rockhill-pine hover:shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-rockhill-pine/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-8 h-8 text-rockhill-pine" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Email</h3>
                <p className="text-slate-600 mb-4 font-light">For general inquiries</p>
                <a href="mailto:offic.roll@gmail.com" className="text-rockhill-sunset-dark font-semibold hover:text-rockhill-sunset-dark transition-colors inline-flex items-center gap-1 group">
                  offic.roll@gmail.com
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="contact-card group bg-white border border-slate-200 rounded-2xl p-8 text-center hover:border-rockhill-pine hover:shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-rockhill-pine/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8 text-rockhill-pine" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Phone</h3>
                <p className="text-slate-600 mb-4 font-light">Available for calls</p>
                <a href="tel:+9779704800736" className="text-rockhill-sunset-dark font-semibold hover:text-rockhill-sunset-dark transition-colors inline-flex items-center gap-1 group">
                  +977 970-4800736
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Address Card */}
            <div className="contact-card group bg-white border border-slate-200 rounded-2xl p-8 text-center hover:border-rockhill-pine hover:shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-rockhill-pine/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8 text-rockhill-pine" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Address</h3>
                <p className="text-slate-600 mb-4 font-light">Visit our office</p>
                <p className="text-rockhill-sunset-dark font-semibold leading-relaxed">
                  Kathmandu<br />
                  Nepal
                </p>
              </div>
            </div>

            {/* Hours Card */}
            <div className="contact-card group bg-white border border-slate-200 rounded-2xl p-8 text-center hover:border-rockhill-pine hover:shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-rockhill-pine/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-rockhill-pine" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Hours</h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  5 AM to 8 PM throughout the week. Open to chat.
                </p>
              </div>
            </div>
          </div>

          {/* Office Locations */}
          <div className="bg-gradient-to-br from-slate-50/60 to-white border border-slate-200 rounded-3xl p-10 md:p-12 shadow-lg">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-rockhill-pine" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                Additional <span className="gradient-text">Locations</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Denver Location */}
              <div className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-rockhill-pine hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-rockhill-pine" />
                  Dharan, Sunsari
                </h3>
                <p className="text-slate-600 mb-4 font-light leading-relaxed">
                  Our main headquarters located in the heart of Dharan, with easy access to adventures.
                </p>
                <div className="text-slate-700 font-medium space-y-1 bg-[#FFF3E6]/50 p-4 rounded-xl">
                  <div></div>
                  <div></div>
                  <a href="tel:+9779704800736" className="text-rockhill-sunset-dark hover:text-rockhill-sunset-dark inline-flex items-center gap-1">
                    +977 9704800736
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Jackson Hole Location */}
              
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100/80 backdrop-blur-sm rounded-full text-rockhill-pine-dark font-medium text-sm mb-6">
              <Send className="w-4 h-4" />
              <span>Send us a Message</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
              Have a question or want to learn more? Fill out the form below and we'll get back to you soon.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-lg space-y-6">
            {submitSuccess && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-rockhill-pine-dark">
                {submitSuccess}
              </div>
            )}
            {submitError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                {submitError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-rockhill-pine focus:outline-none focus:ring-2 focus:ring-slate-100"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-rockhill-pine focus:outline-none focus:ring-2 focus:ring-slate-100"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-rockhill-pine focus:outline-none focus:ring-2 focus:ring-slate-100"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-rockhill-pine focus:outline-none focus:ring-2 focus:ring-slate-100"
                  placeholder="What's this about?"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-rockhill-pine focus:outline-none focus:ring-2 focus:ring-slate-100"
                placeholder="Tell us how we can help..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-rockhill-pine text-white font-semibold rounded-xl hover:bg-rockhill-pine disabled:opacity-60 transition-all shadow-lg hover:shadow-xl"
            >
              <Send className="w-5 h-5" />
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100/80 backdrop-blur-sm rounded-full text-rockhill-pine-dark font-medium text-sm mb-6">
              <HelpCircle className="w-4 h-4" />
              <span>Common Questions</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            <div className="faq-card bg-white border border-slate-200 rounded-2xl p-6 md:p-8 hover:border-rockhill-pine hover:shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">How do I book a trip or course?</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                You can browse our available trips and courses on the Learning and Lifestyle pages. Fill out the inquiry form and our team will contact you with booking options, pricing, and available dates.
              </p>
            </div>

            <div className="faq-card bg-white border border-slate-200 rounded-2xl p-6 md:p-8 hover:border-rockhill-pine hover:shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">What's included in trip pricing?</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                Most of our packages include accommodations, meals, guided experiences, and transportation during the trip. Specific inclusions vary by trip. We'll provide a detailed itinerary with all information.
              </p>
            </div>

            <div className="faq-card bg-white border border-slate-200 rounded-2xl p-6 md:p-8 hover:border-rockhill-pine hover:shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">What's the best time to contact you for trip planning?</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                We recommend contacting us 2-3 months before your desired travel dates. This allows our team to customize your experience and arrange all logistics properly. However, we can often accommodate shorter notice requests.
              </p>
            </div>

            <div className="faq-card bg-white border border-slate-200 rounded-2xl p-6 md:p-8 hover:border-rockhill-pine hover:shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">Do you offer refunds or rescheduling options?</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                Yes, we have flexible cancellation and rescheduling policies. Our customer service team can explain our specific policies and help you find the best solution for your situation.
              </p>
            </div>

            <div className="faq-card bg-white border border-slate-200 rounded-2xl p-6 md:p-8 hover:border-rockhill-pine hover:shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">Are there financing options available?</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                We offer flexible payment plans for many of our trips and courses. Contact us to discuss payment arrangements that work best for your budget and timeline.
              </p>
            </div>

            <div className="faq-card bg-white border border-slate-200 rounded-2xl p-6 md:p-8 hover:border-rockhill-sunset hover:shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">Can I customize a private trip or group adventure?</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                Absolutely! We specialize in customized adventures for groups, families, and corporate teams. Contact us to discuss your vision, and our team will create a tailored experience just for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-rockhill-pine via-rockhill-pine to-rockhill-pine-dark text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl mb-10 opacity-95 max-w-2xl mx-auto font-light leading-relaxed">
            Don't hesitate to reach out. Our team is passionate about helping you plan the perfect outdoor experience.
          </p>
          <Link href="/learning" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-rockhill-sunset-dark font-semibold rounded-xl hover:bg-[#FFF3E6] transition-all shadow-xl hover:shadow-2xl hover:scale-105">
            View Learnings
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  )
}