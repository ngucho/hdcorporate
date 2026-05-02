/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@hd-corporate/db', '@hd-corporate/contracts', '@fondatis/design-system'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
