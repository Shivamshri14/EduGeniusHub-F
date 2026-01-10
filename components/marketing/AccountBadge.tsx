import type { AccountType } from '@/lib/tools';
import { cn } from '@/lib/utils';

interface AccountBadgeProps {
  accountType: AccountType;
  className?: string;
}

const ACCOUNT_COPY: Record<AccountType, string> = {
  private: 'Private Account (on your Gmail)',
  shared: 'Shared Account (on our Gmail)',
};

const ACCOUNT_STYLES: Record<AccountType, string> = {
  private: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-200 dark:border-green-800',
  shared: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800',
};

export function AccountBadge({ accountType, className }: AccountBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-tight',
        ACCOUNT_STYLES[accountType],
        className,
      )}
    >
      {ACCOUNT_COPY[accountType]}
    </span>
  );
}

