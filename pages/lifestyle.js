'use client';

import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { CheckCircle, AlertCircle, Globe, Users, Sparkles, ArrowRight, Compass, MapPin } from 'lucide-react'
import { lifestyleCategories } from '../lib/categories'
import HeroBackground from '../components/HeroBackground'

export default function Lifestyle() {
  const [formData, setFormData] = useState({
    name: '',
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
      const response = await fetch('/api/lifestyle-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', phone: '', email: '', message: '' })
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

  const trips = [
    {
      name: 'Patagonia Adventure',
      destination: 'Argentina & Chile',
      description: 'Trek through dramatic mountain peaks, turquoise glacial lakes, and pristine wilderness. Experience the raw beauty of South America\'s most iconic landscape.',
      duration: '14 days',
      level: 'Intermediate',
      icon: '⛰️'
    },
    {
      name: 'Iceland Explorer',
      destination: 'Iceland',
      description: 'Hike volcanic landscapes, witness waterfalls, explore glaciers, and immerse in Icelandic culture. Experience nature\'s raw power and beauty.',
      duration: '10 days',
      level: 'Beginner to Intermediate',
      icon: '🌋'
    },
    {
      name: 'Nepal Trekking Journey',
      destination: 'Nepal',
      description: 'Trek to legendary destinations like Everest Base Camp or the Annapurna Circuit. Experience Himalayan mountains and vibrant Nepali culture.',
      duration: '16 days',
      level: 'Intermediate to Advanced',
      icon: '🏔️'
    },
    {
      name: 'Costa Rica Wildlife Immersion',
      destination: 'Costa Rica',
      description: 'Zip-line through rainforests, hike volcanic trails, explore cloud forests, and encounter exotic wildlife in one of Earth\'s most biodiverse regions.',
      duration: '8 days',
      level: 'Beginner',
      icon: '🦜'
    },
    {
      name: 'African Safari & Climbing',
      destination: 'Kenya & Tanzania',
      description: 'Combine wildlife safari adventure with Mount Kilimanjaro climbing. Experience Africa\'s most iconic landscapes and wildlife.',
      duration: '12 days',
      level: 'Intermediate',
      icon: '🦁'
    },
    {
      name: 'Southeast Asia Explorer',
      destination: 'Thailand & Vietnam',
      description: 'Rock climb in Railay Beach, trek through jungle mountains, and explore ancient temples. Blend adventure with cultural immersion.',
      duration: '11 days',
      level: 'All Levels',
      icon: '🧗'
    }
  ]

  const benefits = [
    {
      icon: Globe,
      title: 'World-Class Destinations',
      description: 'Access to curated trips to the planet\'s most stunning and thrilling outdoor locations.'
    },
    {
      icon: Users,
      title: 'Expert Guides',
      description: 'Local experts and professional guides ensure safety, cultural insights, and unforgettable experiences.'
    },
    {
      icon: MapPin,
      title: 'All-Inclusive Planning',
      description: 'Flights, accommodations, meals, and activities are carefully arranged. Just show up and explore.'
    }
  ]

  return (
    <>
      <Head>
        <title>Lifestyle - Travel With Us - Rockhill Outdoors</title>
        <meta name="description" content="Discover curated outdoor travel experiences to the world's most stunning destinations. Join guided adventure trips to Patagonia, Nepal, Iceland, and beyond." />
        <meta name="keywords" content="adventure travel, outdoor trips, guided expeditions, travel experiences, hiking tours" />
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

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .gradient-text {
          background: linear-gradient(135deg, #142E2B 0%, #39A2C6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .trip-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .trip-card:hover {
          transform: translateY(-12px) scale(1.02);
        }

        .benefit-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .benefit-card:hover {
          transform: translateY(-8px);
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
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.2;
        }

        .icon-bounce {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-br from-rockhill-pine via-rockhill-pine to-rockhill-pine-dark text-white">
          <HeroBackground />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium mb-4">
              <Compass className="w-4 h-4" />
              <span>Curated Adventure Experiences</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Travel <span className="text-rockhill-sunset">With Us</span>
            </h1>
            
            <p className="text-lg md:text-xl max-w-2xl text-slate-50">
              Embark on carefully curated adventures to Earth's most breathtaking destinations. Experience the thrill of exploration with expert guides and fellow adventurers.
            </p>
          </div>
        </section>

      {/* Lifestyle Categories */}
      <section className="py-24 bg-gradient-to-b from-slate-50/60 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle, #142E2B 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              Lifestyle Categories
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
              Choose how you want adventure to shape your everyday life—from hobbies to extreme challenges. Each
              category opens a different way of experiencing the world with Rockhill Outdoors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {lifestyleCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/lifestyle/${category.slug}`}
              >
                <div className="group bg-white border border-slate-200 rounded-3xl p-7 shadow-sm hover:shadow-2xl hover:border-rockhill-pine transition-all hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-rockhill-pine/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    {category.icon && (
                      <div className="w-14 h-14 mb-5 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-2xl">
                        <span>{category.icon}</span>
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-rockhill-pine transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {category.description}
                    </p>
                    <div className="inline-flex items-center gap-1 text-sm font-semibold text-rockhill-pine">
                      Explore experiences
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              Why Travel With <span className="gradient-text">Rockhill Outdoors?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="benefit-card text-center p-8 bg-white rounded-2xl border border-slate-200 hover:border-rockhill-sunset hover:shadow-xl">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-10 h-10 text-rockhill-sunset-dark" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Adventure Lifestyle Content */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual - Left */}
            <div className="relative order-2 lg:order-1">
              <div className="relative bg-gradient-to-br from-rockhill-sunset-light via-rockhill-sunset to-rockhill-sunset-dark rounded-3xl h-[500px] flex items-center justify-center overflow-hidden shadow-2xl">
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                  <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-2xl"></div>
                </div>
                
                <div className="relative z-10 text-center p-8">
                  <div className="text-9xl mb-6 animate-float">✈️</div>
                  <h3 className="text-3xl font-bold text-white mb-3">
                    Explore the World
                  </h3>
                  <p className="text-white/90 text-lg font-light">
                    Your next adventure awaits
                  </p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-2xl p-6 border border-orange-200">
                <div className="flex items-center gap-3">
                  <Compass className="w-10 h-10 text-rockhill-sunset-dark" />
                  <div>
                    <div className="text-2xl font-bold gradient-text">50+</div>
                    <div className="text-xs text-slate-600 font-medium">Destinations</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content - Right */}
            <div className="order-1 lg:order-2">
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                The Rockhill <span className="gradient-text">Lifestyle</span>
              </h2>
              <p className="text-slate-600 mb-6 text-lg font-light leading-relaxed">
                The greatest adventures happen when you step outside your comfort zone and into the wild. At Rockhill Outdoors, we believe that travel is more than just visiting destinations—it's about transforming yourself through experiences.
              </p>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-transparent rounded-xl border-l-4 border-rockhill-sunset">
                  <CheckCircle className="text-rockhill-sunset flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Small Group Adventures</h4>
                    <p className="text-slate-600 font-light">Limited group sizes ensure personal attention and meaningful connections with fellow travelers.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-transparent rounded-xl border-l-4 border-rockhill-sunset">
                  <CheckCircle className="text-rockhill-sunset flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Sustainable Practices</h4>
                    <p className="text-slate-600 font-light">We travel responsibly, respecting local cultures and protecting the environments we explore.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-transparent rounded-xl border-l-4 border-rockhill-sunset">
                  <CheckCircle className="text-rockhill-sunset flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Lifetime Memories</h4>
                    <p className="text-slate-600 font-light">Create unforgettable moments and friendships that last long after the trip ends.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquiry-form" className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle, #F07D1E 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              Plan Your <span className="gradient-text">Adventure</span>
            </h2>
            <p className="text-lg text-slate-600 font-light">
              Fill out the form below to inquire about specific trips or customize your own adventure.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-rockhill-sunset focus:ring-4 focus:ring-orange-100 transition-all outline-none"
                  placeholder="John Doe"
                />
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
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                  Message - Trip Interests & Preferences *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="input-field w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-rockhill-sunset focus:ring-4 focus:ring-orange-100 transition-all outline-none resize-none"
                  placeholder="Tell us which trips interest you, your travel dates, travel style preferences, and any special requests..."
                  rows="5"
                />
              </div>

              {status === 'loading' && (
                <div className="animate-scale-in p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 font-medium">
                  Submitting your inquiry...
                </div>
              )}
              {status === 'success' && (
                <div className="animate-scale-in p-4 bg-slate-50 border border-slate-200 rounded-xl text-rockhill-pine-dark font-medium flex items-center gap-3">
                  <CheckCircle size={22} className="flex-shrink-0" />
                  <span>Thank you! Our travel team will contact you shortly with trip details and options.</span>
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
                {status === 'loading' ? 'Submitting...' : 'Plan My Adventure'}
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