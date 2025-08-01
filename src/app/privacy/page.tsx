'use client';

import Header from '@/components/layout/header';

import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              개인정보처리방침
            </h1>
            <p className="text-xl text-gray-800 font-medium">
              AI CAMP의 개인정보보호에 관한 정책입니다.
            </p>
          </div>

          <Card className="shadow-xl border-2 border-gray-200">
            <CardContent className="p-12">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">제1조 (개인정보의 처리목적)</h2>
                <p className="text-gray-800 text-base leading-relaxed mb-6 font-medium">
                  AI CAMP(이하 "회사")는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                </p>
                <ul className="text-gray-800 text-base leading-relaxed mb-8 space-y-2 font-medium">
                  <li>• 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산</li>
                  <li>• 회원 관리 및 본인확인</li>
                  <li>• 마케팅 및 광고에의 활용</li>
                  <li>• 서비스 개선 및 신규 서비스 개발</li>
                  <li>• 법령 및 회사 정책에 따른 의무이행</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">제2조 (개인정보의 처리 및 보유기간)</h2>
                <p className="text-gray-800 text-base leading-relaxed mb-4 font-medium">
                  1. 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                </p>
                <p className="text-gray-800 text-base leading-relaxed mb-4 font-medium">
                  2. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다:
                </p>
                <ul className="text-gray-800 text-base leading-relaxed mb-8 space-y-2 font-medium">
                  <li>• 회원가입 및 관리: 회원탈퇴시까지 (단, 관계법령 위반에 따른 수사·조사 등이 진행중인 경우에는 해당 수사·조사 종료시까지)</li>
                  <li>• 서비스 제공: 서비스 제공계약 이행완료시까지</li>
                  <li>• 요금결제 및 정산: 「전자상거래 등에서의 소비자보호에 관한 법률」에 따라 5년</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">제3조 (개인정보의 제3자 제공)</h2>
                <p className="text-gray-800 text-base leading-relaxed mb-8 font-medium">
                  1. 회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">제4조 (개인정보처리의 위탁)</h2>
                <p className="text-gray-800 text-base leading-relaxed mb-4 font-medium">
                  1. 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:
                </p>
                <ul className="text-gray-800 text-base leading-relaxed mb-8 space-y-2 font-medium">
                  <li>• 이메일 발송 업무: 이메일 발송 서비스 제공업체</li>
                  <li>• 결제 처리 업무: 전자결제 서비스 제공업체</li>
                  <li>• 고객지원 업무: 고객센터 운영 서비스 제공업체</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">제5조 (정보주체와 법정대리인의 권리·의무 및 행사방법)</h2>
                <p className="text-gray-800 text-base leading-relaxed mb-4 font-medium">
                  1. 정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:
                </p>
                <ul className="text-gray-800 text-base leading-relaxed mb-8 space-y-2 font-medium">
                  <li>• 개인정보 처리현황 통지요구</li>
                  <li>• 개인정보 열람요구</li>
                  <li>• 개인정보 정정·삭제요구</li>
                  <li>• 개인정보 처리정지요구</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">제6조 (처리하는 개인정보 항목)</h2>
                <p className="text-gray-800 text-base leading-relaxed mb-4 font-medium">
                  회사는 다음의 개인정보 항목을 처리하고 있습니다:
                </p>
                <ul className="text-gray-800 text-base leading-relaxed mb-8 space-y-2 font-medium">
                  <li>• 필수항목: 이름, 연락처(전화번호, 이메일), 회사명, 업종</li>
                  <li>• 선택항목: 주소, 팩스번호, 홈페이지</li>
                  <li>• 자동수집항목: IP주소, 쿠키, MAC주소, 서비스 이용기록, 방문기록</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">제7조 (개인정보의 파기)</h2>
                <p className="text-gray-800 text-base leading-relaxed mb-8 font-medium">
                  1. 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.<br />
                  2. 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">제8조 (개인정보의 안전성 확보조치)</h2>
                <p className="text-gray-800 text-base leading-relaxed mb-4 font-medium">
                  회사는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다:
                </p>
                <ul className="text-gray-800 text-base leading-relaxed mb-8 space-y-2 font-medium">
                  <li>• 개인정보 취급 직원의 최소화 및 교육</li>
                  <li>• 개인정보에 대한 접근 제한</li>
                  <li>• 개인정보를 안전하게 저장/전송할 수 있는 암호화 기술의 사용</li>
                  <li>• 해킹 등에 대비한 기술적 대책</li>
                  <li>• 개인정보처리시스템 등의 접근기록 보관 및 위변조 방지</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">제9조 (개인정보 보호책임자)</h2>
                <p className="text-gray-800 text-base leading-relaxed mb-4 font-medium">
                  회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다:
                </p>
                <ul className="text-gray-800 text-base leading-relaxed mb-8 space-y-2 font-medium">
                  <li>• 개인정보 보호책임자: 이후경</li>
                  <li>• 연락처: 1588-0000, privacy@ai-camp.co.kr</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">제10조 (권익침해 구제방법)</h2>
                <p className="text-gray-800 text-base leading-relaxed mb-4 font-medium">
                  정보주체는 아래의 기관에 대해 개인정보 침해신고를 할 수 있습니다:
                </p>
                <ul className="text-gray-800 text-base leading-relaxed mb-8 space-y-2 font-medium">
                  <li>• 개인정보보호위원회: (국번없이)1833-6972, privacy.go.kr</li>
                  <li>• 개인정보 침해신고센터: (국번없이)182, privacy.kisa.or.kr</li>
                  <li>• 대검찰청: (국번없이)1301, www.spo.go.kr</li>
                  <li>• 경찰청: (국번없이)182, ecrm.cyber.go.kr</li>
                </ul>

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