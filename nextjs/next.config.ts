import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("http://localhost:1337/uploads/**")],
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
