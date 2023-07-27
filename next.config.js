/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    API_URL: process.env.API_URL,
    JIKAN_URL: process.env.JIKAN_URL,
  },
    images: {
        domains: ['cdn.myanimelist.net'],
      },
      async headers() {
        return [
            {
                source: "/",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    }
    
}

module.exports = nextConfig
