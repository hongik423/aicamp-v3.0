/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Strict Mode 비활성화로 hydration 오류 감소
  reactStrictMode: false,
  
  // Vercel 배포 최적화
  output: 'standalone',
  
  // ESLint 플러그인 완전 비활성화
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // 이미지 최적화 설정
  images: {
    domains: ['picsum.photos', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // 컴파일러 최적화
  compiler: {
    // 불필요한 console.log 제거 (개발 환경에서는 유지)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // 실험적 기능
  experimental: {
    // 서버 컴포넌트 최적화
    serverComponentsExternalPackages: ['@prisma/client'],
    // preload 경고 해결
    optimizePackageImports: ['lucide-react'],
    // preload 최적화
    optimizeCss: true,
    // 번들 분석 비활성화 (Next.js 14에서 제거된 옵션)
    // bundlePagesRouterDependencies: false,
  },
  
  // 웹팩 설정 최적화
  webpack: (config, { dev, isServer }) => {
    // 개발 환경에서 소스맵 최적화
    if (dev) {
      config.devtool = 'eval-source-map';
    }
    
    // preload 경고 해결을 위한 최적화
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
            },
          },
        },
      };
    }
    
    // ES 모듈 호환성 문제 해결
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
      },
    };
    
    
    return config;
  },
  
  // 헤더 설정
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/css/(.*)',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/css',
          },
        ],
      },
    ];
  },
  
  // 리다이렉트 설정
  async redirects() {
    return [
      {
        source: '/old-diagnosis',
        destination: '/ai-diagnosis',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig; 