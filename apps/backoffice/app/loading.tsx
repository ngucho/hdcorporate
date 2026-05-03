import Image from 'next/image'

export default function BackofficeLoading() {
  return (
    <div
      className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-background px-6"
      aria-busy="true"
      aria-label="Chargement"
    >
      <div className="animate-pulse">
        <Image
          src="/icon/splash-mark.png"
          alt=""
          width={112}
          height={112}
          priority
          className="h-28 w-28 object-contain opacity-90"
        />
      </div>
      <p className="font-medium tracking-wide text-muted-foreground">HD Corporate — Backoffice</p>
      <div className="h-1 w-36 overflow-hidden rounded-full bg-muted">
        <div className="h-full w-1/2 rounded-full bg-primary/80 animate-pulse" />
      </div>
    </div>
  )
}
