
export function truncate(str: string, n: number) {
  if (!str) return '';
  return str.length > 2 * n 
    ? str.substring(0, n) + '...' + str.substring(str.length - n) 
    : str;
}
