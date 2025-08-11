'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Scale, 
  FileText, 
  Shield, 
  AlertCircle,
  CheckCircle,
  Building2,
  Phone,
  Mail
} from 'lucide-react';

export default function LegalFooter() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 법적 고지 */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Scale className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-white">법적 고지사항</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p>본 성공사례는 실제 교육 참여 기업의 성과를 바탕으로 한 벤치마크입니다.</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <p>표시된 성과는 AI CAMP 교육과정 완주 시 기대할 수 있는 결과입니다.</p>
                </div>
                <div className="flex items-start space-x-2">
                  <FileText className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p>개별 기업의 결과는 업종, 규모, 참여도 등에 따라 달라질 수 있습니다.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 인증 및 규정 준수 */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-5 h-5 text-green-400" />
                <h3 className="font-semibold text-white">인증 및 규정 준수</h3>
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-600 text-white">
                    고용노동부 인증
                  </Badge>
                  <Badge className="bg-green-600 text-white">
                    HRD-Net 등록
                  </Badge>
                  <Badge className="bg-purple-600 text-white">
                    ISO 9001 인증
                  </Badge>
                </div>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>• 표시광고법 준수 (공정거래위원회)</p>
                  <p>• 개인정보보호법 준수</p>
                  <p>• 직업능력개발 훈련기관 인증</p>
                  <p>• 기업교육 전문기관 등록</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 연락처 및 상담 */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="w-5 h-5 text-orange-400" />
                <h3 className="font-semibold text-white">상담 및 문의</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>1588-1234 (평일 09:00-18:00)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-green-400" />
                  <span>info@aicamp.co.kr</span>
                </div>
                <div className="bg-gray-700 rounded-lg p-3 mt-4">
                  <p className="font-semibold text-white mb-1">무료 성과 진단 상담</p>
                  <p className="text-xs text-gray-400">
                    귀하의 기업에 맞는 구체적인 성과 예측과 
                    맞춤형 교육 계획을 무료로 제공합니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 하단 저작권 */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              <p>© 2024 AI CAMP. All rights reserved.</p>
              <p>사업자등록번호: 123-45-67890 | 대표: 홍길동 | 서울시 강남구 테헤란로 123</p>
            </div>
            <div className="flex space-x-4 text-xs text-gray-500">
              <button className="hover:text-white transition-colors">이용약관</button>
              <button className="hover:text-white transition-colors">개인정보처리방침</button>
              <button className="hover:text-white transition-colors">환불정책</button>
              <button className="hover:text-white transition-colors">사업자정보확인</button>
            </div>
          </div>
        </div>

        {/* 추가 면책조항 */}
        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <div className="text-xs text-gray-400 leading-relaxed">
            <p className="font-semibold text-gray-300 mb-2">면책조항:</p>
            <p>
              본 웹사이트에 게시된 성공사례 및 성과 지표는 정보 제공 목적으로만 사용되며, 
              특정 결과를 보장하는 것이 아닙니다. 실제 교육 효과는 기업의 상황, 참여도, 
              시장 환경 등 다양한 요인에 따라 달라질 수 있습니다. AI CAMP는 교육 서비스 
              제공에 최선을 다하며, 고객의 성공을 위해 지속적으로 지원합니다. 
              구체적인 성과 예측을 위해서는 개별 상담을 통해 정확한 정보를 제공받으시기 바랍니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
