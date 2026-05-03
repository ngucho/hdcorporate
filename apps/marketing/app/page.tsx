import { Suspense } from 'react'
import { Navigation } from '@/components/hd/navigation'
import { HomeChrome } from '@/components/hd/home-chrome'
import { HeroSection } from '@/components/hd/hero-section'
import { ProblemSection } from '@/components/hd/problem-section'
import { ServicesSection } from '@/components/hd/services-section'
import { AboutSection } from '@/components/hd/about-section'
import { ProcessSection } from '@/components/hd/process-section'
import { BookingSection } from '@/features/booking/client'
import { TrustSection } from '@/components/hd/trust-section'
import { FAQSection } from '@/components/hd/faq-section'
import { CTASection } from '@/components/hd/cta-section'
import { ContactSection } from '@/components/hd/contact-section'
import { Footer } from '@/components/hd/footer'
import { getPublishedServicesForHome } from '@/lib/cached-services'

/** ISR : régénération au plus toutes les 5 min (données services DB). */
export const revalidate = 300

function ServicesSectionFallback() {
  return (
    <section className="border-t border-hd-green/10 bg-hd-cream py-20 lg:py-28" aria-hidden>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 h-8 w-48 animate-pulse rounded bg-hd-green/15" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-72 animate-pulse rounded-xl border border-hd-green/10 bg-white/70" />
          ))}
        </div>
      </div>
    </section>
  )
}

async function ServicesFromDb() {
  const services = await getPublishedServicesForHome()
  return <ServicesSection services={services} />
}

export default function HDCorporate() {
  return (
    <>
      <HomeChrome />
      <Navigation />

      <main className="min-w-0">
        <HeroSection />
        <ProblemSection />
        <Suspense fallback={<ServicesSectionFallback />}>
          <ServicesFromDb />
        </Suspense>
        <AboutSection />
        <ProcessSection />
        <BookingSection />
        <TrustSection />
        <FAQSection />
        <ContactSection />
        <CTASection />
      </main>

      <Footer />
    </>
  )
}
