/**
 * @fileoverview 진단 ID 표준 유틸리티
 * @encoding UTF-8
 */

export type DiagnosisIdPrefix = 'DIAG_45Q_AI' | 'PRD_V3';

/**
 * 진단 ID를 표준 형식으로 생성합니다.
 * 예) DIAG_45Q_AI_1730222222222_abcd123ef 또는 PRD_V3_1730222222222_abcd123ef
 */
export function generateStandardDiagnosisId(prefix: DiagnosisIdPrefix = 'DIAG_45Q_AI'): string {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 11).toLowerCase();
  return `${prefix}_${timestamp}_${randomSuffix}`;
}

/**
 * 다양한 형식의 진단 ID를 프로젝트 표준 형식으로 정규화합니다.
 * - 공백 제거
 * - 대소문자 정리(접두부는 대문자 유지, 나머지는 소문자 suffix)
 * - DIAG_, DIAG_AI_, DIAG_45Q_ 등 과거 접두부를 DIAG_45Q_AI 로 통일 가능 옵션
 */
export function normalizeDiagnosisId(id: string, targetPrefix: DiagnosisIdPrefix = 'DIAG_45Q_AI'): string {
  if (!id) return '';
  const trimmed = String(id).trim().replace(/\s+/g, '');

  // 이미 표준 접두부인 경우 그대로 반환
  if (trimmed.startsWith(`${targetPrefix}_`)) {
    return trimmed;
  }

  // 과거 접두부를 표준 접두부로 변환
  if (trimmed.startsWith('DIAG_45Q_AI_')) {
    return trimmed; // 동일
  }
  if (trimmed.startsWith('DIAG_45Q_')) {
    return trimmed.replace('DIAG_45Q_', `${targetPrefix}_`);
  }
  if (trimmed.startsWith('DIAG_AI_')) {
    return trimmed.replace('DIAG_AI_', `${targetPrefix}_`);
  }
  if (trimmed.startsWith('DIAG_')) {
    return trimmed.replace('DIAG_', `${targetPrefix}_`);
  }
  if (trimmed.startsWith('PRD_V3_')) {
    return targetPrefix === 'PRD_V3' ? trimmed : trimmed.replace('PRD_V3_', `${targetPrefix}_`);
  }

  // 접두부가 없는 경우 표준 접두부를 부여
  return `${targetPrefix}_${trimmed}`;
}


