import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ 
  images: {
    domains: ["store.storeimages.cdn-apple.com"], // Add the allowed hostname
  },
};

export default nextConfig;
