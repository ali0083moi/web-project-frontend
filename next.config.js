/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["api.dicebear.com", "example.com"],
  },
  output: "standalone",
};

module.exports = nextConfig;
