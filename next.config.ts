import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/pbti-test",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;