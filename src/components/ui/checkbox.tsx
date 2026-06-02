import { forwardRef, useId, type ReactNode } from 'react';
import { Checkbox as BaseCheckbox } from '@base-ui-components/react/checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '../../lib/cn';
import './checkbox.css';

export interface CheckboxProps
  extends Omit<BaseCheckbox.Root.Props, 'render' | 'children'> {
  label?: ReactNode;
  description?: ReactNode;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  { label, description, className, id, disabled, indeterminate, ...props },
  ref,
) {
  const autoId = useId();
  const controlId = id ?? autoId;
  const descriptionId = description ? `${controlId}-description` : undefined;

  const control = (
    <BaseCheckbox.Root
      ref={ref as React.Ref<HTMLElement>}
      id={controlId}
      disabled={disabled}
      indeterminate={indeterminate}
      aria-describedby={descriptionId}
      className={
        typeof className === 'function'
          ? (state) => cn('ui-checkbox', className(state))
          : cn('ui-checkbox', className)
      }
      {...props}
    >
      <BaseCheckbox.Indicator className="ui-checkbox__indicator">
        {indeterminate ? (
          <Minus className="ui-checkbox__icon" aria-hidden="true" />
        ) : (
          <Check className="ui-checkbox__icon" aria-hidden="true" />
        )}
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );

  if (!label && !description) {
    return control;
  }

  return (
    <div className="ui-checkbox-field" data-disabled={disabled || undefined}>
      {control}
      <div className="ui-checkbox-field__text">
        {label && (
          <label htmlFor={controlId} className="ui-checkbox-field__label">
            {label}
          </label>
        )}
        {description && (
          <span id={descriptionId} className="ui-checkbox-field__description">
            {description}
          </span>
        )}
      </div>
    </div>
  );
});
