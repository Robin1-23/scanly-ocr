// // next.config.js

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     urlImports: ['https://*'],
//   },
//   webpack(config) {
//     config.module.rules.push({
//       test: /pdf\.worker(\.min)?\.js$/,
//       loader: 'worker-loader',
//       options: {
//         filename: 'static/[hash].worker.js',
//       },
//     });
//     return config;
//   },
// };

// module.exports = nextConfig;



// export default nextConfig;





import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

const nextConfig: NextConfig = {
  experimental: {
    urlImports: ['https://*'],
  },
  webpack(config: Configuration) {
    config.module?.rules?.push({
      test: /pdf\.worker(\.min)?\.js$/,
      loader: 'worker-loader',
    });

    return config;
  },
};

export default nextConfig;

