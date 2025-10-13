import { useContext } from 'react';
import { createContext } from 'react';

type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
  id?: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  durationMs?: number;
}

export interface Toast extends Required<Omit<ToastOptions, 'id'>> {
  id: string;
  isExiting:boolean;
}

export interface ToastContextValue {
  show: (opts: ToastOptions) => string;
  dismiss: (id: string) => void;
  success: (title: string, description?: string, opts?: Omit<ToastOptions, 'title' | 'description' | 'variant'>) => string;
  error: (title: string, description?: string, opts?: Omit<ToastOptions, 'title' | 'description' | 'variant'>) => string;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
