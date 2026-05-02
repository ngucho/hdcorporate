import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HD Corporate Backoffice',
  description: 'Gestion interne clients, reçus et demandes.',
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
