import type { NextConfig } from 'next';
import withTM from 'next-transpile-modules';

// Use `withTM` to specify the modules to transpile
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

// Export the configuration wrapped by `withTM`
export default withTM(['@ant-design/icons-svg'])(nextConfig);
