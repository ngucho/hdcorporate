import { Navigation } from '@/components/hd/navigation'
import { Footer } from '@/components/hd/footer'

/** Pages services = contenu statique ; cache HTTP/CDN long côté Next. */
export const revalidate = 86400

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="bg-hd-cream min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  )
}
