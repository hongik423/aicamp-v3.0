'use client';

import { Header } from '@/components/layout';
import Image from 'next/image';
import { Download, FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DiagnosisFormPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* 헤더 섹션 */}
          <div className="text-center mb-8">
            <Link 
              href="/diagnosis"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              AI 무료진단으로 돌아가기
            </Link>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              AI 무료 경영진단 신청서
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              AICAMP의 AI 무료 경영진단을 신청하시려면 아래 신청서를 작성해 주세요.
            </p>
          </div>

          {/* 이미지 표시 섹션 */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <FileText className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">
                  AI 무료 경영진단 신청서
                </h2>
              </div>
              
              <a
                href="/images/AI무료경영진단신청서.png"
                download="AI무료경영진단신청서.png"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                이미지 다운로드
              </a>
            </div>

            {/* 신청서 이미지 */}
            <div className="w-full overflow-auto border border-gray-200 rounded-lg">
              <Image
                src="/images/AI무료경영진단신청서.png"
                alt="AI 무료 경영진단 신청서"
                width={800}
                height={1200}
                className="w-full h-auto object-contain"
                priority
              />
            </div>

            {/* 안내 메시지 */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">📋 신청 방법</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 위 신청서를 다운로드하여 작성해 주세요</li>
                <li>• 작성 완료 후 이메일(hongik423@gmail.com)로 보내주세요</li>
                <li>• 또는 온라인으로 직접 신청하시려면 아래 버튼을 클릭하세요</li>
              </ul>
            </div>

            {/* 온라인 신청 버튼 */}
            <div className="mt-6 text-center">
              <Link
                href="/diagnosis"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg"
              >
                <FileText className="w-5 h-5 mr-2" />
                온라인으로 바로 신청하기
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}