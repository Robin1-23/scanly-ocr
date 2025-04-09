import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  experimental: {
    urlImports: ['https://*'],
  },
  webpack(config: Configuration) {
    config.module?.rules?.push({
      test: /pdf\.worker(\.min)?\.js$/,
      loader: 'worker-loader',
      options: {
        filename: 'static/[hash].worker.js',
      },
    });

    return config;
  },
};

export default nextConfig;


