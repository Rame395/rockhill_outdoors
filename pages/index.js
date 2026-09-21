import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Mountain, Compass, ArrowRight, Sparkles, BookOpen, Globe2, ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { learningCategories, lifestyleCategories } from '../lib/categories'

export default function Home() {
  const [heroSlides, setHeroSlides] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const videoRefs = useRef([])
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 45 })

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch('/api/hero-slides')
        if (res.ok) {
          const data = await res.json()
          setHeroSlides(data.filter(s => s.enabled))
        }
      } catch (error) {
        console.error('Failed to fetch slides:', error)
      }
    }
    fetchSlides()
  }, [])

  // Track active slide
  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }
    emblaApi.on('select', onSelect)
    onSelect() // Initial set
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi])

  // Manage video playback
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return
      if (index === selectedIndex) {
        video.currentTime = 0
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [selectedIndex])

  // Auto-scroll logic
  useEffect(() => {
    if (!emblaApi || heroSlides.length === 0) return

    const currentSlide = heroSlides[selectedIndex]
    
    // If it's a video, wait for onEnded instead of a timer
    if (currentSlide?.media_type === 'video') return

    const timer = setTimeout(() => {
      emblaApi.scrollNext()
    }, 6000)

    return () => clearTimeout(timer)
  }, [emblaApi, selectedIndex, heroSlides])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <>
      <Head>
        <title>Rockhill Outdoors - Just Go Outside</title>
        <meta name="description" content="Experience adventure with Rockhill Outdoors. Explore mountains, wilderness, and destinations worldwide." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="outdoor adventure, mountain climbing, hiking, travel, exploration" />
        <meta property="og:title" content="Rockhill Outdoors - Just Go Outside" />
        <meta property="og:description" content="Experience adventure with Rockhill Outdoors" />
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
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
            transform: translateY(-20px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
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

        .shimmer {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.3) 50%,
            rgba(255,255,255,0) 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-8px);
        }

        .destination-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .destination-card:hover {
          transform: translateY(-12px) scale(1.02);
        }

        .btn-primary {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .forest-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom, 
            rgba(0, 0, 0, 0.1) 0%, 
            rgba(0, 0, 0, 0.2) 40%, 
            rgba(0, 0, 0, 0.6) 100%
          );
          pointer-events: none;
        }

        .text-shadow-hero {
          text-shadow: 0 2px 10px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.3);
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        
        .embla {
          overflow: hidden;
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0;
        }
        .embla__container {
          display: flex;
          height: 100%;
          will-change: transform;
          touch-action: pan-y pinch-zoom;
        }
        .embla__slide {
          flex: 0 0 100%;
          min-width: 0;
          position: relative;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-8.5rem)] flex items-center justify-center overflow-hidden">
        
        {heroSlides.length > 0 ? (
          <>
            <div className="embla" ref={emblaRef}>
              <div className="embla__container">
                {heroSlides.map((slide, index) => (
                  <div className="embla__slide" key={slide.id}>
                    {slide.media_type === 'video' ? (
                      <video 
                        ref={el => videoRefs.current[index] = el}
                        src={slide.media_url} 
                        className="absolute inset-0 w-full h-full object-cover"
                        muted 
                        playsInline
                        onEnded={() => emblaApi?.scrollNext()}
                      />
                    ) : (
                      <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url('${slide.media_url}')` }}
                      />
                    )}
                    
                    <div className="forest-overlay z-0" />
                    
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center py-12">
                      <div className="animate-fade-in mb-6 inline-block">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl p-3 sm:p-4">
                          <img src="/logo.png" alt="Rockhill Outdoors Logo" className="w-full h-full object-contain" />
                        </div>
                      </div>
                      
                      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up stagger-1 text-shadow-hero">
                        {slide.title || "It's About You"}
                      </h1>
                      
                      <p className="text-base md:text-lg text-white/95 mb-8 max-w-3xl mx-auto leading-relaxed font-normal animate-fade-in-up stagger-2 text-shadow-hero">
                        {slide.subtitle || "Rockhill Outdoors is a professional outdoor learning and training organization dedicated to developing leadership, resilience, and practical life skills through structured experiential education in natural environments."}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-3">
                        <Link href={slide.cta_link || "/lifestyle"} className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-rockhill-sunset to-rockhill-sunset-dark text-white font-semibold rounded-lg hover:from-rockhill-sunset-dark hover:to-rockhill-sunset-dark transition-all shadow-lg hover:shadow-xl btn-primary">
                          {slide.cta_text || "Explore Our Programs"}
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {heroSlides.length > 1 && (
              <>
                <button 
                  onClick={scrollPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button 
                  onClick={scrollNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}
          </>
        ) : (
          /* Fallback static hero if no slides exist */
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop')` }}
            />
            
            <div className="forest-overlay z-0" />
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center py-12">
              <div className="animate-fade-in mb-6 inline-block">
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl p-3 sm:p-4">
                  <img src="/logo.png" alt="Rockhill Outdoors Logo" className="w-full h-full object-contain" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up stagger-1 text-shadow-hero">
                It's About You
              </h1>
              
              <p className="text-base md:text-lg text-white/95 mb-8 max-w-3xl mx-auto leading-relaxed font-normal animate-fade-in-up stagger-2 text-shadow-hero">
                Rockhill Outdoors is a professional outdoor learning and training organization dedicated to developing leadership, resilience, and practical life skills through structured experiential education in natural environments.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-3">
                <Link href="/lifestyle" className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-rockhill-sunset to-rockhill-sunset-dark text-white font-semibold rounded-lg hover:from-rockhill-sunset-dark hover:to-rockhill-sunset-dark transition-all shadow-lg hover:shadow-xl btn-primary">
                  Explore Our Programs
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 via-transparent to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              Explore Our <span className="gradient-text">Categories</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
              Start from where you are—learn with us, travel with us, or do both. Choose a category to discover
              learning journeys and lifestyle experiences that fit you.
            </p>
          </div>

          <div className="space-y-20">
            {/* Learning categories - first block */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-rockhill-pine" />
                </div>
                <div>
                  <h3 className="text-3xl font-semibold text-slate-900">Learning Categories</h3>
                  <p className="text-base text-slate-600">
                    Skill-building journeys for schools, colleges, and young people.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {learningCategories.map((category) => (
                  <Link key={category.slug} href={`/learning/${category.slug}`}>
                    <div className="group p-7 bg-white border border-slate-200 rounded-3xl hover:border-rockhill-pine hover:shadow-2xl card-hover h-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-rockhill-pine/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10">
                        {category.icon && (
                          <div className="w-14 h-14 mb-5 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-2xl">
                            <span>{category.icon}</span>
                          </div>
                        )}
                        <h4 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-rockhill-pine transition-colors">
                          {category.name}
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {category.description}
                        </p>
                        <div className="mt-4 inline-flex items-center text-rockhill-pine font-semibold text-sm">
                          View learning focus
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Lifestyle categories - second block, stacked below */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <Globe2 className="w-5 h-5 text-rockhill-pine" />
                </div>
                <div>
                  <h3 className="text-3xl font-semibold text-slate-900">Lifestyle Categories</h3>
                  <p className="text-base text-slate-600">
                    Travel styles, hobbies, and challenges that shape how you live.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {lifestyleCategories.map((category) => (
                  <Link key={category.slug} href={`/lifestyle/${category.slug}`}>
                    <div className="group p-7 bg-white border border-slate-200 rounded-3xl hover:border-rockhill-pine hover:shadow-2xl card-hover h-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-rockhill-pine/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10">
                        {category.icon && (
                          <div className="w-14 h-14 mb-5 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-2xl">
                            <span>{category.icon}</span>
                          </div>
                        )}
                        <h4 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-rockhill-pine transition-colors">
                          {category.name}
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {category.description}
                        </p>
                        <div className="mt-4 inline-flex items-center text-rockhill-pine font-semibold text-sm">
                          View lifestyle trips
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
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
            Whether you're a seasoned explorer or just starting your outdoor journey, we have the expertise, destinations, and support to make your adventure unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/lifestyle" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-rockhill-pine font-semibold rounded-xl hover:bg-slate-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105">
              Explore Destinations
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/events" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-rockhill-pine font-semibold rounded-xl hover:bg-slate-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105">
              View Events
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all shadow-lg">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}