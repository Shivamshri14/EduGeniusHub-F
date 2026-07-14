export type SupportStatus = {
  isOnline: boolean;
  text: string;
  badgeColor: string;
  timeText: string;
};

export function getSupportStatus(): SupportStatus {
  if (typeof window === 'undefined') {
    return {
      isOnline: true,
      text: 'Online Now',
      badgeColor: 'bg-green-500',
      timeText: 'Fulfillment in 5–15 mins'
    };
  }
  const hours = new Date().getHours();
  const isOnline = hours >= 9 && hours < 23; // 9 AM to 11 PM
  return {
    isOnline,
    text: isOnline ? 'Online Now' : 'Support Offline',
    badgeColor: isOnline ? 'bg-green-500' : 'bg-amber-500',
    timeText: isOnline ? 'Fulfillment in 5–15 mins' : 'Delivered within 1–2 hours in the morning'
  };
}
