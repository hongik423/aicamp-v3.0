'use client';

// 벤치마크 전용 로컬 이미지 목록 (public/images/benchmark)
// 파일명은 실제 폴더의 파일을 사용합니다.
const benchmarkImages: string[] = [
  '24AI 기반 5G 네트워크 자율 최적화.png',
  '29AI 기반 물류 창고 자동화.png',
  '30AI 기반 공급망 관리 (SCM).png',
  '31AI 기반 예측 정비(PdM).png',
  '32. AI 기반 품질 보증(QA) 자동화.png',
  '33. AI 기반 의료 영상 분석.png',
  '34. AI 기반 진단 지원 시스템.png',
  '35. AI 기반 약물 개발 가속화.png',
  '36. AI 기반 원격 환자 모니터링.png',
  '37. AI 기반 맞춤형 재활 치료.png',
  '38. AI 기반 질병 예측 분석.png',
  '39. AI 기반 병원 자원 최적화.png',
  '40. AI 기반 응급 대응 시스템.png',
  '41. AI 기반 스마트 농업 관리.png',
  '42. AI 기반 작물 수확 최적화.png',
  '43. AI 기반 가축 건강 모니터링.png',
  '44. AI 기반 수산 양식 관리.png',
  '45. AI 기반 산림 자원 관리.png',
  '46. AI 기반 기후 변화 예측.png',
  '47. AI 기반 재난 대응 시뮬레이션.png',
  '48. AI 기반 도시 교통 최적화.png',
  '49. AI 기반 대중교통 운영 최적화.png',
  '50. AI 기반 물류 차량 경로 최적화.png',
  '63AI 기반 기상 예보 자동화.png',
  '64AI 기반 재생 에너지 예측.png',
  '65AI 기반 전력 수요 예측.png',
  '66AI 기반 스마트 그리드 운영.png',
  '67AI 기반 에너지 저장 최적화.png',
  '68AI 기반 석유·가스 생산 관리.png',
  '69AI 기반 광산 운영 최적화.png',
  '70AI 기반 자원 재활용 자동화.png',
  '71AI 기반 폐기물 처리 최적화.png',
  '72AI 기반 수자원 관리.png',
  '73AI 기반 해양 환경 모니터링.png',
  '74AI 기반 대기 오염 예측.png',
  '75AI 기반 소음 공해 관리.png',
  '76AI 기반 폐수 처리 최적화.png',
  '77AI 기반 해양 쓰레기 수거.png',
  '78AI 기반 생물 다양성 보호.png',
  '79AI 기반 환경 복원 프로젝트 관리.png',
  '80AI 기반 탄소 배출 추적.png',
  '82AI 기반 의류 생산 최적화.png',
  '83AI 기반 유통 재고 관리.png',
  '84AI 기반 고객 맞춤형 추천.png',
  '85AI 기반 가격 최적화.png',
  '86AI 기반 마케팅 캠페인 분석.png',
  '87AI 기반 소비자 행동 분석.png',
  '88AI 기반 제품 수요 예측.png',
  '89AI 기반 금융 사기 탐지.png',
  '90AI 기반 자산 관리 최적화.png',
  '91AI 기반 보험 심사 자동화.png',
  '92AI 기반 보험 사기 방지.png',
  '93AI 기반 법률 문서 분석.png',
  '94AI 기반 전자증거 분석.png',
  '95AI 기반 번역·통역 지원.png',
  '96AI 기반 콘텐츠 생성 자동화.png'
];

function simpleHash(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getBenchmarkImage(key?: string): string {
  const best = selectBestImageByName(key);
  return `/images/benchmark/${best}`;
}

export function getBenchmarkBackground(key?: string): string {
  return getBenchmarkImage((key || '') + '-bg');
}

export const BENCHMARK_IMAGE_COUNT = benchmarkImages.length;

// --- 이름 매칭 로직 ---
const cache = new Map<string, string>();

function normalize(text: string): string {
  return (text || '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

const stopwords = ['ai', '기반', '플랫폼', '시스템', '관리', '최적화', '운영', '지원', '분석', '자동화'];

function tokenizeKorean(text: string): string[] {
  const base = normalize(text)
    .replace(/[()·]/g, ' ')
    .split(' ')
    .filter(Boolean);
  return base.filter(t => !stopwords.includes(t));
}

// 파일명과 항목 간의 공통 부분 문자열 길이를 기반으로 스코어링
// 3자 이상 일치하는 경우에만 가산점 부여
function scoreFilename(file: string, tokens: string[]): number {
  const name = normalize(file).replace(/\.[a-z0-9]+$/i, '');

  const longestCommonSubstring = (a: string, b: string): number => {
    if (!a || !b) return 0;
    let maxLen = 0;
    const dp: number[] = new Array(b.length + 1).fill(0);
    for (let i = 1; i <= a.length; i++) {
      let prev = 0;
      for (let j = 1; j <= b.length; j++) {
        const temp = dp[j];
        if (a[i - 1] === b[j - 1]) {
          dp[j] = prev + 1;
          if (dp[j] > maxLen) maxLen = dp[j];
        } else {
          dp[j] = 0;
        }
        prev = temp;
      }
    }
    return maxLen;
  };

  let score = 0;
  for (const token of tokens) {
    if (!token) continue;
    const lcs = longestCommonSubstring(name, token);
    if (lcs >= 3) {
      // 공통 길이가 길수록 높은 우선순위. 가중치 3 배수 적용
      score += lcs * 3;
    }
  }
  return score;
}

function selectBestImageByName(key?: string): string {
  const k = normalize(key || '');
  if (!k) return benchmarkImages[simpleHash('aicamp') % benchmarkImages.length];
  if (cache.has(k)) return cache.get(k)!;

  const tokens = tokenizeKorean(k);
  let best = benchmarkImages[0];
  let bestScore = -1;
  for (const file of benchmarkImages) {
    const s = scoreFilename(file, tokens);
    if (s > bestScore) {
      bestScore = s;
      best = file;
    }
  }
  if (bestScore <= 0) {
    best = benchmarkImages[simpleHash(k) % benchmarkImages.length];
  }
  cache.set(k, best);
  return best;
}


