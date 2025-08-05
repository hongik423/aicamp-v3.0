# AI 역량진단 시스템 v4.0 구현 가이드

## 🚀 시작하기

### 1. Google Apps Script 설정

1. Google Drive에서 새 Google Apps Script 프로젝트 생성
2. `google_apps_script_AI_DIAGNOSIS_ENHANCED.js` 내용을 복사하여 붙여넣기
3. 프로젝트 설정에서 다음 정보 확인:
   - Script ID: `1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj`
   - Deployment ID: 웹앱 배포 후 생성

### 2. Google Sheets 설정

스프레드시트 ID: `1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0`

필요한 시트:
- `AI_역량진단신청`: 진단 신청 데이터 저장
- `상담신청`: 상담 신청 데이터 저장
- `베타피드백`: 피드백 데이터 저장
- `진행상황추적`: 실시간 진행 상황 추적
- `성능모니터링`: 시스템 성능 모니터링

### 3. GEMINI API 설정

1. [Google AI Studio](https://makersuite.google.com/app/apikey)에서 API 키 발급
2. 스크립트에서 API 키 설정:
   ```javascript
   const GEMINI_API_KEY = 'YOUR_API_KEY_HERE';
   ```

## 📋 프론트엔드 통합

### 1. API 엔드포인트

```javascript
const API_ENDPOINT = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
```

### 2. 진단 신청 데이터 구조

```typescript
interface DiagnosisRequest {
  formType: 'ai-capability-diagnosis-enhanced';
  
  // 기본 정보
  회사명: string;
  업종: string;
  담당자명: string;
  이메일: string;
  연락처: string;
  
  // 사업 정보
  사업상세설명: string;
  주요고민사항: string;
  예상혜택: string;
  희망컨설팅분야: string;
  
  // AI 현황
  현재AI도구활용: string;
  AI도입장벽?: string[];
  
  // 5대 AI 역량 평가 (1-5점)
  // 1. AI 이해 및 활용 전략
  AI기술이해도: number;
  AI활용전략수립: number;
  AI투자의사결정: number;
  
  // 2. 데이터 관리 및 분석
  데이터수집체계: number;
  데이터품질관리: number;
  데이터분석역량: number;
  
  // 3. 프로세스 혁신 및 자동화
  업무프로세스분석: number;
  자동화가능성평가: number;
  AI기반프로세스개선: number;
  
  // 4. 인재 육성 및 조직 문화
  AI교육체계: number;
  변화관리역량: number;
  혁신문화조성: number;
  
  // 5. 고객 경험 및 가치 창출
  고객데이터활용: number;
  AI기반서비스개발: number;
  고객만족도향상: number;
  
  // 실무 역량 평가 (1-5점)
  문서자동화역량?: number;
  데이터분석실무?: number;
  AI도구활용역량?: number;
  디지털협업역량?: number;
  
  // 추가 정보 (선택)
  연매출?: number; // 억원 단위
  직원수?: number;
}
```

### 3. API 호출 예제

```typescript
async function submitDiagnosis(data: DiagnosisRequest) {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (result.success) {
      return {
        diagnosisId: result.diagnosisId,
        summary: result.summary,
      };
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('진단 신청 오류:', error);
    throw error;
  }
}
```

### 4. 응답 데이터 구조

```typescript
interface DiagnosisResponse {
  success: boolean;
  diagnosisId: string; // 형식: ACD-timestamp
  summary: {
    totalScore: number; // 0-100
    grade: string; // S, A, B, C, D, F
    level: string; // 도입준비, 시범적용, 확산적용, 완전통합, AI선도
    position: string; // leaders, potentials, experimenters, beginners
    topPriorities: Array<{
      strategy: string;
      action: string;
      expectedResult: string;
    }>;
    roi: number; // 퍼센트
  };
}
```

## 📊 보고서 조회

### 1. 보고서 조회 API

```typescript
async function getDiagnosisReport(diagnosisId: string) {
  const url = `${API_ENDPOINT}?diagnosisId=${diagnosisId}`;
  
  try {
    const response = await fetch(url);
    const result = await response.json();
    
    if (result.success) {
      return result.report;
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('보고서 조회 오류:', error);
    throw error;
  }
}
```

## 🎨 UI/UX 가이드라인

### 1. 진단 폼 구성

#### 섹션 1: 기본 정보
- 회사명, 업종, 담당자 정보
- 사업 설명 (텍스트영역)
- 주요 고민사항 (텍스트영역)
- 예상 혜택 (텍스트영역)

#### 섹션 2: AI 현황
- 현재 AI 도구 사용 현황 (체크박스)
- AI 도입 장벽 (다중 선택)
- 희망 컨설팅 분야 (라디오 버튼)

#### 섹션 3: 5대 AI 역량 평가
- 각 항목별 5점 척도 (슬라이더 또는 라디오 버튼)
- 섹션별 평균 점수 실시간 표시
- 도움말 툴팁 제공

#### 섹션 4: 실무 역량 평가
- 각 항목별 5점 척도
- 업종별 추가 질문 동적 표시

### 2. 결과 페이지 구성

#### 상단: 핵심 요약
- 종합 점수 (큰 폰트, 색상 코딩)
- AI 성숙도 레벨 (프로그레스 바)
- 업계 대비 위치 (매트릭스 차트)

#### 중단: 주요 분석 결과
- SWOT 분석 (4분면 차트)
- 우선순위 매트릭스 (버블 차트)
- 3단계 로드맵 (타임라인)

#### 하단: 상세 보고서
- 섹션별 상세 내용
- PDF 다운로드 버튼
- 상담 신청 CTA

### 3. 시각화 요소

#### 점수 표시
```html
<div class="score-display">
  <div class="score-circle" data-score="75">
    <svg><!-- 원형 프로그레스 바 --></svg>
    <span class="score-text">75점</span>
  </div>
  <div class="score-grade">B등급</div>
  <div class="score-level">확산적용</div>
</div>
```

#### AI 역량 매트릭스
```javascript
// Chart.js 예제
const matrixChart = new Chart(ctx, {
  type: 'scatter',
  data: {
    datasets: [{
      label: '우리 회사',
      data: [{x: 75, y: 80}],
      backgroundColor: 'red',
      pointRadius: 10
    }]
  },
  options: {
    scales: {
      x: {
        title: { text: 'AI 활용 수준' },
        min: 0, max: 100
      },
      y: {
        title: { text: '비즈니스 영향도' },
        min: 0, max: 100
      }
    }
  }
});
```

## 🔒 보안 고려사항

### 1. 데이터 보호
- 모든 데이터는 HTTPS로 전송
- 개인정보는 암호화하여 저장
- 접근 권한 관리 철저

### 2. API 보안
- CORS 설정 확인
- Rate limiting 구현
- 입력 데이터 검증

### 3. 인증
- 선택적으로 API 키 인증 추가 가능
- 관리자 기능은 별도 인증 필요

## 📈 모니터링 및 분석

### 1. 성능 모니터링
- 응답 시간 추적
- 오류율 모니터링
- 사용량 통계

### 2. 사용자 분석
- 진단 완료율
- 평균 작성 시간
- 재방문율

### 3. 보고서 품질
- AI 생성 보고서 길이
- 사용자 만족도
- 상담 전환율

## 🚨 트러블슈팅

### 1. GEMINI API 오류
- API 키 확인
- 할당량 초과 확인
- 네트워크 연결 확인

### 2. 타임아웃 오류
- 타임아웃 설정 증가
- 데이터 양 최적화
- 비동기 처리 고려

### 3. 데이터 저장 오류
- Google Sheets 권한 확인
- 시트 이름 확인
- 데이터 형식 검증

## 📞 지원

기술 지원이 필요하시면 연락주세요:
- 이메일: hongik423@gmail.com
- 전화: 010-9251-9743
- 카카오톡: @aicamp