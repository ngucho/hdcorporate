import { Navigation } from '@/components/hd/navigation'
import { Footer } from '@/components/hd/footer'

/** Pages services = contenu statique ; cache HTTP/CDN long côté Next. */
export const revalidate = 86400

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="min-h-dvh min-w-0 overflow-x-clip bg-hd-cream">
        {children}
      </main>
      <Footer />
    </>
  )
}
