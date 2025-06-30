import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        tls: false, // or require.resolve('some-polyfill-for-tls') if available
        net: false,
        fs: false,
      };
    }
    return config;
  },
  compiler: {
    styledComponents: true,
  }
};

export default nextConfig;
