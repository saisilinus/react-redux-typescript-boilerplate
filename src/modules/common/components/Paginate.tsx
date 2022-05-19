import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import getPages from '../utils/getPages';

type Props = {
  currentPage: number;
  children: React.ReactNode;
  totalPages: number;
  // eslint-disable-next-line no-unused-vars
  onPageClick: (page: number) => void;
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
