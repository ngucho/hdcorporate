export const runtime = 'nodejs'

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6">
      <h1 className="text-2xl font-semibold">Accès refusé</h1>
      <p className="text-muted-foreground text-center max-w-md">
        Votre compte n’est pas autorisé à accéder à cet espace. Contactez un administrateur ou
        vérifiez la variable{' '}
        <code className="text-xs bg-muted px-1 py-0.5 rounded">BACKOFFICE_ALLOWED_EMAILS</code>.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a href="/signin" className="text-muted-foreground underline underline-offset-2 hover:text-foreground">
          Retour à l’écran de connexion
        </a>
        <a href="/auth/logout" className="text-primary underline underline-offset-2">
          Se déconnecter
        </a>
      </div>
    </div>
  )
}
