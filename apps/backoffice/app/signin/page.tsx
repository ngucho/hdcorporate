import { AuthGatewayShell } from '@/components/auth-gateway-shell'
import { assertStaffEmail } from '@/lib/access'
import { auth0 } from '@/lib/auth0'
import { redirect } from 'next/navigation'

export const runtime = 'nodejs'

export default async function SignInPage() {
  const session = await auth0.getSession()
  if (session) {
    redirect(assertStaffEmail(session) ? '/dashboard' : '/forbidden')
  }

  return (
    <AuthGatewayShell
      title="Connexion"
      lead="Identifiez-vous avec Auth0 pour poursuivre vers le backoffice."
      authHref="/auth/login"
      authLabel="Continuer vers la connexion Auth0"
      alternate={{
        href: '/signup',
        label: 'Créer un compte',
        hint: 'Pas encore de compte Auth0 ?',
      }}
    />
  )
}
