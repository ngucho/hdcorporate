import Image from 'next/image'

export default function RootLoading() {
  return (
    <div
      className="flex min-h-dvh flex-col items-center justify-center bg-hd-cream px-6"
      aria-busy="true"
      aria-label="Chargement"
    >
      <div className="animate-pulse">
        <Image
          src="/icon/splash-mark.png"
          alt=""
          width={200}
          height={200}
          priority
          className="h-[200px] w-[200px] object-contain"
        />
      </div>
      <p className="mt-8 font-serif text-xl font-light tracking-wide text-hd-green/80">HD Corporate</p>
      <div className="mt-6 h-1 w-36 overflow-hidden rounded-full bg-hd-green/10">
        <div className="h-full w-1/2 rounded-full bg-hd-gold/70 animate-pulse" />
      </div>
    </div>
  )
}
