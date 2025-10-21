import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("http://localhost:1337/uploads/**"), new URL("http://192.168.88.35:1337/uploads/**")],
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;


// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     remotePatterns: [new URL("https://www.inseed-comores.org/backend/uploads/**")],
//   },
//   experimental: {
//     scrollRestoration: true,
//   },
// };

// export default nextConfig;
