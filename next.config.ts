import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2048, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
  },
};

export default nextConfig;
