import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },

  webpack(config) {
    // Handle SVG files as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
  
    // Handle PNG and other image files
    config.module.rules.push({
    });
  
    return config;
  },
  
};

export default withNextVideo(nextConfig);
