import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "assets.aceternity.com" },
      { hostname: "images.unsplash.com" },
    ],
  },
  eslint: {
    // Permettre le build même avec des erreurs ESLint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
