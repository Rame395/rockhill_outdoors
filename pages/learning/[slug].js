'use client';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ArrowLeft, ArrowRight, CheckCircle, Target, Compass, Megaphone } from 'lucide-react'
import { learningCategories } from '../../lib/categories'
import HeroBackground from '../../components/HeroBackground'

export default function LearningCategoryPage() {
  const router = useRouter()
  const { slug } = router.query

  const category = learningCategories.find((c) => c.slug === slug)

  if (!category) {
    return null
  }

  return (
    <>
      <Head>
        <title>{category.name} – Learning | Rockhill Outdoors</title>
        <meta
          name="description"
          content={category.description}
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
          animation: fadeInUp 0.7s ease-out forwards;
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

        .pill {
          border-radius: 9999px;
        }
      `}</style>

      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-rockhill-pine via-rockhill-pine to-rockhill-pine-dark text-white overflow-hidden">
        <HeroBackground />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/learning"
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Learning
          </Link>

          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm text-white mb-4">
              <Megaphone size={14} className="text-rockhill-sunset" />
              Learning Category
            </span>

            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up">
              {category.name}
            </h1>
            <p className="text-xl text-slate-200 max-w-2xl font-light leading-relaxed animate-fade-in-up">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr,1.2fr] gap-10 items-start -mt-8 md:-mt-24 relative z-20">
            {/* Main content card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-10 animate-scale-in">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                How we build {category.name.toLowerCase()}
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Every journey with Rockhill Outdoors is intentionally designed to grow your{' '}
                <span className="font-semibold text-rockhill-pine">{category.name.toLowerCase()}</span> through
                real-world challenges, reflection, and facilitation. Rather than classroom lectures,
                you learn through experiences in the mountains, on trails, and in team settings.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle className="text-rockhill-pine" size={20} />
                    What you&apos;ll experience
                  </h3>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex gap-3">
                      <span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full bg-rockhill-pine" />
                      <span>Guided outdoor activities tailored to this growth area.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full bg-rockhill-pine" />
                      <span>Small-group reflections that connect adventure to real life.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full bg-rockhill-pine" />
                      <span>Personal challenges designed to stretch your comfort zone safely.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Target className="text-rockhill-pine" size={20} />
                    Outcomes you can expect
                  </h3>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex gap-3">
                      <span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full bg-rockhill-pine" />
                      <span>Stronger confidence to use these skills beyond the program.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full bg-rockhill-pine" />
                      <span>Real stories and experiences you can share in college or work settings.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full bg-rockhill-pine" />
                      <span>Clear next steps for continuing your growth at home or school.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 md:p-8 flex flex-col gap-6 items-start">
                <div className="flex items-start gap-4">
                  <Compass className="text-rockhill-pine mt-1 flex-shrink-0" size={28} />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
                      Ready to explore {category.name.toLowerCase()} in depth?
                    </h3>
                    <p className="text-slate-600">
                      Our team will help you choose the right workshop, camp, or long-term journey that
                      focuses on this category.
                    </p>
                  </div>
                </div>

                <div className="pl-12 w-full sm:w-auto">
                  <Link
                    href="/learning#enroll-form"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-rockhill-sunset text-white font-bold shadow-lg hover:shadow-xl hover:bg-rockhill-sunset-dark transition-all whitespace-nowrap w-full sm:w-auto"
                  >
                    Talk to our learning team
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar meta info */}
            <aside className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl">
                <h3 className="text-xs font-bold text-rockhill-pine uppercase tracking-wider mb-4">
                  Category snapshot
                </h3>
                <p className="text-slate-700 mb-6 font-medium">
                  This learning pillar threads through multiple age groups and programs—from weekend
                  experiences to longer expeditions.
                </p>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full bg-rockhill-pine" />
                    Great for schools, colleges, and youth groups.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full bg-rockhill-pine" />
                    Blends outdoor challenge with facilitated reflection.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full bg-rockhill-pine" />
                    Can be customized into one-day, multi-day, or journey formats.
                  </li>
                </ul>
              </div>

              <div className="bg-rockhill-pine rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Target size={120} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-3">
                    Talk to us about {category.name.toLowerCase()}
                  </h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    Share your learning goals and group size, and we'll suggest the best Rockhill
                    Outdoors programs for you.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 font-bold hover:text-rockhill-sunset transition-colors"
                  >
                    Contact our team
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

    </>
  )
}

