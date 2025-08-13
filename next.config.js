const nextConfig = {
  // 개발 모드 최적화
  experimental: {
    turbo: undefined, // Turbopack 비활성화로 안정성 확보
  },
  
  // 개발 서버 설정
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },
  
  // ESLint 빌드 시 무시 (배포용)
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // TypeScript 빌드 시 에러 무시 (배포용)
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // 기본 설정
  trailingSlash: false,
  
  // 이미지 최적화
  images: {
    domains: ['picsum.photos'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // 웹팩 설정 최적화 - 기본 설정 사용
  webpack: (config, { dev, isServer }) => {
    // 개발 모드에서만 기본적인 최적화
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
      
      // ChunkLoadError 방지를 위한 설정 추가
      config.optimization = {
        ...config.optimization,
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      };
      
      // 청크 로딩 타임아웃 증가
      config.output = {
        ...config.output,
        chunkLoadTimeout: 120000, // 120초로 증가
      };
    }
    
    // 모든 환경에서 적용
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@': require('path').resolve(__dirname, 'src'),
      },
      fallback: {
        ...config.resolve?.fallback,
        fs: false,
        net: false,
        tls: false,
      },
    };
    
    return config;
  },
  
  // 성능 설정
  poweredByHeader: false,
  compress: true,
  
  // 에러 방지 설정
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  
  // 개발 서버 안정성 향상
  reactStrictMode: false, // 개발 중 이중 렌더링 방지
  
  // 누락된 아이콘 경로를 기존 이미지로 리라이팅하여 404 방지
  async rewrites() {
    return [
      // manifest.json → manifest.webmanifest 정규화
      { source: '/manifest.json', destination: '/manifest.webmanifest' },

      // 루트 경로 요청 대응
      { source: '/favicon.ico', destination: '/images/aicamp_logo_del_250726.png' },
      { source: '/apple-touch-icon.png', destination: '/images/aicamp_logo.png' },
      { source: '/icon.svg', destination: '/images/aicamp_logo_del_250726.png' },

      // 경로별 상대 요청까지 커버 (예: /seminar/favicon.ico)
      { source: '/:path*/favicon.ico', destination: '/images/aicamp_logo_del_250726.png' },
      { source: '/:path*/apple-touch-icon.png', destination: '/images/aicamp_logo.png' },
      { source: '/:path*/icon.svg', destination: '/images/aicamp_logo_del_250726.png' },

    ];
  },
};

module.exports = nextConfig; 