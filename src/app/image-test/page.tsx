'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ImageTestPage() {
  const testImages = [
    {
      name: 'IT/기술 - 소프트웨어 개발',
      url: 'https://picsum.photos/1200/800?random=1'
    },
    {
      name: 'IT/기술 - AI/머신러닝',
      url: 'https://picsum.photos/1200/800?random=2'
    },
    {
      name: 'IT/기술 - 클라우드 인프라',
      url: 'https://picsum.photos/1200/800?random=3'
    },
    {
      name: 'IT/기술 - 모바일 앱 개발',
      url: 'https://picsum.photos/1200/800?random=4'
    },
    {
      name: 'IT/기술 - 웹 개발',
      url: 'https://picsum.photos/1200/800?random=5'
    },
    {
      name: 'IT/기술 - 데이터베이스 관리',
      url: 'https://picsum.photos/1200/800?random=6'
    },
    {
      name: 'IT/기술 - 네트워크 보안',
      url: 'https://picsum.photos/1200/800?random=7'
    },
    {
      name: 'IT/기술 - DevOps 자동화',
      url: 'https://picsum.photos/1200/800?random=8'
    },
    {
      name: 'IT/기술 - IoT 플랫폼',
      url: 'https://picsum.photos/1200/800?random=9'
    },
    {
      name: 'IT/기술 - 블록체인',
      url: 'https://picsum.photos/1200/800?random=10'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">이미지 연결 테스트</h1>
          <p className="text-gray-600">업종별 성공사례 이미지들이 제대로 로드되는지 확인합니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testImages.map((image, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{image.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error(`이미지 로드 실패: ${image.name}`, image.url);
                      e.currentTarget.style.display = 'none';
                      const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                      if (nextElement) {
                        nextElement.style.display = 'flex';
                      }
                    }}
                  />
                  <div 
                    className="hidden w-full h-full items-center justify-center bg-red-100 text-red-600"
                    style={{ display: 'none' }}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">❌</div>
                      <div className="text-sm">이미지 로드 실패</div>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-gray-500 break-all">{image.url}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/benchmark" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            벤치마크 페이지로 이동
          </a>
        </div>
      </div>
    </div>
  );
}
