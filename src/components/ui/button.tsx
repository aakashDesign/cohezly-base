import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import './button.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'positive' | 'critical' | 'warning';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, type = 'button', startIcon, endIcon, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      data-variant={variant}
      data-size={size}
      className={cn('ui-button', className)}
      {...props}
    >
      {startIcon && <span className="ui-button__icon" aria-hidden="true">{startIcon}</span>}
      {children != null && children !== '' && (
        <span className="ui-button__label">{children}</span>
      )}
      {endIcon && <span className="ui-button__icon" aria-hidden="true">{endIcon}</span>}
    </button>
  );
});
