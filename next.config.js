/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    API_URL: process.env.API_URL,
    JIKAN_URL: process.env.JIKAN_URL,
  },
    images: {
        domains: ['cdn.myanimelist.net', 'animezeta.onrender.com'],
      },
  typescript: {
        ignoreBuildErrors: true,
     },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig);

// module.exports = nextConfig;