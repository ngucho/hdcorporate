import Image from 'next/image'
import Link from 'next/link'

type AuthGatewayShellProps = {
  title: string
  lead: string
  authHref: string
  authLabel: string
  alternate?: { href: string; label: string; hint: string }
}

/**
 * Écran intermédiaire avant redirection Auth0 (aucun droit backoffice n’est accordé automatiquement).
 */
export function AuthGatewayShell({ title, lead, authHref, authLabel, alternate }: AuthGatewayShellProps) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 px-6 py-12">
      <div className="flex flex-col items-center gap-4 text-center">
        <Image
          src="/icon/splash-mark.png"
          alt=""
          width={120}
          height={120}
          priority
          className="h-[120px] w-[120px] object-contain"
        />
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--bo-muted)]">HD Corporate</p>
          <h1 className="mt-2 text-2xl font-semibold text-foreground">{title}</h1>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">{lead}</p>
        </div>
      </div>

      <div
        className="max-w-md rounded-lg border p-5 text-left text-sm text-muted-foreground"
        style={{ borderColor: 'var(--border)', background: 'var(--panel)' }}
      >
        <p className="font-medium text-foreground">Accès restreint</p>
        <p className="mt-2 leading-relaxed">
          La connexion ou l’inscription via Auth0{' '}
          <strong className="text-foreground">n’attribue aucune permission</strong> dans cet espace : seuls les comptes
          explicitement autorisés (liste{' '}
          <code className="rounded bg-background px-1 py-0.5 text-xs">BACKOFFICE_ALLOWED_EMAILS</code> et rôles côté
          organisation) peuvent utiliser le backoffice. Sinon vous serez renvoyé vers la page « Accès refusé » après
          authentification.
        </p>
      </div>

      <div className="flex w-full max-w-sm flex-col gap-3">
        <a
          href={authHref}
          className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground no-underline transition-colors hover:bg-primary/90"
        >
          {authLabel}
        </a>
        {alternate ? (
          <p className="text-center text-sm text-muted-foreground">
            {alternate.hint}{' '}
            <Link href={alternate.href} className="text-primary underline-offset-2 hover:underline">
              {alternate.label}
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  )
}
