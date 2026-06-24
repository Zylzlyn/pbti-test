import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  distDir: "out",

  basePath: "/pbti-test",
  assetPrefix: "/pbti-test/",

  images: {
    unoptimized: true,
  },

  trailingSlash: true,
};

export default nextConfig;