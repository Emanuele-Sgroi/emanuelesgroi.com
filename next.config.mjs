// import dotenv from "dotenv";
// import transpileModules from "next-transpile-modules";

// dotenv.config();

// const withTM = transpileModules([
//   "react-syntax-highlighter",
//   "@theme-toggles/react",
// ]);

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "images.ctfassets.net",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "robohash.org",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "api.dicebear.com",
//         pathname: "/**",
//       },
//     ],
//     dangerouslyAllowSVG: true,
//   },
// };

// export default withTM(nextConfig);

import dotenv from "dotenv";

dotenv.config();

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "robohash.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        port: "",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
