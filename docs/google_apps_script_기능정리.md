# 📋 Google Apps Script 기능 정리서
## AICAMP AI 경영진단 시스템 (google_apps_script_simplified_NO_PDF.js)

### 🎯 시스템 개요
- **시스템명**: AICAMP 최고수준 AI 경영진단 시스템
- **AI 엔진**: GEMINI 2.5 Flash 기반 맞춤형 진단보고서 생성
- **최신 업데이트**: 2025.01.31
- **버전**: 2025.02.03.AICAMP_운영최적화_AI경영진단시스템_GEMINI25Flash_Production

---

## 🔧 핵심 설정

### 데이터베이스 연결
- **Google Sheets ID**: `1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0`
- **시트 구성**:
  - `AI_무료진단신청`: 진단 신청 데이터
  - `상담신청`: 전문가 상담 신청
  - `베타피드백`: 사용자 피드백

### AI API 설정
- **GEMINI API Key**: 설정됨 (39자리 AIza 형식)
- **API URL**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`
- **관리자 이메일**: `hongik423@gmail.com`

---

## 🚀 주요 기능 모듈

### 1. AI 역량 점수 계산 시스템
#### `calculateAICapabilityScores(data)`
- **기능**: 5개 영역별 AI 역량 점수 계산
- **영역**: 경영진 리더십, 인프라/시스템, 직원 역량, 조직 문화, 실무 적용도
- **출력**: 각 영역별 점수(100점 만점) + 종합 점수

#### `calculatePracticalCapabilityScores(data)`
- **기능**: 실무 역량 점수 계산 (4개 영역)
- **영역**: 업무 자동화, 데이터 분석, AI 도구 활용, 디지털 협업
- **출력**: 실무 역량 종합 점수

### 2. 업종별 맞춤 분석
#### `calculateIndustrySpecificScore(data)`
- **기능**: 업종별 특화 점수 계산
- **지원 업종**: 제조업, IT, 서비스업, 금융업 등 80+ 업종
- **출력**: 업종별 맞춤 분석 결과

#### `analyzeBenchmarkGap(companyScores, industry)`
- **기능**: 업종 평균 대비 격차 분석
- **출력**: 강점/약점 영역 식별, 개선 우선순위

### 3. SWOT 전략 분석 엔진
#### `generateStrategicSWOTLinkage(companyScores, gapAnalysis, data)`
- **기능**: AI 기반 전략적 SWOT 분석
- **포함사항**:
  - **SO 전략**: 강점-기회 활용 전략
  - **WO 전략**: 약점-기회 보완 전략  
  - **ST 전략**: 강점-위기 대응 전략
  - **WT 전략**: 약점-위기 극복 전략

### 4. GEMINI AI 기반 프리미엄 보고서 생성
#### `generatePremiumAIReportWithGemini(data, analysisData)`
- **기능**: GEMINI 2.5 Flash로 고품질 진단보고서 생성
- **포함내용**:
  - 종합 진단 결과 (A~F 등급)
  - 업종별 특화 분석
  - 맞춤형 개선 로드맵
  - AI 투자 ROI 분석
  - 월별 실행 계획

#### `callGeminiAPI(prompt)`
- **기능**: GEMINI API 호출 및 응답 처리
- **안전장치**: API 실패시 폴백 보고서 자동 생성

### 5. 실행 로드맵 생성 시스템
#### `generateExecutionRoadmap(data, analysisData)`
- **기능**: 단계별 실행 계획 수립
- **구성**:
  - **즉시 실행**: 0-3개월 과제
  - **단기 목표**: 3-6개월 과제  
  - **중기 전략**: 6-12개월 과제
  - **장기 비전**: 1-3년 과제

#### `generateAICAMPPrograms(data, analysisData)`
- **기능**: AICAMP 맞춤형 교육과정 추천
- **출력**: 수준별/영역별 교육 프로그램 제안

### 6. 데이터 처리 및 저장 시스템
#### `handleFreeDiagnosisSubmission(data)`
- **기능**: 진단 신청 데이터 처리
- **프로세스**:
  1. 개인정보 동의 확인
  2. 이메일 유효성 검증
  3. 필수 필드 확인
  4. Google Sheets 저장
  5. 확인 이메일 발송
  6. AI 분석 트리거 설정

#### `saveFreeDiagnosisApplication(diagnosisId, data, timestamp)`
- **기능**: 진단 신청 데이터를 Google Sheets에 안전 저장
- **데이터**: 58개 컬럼의 상세 진단 정보

### 7. 이메일 알림 시스템
#### `sendFreeDiagnosisConfirmationEmail(email, companyName, diagnosisId)`
- **기능**: 신청자에게 접수 확인 이메일 발송
- **내용**: 진단 ID, 예상 완료 시간, 후속 절차

#### `sendFreeDiagnosisResultEmail(email, companyName, diagnosisId, result)`
- **기능**: 진단 결과 보고서 이메일 발송
- **첨부**: HTML 형식의 상세 진단 보고서

#### `sendFreeDiagnosisAdminNotification(data, diagnosisId)`
- **기능**: 관리자에게 신규 신청 알림
- **포함**: 신청자 정보, 진단 ID, 직접 링크

### 8. 오류 처리 및 모니터링
#### `notifyAdminFreeDiagnosisError(diagnosisId, error)`
- **기능**: 시스템 오류 발생시 관리자 즉시 알림
- **정보**: 오류 내용, 진단 ID, 발생 시간

#### `diagnosisSystemHealthCheck()`
- **기능**: 전체 시스템 상태 점검
- **확인사항**: API 연결, 시트 구조, 이메일 서비스

### 9. 테스트 및 검증 시스템
#### `testFreeDiagnosisSystemComprehensive()`
- **기능**: 전체 진단 시스템 종합 테스트
- **검증항목**: 
  - 데이터 저장/조회
  - AI 분석 엔진
  - 이메일 발송
  - 보고서 생성

#### `quickSystemTest()`
- **기능**: 핵심 기능 빠른 테스트
- **용도**: 일일 시스템 점검용

### 10. API 엔드포인트 및 CORS 처리
#### `doPost(e)` / `doGet(e)` / `doOptions(e)`
- **기능**: 웹 API 엔드포인트 처리
- **지원**: POST(데이터 제출), GET(결과 조회), OPTIONS(CORS)
- **보안**: 자동 CORS 헤더 설정, 요청 검증

---

## 📊 데이터 흐름도

```
신청서 제출 → 데이터 검증 → Google Sheets 저장 → AI 분석 시작
    ↓
