import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/pbti-test",
  assetPrefix: "/pbti-test/",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;