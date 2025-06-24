export function generateShortCode(): string {
  return Math.random().toString(36).substring(2, 8);
}
