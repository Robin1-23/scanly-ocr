// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    urlImports: ['https://*'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /pdf\.worker(\.min)?\.js$/,
      loader: 'worker-loader',
      options: {
        filename: 'static/[hash].worker.js',
      },
    });
    return config;
  },
};

module.exports = nextConfig;



// export default nextConfig;
