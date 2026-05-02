/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@hd-corporate/db', '@fondatis/design-system'],
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
