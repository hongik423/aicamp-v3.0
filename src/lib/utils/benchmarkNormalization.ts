'use client';

import { SuccessCaseDetail } from '@/types/success-case.types';

type Benchmarks = {
  roi: string; // e.g. '600%'
  timeReduction: string; // '80%'
  productivityGain: string; // '200%'
  costSaving?: string; // e.g. '연 10억원'
};

const industryDefaults: Record<string, Benchmarks> = {
  'IT/기술': { roi: '1500%', timeReduction: '80%', productivityGain: '200%', costSaving: '연 30억원' },
  '제조/생산': { roi: '900%', timeReduction: '65%', productivityGain: '140%', costSaving: '연 20억원' },
  '금융업': { roi: '1800%', timeReduction: '85%', productivityGain: '200%', costSaving: '연 40억원' },
  '유통/서비스': { roi: '800%', timeReduction: '60%', productivityGain: '120%', costSaving: '연 10억원' },
  '의료/헬스케어': { roi: '700%', timeReduction: '55%', productivityGain: '110%', costSaving: '연 8억원' },
  '교육/연구': { roi: '600%', timeReduction: '50%', productivityGain: '100%', costSaving: '연 5억원' },
  '건설/부동산': { roi: '750%', timeReduction: '58%', productivityGain: '115%', costSaving: '연 12억원' },
  '운송/물류': { roi: '900%', timeReduction: '70%', productivityGain: '150%', costSaving: '연 15억원' },
  '미디어/콘텐츠': { roi: '850%', timeReduction: '62%', productivityGain: '130%', costSaving: '연 9억원' },
  '전문서비스': { roi: '950%', timeReduction: '68%', productivityGain: '145%', costSaving: '연 11억원' },
  '에너지/환경': { roi: '800%', timeReduction: '60%', productivityGain: '125%', costSaving: '연 13억원' },
  '농업/수산업': { roi: '650%', timeReduction: '52%', productivityGain: '105%', costSaving: '연 6억원' },
  '통신/네트워크': { roi: '1000%', timeReduction: '72%', productivityGain: '160%', costSaving: '연 18억원' },
  '공공/비영리': { roi: '500%', timeReduction: '45%', productivityGain: '90%', costSaving: '연 4억원' },
};

const isNA = (v?: string | null): boolean => {
  if (!v) return true;
  const s = String(v).trim().toLowerCase();
  return s === 'na' || s === 'n/a' || s === '-' || s === '';
};

const ensurePercent = (v?: string): string | undefined => {
  if (!v) return undefined;
  const digits = v.replace(/[^0-9]/g, '');
  if (!digits) return undefined;
  return `${parseInt(digits, 10)}%`;
};

export const getNormalizedBenchmarks = (caseData: Partial<SuccessCaseDetail>): Benchmarks => {
  const defaults = industryDefaults[caseData.industry ?? ''] || { roi: '700%', timeReduction: '55%', productivityGain: '110%', costSaving: '연 5억원' };

  const roi = ensurePercent(caseData.roiData?.threeYearROI);
  const time = ensurePercent(caseData.automationMetrics?.timeReduction);
  const prod = ensurePercent(caseData.automationMetrics?.productivityGain);
  const cost = caseData.automationMetrics?.costSaving;

  return {
    roi: isNA(roi) ? defaults.roi : roi!,
    timeReduction: isNA(time) ? defaults.timeReduction : time!,
    productivityGain: isNA(prod) ? defaults.productivityGain : prod!,
    costSaving: isNA(cost) ? defaults.costSaving : cost,
  };
};

export const parsePercentToNumber = (v?: string): number => {
  if (!v) return 0;
  const digits = v.replace(/[^0-9]/g, '');
  return digits ? parseInt(digits, 10) : 0;
};


