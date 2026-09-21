import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import { learningCategories, lifestyleCategories } from '../lib/categories'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const pathname = router.pathname

  useEffect(() => {
    setIsClient(true)
  }, [])

  const toggleMobileDropdown = (name) => {
    setOpenMobileDropdown(openMobileDropdown === name ? null : name)
  }

  // Helper to check if link is active
  const isActive = (path) => {
    if (!isClient) return false;
    if (path === '/' && pathname !== '/') return false;
    return pathname.startsWith(path);
  }

  const staticLinks = [
    { href: '/become-our-partner', label: 'Partner' },
    { href: '/events', label: 'Events' },
    { href: '/maps', label: 'Maps' },
    { href: '/blogs', label: 'Journal' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/gallery', label: 'Gallery' },
  ]

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 shadow-sm transition-all">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 shrink-0 group mr-2 xl:mr-4">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 transform transition-transform group-hover:scale-105">
              <Image src="/logo.png" alt="Rockhill Outdoors logo" fill className="object-contain" priority />
            </div>
            <span className="text-sm sm:text-xl font-extrabold tracking-tight text-slate-800 hidden lg:inline xl:inline">Rockhill Outdoors</span>
            <span className="text-lg font-extrabold tracking-tight text-slate-800 sm:hidden lg:hidden">Rockhill</span>
          </Link>

          {/* Desktop Menu - Tightly Packed to fit all items */}
          <div className="hidden lg:flex items-center justify-end flex-1 space-x-0.5 xl:space-x-1">
            <Link
              href="/"
              className={`px-2 xl:px-3 py-2 font-bold text-[13px] xl:text-sm whitespace-nowrap rounded-lg transition-colors relative group ${isActive('/') ? 'text-rockhill-pine bg-slate-50' : 'text-slate-600 hover:text-rockhill-pine hover:bg-slate-50'}`}
            >
              Home
              {isActive('/') && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[3px] bg-rockhill-sunset rounded-t-md shadow-sm"></span>}
            </Link>

            {/* Learning dropdown */}
            <div className="relative group py-6">
              <button className={`inline-flex items-center gap-0.5 px-2 xl:px-3 py-2 font-bold text-[13px] xl:text-sm whitespace-nowrap rounded-lg transition-colors relative ${isActive('/learning') ? 'text-rockhill-pine bg-slate-50' : 'text-slate-600 hover:text-rockhill-pine group-hover:bg-slate-50'}`}>
                Learning
                <ChevronDown size={14} className="mt-[2px] transition-transform group-hover:rotate-180" />
                {isActive('/learning') && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[3px] bg-rockhill-sunset rounded-t-md shadow-sm"></span>}
              </button>
              <div className="absolute left-0 mt-0 w-80 rounded-2xl bg-white shadow-xl border border-slate-100 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                <div className="p-3">
                  <Link href="/learning" className="flex items-center justify-between px-4 py-3 text-sm font-bold text-rockhill-pine bg-slate-50 hover:bg-slate-100 rounded-xl mb-2 transition-colors">
                    All Learning Programs <ArrowRight size={14} />
                  </Link>
                  <div className="space-y-1">
                  {learningCategories.map((category) => (
                    <Link key={category.slug} href={`/learning/${category.slug}`} className="group/item flex items-start gap-3 px-3 py-2.5 hover:bg-slate-50 transition-colors rounded-xl">
                      <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-slate-100 rounded-lg group-hover/item:bg-white border border-transparent transition-all">
                        <div className="scale-75 origin-center">{category.icon}</div>
                      </div>
                      <div className="pt-0.5">
                        <div className="text-sm font-bold text-slate-700 group-hover/item:text-rockhill-pine">{category.name}</div>
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
              <button className={`inline-flex items-center gap-0.5 px-2 xl:px-3 py-2 font-bold text-[13px] xl:text-sm whitespace-nowrap rounded-lg transition-colors relative ${isActive('/lifestyle') ? 'text-rockhill-pine bg-slate-50' : 'text-slate-600 hover:text-rockhill-pine group-hover:bg-slate-50'}`}>
                Lifestyle
                <ChevronDown size={14} className="mt-[2px] transition-transform group-hover:rotate-180" />
                {isActive('/lifestyle') && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[3px] bg-rockhill-sunset rounded-t-md shadow-sm"></span>}
              </button>
              <div className="absolute left-0 mt-0 w-80 rounded-2xl bg-white shadow-xl border border-slate-100 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                <div className="p-3">
                  <Link href="/lifestyle" className="flex items-center justify-between px-4 py-3 text-sm font-bold text-rockhill-pine bg-slate-50 hover:bg-slate-100 rounded-xl mb-2 transition-colors">
                    All Lifestyle Journeys <ArrowRight size={14} />
                  </Link>
                  <div className="space-y-1">
                  {lifestyleCategories.map((category) => (
                    <Link key={category.slug} href={`/lifestyle/${category.slug}`} className="group/item flex items-start gap-3 px-3 py-2.5 hover:bg-slate-50 transition-colors rounded-xl">
                      <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-slate-100 rounded-lg group-hover/item:bg-white border border-transparent transition-all">
                        <div className="scale-75 origin-center">{category.icon}</div>
                      </div>
                      <div className="pt-0.5">
                        <div className="text-sm font-bold text-slate-700 group-hover/item:text-rockhill-pine">{category.name}</div>
                        <div className="text-xs text-slate-500 line-clamp-1">{category.description}</div>
                      </div>
                    </Link>
                  ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Standard Links */}
            {staticLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2 xl:px-3 py-2 font-bold text-[13px] xl:text-sm whitespace-nowrap rounded-lg transition-colors relative group ${isActive(link.href) ? 'text-rockhill-pine bg-slate-50' : 'text-slate-600 hover:text-rockhill-pine hover:bg-slate-50'}`}
              >
                {link.label}
                {isActive(link.href) && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[3px] bg-rockhill-sunset rounded-t-md shadow-sm"></span>}
              </Link>
            ))}

            {/* CTA Button */}
            <div className="pl-1 xl:pl-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-4 py-2 bg-rockhill-pine hover:bg-rockhill-pine-dark text-white font-bold text-[13px] xl:text-sm rounded-full transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2 text-slate-600 hover:text-rockhill-pine hover:bg-slate-50 rounded-lg transition-colors" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-slate-100 pb-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-2 pt-2 space-y-1">
              <Link href="/" className={`block px-3 py-3 rounded-xl font-bold ${isActive('/') ? 'bg-rockhill-pine text-white' : 'text-slate-700 hover:bg-slate-50'}`} onClick={() => setIsOpen(false)}>
                Home
              </Link>

              {/* Mobile Learning dropdown */}
              <div className="border border-slate-100 rounded-xl overflow-hidden mb-1">
                <button
                  className={`w-full flex items-center justify-between px-3 py-3 font-bold transition-colors ${isActive('/learning') ? 'bg-rockhill-pine/10 text-rockhill-pine' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
                  onClick={() => toggleMobileDropdown('learning')}
                >
                  Learning
                  <ChevronDown size={18} className={`transition-transform ${openMobileDropdown === 'learning' ? 'rotate-180 text-rockhill-pine' : ''}`} />
                </button>
                {openMobileDropdown === 'learning' && (
                  <div className="bg-slate-50 px-2 py-2 space-y-1 border-t border-slate-100">
                    <Link href="/learning" className="block px-3 py-2 rounded-lg text-rockhill-pine hover:bg-white font-semibold text-sm" onClick={() => setIsOpen(false)}>All Learning Programs</Link>
                    {learningCategories.map((category) => (
                      <Link key={category.slug} href={`/learning/${category.slug}`} className="block px-3 py-2 rounded-lg text-slate-600 hover:text-rockhill-pine hover:bg-white text-sm" onClick={() => setIsOpen(false)}>{category.name}</Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Lifestyle dropdown */}
              <div className="border border-slate-100 rounded-xl overflow-hidden mb-1">
                <button
                  className={`w-full flex items-center justify-between px-3 py-3 font-bold transition-colors ${isActive('/lifestyle') ? 'bg-rockhill-pine/10 text-rockhill-pine' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
                  onClick={() => toggleMobileDropdown('lifestyle')}
                >
                  Lifestyle
                  <ChevronDown size={18} className={`transition-transform ${openMobileDropdown === 'lifestyle' ? 'rotate-180 text-rockhill-pine' : ''}`} />
                </button>
                {openMobileDropdown === 'lifestyle' && (
                  <div className="bg-slate-50 px-2 py-2 space-y-1 border-t border-slate-100">
                    <Link href="/lifestyle" className="block px-3 py-2 rounded-lg text-rockhill-pine hover:bg-white font-semibold text-sm" onClick={() => setIsOpen(false)}>All Lifestyle Journeys</Link>
                    {lifestyleCategories.map((category) => (
                      <Link key={category.slug} href={`/lifestyle/${category.slug}`} className="block px-3 py-2 rounded-lg text-slate-600 hover:text-rockhill-pine hover:bg-white text-sm" onClick={() => setIsOpen(false)}>{category.name}</Link>
                    ))}
                  </div>
                )}
              </div>

              {staticLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-3 rounded-xl font-bold ${isActive(link.href) ? 'bg-rockhill-pine text-white' : 'text-slate-700 hover:bg-slate-50'}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="pt-2">
                <Link href="/contact" className="flex items-center justify-center w-full px-4 py-3 bg-rockhill-pine hover:bg-rockhill-pine-dark text-white font-bold rounded-xl transition-colors shadow-sm" onClick={() => setIsOpen(false)}>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
