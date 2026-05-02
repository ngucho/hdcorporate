export function assertStaffEmail(session: { user?: { email?: string } } | null): boolean {
  if (!session?.user?.email) return false
  const raw = process.env.BACKOFFICE_ALLOWED_EMAILS
  if (!raw?.trim()) return true
  const allowed = raw
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
  const email = session.user.email.toLowerCase()
  return allowed.includes(email)
}
