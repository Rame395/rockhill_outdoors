'use client';

import Head from 'next/head'
import { useState } from 'react'
import { Building2, Handshake, Sparkles, ArrowRight, CheckCircle, AlertCircle, Globe2, Users } from 'lucide-react'
import HeroBackground from '../components/HeroBackground'

export default function BecomeOurPartner() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    phone: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/partner-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', organization: '', phone: '', email: '', message: '' })
        setTimeout(() => setStatus(''), 3000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus(''), 3000)
      }
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus(''), 3000)
    }
  }

  return (
    <>
      <Head>
        <title>Become Our Partner - Rockhill Outdoors</title>
        <meta
          name="description"
          content="Partner with Rockhill Outdoors for schools, organizations, travel agencies, and brands that believe in outdoor learning and adventure."
        />
        <meta
          name="keywords"
          content="partnerships, schools, organizations, travel agencies, outdoor programs"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
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

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }

        .gradient-text {
          background: linear-gradient(135deg, #142E2B 0%, #39A2C6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .input-field {
          transition: all 0.2s ease;
        }

        .input-field:focus {
          transform: translateY(-2px);
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.2;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-rockhill-pine via-rockhill-pine to-rockhill-pine-dark text-white overflow-hidden text-center">
        <HeroBackground />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium text-sm mb-6 animate-fade-in-up">
            <Sparkles className="w-4 h-4" />
            <span>Partnerships &amp; Collaborations</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up stagger-1">
            Become Our <span className="text-slate-200">Partner</span>
          </h1>
          
          <p className="text-xl opacity-95 max-w-2xl font-light leading-relaxed animate-fade-in-up stagger-2">
            We collaborate with schools, colleges, NGOs, travel agencies, and brands to design meaningful
            outdoor learning and lifestyle experiences. Let&apos;s build something powerful together.
          </p>
        </div>
      </section>

      {/* Partner value props */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 via-transparent to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-rockhill-pine" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Institutions &amp; Schools</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Co-create outdoor programs that support your learning goals, SEL outcomes, and student well-being.
                </p>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <Globe2 className="w-6 h-6 text-rockhill-pine" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Travel &amp; Experience Partners</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Design signature journeys that blend your destinations with our facilitation and outdoor expertise.
                </p>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <Users className="w-6 h-6 text-rockhill-pine" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Brands &amp; Organisations</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Bring your community outdoors through co-branded events, challenges, and impact-driven campaigns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Form Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, #F07D1E 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        ></div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Partnership <span className="gradient-text">Inquiry</span>
            </h2>
            <p className="text-lg text-slate-600 font-light leading-relaxed">
              Share a few details about you and your organisation, and our team will reach out to design a
              partnership that fits your vision.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-rockhill-sunset focus:ring-4 focus:ring-orange-100 transition-all outline-none"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label htmlFor="organization" className="block text-sm font-semibold text-slate-900 mb-2">
                    Organisation / School / Company *
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    className="input-field w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-rockhill-sunset focus:ring-4 focus:ring-orange-100 transition-all outline-none"
                    placeholder="Organisation name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input-field w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-rockhill-sunset focus:ring-4 focus:ring-orange-100 transition-all outline-none"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-rockhill-sunset focus:ring-4 focus:ring-orange-100 transition-all outline-none"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                  Partnership idea &amp; goals *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="input-field w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-rockhill-sunset focus:ring-4 focus:ring-orange-100 transition-all outline-none resize-none"
                  placeholder="Tell us about your audience, location, timelines, and what you would like to co-create with Rockhill Outdoors..."
                  rows="5"
                />
              </div>

              {status === 'loading' && (
                <div className="animate-scale-in p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 font-medium">
                  Submitting your partnership inquiry...
                </div>
              )}
              {status === 'success' && (
                <div className="animate-scale-in p-4 bg-slate-50 border border-slate-200 rounded-xl text-rockhill-pine-dark font-medium flex items-center gap-3">
                  <CheckCircle size={22} className="flex-shrink-0" />
                  <span>Thank you! Our partnership team will contact you shortly.</span>
                </div>
              )}
              {status === 'error' && (
                <div className="animate-scale-in p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 font-medium flex items-center gap-3">
                  <AlertCircle size={22} className="flex-shrink-0" />
                  <span>Something went wrong. Please try again.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="group w-full px-8 py-4 bg-gradient-to-r from-rockhill-sunset to-rockhill-sunset-dark text-white font-semibold rounded-xl hover:from-rockhill-sunset-dark hover:to-rockhill-sunset-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {status === 'loading' ? 'Submitting...' : 'Submit Partnership Inquiry'}
                {status !== 'loading' && (
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

