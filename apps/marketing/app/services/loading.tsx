export default function ServicesLoading() {
  return (
    <div className="pt-20" aria-busy="true" aria-label="Chargement">
      <div className="border-b border-hd-green/10 bg-hd-green/5">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="h-4 w-40 animate-pulse rounded bg-hd-green/15" />
        </div>
      </div>
      <div className="bg-hd-green py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="h-6 w-24 animate-pulse rounded bg-white/20" />
          <div className="mt-6 h-12 max-w-2xl animate-pulse rounded-lg bg-white/15" />
          <div className="mt-4 h-20 max-w-xl animate-pulse rounded bg-white/10" />
        </div>
      </div>
      <div className="space-y-4 bg-hd-cream px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-3">
          <div className="h-8 w-64 animate-pulse rounded bg-hd-green/10" />
          <div className="h-32 animate-pulse rounded-xl border border-hd-green/10 bg-white/70" />
          <div className="h-32 animate-pulse rounded-xl border border-hd-green/10 bg-white/70" />
        </div>
      </div>
    </div>
  )
}
