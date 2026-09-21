import { useEffect, useState } from 'react'
import Head from 'next/head'
import { Image as ImageIcon, Loader2 } from 'lucide-react'
import HeroBackground from '../components/HeroBackground'

export default function GalleryPage() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const res = await fetch('/api/gallery')
        if (res.ok) {
          const data = await res.json()
          setImages(data.images || [])
        }
      } catch (error) {
        console.error('Error loading gallery:', error)
      } finally {
        setLoading(false)
      }
    }

    loadGallery()
  }, [])

  const getImageUrl = (image) => {
    // Images are served via API route since they're not in public folder
    return `/api/gallery-image/${image.filename}`
  }

  return (
    <>
      <Head>
        <title>Gallery - Rockhill Outdoors</title>
        <meta
          name="description"
          content="Browse our photo gallery showcasing outdoor adventures, learning programs, and community events."
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-br from-rockhill-pine via-rockhill-pine to-rockhill-pine-dark text-white">
          <HeroBackground />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium mb-4">
              <ImageIcon className="w-4 h-4" />
              Photo Gallery
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Gallery
            </h1>
            <p className="text-lg md:text-xl max-w-2xl text-slate-50">
              Explore moments from our outdoor adventures, learning programs, and community events.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="py-16 text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-rockhill-pine mb-4" />
                <p className="text-slate-500">Loading gallery...</p>
              </div>
            ) : images.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-lg font-semibold text-slate-800 mb-2">No images yet</p>
                <p className="text-slate-500">
                  Check back soon for photos from our adventures and events.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="group relative aspect-square overflow-hidden rounded-lg bg-slate-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getImageUrl(image)}
                      alt={image.originalFilename || 'Gallery image'}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
