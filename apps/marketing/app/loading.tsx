export default function RootLoading() {
  return (
    <div className="min-h-screen bg-hd-cream" aria-busy="true" aria-label="Chargement">
      <div className="border-b border-hd-green/10 bg-hd-cream/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="h-6 w-32 animate-pulse rounded bg-hd-green/15" />
          <div className="hidden gap-6 md:flex">
            <div className="h-4 w-16 animate-pulse rounded bg-hd-green/10" />
            <div className="h-4 w-20 animate-pulse rounded bg-hd-green/10" />
            <div className="h-4 w-14 animate-pulse rounded bg-hd-green/10" />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-16 sm:px-6 lg:px-8">
        <div className="h-10 max-w-md animate-pulse rounded-lg bg-hd-green/10" />
        <div className="h-4 max-w-xl animate-pulse rounded bg-hd-green/10" />
        <div className="h-4 max-w-lg animate-pulse rounded bg-hd-green/10" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 animate-pulse rounded-xl border border-hd-green/10 bg-white/60" />
          ))}
        </div>
      </div>
    </div>
  )
}
