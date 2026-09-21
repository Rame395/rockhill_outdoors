'use client';

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function AnnouncementBar() {
  const [announcement, setAnnouncement] = useState({ enabled: false, text: '' })

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await fetch('/api/announcement')
        if (res.ok) {
          const data = await res.json()
          setAnnouncement({
            enabled: data.enabled,
            text: data.text || ''
          })
        }
      } catch (error) {
        console.error('Error loading announcement:', error)
      }
    }

    fetchAnnouncement()
  }, [])

  if (!announcement.enabled || !announcement.text) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-rockhill-pine-dark to-rockhill-pine text-white relative z-50 shadow-md h-12 sm:h-14 flex items-center overflow-hidden">
      
      {/* Subtle Animated Background Icons */}
      <div className="absolute inset-0 pointer-events-none flex items-center opacity-15" aria-hidden="true">
        <div className="flex animate-marquee-bg whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-16 px-8 text-2xl sm:text-3xl items-center shrink-0">
              <span className="animate-bounce-slow">🏃‍♂️</span>
              <span className="animate-wiggle-slow">🚴‍♀️</span>
              <span className="animate-bounce-slow delay-150">🤸‍♂️</span>
              <span className="animate-wiggle-slow delay-300">⛷️</span>
              <span className="animate-bounce-slow delay-500">🧗‍♀️</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling Text (Marquee) */}
      <div className="relative z-10 flex flex-1 overflow-hidden h-full items-center">
        {/* We use 4 identical text blocks to create an infinite seamless loop moving 50% */}
        <div className="flex animate-marquee whitespace-nowrap">
           {[...Array(4)].map((_, i) => (
             <div key={i} className="flex items-center gap-3 shrink-0 px-8 sm:px-16">
               <Sparkles className="w-4 h-4 text-slate-200" />
               <span className="text-sm sm:text-base font-semibold tracking-wide text-slate-50">{announcement.text}</span>
             </div>
           ))}
        </div>
      </div>

      {/* Gradient Fade to hide text disappearing under the button */}
      <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-64 bg-gradient-to-l from-rockhill-pine to-transparent z-10 pointer-events-none" />

      {/* Action Button - Pinned to the right */}
      <div className="absolute right-2 sm:right-4 z-20">
        <Link
          href="/events"
          className="group inline-flex items-center gap-1.5 px-4 py-1.5 sm:py-2 bg-white text-rockhill-pine hover:bg-slate-100 font-bold text-xs sm:text-sm rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          Join an event
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-bg {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes wiggle-slow {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }

        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        
        .animate-marquee-bg {
          animation: marquee-bg 45s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-wiggle-slow {
          animation: wiggle-slow 3.5s ease-in-out infinite;
        }

        .delay-150 { animation-delay: 150ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-500 { animation-delay: 500ms; }
      `}</style>
    </div>
  )
}