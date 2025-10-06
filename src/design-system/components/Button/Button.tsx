import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: [
    'text-[var(--color-text-primary)]',
    'bg-[var(--color-primary)]',
    'hover:brightness-110',
    'active:brightness-95',
    'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)]',
  ].join(' '),
  secondary: [
    'text-[var(--color-text-primary)]',
    'bg-[var(--color-background-secondary)]',
    'border border-[var(--color-border)]',
    'hover:bg-[var(--color-background-secondary)]/80',
    'active:bg-[var(--color-background-secondary)]/70',
    'focus:outline-none focus:ring-2 focus:ring-[var(--color-border)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)]',
  ].join(' '),
  ghost: [
    'text-[var(--color-text-primary)]',
    'bg-transparent',
    'hover:bg-[var(--color-background-secondary)]',
    'focus:outline-none focus:ring-2 focus:ring-[var(--color-border)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)]',
  ].join(' '),
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 px-3 text-sm rounded-md',
  md: 'h-9 px-4 text-sm rounded-md',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';


