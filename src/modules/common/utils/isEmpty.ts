/**
 * Checks if an object is empty
 * @param obj object
 * @returns {Boolean} true if an object is empty
 */
const isEmpty = (obj: Record<string, any>): boolean => Object.keys(obj).length === 0;

export default isEmpty;
