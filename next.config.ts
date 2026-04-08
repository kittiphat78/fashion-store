import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    /* Allow local images from the public folder */
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
