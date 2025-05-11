// src/utils/helpers.ts

/**
 * Format numbers for display (e.g., 1,000 becomes 1K, 1,000,000 becomes 1M).
 * @param num - The number to format.
 * @returns A formatted string representation of the number.
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};