접수 확인 이메일 → GEMINI AI 분석 → 보고서 생성 → 결과 이메일 발송
    ↓
관리자 알림 → 후속 상담 안내 → 교육과정 추천
```

---

## 🎯 핵심 성능 지표

- **처리 속도**: 신청서 접수 즉시 처리
- **AI 분석**: 평균 3-5분 소요
- **정확도**: GEMINI 2.5 Flash 기반 고정밀 분석
- **안정성**: 오류 발생시 자동 폴백 시스템
- **확장성**: 58개 컬럼 데이터 처리 가능

---

## 🔒 보안 및 개인정보 보호

- **동의 확인**: 개인정보 처리 동의 필수 검증
- **데이터 암호화**: Google Sheets 자동 암호화
- **접근 제한**: 관리자 계정만 시트 접근 가능
- **로그 관리**: 모든 처리 과정 기록 보관

---

## 📈 향후 개선 계획

1. **실시간 진행상황 업데이트**: WebSocket 연동
2. **다국어 지원**: 영문/중문 보고서 생성
3. **모바일 최적화**: 반응형 이메일 템플릿
4. **고급 분석**: 산업 트렌드 연동 분석
5. **자동화 확장**: RPA 도구 연동 제안

---

*📝 문서 생성일: 2025.02.03*  
*🔄 최종 업데이트: Google Apps Script 분석 완료*