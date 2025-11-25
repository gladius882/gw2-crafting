import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://render.guildwars2.com/**')],
  },
  productionBrowserSourceMaps: true,
  /* config options here */
};

export default nextConfig;
