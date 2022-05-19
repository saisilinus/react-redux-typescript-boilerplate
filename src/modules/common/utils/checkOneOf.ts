/**
 * Checks if one the values is not 0 or an empty string
 * @param {any[]}values values to be checked
 * @returns {Boolean} false if one of the values is not 0 or an empty string
 */
const checkOneOf = (values: any[]): boolean => values.every((value) => value === '' || value === 0);

export default checkOneOf;
