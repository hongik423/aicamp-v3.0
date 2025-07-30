'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Users, Target, Clock, Award, BookOpen, ChevronRight, Cpu, Network, Zap, Building2 } from 'lucide-react';

const trackData = [
  {
    id: 'planning',
    title: '기획/전략 트랙',
    target: '기획팀, 전략기획팀, 사업기획팀',
    duration: '12시간',
    highlights: ['시장동향 분석 자동화', '보고서 생성 자동화', 'KPI 요약 자동화', '회의록 요약 공유'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'sales',
    title: '영업 트랙',
    target: 'B2B/B2C 영업팀, 기술영업팀',
    duration: '12시간',
    highlights: ['영업활동 리포트 자동화', '고객사별 맞춤 제안서 작성', '방문일정 리마인드 자동화'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'marketing',
    title: '마케팅 트랙',
    target: '디지털/퍼포먼스 마케팅, 콘텐츠 마케팅팀',
    duration: '12시간',
    highlights: ['광고성과 분석 자동화', '캠페인 리포트 요약', 'SNS 댓글 분석 및 대응 자동화'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'production',
    title: '생산/물류 트랙',
    target: '생산계획팀, SCM팀, 물류관리팀',
    duration: '12시간',
    highlights: ['생산일정 리마인드', '재고 모니터링 자동화', '배송지연 자동 알림'],
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'cs',
    title: '고객지원 트랙',
    target: '고객센터, CS기획팀, VOC팀',
    duration: '12시간',
    highlights: ['고객문의 자동 분류/요약', 'FAQ 자동응답', '응대품질 분석 자동화'],
    color: 'from-teal-500 to-blue-500'
  },
  {
    id: 'hr',
    title: '인사/총무 트랙',
    target: 'HR팀, 총무팀, 조직문화 담당자',
    duration: '12시간',
    highlights: ['직원만족도 조사 요약', '채용공고 자동 생성', '입사자 온보딩 안내 자동화'],
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'finance',
    title: '재무/회계 트랙',
    target: '회계팀, 경리팀, 자금팀',
    duration: '12시간',
    highlights: ['비용정산 자동화', '세금계산서 요약', '월별 지출분석 자동 보고서화'],
    color: 'from-gray-600 to-gray-800'
  }
];

const curriculumDetail = {
  planning: {
    basic: [
      { time: '1교시', topic: '생성형AI 개요', content: 'GPT 개념과 기획업무 적용사례' },
      { time: '2교시', topic: '기획형 프롬프트 작성법', content: '요약, 비교, 전략보고용 프롬프트 실습' },
      { time: '3교시', topic: '문서요약 자동화', content: '기획안 요약 자동화 실습' },
      { time: '4교시', topic: 'n8n 기본 이해', content: 'n8n 노드구조, 클라우드 사용 실습' },
      { time: '5교시', topic: 'n8n 실습① 뉴스요약 자동화', content: 'RSS → GPT → 카톡/슬랙 발송' },
      { time: '6교시', topic: 'n8n 실습② 회의록 자동화', content: 'Docs → GPT 요약 → 메일 공유' },
      { time: '7교시', topic: 'KPI 리포트 자동화', content: '시트 → 요약 → 텍스트 보고서 생성' },
      { time: '8교시', topic: '전략자료 요약보고서 생성', content: 'GPT를 활용한 보고서 초안 자동 작성' },
      { time: '9교시', topic: '자동화 템플릿 만들기', content: '자주 쓰는 워크플로 정형화' },
      { time: '10교시', topic: '실무 프로세스 연결 실습', content: '업무 흐름 분석 → 자동화 포인트 설계' },
      { time: '11교시', topic: '종합 실습', content: '개인 업무 기반 자동화 구성 실습' },
      { time: '12교시', topic: '리뷰 및 피드백', content: '구성한 워크플로 공유 및 개선 피드백' }
    ],
    advanced: [
      { time: '1교시', topic: 'n8n 고급 노드 이해', content: '조건분기, Loop, 병합, 오류처리 등' },
      { time: '2교시', topic: 'ChatGPT API 고급 활용', content: 'API 설정, 변수 입력, 형식 지정 실습' },
      { time: '3교시', topic: '외부 데이터 수집 자동화', content: '블로그/뉴스/보고서 API 수집 자동화' },
      { time: '4교시', topic: '전략분석 리포트 자동화', content: '텍스트 → GPT 요약 → PPT 자동 초안' },
      { time: '5교시', topic: '회의 및 의사결정 요약시스템', content: '회의자료 자동 정리 및 공유 워크플로' },
      { time: '6교시', topic: 'KPI 이상감지 자동알림', content: '시트 조건 감지 → 슬랙 알림 워크플로' },
      { time: '7교시', topic: 'Notion + GPT 전략문서 자동화', content: '정책 초안 자동생성 + 저장 시스템' },
      { time: '8교시', topic: '전략 워크플로 템플릿 구성법', content: '확장 가능한 자동화 구조 만들기' },
      { time: '9-10교시', topic: '종합 실전 설계 실습', content: '개인 or 팀 기반 전략 흐름 자동화' },
      { time: '11-12교시', topic: '프로젝트 발표 및 코칭', content: '시스템 발표 + 개선 피드백 세션' }
    ]
  },
  sales: {
    basic: [
      { time: '1교시', topic: '생성형AI 이해', content: 'GPT를 영업업무에 적용하는 방법' },
      { time: '2교시', topic: '영업 프롬프트 작성 실습', content: '고객 유형별 제안 메시지 자동생성 실습' },
      { time: '3교시', topic: '응대 메시지 자동화', content: '템플릿 기반 ChatGPT 응답 자동생성' },
      { time: '4교시', topic: 'n8n 구조와 기본노드 실습', content: 'Trigger-Action 구조 이해와 샘플 워크플로' },
      { time: '5교시', topic: '방문일정 자동 리마인드 실습', content: 'Google Sheet → 조건 확인 → 카톡 전송' },
      { time: '6교시', topic: '영업활동 리포트 요약 자동화', content: '주간 리포트 → GPT 요약 → 메일 발송' },
      { time: '7교시', topic: '미팅 후 이메일 자동작성', content: '회의 메모 → 응대 이메일 초안 자동생성' },
      { time: '8교시', topic: '고객사 정보수집 자동화', content: '키워드 기반 뉴스수집 → 요약 공유' },
      { time: '9교시', topic: '반복 제안서 문구 자동화', content: '제품/서비스별 제안서 문구 생성 실습' },
      { time: '10교시', topic: '자동화 흐름 구성하기', content: '실제 본인 업무 기반 흐름 그리기' },
      { time: '11교시', topic: '실전 실습', content: '영업 시나리오 기반 자동화 구성' },
      { time: '12교시', topic: '발표 및 피드백', content: '실습 결과 공유 및 워크플로 개선방향 피드백' }
    ],
    advanced: [
      { time: '1교시', topic: 'n8n 고급 노드 심화', content: '분기조건, 반복, 다중 데이터 처리' },
      { time: '2교시', topic: '고객사 정보 자동수집', content: 'Open API/RSS → 요약 → 전송' },
      { time: '3교시', topic: '제안서 자동 초안 생성', content: '고객군별 입력값 → GPT → PDF 출력' },
      { time: '4교시', topic: '영업 KPI 리포트 자동화', content: '실적 Sheet → 요약 → 공유 보고서 생성' },
      { time: '5교시', topic: 'CRM 연동 기본(예시 기반)', content: 'CRM 데이터 → 리포트/슬랙 알림 연결' },
      { time: '6교시', topic: '고객문의 자동대응 템플릿', content: '질문 유형별 GPT 응답 자동화 구성' },
      { time: '7교시', topic: '슬랙/카카오톡 맞춤알림 자동화', content: '고객 반응 기반 맞춤 메시지 전송' },
      { time: '8교시', topic: '조건 기반 워크플로 설계', content: '미결처리/지연응답 탐지 및 자동 후속' },
      { time: '9-10교시', topic: '실무 자동화 설계 실습', content: '참여자별 고객 프로세스 흐름도 구성' },
      { time: '11-12교시', topic: '프로젝트 발표 + 피드백', content: '맞춤 자동화 설계안 공유 및 코칭 세션' }
    ]
  },
  marketing: {
    basic: [
      { time: '1교시', topic: '생성형AI 개요', content: '마케팅 업무에서 GPT의 활용방식 이해' },
      { time: '2교시', topic: '광고문구 자동생성', content: '타겟/목표에 따른 광고 카피 자동작성' },
      { time: '3교시', topic: '콘텐츠 요약 및 변환', content: '긴 콘텐츠 → 짧은 피드 요약, 해시태그 생성' },
      { time: '4교시', topic: 'n8n 기본구조 및 실습', content: 'n8n의 구조, 실행 흐름 실습' },
      { time: '5교시', topic: '광고성과 리포트 자동화①', content: 'Meta/Google Ads CSV → 요약 보고서 생성' },
      { time: '6교시', topic: '광고성과 리포트 자동화②', content: '주요 지표 변화 감지 → 알림 발송 자동화' },
      { time: '7교시', topic: 'SNS 댓글 수집 및 요약', content: '인스타/블로그 댓글 수집 → 요약 분석' },
      { time: '8교시', topic: '캠페인 리마인드 자동화', content: '이벤트 일정에 맞춰 사전/후속 메시지 자동발송' },
      { time: '9교시', topic: '콘텐츠 리뷰 수집 자동화', content: '고객 리뷰/댓글 → GPT로 감성 분류' },
      { time: '10교시', topic: '실무 프로세스 설계', content: '내 업무 흐름에 맞춘 자동화 아이디어 정리' },
      { time: '11교시', topic: '실전 워크플로 설계', content: '콘텐츠/광고 자동화 흐름 만들기' },
      { time: '12교시', topic: '발표 및 피드백', content: '구성안 발표 + 피드백 및 개선점 논의' }
    ],
    advanced: [
      { time: '1교시', topic: 'n8n 고급 노드 및 연동구조', content: '반복처리, 조건분기, 웹훅 연결 실습' },
      { time: '2교시', topic: 'Google Ads API 연동', content: '캠페인 데이터 자동 불러오기' },
      { time: '3교시', topic: 'Facebook/Meta Ads 성과분석', content: '핵심 지표 → 요약 → 팀 공유 메시지 구성' },
      { time: '4교시', topic: 'GPT를 활용한 카피 A/B 테스트 자동화', content: '변형 카피 자동생성 → 성과 수집' },
      { time: '5교시', topic: '댓글 및 피드백 감성분석', content: 'SNS/설문 텍스트 수집 → 감성 분류 자동화' },
      { time: '6교시', topic: '주요지표 기반 캠페인 알림', content: '전환율/클릭율 급변시 알림 전송' },
      { time: '7교시', topic: '콘텐츠 트렌드 리서치 자동화', content: 'GPT를 이용한 키워드 및 해시태그 제안' },
      { time: '8교시', topic: '마케팅 대시보드 자동연동', content: '시각화툴(GDS 등)과 연결해 성과 요약' },
      { time: '9-10교시', topic: '실전 설계 실습', content: '성과 추적 + 대응 메시지 자동화 구성' },
      { time: '11-12교시', topic: '프로젝트 발표 및 리뷰', content: '업무 연결 자동화 발표 + 코칭 피드백' }
    ]
  },
  production: {
    basic: [
      { time: '1교시', topic: '생성형AI 개요', content: '현장 중심 업무에 적용되는 AI 흐름 이해' },
      { time: '2교시', topic: '업무 요약용 프롬프트 실습', content: '품질이슈 요약, 공정내용 정리 템플릿' },
      { time: '3교시', topic: '작업일지 자동정리', content: '작업로그 → GPT 요약 → 이메일 전송' },
      { time: '4교시', topic: 'n8n 기본구조 이해', content: '트리거/액션 개념, 실습 예시 따라하기' },
      { time: '5교시', topic: '재고수량 체크 자동화①', content: '구글시트 재고변화 → 슬랙 알림 실습' },
      { time: '6교시', topic: '재고수량 체크 자동화②', content: '조건 설정 + 부족수량 자동정리' },
      { time: '7교시', topic: '생산일정 리마인드 자동화', content: '캘린더 + 슬랙/카톡 리마인드 연동' },
      { time: '8교시', topic: '출고/입고 보고서 요약', content: '일일 입출고내역 → 요약보고 자동생성' },
      { time: '9교시', topic: '단순 클레임 요약 자동화', content: '고객 피드백 → 분류 및 보고서 생성' },
      { time: '10교시', topic: '실무 자동화 흐름 설계', content: '현장 업무 흐름도 정리 및 설계' },
      { time: '11교시', topic: '나만의 자동화 만들기', content: '각자의 사례 기반 미니 자동화 만들기' },
      { time: '12교시', topic: '결과 발표 및 리뷰', content: '실습 발표 + 개선 아이디어 피드백' }
    ],
    advanced: [
      { time: '1교시', topic: 'n8n 고급 노드 실습', content: '조건분기, 반복루프, 에러처리 등' },
      { time: '2교시', topic: '재고 이상감지 자동화', content: '특정 조건 발생시 관리자에게 알림' },
      { time: '3교시', topic: '품질점검 보고서 자동생성', content: '양품/불량 분류 → 요약 → PDF 전송' },
      { time: '4교시', topic: '센서/IoT 데이터 연동 설계', content: 'Webhook/Google Sheet → n8n 자동화' },
      { time: '5교시', topic: '출고/배송지연 모니터링', content: '시간 초과 → 고객/관리자 알림 자동전송' },
      { time: '6교시', topic: '공급망 관리 알림 흐름', content: '공급 요청서 도착/지연 자동대응 흐름 구성' },
      { time: '7교시', topic: '생산 스케줄 자동생성', content: '수요 기반 생산계획표 자동 업데이트' },
      { time: '8교시', topic: '공정 이슈 정리 자동화', content: '공정지연 이슈 요약정리 + 리포트 생성' },
      { time: '9-10교시', topic: '현장 기반 자동화 설계 실습', content: '각자의 현업 상황 기반 흐름 설계 실습' },
      { time: '11-12교시', topic: '발표 및 피드백', content: '실제 적용 가능성 검토 + 피드백 코칭' }
    ]
  },
  cs: {
    basic: [
      { time: '1교시', topic: '생성형AI 기초 이해', content: '고객응대에 특화된 GPT 활용사례 이해' },
      { time: '2교시', topic: '응대 메시지 자동생성 실습', content: '고객질문 → GPT 답변 → 템플릿화 실습' },
      { time: '3교시', topic: '민원 텍스트 요약 실습', content: '긴 불만메일 → GPT 요약 보고서화' },
      { time: '4교시', topic: 'n8n 기본구조 및 실습', content: 'n8n의 노드, 실행 흐름 이해 및 실습' },
      { time: '5교시', topic: '카카오톡 자동응답 실습', content: '카카오워크 API + GPT 응답 흐름 구성' },
      { time: '6교시', topic: 'FAQ 자동화 실습', content: '질문 키워드 인식 → GPT 자동응답' },
      { time: '7교시', topic: 'VOC 수집+ 정리 자동화', content: '구글폼 → 자동분류 및 시트 정리' },
      { time: '8교시', topic: '고객불만 유형 분류', content: '텍스트 분석 → GPT로 분류 후 레포트 생성' },
      { time: '9교시', topic: '응대 누락 알림 자동화', content: '미답변 목록 감지 → 슬랙 알림' },
      { time: '10교시', topic: '실무 자동화 흐름 설계', content: '내 업무 기준 흐름도 구상 및 설계' },
      { time: '11교시', topic: '실습– 나만의 자동화 구성', content: '개인별 워크플로 구성 및 실행 실습' },
      { time: '12교시', topic: '발표 및 피드백', content: '자동화 결과물 발표 + 개선 아이디어 공유' }
    ],
    advanced: [
      { time: '1교시', topic: 'n8n 고급 노드 심화', content: '조건분기, Loop, 병합, 오류처리 등 실습' },
      { time: '2교시', topic: '다채널 고객문의 통합 자동화', content: '이메일/카카오/폼 등 멀티채널 대응' },
      { time: '3교시', topic: '고객발언 감정분석 자동화', content: 'GPT + 감성분석 API 연계 실습' },
      { time: '4교시', topic: '응대품질 평가시스템 설계', content: 'GPT를 통한 응대문 분석 및 채점기준 구성' },
      { time: '5교시', topic: '고객응대 후속 자동메시지', content: '사후 피드백 수집 및 후기요청 자동화' },
      { time: '6교시', topic: '반복민원 유형 패턴분석', content: '키워드 분석 + 클러스터링 자동화 워크플로' },
      { time: '7교시', topic: '리포트 자동요약 시스템', content: 'VOC 데이터 → GPT 요약 → PDF 보고서 생성' },
      { time: '8교시', topic: 'Slack/메일 자동보고', content: '주간 VOC 요약 자동보고 흐름 설계' },
      { time: '9-10교시', topic: '실전 설계 실습', content: '각자의 응대업무 기반 자동화 설계' },
      { time: '11-12교시', topic: '발표 및 피드백', content: '업무 연결성 평가 + 설계 피드백 제공' }
    ]
  },
  hr: {
    basic: [
      { time: '1교시', topic: '생성형AI 개요', content: '인사/총무 업무에서의 GPT 활용 포인트 이해' },
      { time: '2교시', topic: '이력서 요약 프롬프트 작성', content: '지원자 이력서 → 요약 → 평가 포맷 구성' },
      { time: '3교시', topic: '채용공고 자동생성 실습', content: '직무 키워드 입력 → GPT로 공고 초안 작성' },
      { time: '4교시', topic: 'n8n 구조 및 기본사용 실습', content: '노드 연결 및 간단한 흐름 만들기' },
      { time: '5교시', topic: '입사자 온보딩 안내 자동화', content: '구글폼 제출 → 안내 이메일 자동발송' },
      { time: '6교시', topic: '휴가신청서 정리 자동화', content: '구글폼/시트 기반 → 승인요청 전송 자동화' },
      { time: '7교시', topic: '만족도 설문 자동화', content: '조사응답 → GPT 요약 → 시트/슬랙 공유' },
      { time: '8교시', topic: '교육일정 알림 자동화', content: '교육일정 등록시 슬랙/메일 자동알림' },
      { time: '9교시', topic: '문서작성 보조 자동화', content: '인사공지/규정안 초안 자동화 실습' },
      { time: '10교시', topic: '자동화 흐름 그리기', content: '나의 반복업무 자동화 설계 준비' },
      { time: '11교시', topic: '실습: 나만의 n8n 만들기', content: '개인 업무에 맞춘 실습 자동화 구현' },
      { time: '12교시', topic: '공유 및 피드백', content: '구성결과 발표 및 실무적용 코칭' }
    ],
    advanced: [
      { time: '1교시', topic: '고급 n8n 노드 실습', content: '조건분기, 반복, 시간지연, 에러대응 등' },
      { time: '2교시', topic: 'GPT API 커스터마이징', content: '인사/조직 데이터를 기반으로 GPT 활용 심화' },
      { time: '3교시', topic: '사내알림 자동화 시스템', content: '연차마감, 휴가일정, 교육일정 알림 실습' },
      { time: '4교시', topic: '피드백 수집→ 요약 자동화', content: '정성의견 → GPT 요약 → 보고서 자동생성' },
      { time: '5교시', topic: '사내문서 검색/요약 시스템', content: '사내규정 → 요약 → 검색응답 워크플로' },
      { time: '6교시', topic: '내부 챗봇 설계 흐름', content: 'FAQ 기반 Q&A 자동화 / 조직문화봇 구성' },
      { time: '7교시', topic: '입퇴사 프로세스 통합 자동화', content: '입사안내 → 장비요청 → 안내서 전송 자동화' },
      { time: '8교시', topic: 'HR 지표 자동 리포트', content: '월별 인사지표 → 시각화 + 요약보고' },
      { time: '9-10교시', topic: '실전 업무 자동화 설계', content: '각자의 업무흐름 분석 → 자동화 설계 실습' },
      { time: '11-12교시', topic: '발표 및 코칭', content: '자동화 구성 공유 + 실무반영 피드백' }
    ]
  },
  finance: {
    basic: [
      { time: '1교시', topic: '생성형AI 개요', content: 'GPT 개념 및 재무/회계 업무 적용사례' },
      { time: '2교시', topic: '숫자기반 요약 프롬프트', content: '예산/실적 보고서 요약 템플릿 실습' },
      { time: '3교시', topic: '세금계산서 요약 자동화', content: 'PDF 텍스트 추출 → GPT 요약 → 시트저장' },
      { time: '4교시', topic: 'n8n 기초구조 실습', content: 'Trigger/Set/Email 노드 구성 실습' },
      { time: '5교시', topic: '월간지출 정리 자동화', content: 'Google Sheet 데이터 요약 + 슬랙 발송' },
      { time: '6교시', topic: '전표 업로드 자동알림', content: '업로드 트리거 → 회계담당자 알림 전송' },
      { time: '7교시', topic: '부서별 예산 자동리포트', content: '항목별 분류 → 자동요약 → PDF 생성' },
      { time: '8교시', topic: '문서변환+ 보고서 자동화', content: '워드 → 텍스트 → GPT 요약 → 요약본 전송' },
      { time: '9교시', topic: '수치기반 경고알림', content: '예산초과/누락항목 조건별 자동감지' },
      { time: '10교시', topic: '업무 자동화 설계 실습', content: '본인 업무 기준 흐름도 및 노드 설계' },
      { time: '11교시', topic: '자동화 실습 구현', content: '간단한 재무 자동화 플로우 직접 구성' },
      { time: '12교시', topic: '발표 및 피드백', content: '실습 구성 공유 및 실무적용 논의' }
    ],
    advanced: [
      { time: '1교시', topic: '고급 n8n 구성 실습', content: 'Loop, Merge, 분기노드 구성 심화 실습' },
      { time: '2교시', topic: '실적요약 자동 보고서 작성', content: '시트 데이터 → GPT 요약 → PDF 자동화' },
      { time: '3교시', topic: '부서별 예산 실시간 비교', content: '실적 입력 → 월별 비교표 자동생성' },
      { time: '4교시', topic: '승인기반 보고 흐름 설계', content: '승인자 입력 → 승인 후 보고서 전송' },
      { time: '5교시', topic: '반복보고 일정 자동트리거', content: '월말 자동 리마인더 설정 및 전송' },
      { time: '6교시', topic: 'GPT 기반 지표해석 문구생성', content: '숫자 기반 판단 → 요약문구 자동구성' },
      { time: '7교시', topic: '회계감사 대응보고서 자동화', content: '감사요청 항목 → 요약본 자동전송' },
      { time: '8교시', topic: '비용흐름 이상감지', content: '조건 설정 → 자동 Slack/Email 알림 구성' },
      { time: '9-10교시', topic: '실전 설계 실습', content: '각자의 재무 흐름 자동화 설계' },
      { time: '11-12교시', topic: '결과발표 및 피드백', content: '보고 흐름 발표 + 구조 코칭 및 개선점 논' }
    ]
  }
};

export default function AICurriculumPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-800 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">AI CAMP 교육 프로그램</Badge>
            <h1 className="text-5xl font-bold mb-6">
              기업체 AI & n8n 자동화 교육
            </h1>
            <p className="text-xl mb-8 text-white/90">
              부서별 맞춤형 AI 자동화 교육으로 업무 생산성을 혁신하세요
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/consultation">
                  <BookOpen className="mr-2 h-5 w-5" />
                  교육 문의하기
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                <Link href="#tracks">
                  트랙별 과정 보기
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 특징 */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">부서별 맞춤형</h3>
              <p className="text-gray-600 text-sm">7개 부서별 특화된 교육 커리큘럼</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">실무 중심</h3>
              <p className="text-gray-600 text-sm">즉시 적용 가능한 자동화 실습</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">입문/심화 과정</h3>
              <p className="text-gray-600 text-sm">수준별 체계적인 교육 프로그램</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">수료증 발급</h3>
              <p className="text-gray-600 text-sm">AI CAMP 공식 수료증 제공</p>
            </div>
          </div>
        </div>
      </section>

      {/* 부서별 트랙 개요 */}
      <section id="tracks" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">부서별 교육 트랙</h2>
            <p className="text-xl text-gray-600">각 부서의 실무에 최적화된 AI 자동화 교육 프로그램</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trackData.map((track) => (
              <Card key={track.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`h-2 w-full bg-gradient-to-r ${track.color} rounded-t-lg -mt-6 -mx-6 mb-4`} />
                  <CardTitle className="text-lg">{track.title}</CardTitle>
                  <CardDescription>{track.target}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{track.duration}</span>
                  </div>
                  <ul className="space-y-2">
                    {track.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 상세 커리큘럼 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">상세 커리큘럼</h2>
            <p className="text-xl text-gray-600">트랙별 입문/심화 과정 커리큘럼을 확인하세요</p>
          </div>

          <Tabs defaultValue="planning" className="max-w-6xl mx-auto">
            <TabsList className="grid grid-cols-4 lg:grid-cols-7 gap-2 h-auto p-2">
              {trackData.map((track) => (
                <TabsTrigger key={track.id} value={track.id} className="text-xs">
                  {track.title.split(' ')[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(curriculumDetail).map(([trackId, courses]) => (
              <TabsContent key={trackId} value={trackId} className="mt-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* 입문 과정 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        입문 과정 (12시간)
                      </CardTitle>
                      <CardDescription>
                        AI와 자동화의 기초부터 실무 적용까지
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {courses.basic.map((item, idx) => (
                          <AccordionItem key={idx} value={`basic-${idx}`}>
                            <AccordionTrigger className="text-left">
                              <div className="flex justify-between w-full mr-4">
                                <span className="font-medium">{item.time}</span>
                                <span className="text-sm text-gray-600">{item.topic}</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-gray-600">{item.content}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>

                  {/* 심화 과정 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Cpu className="h-5 w-5" />
                        심화 과정 (12시간)
                      </CardTitle>
                      <CardDescription>
                        고급 자동화와 맞춤형 시스템 설계
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {courses.advanced.map((item, idx) => (
                          <AccordionItem key={idx} value={`advanced-${idx}`}>
                            <AccordionTrigger className="text-left">
                              <div className="flex justify-between w-full mr-4">
                                <span className="font-medium">{item.time}</span>
                                <span className="text-sm text-gray-600">{item.topic}</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-gray-600">{item.content}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* 교육 효과 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">교육 효과</h2>
            <p className="text-xl text-gray-600">AI CAMP 교육 후 기대되는 변화</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="text-5xl font-bold text-blue-600 mb-2">70%</div>
                <p className="text-lg font-semibold mb-2">업무 시간 단축</p>
                <p className="text-gray-600">반복 업무 자동화로 핵심 업무 집중</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="text-5xl font-bold text-green-600 mb-2">90%</div>
                <p className="text-lg font-semibold mb-2">오류율 감소</p>
                <p className="text-gray-600">AI 기반 자동화로 휴먼 에러 최소화</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="text-5xl font-bold text-purple-600 mb-2">3배</div>
                <p className="text-lg font-semibold mb-2">생산성 향상</p>
                <p className="text-gray-600">AI 도구 활용으로 업무 효율 극대화</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            우리 회사에 맞는 AI 교육을 시작하세요
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            부서별 맞춤형 교육으로 전사적 AI 혁신을 이끌어내세요
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/consultation">
                교육 상담 신청
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
              <Link href="/support/downloads">
                교육 자료 다운로드
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
} 