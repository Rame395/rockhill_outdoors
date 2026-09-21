import '../styles/globals.css'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import AnnouncementBar from '../components/AnnouncementBar'
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return (
    <>
    <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXPN63B18X"
        strategy="afterInteractive"
      />
      <Script id="ga">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXPN63B18X');
        `}
      </Script>
    <div className="min-h-screen flex flex-col bg-white">
      {/* Announcement bar sits above the navigation across the site */}
      <AnnouncementBar />
      <Navigation />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
    </>
  )
}
