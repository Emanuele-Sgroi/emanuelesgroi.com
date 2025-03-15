import dotenv from "dotenv";

dotenv.config();

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net", // Contentful
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "robohash.org", // Profile avatars
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com", // Avatar API
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net", // Popular image CDN
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "githubusercontent.com", // GitHub-hosted images
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.unsplash.com", // Unsplash images
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.cloudinary.com", // Cloudinary-hosted images
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com", // Google Drive images
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**", // Fallback for unknown sources
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
