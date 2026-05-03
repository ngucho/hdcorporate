import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ORG } from '@/lib/seo/site-config'
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF7F0' },
    { media: '(prefers-color-scheme: dark)', color: '#0B3D2E' },
  ],
}

const defaultSite = 'https://www.hdcorporate.com'
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : defaultSite)

const defaultDescription = ORG.description

const twitterHandle = (v: string | undefined) => (v?.startsWith('@') ? v : v ? `@${v}` : undefined)

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'HD Corporate | Secrétariat Juridique & Création de Société',
    template: '%s | HD Corporate',
  },
  applicationName: 'HD Corporate',
  description: defaultDescription,
  authors: [{ name: 'Hamidou Diallo', url: siteUrl }],
  creator: 'Hamidou Diallo',
  publisher: 'HD Corporate',
  category: 'legal services',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'HD Corporate',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HD Corporate — secrétariat juridique et création de société',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: twitterHandle(process.env.NEXT_PUBLIC_TWITTER_SITE),
    creator: twitterHandle(process.env.NEXT_PUBLIC_TWITTER_CREATOR),
  },
  appleWebApp: {
    capable: true,
    title: 'HD Corporate',
    statusBarStyle: 'black-translucent',
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
