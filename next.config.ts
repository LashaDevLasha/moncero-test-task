// next.config.js
import type { NextConfig } from 'next';
import withTM from 'next-transpile-modules';

// Ensure 'next-transpile-modules' is installed via npm or yarn
const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    // Handle the transpilation of specific modules
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
};

export default withTM(['@ant-design/icons-svg'])(nextConfig);
