/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@hd-corporate/db', '@hd-corporate/cache', '@hd-corporate/contracts'],
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
