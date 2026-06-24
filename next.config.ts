import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/pbti-test",
  assetPrefix: "/pbti-test/",

  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  // ✅ 关键：让前端能拿到 basePath
  env: {
    NEXT_PUBLIC_BASE_PATH: "/pbti-test",
  },
};

export default nextConfig;