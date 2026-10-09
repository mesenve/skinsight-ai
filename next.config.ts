import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [{
      source: "/media/:path*",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    }, ...["hero", "footer", "faq", "how-it-works"].map((folder) => ({
      source: `/${folder}/:path*`,
      headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
    }))];
  },
  images: {
    qualities: [75, 95, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2048, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
  },
};

export default nextConfig;
