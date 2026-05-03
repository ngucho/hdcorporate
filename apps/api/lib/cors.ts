const DEFAULT_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://www.hdcorporate.com',
  'https://hdcorporate.com',
]

function parseOriginsCsv(raw: string | undefined): string[] {
  if (!raw?.trim()) return []
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

/** Fusionne `API_ALLOWED_ORIGINS` et `API_ALLOWED_ORIGINS_EXTRA` (dédoublonnage, ordre conservé). */
export function allowedOrigins(): string[] {
  const main = parseOriginsCsv(process.env.API_ALLOWED_ORIGINS)
  const extra = parseOriginsCsv(process.env.API_ALLOWED_ORIGINS_EXTRA)
  const base = main.length > 0 ? main : DEFAULT_ORIGINS
  const seen = new Set<string>()
  const out: string[] = []
  for (const o of [...base, ...extra]) {
    if (seen.has(o)) continue
    seen.add(o)
    out.push(o)
  }
  return out
}
