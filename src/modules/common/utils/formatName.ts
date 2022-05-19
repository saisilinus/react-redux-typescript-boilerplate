/**
 * Returns an array of strings in Title Case
 * @param {string[]} names array of strings
 * @returns {string} string in Title Case
 */
const formatNames = (names: string[]): string => names.map((i) => i.charAt(0).toUpperCase() + i.substring(1)).join(' ');

export default formatNames;
