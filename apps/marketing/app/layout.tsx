import type { Metadata, Viewport } from 'next'
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'HD Corporate | Secrétariat Juridique & Création de Société',
  description:
    'Secrétariat juridique et création de société dès 299 € : formalités claires, M&A et corporate pour dirigeants, fondateurs et freelances. Accompagnement par Hamidou Diallo.',
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
      <body className="font-sans min-h-dvh overflow-x-clip antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
