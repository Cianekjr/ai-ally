const path = require('path')

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.alias['@components'] = path.resolve(__dirname, './components')
    config.resolve.alias['@types'] = path.resolve(__dirname, './types')
    return config
  },
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
}

module.exports = withPWA(nextConfig)
