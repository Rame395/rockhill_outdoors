import Link from 'next/link'
import { Facebook, Instagram, MessageCircle } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-rockhill-pine-dark text-gray-300 border-t border-rockhill-pine">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Rockhill Outdoors</h3>
            <p className="text-sm mb-3">Your gateway to adventure, exploration, and unforgettable outdoor experiences.</p>
            <p className="text-sm text-gray-400">Opening hours: 5 AM to 8 PM throughout the week. Open to chat.</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-rockhill-sunset transition-colors">Home</Link></li>
              <li><Link href="/learning" className="hover:text-rockhill-sunset transition-colors">Learning</Link></li>
              <li><Link href="/lifestyle" className="hover:text-rockhill-sunset transition-colors">Lifestyle</Link></li>
              <li><Link href="/contact" className="hover:text-rockhill-sunset transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:offic.roll@gmail.com" className="hover:text-rockhill-sunset transition-colors">Email Support</a></li>
              <li><a href="tel:+9779704800736" className="hover:text-rockhill-sunset transition-colors">Call Us: +977 9704800736</a></li>
              <li><a href="#" className="hover:text-rockhill-sunset transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <ul className="flex items-center gap-3 text-sm">
              <li>
                <a
                  href="https://www.facebook.com/rockhilloutdoorsnepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-700 text-gray-300 hover:text-rockhill-sunset hover:border-rockhill-sunset transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/rockhilloutdoors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-700 text-gray-300 hover:text-rockhill-sunset hover:border-rockhill-sunset transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/9779704800736"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  title="WhatsApp: 9704800736"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-700 text-gray-300 hover:text-rockhill-sunset hover:border-rockhill-sunset transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-rockhill-pine pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© {currentYear} Rockhill Outdoors. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
              <a href="#" className="text-gray-400 hover:text-rockhill-sunset transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-rockhill-sunset transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-rockhill-sunset transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
