import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';

type Props = {
  currentPage: number;
  children: React.ReactNode;
  totalPages: number;
  // eslint-disable-next-line no-unused-vars
  onPageClick: (page: number) => void;
};

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

const Paginate = ({ currentPage, children, totalPages, onPageClick }: Props) => {
  const [pageArray, setPageArray] = useState<number[]>([]);

  useEffect(() => {
    setPageArray(getPages(totalPages, currentPage));
  }, [currentPage, totalPages]);

  return (
    <>
      {children}
      <div className="mt-4">
        <Pagination className="justify-content-center">
          {pageArray.map((ele, ind) => {
            const toReturn = [];

            if (ind === 0) {
              toReturn.push(
                <Pagination.First
                  key="firstpage"
                  onClick={
                    currentPage === 1
                      ? () => {}
                      : () => {
                          onPageClick(1);
                        }
                  }
                />
              );

              toReturn.push(
                <Pagination.Prev
                  key="prevpage"
                  onClick={
                    currentPage === 1
                      ? () => {}
                      : () => {
                          onPageClick(currentPage - 1);
                        }
                  }
                />
              );
            }

            // eslint-disable-next-line react/no-array-index-key
            if (ele === 0) toReturn.push(<Pagination.Ellipsis key={ind} />);
            else
              toReturn.push(
                <Pagination.Item
                  // eslint-disable-next-line react/no-array-index-key
                  key={ind}
                  active={currentPage === ele}
                  onClick={
                    currentPage === ele
                      ? () => {}
                      : () => {
                          onPageClick(ele);
                        }
                  }
                >
                  {ele}
                </Pagination.Item>
              );

            if (ind === pageArray.length - 1) {
              toReturn.push(
                <Pagination.Next
                  key="nextpage"
                  onClick={
                    currentPage === ele
                      ? () => {}
                      : () => {
                          onPageClick(currentPage + 1);
                        }
                  }
                />
              );

              toReturn.push(
                <Pagination.Last
                  key="lastpage"
                  onClick={
                    currentPage === ele
                      ? () => {}
                      : () => {
                          onPageClick(ele);
                        }
                  }
                />
              );
            }

            return toReturn;
          })}
        </Pagination>
      </div>
    </>
  );
};

export default Paginate;
