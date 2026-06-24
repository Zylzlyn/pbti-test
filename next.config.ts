import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  // 关键：GitHub Pages 子路径
  basePath: "/pbti-test",
  assetPrefix: "/pbti-test/",

  // 静态导出必须
  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  // ❗删除 eslint 配置（你之前已经报错过）
};

export default nextConfig;