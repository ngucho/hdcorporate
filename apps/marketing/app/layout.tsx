import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'HD Corporate | Secrétariat Juridique & Création de Société',
  description: 'Cabinet de secrétariat juridique indépendant fondé par Hamidou Diallo. Création de société dès 299€, secrétariat juridique, M&A et Corporate. Accompagnement personnalisé pour entrepreneurs.',
  keywords: 'création société, secrétariat juridique, SAS, SASU, EURL, droit des affaires, M&A, corporate, juriste, Paris, Évry',
  authors: [{ name: 'Hamidou Diallo' }],
  openGraph: {
    title: 'HD Corporate | Secrétariat Juridique & Création de Société',
    description: 'Création de société dès 299€. Secrétariat juridique et accompagnement corporate par un juriste spécialisé.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${dmSans.variable} bg-hd-cream`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
