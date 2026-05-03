import { AuthGatewayShell } from '@/components/auth-gateway-shell'
import { assertStaffEmail } from '@/lib/access'
import { auth0 } from '@/lib/auth0'
import { redirect } from 'next/navigation'

export const runtime = 'nodejs'

export default async function SignUpPage() {
  const session = await auth0.getSession()
  if (session) {
    redirect(assertStaffEmail(session) ? '/dashboard' : '/forbidden')
  }

  return (
    <AuthGatewayShell
      title="Inscription Auth0"
      lead="Créez ou reliez un compte utilisateur Auth0 (identité centralisée). Cette étape ne crée pas d’accès backoffice."
      authHref="/auth/login?screen_hint=signup"
      authLabel="Continuer vers l’inscription Auth0"
      alternate={{
        href: '/signin',
        label: 'Se connecter',
        hint: 'Vous avez déjà un compte ?',
      }}
    />
  )
}
