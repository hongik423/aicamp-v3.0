/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: ['picsum.photos', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
    optimizePackageImports: ['lucide-react'],
    optimizeCss: true,
    esmExternals: 'loose',
  },
  webpack: (config, { dev }) => {
    if (dev) config.devtool = 'eval-source-map';
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve?.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
        worker_threads: false,
        child_process: false,
      },
    };
    return config;
  },
  async headers() {
    return [
      { source: '/(.*)', headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
      ]},
      { source: '/_next/static/(.*)', headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ]},
      { source: '/_next/static/css/(.*)', headers: [
        { key: 'Content-Type', value: 'text/css' },
      ]},
    ];
  },
  async redirects() {
    return [
      { source: '/old-diagnosis', destination: '/ai-diagnosis', permanent: true },
    ];
  },
};

export default nextConfig;


