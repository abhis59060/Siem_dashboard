// Format number with commas for thousands
export function formatNumber(num) {
  if (!num && num !== 0) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Format date/time string for dashboard
export function formatDateTime(date) {
  const d = new Date(date);
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// Truncate long strings with ellipsis
export function truncateString(str, maxLength = 25) {
  if (!str) return "";
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}
