import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'gradient';

interface WhatsAppButtonProps {
  href: string;
  label: string;
  variant?: Variant;
  fullWidth?: boolean;
  className?: string;
  iconSize?: number;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
  outline: 'border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700',
  gradient: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-md',
};

export function WhatsAppButton({
  href,
  label,
  variant = 'primary',
  fullWidth = false,
  className,
  iconSize = 18,
}: WhatsAppButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-semibold transition-colors',
        variantClasses[variant],
        fullWidth && 'w-full',
        className,
      )}
    >
      <MessageCircle size={iconSize} />
      <span>{label}</span>
    </a>
  );
}

