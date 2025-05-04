import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://rgb-splitting-dev-bucket-sh.s3.us-east-1.amazonaws.com/**",
      ),
    ],
    formats: ["image/webp"],
    minimumCacheTTL: 0, //TODO: ENABLE CACHE
    qualities: [25, 60],
  },
};

export default nextConfig;
