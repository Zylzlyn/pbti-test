import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  basePath: isProd ? "/pbti-test" : "",
  assetPrefix: isProd ? "/pbti-test/" : "",

  distDir: "out",

  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;