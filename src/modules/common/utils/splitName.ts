/**
 * Splits string into an array of strings using space
 * @param name name
 * @returns {string[]} split name
 */
const splitName = (name: string | undefined): string[] => (name ? name.split(' ') : ['', '']);

export default splitName;
