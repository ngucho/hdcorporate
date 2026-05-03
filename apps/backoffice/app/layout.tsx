import type { Metadata } from 'next'
import './globals.css'

const defaultSite = 'https://insite.hdcorporate.com'
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : defaultSite)

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'HD Corporate Backoffice',
  description: 'Gestion interne clients, reçus et demandes.',
  openGraph: {
    title: 'HD Corporate Backoffice',
    description: 'Espace interne HD Corporate.',
    type: 'website',
    locale: 'fr_FR',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'HD Corporate' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HD Corporate Backoffice',
    description: 'Espace interne HD Corporate.',
    images: ['/og-image.png'],
  },
}

export const runtime = 'nodejs'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="dark">
      <body className="min-h-screen antialiased bg-background text-foreground">{children}</body>
    </html>
  )
}
