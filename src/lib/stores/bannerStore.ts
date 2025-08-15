'use client';

import { create } from 'zustand';

export interface GlobalBannerState {
  isVisible: boolean;
  message: string;
  subMessage?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  progressPercent?: number; // 0-100, 진행률 표시용(선택)
  stepLabel?: string; // 현재 단계 라벨(선택)
  show: (message: string, options?: { subMessage?: string; variant?: GlobalBannerState['variant'] }) => void;
  update: (message: string, options?: { subMessage?: string; variant?: GlobalBannerState['variant'] }) => void;
  hide: () => void;
}

export const useBannerStore = create<GlobalBannerState>((set) => ({
  isVisible: false,
  message: '',
  subMessage: undefined,
  variant: 'info',
  progressPercent: undefined,
  stepLabel: undefined,
  show: (message, options) =>
    set({
      isVisible: true,
      message,
      subMessage: options?.subMessage,
      variant: options?.variant || 'info',
    }),
  update: (message, options) =>
    set((state) => ({
      ...state,
      message,
      subMessage: options?.subMessage ?? state.subMessage,
      variant: options?.variant || state.variant,
      // progress/step은 전달된 경우에만 갱신 (유지 가능)
      progressPercent: (options as any)?.progressPercent ?? state.progressPercent,
      stepLabel: (options as any)?.stepLabel ?? state.stepLabel,
    })),
  hide: () => set({ isVisible: false, message: '', subMessage: undefined, progressPercent: undefined, stepLabel: undefined }),
}));


