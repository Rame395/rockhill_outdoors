'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import { learningCategories, lifestyleCategories } from '../lib/categories'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null)

  const mainLinks = [
    { href: '/', label: 'Home' },
    { href: '/learning', label: 'Learning' },
    { href: '/lifestyle', label: 'Lifestyle' },
    { href: '/contact', label: 'Contact Us' },
  ]

  return (
    <nav className="bg-white/95 backdrop-blur border-b border-slate-100 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <div className="relative w-8 h-8 sm:w-12 sm:h-12">
              <Image
                src="/logo.png"
                alt="Rockhill Outdoors logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-base sm:text-2xl font-extrabold tracking-tight text-slate-800 hidden sm:inline">Rockhill Outdoors</span>
            <span className="text-base font-extrabold tracking-tight text-slate-800 sm:hidden">Rockhill</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link
              href="/"
              className="text-slate-600 hover:text-rockhill-pine font-semibold transition-colors text-sm whitespace-nowrap relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rockhill-sunset transition-all group-hover:w-full"></span>
            </Link>

            {/* Learning dropdown */}
            <div className="relative group py-6">
              <button
                className="inline-flex items-center gap-1 text-slate-600 hover:text-rockhill-pine font-semibold transition-colors text-sm whitespace-nowrap"
              >
                Learning
                <ChevronDown size={14} className="mt-[2px]" />
              </button>
              <div className="absolute left-0 mt-2 w-80 rounded-2xl bg-white shadow-xl border border-slate-100 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all">
                <div className="p-3">
                  <Link
                    href="/learning"
                    className="flex items-center justify-between px-4 py-3 text-sm font-bold text-rockhill-pine bg-slate-50 hover:bg-slate-100 rounded-xl mb-2 transition-colors"
                  >
                    All Learning Programs
                    <ArrowRight size={14} />
                  </Link>
                  <div className="space-y-1">
                  {learningCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/learning/${category.slug}`}
                      className="group flex items-start gap-3 px-3 py-2.5 hover:bg-slate-50 transition-colors rounded-xl"
                    >
                      <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-slate-100 rounded-lg group-hover:bg-white group-hover:shadow-sm border border-transparent group-hover:border-slate-200 transition-all">
                        <div className="scale-75 origin-center">{category.icon}</div>
                      </div>
                      <div className="pt-0.5">
                        <div className="text-sm font-bold text-slate-700 group-hover:text-rockhill-pine mb-0.5">{category.name}</div>
                        <div className="text-xs text-slate-500 line-clamp-1">{category.description}</div>
                      </div>
                    </Link>
                  ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Lifestyle dropdown */}
            <div className="relative group py-6">
              <button
                className="inline-flex items-center gap-1 text-slate-600 hover:text-rockhill-pine font-semibold transition-colors text-sm whitespace-nowrap"
              >
                Lifestyle
                <ChevronDown size={14} className="mt-[2px]" />
              </button>
              <div className="absolute left-0 mt-2 w-80 rounded-2xl bg-white shadow-xl border border-slate-100 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all">
                <div className="p-3">
                  <Link
                    href="/lifestyle"
                    className="flex items-center justify-between px-4 py-3 text-sm font-bold text-rockhill-pine bg-slate-50 hover:bg-slate-100 rounded-xl mb-2 transition-colors"
                  >
                    All Lifestyle Journeys
                    <ArrowRight size={14} />
                  </Link>
                  <div className="space-y-1">
                  {lifestyleCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/lifestyle/${category.slug}`}
                      className="group flex items-start gap-3 px-3 py-2.5 hover:bg-slate-50 transition-colors rounded-xl"
                    >
                      <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-slate-100 rounded-lg group-hover:bg-white group-hover:shadow-sm border border-transparent group-hover:border-slate-200 transition-all">
                        <div className="scale-75 origin-center">{category.icon}</div>
                      </div>
                      <div className="pt-0.5">
                        <div className="text-sm font-bold text-slate-700 group-hover:text-rockhill-pine mb-0.5">{category.name}</div>
                        <div className="text-xs text-slate-500 line-clamp-1">{category.description}</div>
                      </div>
                    </Link>
                  ))}
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/become-our-partner"
              className="text-slate-600 hover:text-rockhill-pine font-semibold transition-colors text-sm whitespace-nowrap relative group"
            >
              Partner
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rockhill-sunset transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/events"
              className="text-slate-600 hover:text-rockhill-pine font-semibold transition-colors text-sm whitespace-nowrap relative group"
            >
              Events
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rockhill-sunset transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/maps"
              className="text-slate-600 hover:text-rockhill-pine font-semibold transition-colors text-sm whitespace-nowrap relative group"
            >
              Maps
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rockhill-sunset transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/blogs"
              className="text-slate-600 hover:text-rockhill-pine font-semibold transition-colors text-sm whitespace-nowrap relative group"
            >
              Journal
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rockhill-sunset transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/reviews"
              className="text-slate-600 hover:text-rockhill-pine font-semibold transition-colors text-sm whitespace-nowrap relative group"
            >
              Reviews
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rockhill-sunset transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/gallery"
              className="text-slate-600 hover:text-rockhill-pine font-semibold transition-colors text-sm whitespace-nowrap relative group"
            >
              Gallery
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rockhill-sunset transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/contact"
              className="text-slate-600 hover:text-rockhill-pine font-semibold transition-colors text-sm whitespace-nowrap relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rockhill-sunset transition-all group-hover:w-full"></span>
            </Link>
          </div>

          {/* Tablet Menu Button (for medium screens) */}
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile/Tablet Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-slate-100 pb-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-2 pt-2 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-rockhill-pine hover:bg-slate-50 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              {/* Mobile Learning dropdown */}
              <div>
                <button
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md text-gray-700 hover:text-rockhill-pine hover:bg-slate-50 font-medium"
                  onClick={() =>
                    setOpenMobileDropdown(openMobileDropdown === 'learning' ? null : 'learning')
                  }
                >
                  <span>Learning</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      openMobileDropdown === 'learning' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openMobileDropdown === 'learning' && (
                  <div className="mt-1 ml-4 space-y-1">
                    <Link
                      href="/learning"
                      className="block px-3 py-2 rounded-md text-sm text-rockhill-pine hover:bg-slate-50 font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      All Learning Programs
                    </Link>
                    {learningCategories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/learning/${category.slug}`}
                        className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:text-rockhill-pine hover:bg-slate-50"
                        onClick={() => setIsOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Lifestyle dropdown */}
              <div>
                <button
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md text-gray-700 hover:text-rockhill-pine hover:bg-slate-50 font-medium"
                  onClick={() =>
                    setOpenMobileDropdown(openMobileDropdown === 'lifestyle' ? null : 'lifestyle')
                  }
                >
                  <span>Lifestyle</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      openMobileDropdown === 'lifestyle' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openMobileDropdown === 'lifestyle' && (
                  <div className="mt-1 ml-4 space-y-1">
                    <Link
                      href="/lifestyle"
                      className="block px-3 py-2 rounded-md text-sm text-rockhill-pine hover:bg-slate-50 font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      All Lifestyle Journeys
                    </Link>
                    {lifestyleCategories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/lifestyle/${category.slug}`}
                        className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:text-rockhill-pine hover:bg-slate-50"
                        onClick={() => setIsOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/become-our-partner"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-rockhill-pine hover:bg-slate-50 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Become Our Partner
              </Link>
              <Link
                href="/events"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-rockhill-pine hover:bg-slate-50 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Events
              </Link>
              <Link
                href="/maps"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-rockhill-pine hover:bg-slate-50 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Maps
              </Link>
              <Link
                href="/blogs"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-rockhill-pine hover:bg-slate-50 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Journal
              </Link>
              <Link
                href="/reviews"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-rockhill-pine hover:bg-slate-50 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Reviews
              </Link>
              <Link
                href="/gallery"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-rockhill-pine hover:bg-slate-50 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-rockhill-pine hover:bg-slate-50 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
