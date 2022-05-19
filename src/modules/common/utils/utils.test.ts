import checkOneOf from './checkOneOf';
import formatErrorMessage from './formatErrorMessage';
import formatNames from './formatName';
import formattedYear from './formattedYear';
import getPages from './getPages';
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
    it('should return an array of empty strings if the name is undefined', async () => {
      expect(splitName(undefined)[0]).toBe('');
    });
  });

  describe('formatErrorMessage', () => {
    it('should return the specified error if the response includes the message field', () => {
      expect(formatErrorMessage({ code: 400, message: 'User Not Found' })).toBe('User Not Found');
    });
    it('should return the specified error message if error is just a string', () => {
      expect(formatErrorMessage('User Not Found')).toBe('User Not Found');
    });
    it('should return "unknown server error" if the response is not a string and does not match IErrorResponse', () => {
      expect(formatErrorMessage(['<html>SomeError</html>'])).toBe('Unknown server error');
    });
  });

  describe('getPages', () => {
    it('should return an empty array if totalPages is 0', () => {
      expect(getPages(0, 1)).toEqual([]);
    });
    it('should return an empty array if totalPages is 1', () => {
      expect(getPages(1, 1)).toEqual([]);
    });
    it('should return [1 to totalPages] if 1<totalPages<=9', () => {
      expect(getPages(5, 1)).toEqual([1, 2, 3, 4, 5]);
    });
    it('should return [1 to 8, 0, totalPages] if totalPages>9 and currentPage<5', () => {
      expect(getPages(15, 3)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 0, 15]);
    });
    it('should return [1, 0, totalPages - 7 ... totalPages - 1, totalPages] if totalPages>9 and totalPages - currentPage <= 4 and currentPage > 5', () => {
      expect(getPages(15, 12)).toEqual([1, 0, 8, 9, 10, 11, 12, 13, 14, 15]);
    });
    it('should return [1, 0, currentPage - 3 ... currentPage ... currentPage + 3, 0, totalPages] if totalPages>9 and totalPages - currentPage > 4 and currentPage > 5', () => {
      expect(getPages(15, 8)).toEqual([1, 0, 5, 6, 7, 8, 9, 10, 11, 0, 15]);
    });
  });

  describe('formattedYear', () => {
    it('should return initial year if the initial year is equal to the current year', () => {
      expect(formattedYear(2022)).toBe('2022');
    });
    it('should return initial year - current year if the initial year is not equal to the current year', () => {
      expect(formattedYear(2024)).toBe('2022 - 2024');
    });
  });
});
