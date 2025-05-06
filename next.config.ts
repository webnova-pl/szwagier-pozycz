import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // Enables static export (creates `out/` folder)
  trailingSlash: true,
};

export default nextConfig;
