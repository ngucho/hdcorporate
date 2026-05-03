import Image from 'next/image'

export default function ServicesLoading() {
  return (
    <div
      className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-hd-cream px-6 pt-[calc(5rem+env(safe-area-inset-top))]"
      aria-busy="true"
      aria-label="Chargement"
    >
      <div className="animate-pulse">
        <Image
          src="/icon/splash-mark.png"
          alt=""
          width={160}
          height={160}
          priority
          className="h-40 w-40 object-contain"
        />
      </div>
      <p className="font-serif text-lg font-light text-hd-green/80">HD Corporate</p>
      <div className="h-1 w-36 overflow-hidden rounded-full bg-hd-green/10">
        <div className="h-full w-1/2 rounded-full bg-hd-gold/70 animate-pulse" />
      </div>
    </div>
  )
}
