import { useState, useEffect } from 'react'
import Head from 'next/head'
import { MapPin, BookOpen, Globe2 } from 'lucide-react'
import HeroBackground from '../components/HeroBackground'

export default function Maps() {
  const [activeTab, setActiveTab] = useState('learning')
  const [mounted, setMounted] = useState(false)
  const [maps, setMaps] = useState([])
  const [loading, setLoading] = useState(true)

  // Default Kathmandu coordinates if no maps exist
  const defaultCenter = {
    lat: 27.7172,
    lng: 85.3240
  }

  useEffect(() => {
    setMounted(true)
    loadMaps()
  }, [])

  const loadMaps = async () => {
    try {
      const res = await fetch('/api/maps')
      if (res.ok) {
        const data = await res.json()
        setMaps(data.maps || [])
      }
    } catch (error) {
      console.error('Error loading maps:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!mounted || loading) return

    // Dynamically import Leaflet only on client side
    import('leaflet').then((L) => {
      // Remove existing maps
      const learningMapEl = document.getElementById('learning-map')
      const lifestyleMapEl = document.getElementById('lifestyle-map')
      
      if (learningMapEl) {
        learningMapEl.innerHTML = ''
      }
      if (lifestyleMapEl) {
        lifestyleMapEl.innerHTML = ''
      }

      // Filter maps by type (we'll use all maps for now, but you can filter if needed)
      const mapsToDisplay = maps

      // Calculate center point from all maps or use default
      let centerLat = defaultCenter.lat
      let centerLng = defaultCenter.lng
      let zoom = 14

      if (mapsToDisplay.length > 0) {
        // Calculate average center
        const sumLat = mapsToDisplay.reduce((sum, m) => sum + parseFloat(m.latitude), 0)
        const sumLng = mapsToDisplay.reduce((sum, m) => sum + parseFloat(m.longitude), 0)
        centerLat = sumLat / mapsToDisplay.length
        centerLng = sumLng / mapsToDisplay.length
        
        // Adjust zoom based on number of markers
        if (mapsToDisplay.length === 1) {
          zoom = 14
        } else if (mapsToDisplay.length <= 3) {
          zoom = 12
        } else {
          zoom = 11
        }
      }

      // Initialize maps based on active tab
      if (activeTab === 'learning' && learningMapEl) {
        const learningMap = L.map('learning-map').setView([centerLat, centerLng], zoom)
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(learningMap)

        // Custom icon for learning
        const learningIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="background: #142E2B; width: 40px; height: 40px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
                   <svg style="width: 20px; height: 20px; transform: rotate(45deg); color: white;" fill="currentColor" viewBox="0 0 20 20">
                     <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                   </svg>
                 </div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 40]
        })

        // Add markers for all maps
        mapsToDisplay.forEach((map, index) => {
          const marker = L.marker([parseFloat(map.latitude), parseFloat(map.longitude)], { icon: learningIcon })
            .addTo(learningMap)
            .bindPopup(`<b>${map.title}</b><br>${map.location}`)
          
          // Open first marker popup
          if (index === 0) {
            marker.openPopup()
          }
        })
      } else if (activeTab === 'lifestyle' && lifestyleMapEl) {
        const lifestyleMap = L.map('lifestyle-map').setView([centerLat, centerLng], zoom)
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(lifestyleMap)

        // Custom icon for lifestyle
        const lifestyleIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="background: #F07D1E; width: 40px; height: 40px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
                   <svg style="width: 20px; height: 20px; transform: rotate(45deg); color: white;" fill="currentColor" viewBox="0 0 20 20">
                     <path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd"/>
                   </svg>
                 </div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 40]
        })

        // Add markers for all maps
        mapsToDisplay.forEach((map, index) => {
          const marker = L.marker([parseFloat(map.latitude), parseFloat(map.longitude)], { icon: lifestyleIcon })
            .addTo(lifestyleMap)
            .bindPopup(`<b>${map.title}</b><br>${map.location}`)
          
          // Open first marker popup
          if (index === 0) {
            marker.openPopup()
          }
        })
      }
    })
  }, [activeTab, mounted, maps, loading])

  return (
    <>
      <Head>
        <title>Our Locations - Rockhill Outdoors</title>
        <meta name="description" content="Find our learning and lifestyle program locations in Kathmandu, Nepal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Leaflet CSS */}
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </Head>

      <style jsx global>{`
        .gradient-text {
          background: linear-gradient(135deg, #142E2B 0%, #39A2C6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .map-container {
          height: 500px;
          width: 100%;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .tab-button {
          transition: all 0.3s ease;
        }

        .tab-button.active {
          background: linear-gradient(135deg, #142E2B 0%, #39A2C6 100%);
          color: white;
        }

        .custom-marker {
          background: transparent;
          border: none;
        }

        .leaflet-popup-content-wrapper {
          border-radius: 0.5rem;
          font-family: 'Inter', sans-serif;
        }

        .leaflet-popup-content {
          margin: 1rem;
        }
      `}</style>

      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Header */}
        <section className="relative overflow-hidden py-20 bg-gradient-to-br from-rockhill-pine via-rockhill-pine to-rockhill-pine-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Find Us in Kathmandu</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-slate-200">Locations</span>
            </h1>
            <p className="text-xl opacity-95 max-w-2xl mx-auto font-light">
              Discover where our learning programs and lifestyle adventures begin in the heart of Nepal.
            </p>
          </div>
        </section>

        {/* Maps Section */}
        <section className="py-20">
          <HeroBackground />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex gap-4 p-2 bg-slate-100 rounded-2xl">
                <button
                  onClick={() => setActiveTab('learning')}
                  className={`tab-button flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all ${
                    activeTab === 'learning' ? 'active' : 'text-slate-600 hover:bg-white'
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  Learning Center
                </button>
                <button
                  onClick={() => setActiveTab('lifestyle')}
                  className={`tab-button flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all ${
                    activeTab === 'lifestyle' ? 'active' : 'text-slate-600 hover:bg-white'
                  }`}
                >
                  <Globe2 className="w-5 h-5" />
                  Lifestyle Hub
                </button>
              </div>
            </div>

            {/* Learning Map */}
            {activeTab === 'learning' && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <h2 className="text-4xl font-bold text-slate-900 mb-4">
                    Learning <span className="gradient-text">Center</span>
                  </h2>
                  <p className="text-lg text-slate-600">
                    Our educational programs and skill-building workshops take place at our dedicated learning facilities.
                  </p>
                </div>

                {loading ? (
                  <div className="map-container flex items-center justify-center bg-gray-100">
                    <p className="text-slate-600">Loading maps...</p>
                  </div>
                ) : maps.length === 0 ? (
                  <div className="map-container flex items-center justify-center bg-gray-100">
                    <p className="text-slate-600">No map locations available.  </p>
                  </div>
                ) : (
                  <div id="learning-map" className="map-container"></div>
                )}

                {maps.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <h3 className="text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-rockhill-pine" />
                        Locations
                      </h3>
                      <div className="text-slate-600 space-y-2">
                        {maps.map((map) => (
                          <div key={map.id} className="pb-2 border-b border-slate-100 last:border-0 last:pb-0">
                            <div className="font-medium">{map.title}</div>
                            <div className="text-sm">{map.location}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">Programs Offered</h3>
                      <ul className="text-slate-600 space-y-2">
                        <li>• Leadership Development</li>
                        <li>• Outdoor Skills Training</li>
                        <li>• Team Building Workshops</li>
                        <li>• Educational Expeditions</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Lifestyle Map */}
            {activeTab === 'lifestyle' && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <h2 className="text-4xl font-bold text-slate-900 mb-4">
                    Lifestyle <span className="gradient-text">Hub</span>
                  </h2>
                  <p className="text-lg text-slate-600">
                    Start your adventure from our lifestyle hub, your gateway to exploring Nepal's stunning outdoor destinations.
                  </p>
                </div>

                {loading ? (
                  <div className="map-container flex items-center justify-center bg-gray-100">
                    <p className="text-slate-600">Loading maps...</p>
                  </div>
                ) : maps.length === 0 ? (
                  <div className="map-container flex items-center justify-center bg-gray-100">
                    <p className="text-slate-600">No map locations available. </p>
                  </div>
                ) : (
                  <div id="lifestyle-map" className="map-container"></div>
                )}

                {maps.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <h3 className="text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-rockhill-pine" />
                        Locations
                      </h3>
                      <div className="text-slate-600 space-y-2">
                        {maps.map((map) => (
                          <div key={map.id} className="pb-2 border-b border-slate-100 last:border-0 last:pb-0">
                            <div className="font-medium">{map.title}</div>
                            <div className="text-sm">{map.location}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">Activities Available</h3>
                      <ul className="text-slate-600 space-y-2">
                        <li>• Trekking Expeditions</li>
                        <li>• Mountain Climbing</li>
                        <li>• Cultural Tours</li>
                        <li>• Adventure Travel</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Ready to Visit Us?
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Get in touch to plan your visit or learn more about our programs and adventures.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rockhill-pine to-rockhill-pine text-white font-semibold rounded-xl hover:from-rockhill-pine hover:to-rockhill-pine-dark transition-all shadow-lg hover:shadow-xl"
            >
              Contact Us
              <MapPin className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </>
  )
}