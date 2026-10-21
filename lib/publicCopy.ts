export const CANONICAL_ORIGIN = 'https://edugeniushub.in';

export const TRADEMARK_DISCLAIMER =
  'EduGenius Hub is an independent service and is not affiliated with, endorsed by, or sponsored by Turnitin LLC or any other brand mentioned. All trademarks belong to their owners.';

export const CATEGORY_LABELS: Record<string, string> = {
  reports: 'Reports',
  ai_tools: 'AI tools',
  ott: 'OTT',
  accounts: 'Accounts',
  services: 'Academic help',
};

export function categoryLabel(value?: string | null): string {
  if (!value) return '';
  return CATEGORY_LABELS[value] || value.replace(/_/g, ' ');
}

export function publicName(name?: string | null): string {
  if (!name) return '';
  return name.replace(/^\s*official\s+/i, '').replace(/\s{2,}/g, ' ').trim();
}

export function publicDescription(text?: string | null): string {
  if (!text) return '';
  return text
    .replace(/\bofficial\b/gi, '')
    .replace(/guaranteed uptime and/gi, '')
    .replace(/guaranteed uptime/gi, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([,.])/g, '$1')
    .trim();
}

export function pricePeriod(planType?: string | null, duration?: string | null): string {
  const raw = (duration || planType || '').trim().toLowerCase();
  if (!raw || raw === 'inquiry' || raw.includes('one-time') || raw.includes('one time') || raw.includes('lifetime')) {
    return '';
  }
  if (raw.includes('6') && raw.includes('month')) return '/6 months';
  if (raw === 'monthly' || raw === '1 month' || raw === 'month') return '/month';
  if (raw.includes('year') || raw.includes('12 month')) return '/year';
  return '';
}
