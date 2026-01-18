export function isDateValid(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export function isDateExpired(dateString: string): boolean {
  if (!isDateValid(dateString)) return true;
  const targetDate = new Date(dateString);
  const now = new Date();
  return targetDate.getTime() < now.getTime();
}

export function formatDate(dateString: string): string {
  if (!isDateValid(dateString)) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
