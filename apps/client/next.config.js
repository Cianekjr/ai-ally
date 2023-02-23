const path = require('path')

const withPWA = require('next-pwa')({
  dest: 'public'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.alias["@components"] = path.resolve(__dirname, "./components")
    config.resolve.alias["@types"] = path.resolve(__dirname, "./types")
    return config
  },
}

module.exports = withPWA(nextConfig)
