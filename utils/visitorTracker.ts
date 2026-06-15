export type VisitRecord = {
  id: string;
  date: string;
  time: string;
  page: string;
  device: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  sessionId: string;
  isReturning: boolean;
};

export type VisitorSession = {
  sessionId: string;
  startTime: string;
  pages: string[];
};

const VISITS_KEY = 'egu_visits';
const SESSION_KEY = 'egu_session';
const VISITOR_KEY = 'egu_visitor_id';

function getOrCreateVisitorId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) { id = `v_${Date.now()}_${Math.random().toString(36).slice(2)}`; localStorage.setItem(VISITOR_KEY, id); }
  return id;
}

function getDevice(): 'mobile' | 'tablet' | 'desktop' {
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

function getBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edg')) return 'Edge';
  return 'Other';
}

function getOrCreateSession(): string {
  if (typeof window === 'undefined') return '';
  const stored = sessionStorage.getItem(SESSION_KEY);
  if (stored) return stored;
  const sid = `s_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  sessionStorage.setItem(SESSION_KEY, sid);
  return sid;
}

export function trackVisit(page: string): void {
  if (typeof window === 'undefined') return;
  const visitorId = getOrCreateVisitorId();
  const sessionId = getOrCreateSession();
  const visits = getVisits();
  const isReturning = visits.some((v) => v.id !== visitorId && v.sessionId !== sessionId) || visits.length > 0;

  const now = new Date();
  const record: VisitRecord = {
    id: visitorId,
    date: now.toLocaleDateString('en-IN'),
    time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    page,
    device: getDevice(),
    browser: getBrowser(),
    sessionId,
    isReturning,
  };

  const updated = [record, ...visits].slice(0, 500);
  try { localStorage.setItem(VISITS_KEY, JSON.stringify(updated)); } catch { /* quota */ }
}

export function getVisits(): VisitRecord[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(VISITS_KEY) ?? '[]'); } catch { return []; }
}

export function clearVisits(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(VISITS_KEY);
}

export function getVisitorStats() {
  const visits = getVisits();
  const sessions = new Set(visits.map((v) => v.sessionId));
  const returning = visits.filter((v) => v.isReturning).length;
  const byDevice = visits.reduce<Record<string, number>>((acc, v) => {
    acc[v.device] = (acc[v.device] ?? 0) + 1;
    return acc;
  }, {});
  const byPage = visits.reduce<Record<string, number>>((acc, v) => {
    acc[v.page] = (acc[v.page] ?? 0) + 1;
    return acc;
  }, {});
  const byBrowser = visits.reduce<Record<string, number>>((acc, v) => {
    acc[v.browser] = (acc[v.browser] ?? 0) + 1;
    return acc;
  }, {});

  const todayStr = new Date().toLocaleDateString('en-IN');
  const todayVisits = visits.filter((v) => v.date === todayStr).length;

  return {
    total: visits.length,
    uniqueSessions: sessions.size,
    returning,
    todayVisits,
    byDevice,
    byPage,
    byBrowser,
    recent: visits.slice(0, 50),
  };
}
