'use client';

import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { CheckCircle, AlertCircle, Award, Users, Target, Sparkles, ArrowRight, GraduationCap } from 'lucide-react'
import { learningCategories } from '../lib/categories'
import HeroBackground from '../components/HeroBackground'

export default function Learning() {
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
      const response = await fetch('/api/learning-submission', {
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

  const courses = [
    {
      title: 'Mountain Navigation Essentials',
      level: 'Beginner',
      description: 'Learn to navigate using maps, compasses, and GPS technology. Master the fundamentals of wilderness navigation for safe exploration.',
      duration: '4 weeks',
      icon: '🧭'
    },
    {
      title: 'Rock Climbing Fundamentals',
      level: 'Beginner to Intermediate',
      description: 'Develop essential climbing skills including belay techniques, rope management, and safety protocols. Build confidence on indoor and outdoor routes.',
      duration: '6 weeks',
      icon: '🧗'
    },
    {
      title: 'Wilderness First Aid & Safety',
      level: 'All Levels',
      description: 'Comprehensive training in emergency response, wound care, and evacuation procedures. Become a safer, more prepared outdoor adventurer.',
      duration: '2 weeks',
      icon: '🏥'
    },
    {
      title: 'Advanced Alpine Expedition',
      level: 'Advanced',
      description: 'Master high-altitude mountaineering techniques, extreme weather survival, and expedition logistics. Train for your dream summit.',
      duration: '8 weeks',
      icon: '⛰️'
    },
    {
      title: 'Backcountry Camping & Survival',
      level: 'Intermediate',
      description: 'Learn essential camping skills, shelter building, fire management, and wilderness survival techniques for extended trips.',
      duration: '3 weeks',
      icon: '🏕️'
    },
    {
      title: 'Leave No Trace & Environmental Ethics',
      level: 'All Levels',
      description: 'Understand sustainable outdoor practices and environmental conservation. Explore and protect the wilderness responsibly.',
      duration: '1 week',
      icon: '🌲'
    }
  ]

  const benefits = [
    {
      icon: Award,
      title: 'Expert Instructors',
      description: 'Learn from experienced climbers, mountaineers, and wilderness experts with decades of combined experience.'
    },
    {
      icon: Target,
      title: 'Safety First',
      description: 'Comprehensive safety training and protocols ensure you learn responsibly and confidently.'
    },
    {
      icon: GraduationCap,
      title: 'Real-World Application',
      description: 'Apply what you learn on actual expeditions and outdoor adventures with our guided trips.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join a vibrant community of outdoor enthusiasts and build lasting friendships with fellow adventurers.'
    }
  ]

  return (
    <>
      <Head>
        <title>Learning - Rockhill Outdoors</title>
        <meta name="description" content="Learn essential outdoor skills with expert-led courses covering navigation, climbing, safety, and wilderness survival." />
        <meta name="keywords" content="outdoor training, climbing courses, wilderness skills, outdoor education" />
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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
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

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out forwards;
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

        .course-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .course-card:hover {
          transform: translateY(-8px);
        }

        .benefit-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .benefit-card:hover {
          transform: translateX(8px);
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
      `}</style>

      {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-br from-rockhill-pine via-rockhill-pine to-rockhill-pine-dark text-white">
          <HeroBackground />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Expert-Led Training Programs</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Learn Essential <span className="text-rockhill-sunset">Skills</span>
            </h1>
            
            <p className="text-lg md:text-xl max-w-2xl text-slate-50">
              Master the knowledge and techniques that will make you a confident, capable outdoor adventurer. Our expert-led courses cover everything from navigation to expedition planning.
            </p>
          </div>
        </section>

      {/* Learning Categories */}
      <section className="py-24 bg-gradient-to-b from-slate-50/60 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle, #142E2B 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              Learning Categories
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
              Explore the key skill areas we focus on through structured outdoor and experiential programs. Each
              category connects directly to real adventures and real growth moments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {learningCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/learning/${category.slug}`}
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
                      Learn more
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Learn With Us Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left column - Benefits */}
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">
                Why Learn <span className="gradient-text">With Us?</span>
              </h2>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon
                  return (
                    <div key={index} className="benefit-card flex items-start gap-5 p-6 bg-white rounded-2xl border border-slate-200 hover:border-rockhill-sunset hover:shadow-lg">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                          <IconComponent className="w-7 h-7 text-rockhill-sunset-dark" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed font-light">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right column - Visual */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-rockhill-sunset-light via-rockhill-sunset to-rockhill-sunset-dark rounded-3xl h-[500px] flex items-center justify-center overflow-hidden shadow-2xl">
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                  <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-2xl"></div>
                </div>
                
                <div className="relative z-10 text-center p-8">
                  <div className="text-8xl mb-6">📚</div>
                  <h3 className="text-3xl font-bold text-white mb-3">
                    Start Learning Today
                  </h3>
                  <p className="text-white/90 text-lg font-light">
                    Join thousands of adventurers mastering outdoor skills
                  </p>
                </div>
              </div>

              {/* Floating stats cards */}
              <div className="absolute -top-8 -right-8 bg-white rounded-2xl shadow-xl p-6 border border-orange-200">
                <div className="text-4xl font-bold gradient-text mb-1">500+</div>
                <div className="text-sm text-slate-600 font-medium">Students Trained</div>
              </div>
              
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl p-6 border border-orange-200">
                <div className="text-4xl font-bold gradient-text mb-1">98%</div>
                <div className="text-sm text-slate-600 font-medium">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="enroll-form" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle, #F07D1E 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              Enroll in a <span className="gradient-text">Course</span>
            </h2>
            <p className="text-lg text-slate-600 font-light">
              Fill out the form below to inquire about our courses and learning programs.
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
                  Message / Course Interests *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="input-field w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-rockhill-sunset focus:ring-4 focus:ring-orange-100 transition-all outline-none resize-none"
                  placeholder="Tell us about your outdoor experience and which courses interest you..."
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
                  <span>Thank you! We'll contact you soon about course enrollment.</span>
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
                {status === 'loading' ? 'Submitting...' : 'Enroll Now'}
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