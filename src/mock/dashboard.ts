import { format, formatDistance } from "date-fns";

export function generateRandomUptime() {
  const now = new Date();
  const randomPastTime = new Date(
    now.getTime() - Math.random() * 48 * 60 * 60 * 1000
  );

  return formatDistance(randomPastTime, now, { includeSeconds: true });
}

export function generateRandomDate(): string {
  const randomPastDate = new Date(
    Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
  );

  return format(randomPastDate, "MM/dd/yyyy");
}
