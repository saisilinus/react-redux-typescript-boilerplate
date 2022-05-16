import checkOneOf from './checkOneOf';
import formatNames from './formatName';
import isEmpty from './isEmpty';
import sanitize from './sanitize';
import splitName from './splitName';

describe('utility functions', () => {
  describe('checkOneOf', () => {
    it('should return false if at least one value is not 0 or an empty string', async () => {
      const result = checkOneOf(['linus', '', 0, 'saisi']);
      expect(result).toBe(false);
    });
    it('should return true if all values are either 0 or an empty string', async () => {
      const result = checkOneOf(['', '', 0, '']);
      expect(result).toBe(true);
    });
    it('should return true if all values are 0', async () => {
      const result = checkOneOf([0, 0, 0]);
      expect(result).toBe(true);
    });
    it('should return true if all values are empty strings', async () => {
      const result = checkOneOf(['', '', '']);
      expect(result).toBe(true);
    });
  });

  describe('formatName', () => {
    it('should return a string with all substrings in Title Case', async () => {
      const result = formatNames(['linus', 'saisi']);
      expect(result).toBe('Linus Saisi');
    });
  });

  describe('isEmpty', () => {
    it('should return true if an object is empty', async () => {
      const result = isEmpty({});
      expect(result).toBe(true);
    });
    it('should return false if the object is not empty', async () => {
      const result = isEmpty({ someKey: 'someValue' });
      expect(result).toBe(false);
    });
  });

  describe('sanitize', () => {
    it('should remove entries whose values are empty strings or 0', async () => {
      const result = sanitize({ name: 'linus', age: 0, email: '' });
      expect(result).toEqual({ name: 'linus' });
    });
  });

  describe('splitName', () => {
    it('should split a string using space', async () => {
      const result = splitName('Linus Saisi');
      expect(result[0]).toBe('Linus');
      expect(result[1]).toBe('Saisi');
    });
  });
});
