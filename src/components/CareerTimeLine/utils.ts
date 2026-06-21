/**
 * Auto-generates company initials from company name
 * - For single-word names: returns first 2 uppercase letters (e.g., "KUBO" → "KU")
 * - For multi-word names: returns first 2 letters of first word (e.g., "Sophos Solutions" → "SO")
 */
export function generateInitials(companyName: string): string {
  const trimmed = companyName.trim();
  const words = trimmed.split(/\s+/);

  // Both single and multi-word: take first 2 letters of first word
  return words[0].substring(0, 2).toUpperCase();
}
