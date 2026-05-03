type JsonLdProps = {
  data: unknown
}

/** Données structurées JSON-LD (schema.org) pour le SEO. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
