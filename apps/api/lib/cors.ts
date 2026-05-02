const DEFAULT_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://www.hdcorporate.com',
  'https://hdcorporate.com',
]

export function allowedOrigins(): string[] {
  const raw = process.env.API_ALLOWED_ORIGINS
  if (!raw?.trim()) return DEFAULT_ORIGINS
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}
