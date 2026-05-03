/**
 * Resize brand assets from public/icons into favicon / OG / splash paths
 * for marketing and backoffice (apps/backoffice).
 * Run: pnpm --filter @hd-corporate/marketing generate:brand
 */
import { mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const backofficeRoot = join(root, '..', 'backoffice')
const iconsDir = join(root, 'public', 'icons')
const iconOutDir = join(root, 'public', 'icon')
const appDir = join(root, 'app')
const boAppDir = join(backofficeRoot, 'app')
const boIconOutDir = join(backofficeRoot, 'public', 'icon')
const CREAM = '#FAF7F0'

const logoMark = join(iconsDir, 'hdcorporate-logo.png')
const logoPrimary = join(iconsDir, 'hdcorporate-logoprimary.png')

/**
 * @param {string} inputPath
 * @param {number} canvasSize
 * @param {number} innerRatio — max logo side relative to canvas (0–1)
 */
async function logoOnSquareCanvas(inputPath, canvasSize, innerRatio = 0.68) {
  const inner = Math.round(canvasSize * innerRatio)
  const resized = await sharp(inputPath)
    .resize(inner, inner, { fit: 'inside', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .toBuffer()

  return sharp({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4,
      background: CREAM,
    },
  })
    .composite([{ input: resized, gravity: 'center' }])
    .png()
}

async function ogImage() {
  const ogW = 1200
  const ogH = 630
  const padX = 100
  const padY = 80
  const maxW = ogW - padX * 2
  const maxH = ogH - padY * 2
  const resized = await sharp(logoPrimary)
    .resize(maxW, maxH, { fit: 'inside', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .toBuffer()

  return sharp({
    create: {
      width: ogW,
      height: ogH,
      channels: 4,
      background: CREAM,
    },
  })
    .composite([{ input: resized, gravity: 'center' }])
    .png()
}

async function main() {
  await mkdir(iconOutDir, { recursive: true })
  await mkdir(boIconOutDir, { recursive: true })

  await (await logoOnSquareCanvas(logoMark, 512)).toFile(join(appDir, 'icon.png'))
  await (await logoOnSquareCanvas(logoMark, 180)).toFile(join(appDir, 'apple-icon.png'))

  await (await ogImage()).toFile(join(root, 'public', 'og-image.png'))

  await (await logoOnSquareCanvas(logoMark, 280, 0.72)).toFile(join(iconOutDir, 'splash-mark.png'))
  await (await logoOnSquareCanvas(logoMark, 32)).toFile(join(iconOutDir, 'favicon-32.png'))
  await (await logoOnSquareCanvas(logoMark, 16, 0.85)).toFile(join(iconOutDir, 'favicon-16.png'))

  await (await logoOnSquareCanvas(logoMark, 512)).toFile(join(boAppDir, 'icon.png'))
  await (await logoOnSquareCanvas(logoMark, 180)).toFile(join(boAppDir, 'apple-icon.png'))
  await (await ogImage()).toFile(join(backofficeRoot, 'public', 'og-image.png'))
  await (await logoOnSquareCanvas(logoMark, 280, 0.72)).toFile(join(boIconOutDir, 'splash-mark.png'))
  await (await logoOnSquareCanvas(logoMark, 32)).toFile(join(boIconOutDir, 'favicon-32.png'))
  await (await logoOnSquareCanvas(logoMark, 16, 0.85)).toFile(join(boIconOutDir, 'favicon-16.png'))

  console.log(
    'Brand assets: marketing + backoffice — app/icon.png, app/apple-icon.png, public/og-image.png, public/icon/*'
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
