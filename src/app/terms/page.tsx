'use client';

import Header from '@/components/layout/header';
import { Card, CardContent } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              이용약관
            </h1>
            <p className="text-xl text-gray-800 font-medium">
              AI CAMP 서비스 이용에 관한 약관입니다.
            </p>
          </div>

          <Card className="shadow-xl border-2 border-gray-200">
            <CardContent className="p-12">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">제1조 (목적)</h2>
                <p className="text-gray-800 text-base leading-relaxed mb-8 font-medium">
                  이 약관은 AI CAMP(이하 "회사")가 제공하는 모든 서비스의 이용조건 및 절차, 회사와 회원간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">제2조 (정의)</h2>
                <ul className="text-gray-800 text-base leading-relaxed mb-8 space-y-2 font-medium">
                  <li>• "서비스"란 회사가 제공하는 BM ZEN 사업분석, AI 활용 생산성향상, 공장경매, 기술창업, 인증지원, 웹사이트 구축 등의 서비스를 의미합니다.</li>
                  <li>• "회원"이란 회사의 서비스에 접속하여 이 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.</li>
                  <li>• "이용계약"이란 서비스 이용과 관련하여 회사와 회원 간에 체결하는 계약을 말합니다.</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">제3조 (약관의 효력 및 변경)</h2>
                <p className="text-gray-800 text-base leading-relaxed mb-8 font-medium">
                  1. 이 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력을 발생합니다.<br />
                  2. 회사는 합리적인 사유가 발생할 경우에는 이 약관을 변경할 수 있으며, 약관이 변경되는 경우에는 변경된 약관의 적용일자 및 변경사유를 명시하여 현행약관과 함께 그 적용일자 7일 이전부터 공지합니다.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">제4조 (서비스의 제공)</h2>
                <p className="text-gray-800 text-base leading-relaxed mb-4 font-medium">
                  1. 회사는 회원에게 아래와 같은 서비스를 제공합니다:
                </p>
                <ul className="text-gray-800 text-base leading-relaxed mb-8 space-y-2 font-medium pl-4">
                  <li>- BM ZEN 사업분석 서비스</li>
                  <li>- AI 활용 생산성향상 컨설팅</li>
                  <li>- 정책자금 확보 컨설팅</li>
                  <li>- 기술사업화 및 기술창업 지원</li>
                  <li>- 각종 인증 취득 지원</li>
                  <li>- 웹사이트 구축 서비스</li>
                  <li>- 기타 회사가 정하는 서비스</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">제5조 (서비스 이용료)</h2>
                <p className="text-gray-800 text-base leading-relaxed mb-8 font-medium">
                  1. 서비스 이용료는 각 서비스별로 별도로 정해지며, 서비스 신청 시 안내됩니다.<br />
                  2. 정부지원 프로그램을 통해 제공되는 서비스의 경우, 지원 조건에 따라 이용료가 감면될 수 있습니다.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">제6조 (개인정보보호)</h2>
                <p className="text-gray-800 text-base leading-relaxed mb-8 font-medium">
                  회사는 관련법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 사용에 대해서는 관련법령 및 회사의 개인정보처리방침이 적용됩니다.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">제7조 (회사의 의무)</h2>
                <p className="text-gray-800 text-base leading-relaxed mb-8 font-medium">
                  1. 회사는 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며, 이 약관이 정하는 바에 따라 지속적이고, 안정적으로 서비스를 제공하기 위해서 노력합니다.<br />
                  2. 회사는 회원이 안전하게 인터넷 서비스를 이용할 수 있도록 회원의 개인정보보호를 위한 보안 시스템을 구축합니다.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">제8조 (회원의 의무)</h2>
                <p className="text-gray-800 text-base leading-relaxed mb-4 font-medium">
                  1. 회원은 다음 행위를 하여서는 안 됩니다:
                </p>
                <ul className="text-gray-800 text-base leading-relaxed mb-8 space-y-2 font-medium pl-4">
                  <li>- 신청 또는 변경시 허위내용의 등록</li>
                  <li>- 타인의 정보 도용</li>
                  <li>- 회사가 게시한 정보의 변경</li>
                  <li>- 회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                  <li>- 회사 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                  <li>- 회사 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                  <li>- 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 회사에 공개 또는 게시하는 행위</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">제9조 (저작권의 귀속 및 이용제한)</h2>
                <p className="text-gray-800 text-base leading-relaxed mb-8 font-medium">
                  1. 회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.<br />
                  2. 회원은 회사를 이용함으로써 얻은 정보 중 회사에게 지적재산권이 귀속된 정보를 회사의 사전 승낙없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">제10조 (계약해제, 해지 등)</h2>
                <p className="text-gray-800 text-base leading-relaxed mb-8 font-medium">
                  1. 회원은 언제든지 서비스 해지를 요청할 수 있으며, 회사는 즉시 서비스 해지를 처리합니다.<br />
                  2. 회사는 회원이 다음 각호의 사유에 해당하는 경우, 사전통지 없이 이용계약을 해지하거나 또는 기간을 정하여 서비스 이용을 정지할 수 있습니다.
                </p>

                <div className="mt-12 pt-8 border-t-2 border-gray-300">
                  <p className="text-base text-gray-800 font-semibold bg-gray-100 p-4 rounded-lg">
                    최종 수정일: 2024년 1월 1일<br />
                    시행일: 2024년 1월 1일
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 