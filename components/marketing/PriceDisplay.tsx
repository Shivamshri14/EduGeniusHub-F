import { cn, formatPrice } from '@/lib/utils';
import type { PlanType } from '@/lib/tools';

type Size = 'sm' | 'md' | 'lg';

const sizeClassMap: Record<Size, { current: string; original: string }> = {
  sm: { current: 'text-lg', original: 'text-sm' },
  md: { current: 'text-2xl', original: 'text-base' },
  lg: { current: 'text-3xl', original: 'text-lg' },
};

interface PriceDisplayProps {
  current: number;
  original?: number;
  planType: PlanType;
  size?: Size;
  showSavings?: boolean;
  className?: string;
}

export function PriceDisplay({
  current,
  original,
  planType,
  size = 'md',
  showSavings = true,
  className,
}: PriceDisplayProps) {
  const sizeClasses = sizeClassMap[size];
  const savings = original ? original - current : 0;

  return (
    <div className={cn('space-y-1', className)}>
      <div className="flex flex-wrap items-baseline gap-3">
        <span className={cn('font-bold text-green-600 dark:text-green-400', sizeClasses.current)}>
          {formatPrice(current, planType)}
        </span>
        {original !== undefined && (
          <span className={cn('text-slate-400 dark:text-slate-500 line-through', sizeClasses.original)}>
            {formatPrice(original, planType)}
          </span>
        )}
      </div>
      {showSavings && original !== undefined && savings > 0 && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          You save ₹{savings}!
        </p>
      )}
    </div>
  );
}

