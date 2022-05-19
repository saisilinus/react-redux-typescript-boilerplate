/**
 * Generates a formatted year for display
 * @param initialYear the initial year
 * @returns {string} formatted year
 */
const formattedYear = (initialYear: number): string => {
  const currentYear = new Date().getFullYear();
  return initialYear === currentYear ? initialYear.toString() : `${currentYear} - ${initialYear}`;
};

export default formattedYear;
