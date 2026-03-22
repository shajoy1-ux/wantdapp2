import './globals.css'
import { AppProvider } from '@/components/providers/AppProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { MobileNav } from '@/components/layout/MobileNav'
import { ToastContainer } from '@/components/ui/Toast'
import { JsonLd } from '@/components/ui/JsonLd'
import { defaultMetadata } from '@/lib/metadata'

export const metadata = defaultMetadata

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0C0C0E" />
        <JsonLd />
      </head>
      <body className="bg-bg text-fg font-sans min-h-screen">
        <AppProvider>
          <Navbar />
          <main className="mobile-padded">
            {children}
          </main>
          <Footer />
          <MobileNav />
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  )
}
