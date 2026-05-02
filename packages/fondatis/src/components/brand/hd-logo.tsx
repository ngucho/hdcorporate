import React from 'react'

export type HdLogoVariant = 'default' | 'primary' | 'secondary'
export type HdLogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | number

const SIZE_PX: Record<Exclude<HdLogoSize, number>, number> = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
  '2xl': 128,
  '3xl': 256,
}

const VARIANT_FILENAME: Record<HdLogoVariant, string> = {
  default: 'hdcorporate-logo.png',
  primary: 'hdcorporate-logoprimary.png',
  secondary: 'hdcorporate-logosecondary.png',
}

export interface HdCorporateLogoProps {
  variant?: HdLogoVariant
  size?: HdLogoSize
  basePath?: string
  className?: string
  alt?: string
  style?: React.CSSProperties
}

/**
 * HD Corporate logo component.
 *
 * Apps must have the logo files in their public/icons/ directory.
 * Available files: hdcorporate-logo.png, hdcorporate-logoprimary.png, hdcorporate-logosecondary.png
 *
 * Size variants (px width): xs=16, sm=24, md=32, lg=48, xl=64, 2xl=128, 3xl=256
 * Or pass a number for a custom pixel width.
 */
export function HdCorporateLogo({
  variant = 'default',
  size = 'md',
  basePath = '/icons',
  className,
  alt = 'HD Corporate',
  style,
}: HdCorporateLogoProps) {
  const px = typeof size === 'number' ? size : SIZE_PX[size]
  const src = `${basePath}/${VARIANT_FILENAME[variant]}`

  return (
    <img
      src={src}
      alt={alt}
      width={px}
      height="auto"
      className={className}
      style={{ width: px, height: 'auto', ...style }}
    />
  )
}

/** Text-only logo mark: "HD Corporate" using brand typography classes */
export interface HdWordmarkProps {
  className?: string
  goldClassName?: string
  lightClassName?: string
}

export function HdWordmark({
  className = '',
  goldClassName = '',
  lightClassName = '',
}: HdWordmarkProps) {
  return (
    <span className={`inline-flex items-baseline gap-1 ${className}`}>
      <span className={`font-serif text-2xl font-bold ${goldClassName}`}>HD</span>
      <span className={`font-sans text-lg font-light ${lightClassName}`}>Corporate</span>
    </span>
  )
}
