import { auth0 } from '@/lib/auth0'
import { assertStaffEmail } from '@/lib/access'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const runtime = 'nodejs'

/** Do not prerender at build time (Auth0 + DB would run without a real session and can hang). */
export const dynamic = 'force-dynamic'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth0.getSession()
  if (!session) {
    redirect('/auth/login')
  }
  if (!assertStaffEmail(session)) {
    redirect('/forbidden')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-[var(--panel)] px-6 py-4 flex items-center justify-between gap-4">
        <nav className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/dashboard" className="font-semibold text-foreground">
            HD Backoffice
          </Link>
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
            Tableau de bord
          </Link>
          <Link href="/inbox" className="text-muted-foreground hover:text-foreground">
            Boîte de réception
          </Link>
          <Link href="/clients" className="text-muted-foreground hover:text-foreground">
            Clients
          </Link>
        </nav>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>{session.user?.email}</span>
          <a
            href="/auth/logout"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground no-underline hover:bg-primary/90"
          >
            Déconnexion
          </a>
        </div>
      </header>
      <main className="flex-1 px-6 py-8 max-w-6xl w-full mx-auto">{children}</main>
    </div>
  )
}
