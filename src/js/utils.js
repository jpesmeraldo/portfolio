/**
 * Formats ISO dates (e.g. "2026-03" or "2026-03-15") into Portuguese editorial format ("Março de 2026").
 * If the input is already formatted or custom, it capitalizes the first letter cleanly.
 */
export function formatDatePT(rawDate) {
  if (!rawDate || typeof rawDate !== 'string') return '';

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  // Match ISO format YYYY-MM or YYYY-MM-DD
  const isoMatch = rawDate.trim().match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);
  if (isoMatch) {
    const year = isoMatch[1];
    const monthIndex = parseInt(isoMatch[2], 10) - 1;
    if (monthIndex >= 0 && monthIndex < 12) {
      const monthName = months[monthIndex];
      return `${monthName} de ${year}`;
    }
  }

  // Fallback for non-ISO or pre-formatted date strings
  return rawDate.charAt(0).toUpperCase() + rawDate.slice(1);
}
