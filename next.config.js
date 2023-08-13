/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    API_URL: process.env.API_URL,
    JIKAN_URL: process.env.JIKAN_URL,
  },
  fastRefresh: true,
    images: {
        domains: ['cdn.myanimelist.net'],
      },
    
}

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
// })

// module.exports = withBundleAnalyzer(nextConfig);

module.exports = nextConfig;