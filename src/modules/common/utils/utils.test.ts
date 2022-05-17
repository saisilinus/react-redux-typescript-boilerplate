import checkOneOf from './checkOneOf';
import formatNames from './formatName';
import isEmpty from './isEmpty';
import sanitize from './sanitize';
import splitName from './splitName';

describe('utility functions', () => {
  describe('checkOneOf', () => {
    it('should return false if at least one value is not 0 or an empty string', async () => {
      expect(checkOneOf(['linus', '', 0, 'saisi'])).toBe(false);
    });
    it('should return true if all values are either 0 or an empty string', async () => {
      expect(checkOneOf(['', '', 0, ''])).toBe(true);
    });
    it('should return true if all values are 0', async () => {
      expect(checkOneOf([0, 0, 0])).toBe(true);
    });
    it('should return true if all values are empty strings', async () => {
      expect(checkOneOf(['', '', ''])).toBe(true);
    });
  });

  describe('formatName', () => {
    it('should return a string with all substrings in Title Case', async () => {
      expect(formatNames(['linus', 'saisi'])).toBe('Linus Saisi');
    });
  });

  describe('isEmpty', () => {
    it('should return true if an object is empty', async () => {
      expect(isEmpty({})).toBe(true);
    });
    it('should return false if the object is not empty', async () => {
      expect(isEmpty({ someKey: 'someValue' })).toBe(false);
    });
  });

  describe('sanitize', () => {
    it('should remove entries whose values are empty strings or 0', async () => {
      expect(sanitize({ name: 'linus', age: 0, email: '' })).toEqual({ name: 'linus' });
    });
  });

  describe('splitName', () => {
    it('should split a string using space', async () => {
      expect(splitName('Linus Saisi')[0]).toBe('Linus');
      expect(splitName('Linus Saisi')[1]).toBe('Saisi');
    });
  });
});
