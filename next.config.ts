import type { NextConfig } from 'next';
import withTM from 'next-transpile-modules';

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withTM(['@ant-design/icons-svg'])(nextConfig);
