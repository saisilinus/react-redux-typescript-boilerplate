/**
 * Calculates page numbers for Pagination Component
 * @param totalPages total number of pages
 * @param currentPage current page requested by user
 * @returns {number[]} an array of page numbers
 */
const getPages = (totalPages: number, currentPage: number): number[] => {
  let pageArr: number[] = [];
  if (totalPages > 1) {
    if (totalPages <= 9) {
      let i = 1;
      while (i <= totalPages) {
        pageArr.push(i);
        i += 1;
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (currentPage <= 5) {
        pageArr = [1, 2, 3, 4, 5, 6, 7, 8, 0, totalPages];
      } else if (totalPages - currentPage <= 4) {
        pageArr = [
          1,
          0,
          totalPages - 7,
          totalPages - 6,
          totalPages - 5,
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pageArr = [
          1,
          0,
          currentPage - 3,
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
          currentPage + 3,
          0,
          totalPages,
        ];
      }
    }
  }
  return pageArr;
};

export default getPages;
