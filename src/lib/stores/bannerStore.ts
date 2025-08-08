'use client';

import { create } from 'zustand';

export interface GlobalBannerState {
  isVisible: boolean;
  message: string;
  subMessage?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  show: (message: string, options?: { subMessage?: string; variant?: GlobalBannerState['variant'] }) => void;
  update: (message: string, options?: { subMessage?: string; variant?: GlobalBannerState['variant'] }) => void;
  hide: () => void;
}

export const useBannerStore = create<GlobalBannerState>((set) => ({
  isVisible: false,
  message: '',
  subMessage: undefined,
  variant: 'info',
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
    })),
  hide: () => set({ isVisible: false, message: '', subMessage: undefined }),
}));


