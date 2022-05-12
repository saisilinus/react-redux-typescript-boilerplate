import isEmpty from './isEmpty';

const sanitize = (obj: Record<string, any>) =>
  // eslint-disable-next-line no-unused-vars
  Object.fromEntries(Object.entries(obj).filter(([key, value]) => value !== '' && value !== 0));

export const sanitizeUpdateData = (obj: Record<string, any>) => {
  const sanitizedData = sanitize(obj);
  return isEmpty(sanitizedData) ? null : sanitizedData;
};

export default sanitize;
