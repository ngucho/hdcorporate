'use client'

import { useCallback, useState } from 'react'

export function CopyTextButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false)

  const onClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }, [text])

  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded border px-2 py-1 text-xs transition-colors hover:bg-[var(--panel)]"
      style={{ borderColor: 'var(--border)' }}
    >
      {copied ? 'Copié' : label}
    </button>
  )
}
