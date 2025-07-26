'use client';

import React from 'react';
import BookPromotionBanner from '@/components/layout/BookPromotionBanner';

export default function TestBookBannerPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          📚 Book Promotion Banner 테스트
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          3초 후 BookPromotionBanner가 자동으로 나타납니다.
        </p>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">테스트 체크리스트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="space-y-2">
              <h3 className="font-semibold text-blue-600">기본 기능</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>✅ 3초 후 자동 등장</li>
                <li>✅ ESC 키로 닫기</li>
                <li>✅ 배경 클릭으로 닫기</li>
                <li>✅ z-index 10000 최상위</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-green-600">애니메이션</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>✅ 3D 플로팅 애니메이션</li>
                <li>✅ 호버 시 3D 회전</li>
                <li>✅ 글로우 효과</li>
                <li>✅ 파티클 애니메이션</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-purple-600">UI/UX</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>✅ 반응형 디자인</li>
                <li>✅ 이미지 오류 처리</li>
                <li>✅ 접근성 지원</li>
                <li>✅ 버튼 상호작용</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-red-600">콘텐츠</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>✅ 혜택 텍스트 업데이트</li>
                <li>✅ 책 구매하기 링크</li>
                <li>✅ AI CAMP 링크</li>
                <li>✅ 모든 텍스트 표시</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 font-medium">
            💡 팁: 페이지를 새로고침하면 3초 타이머가 다시 시작됩니다.
          </p>
        </div>
      </div>

      {/* BookPromotionBanner 컴포넌트 */}
      <BookPromotionBanner />
    </div>
  );
} 