import React, { useEffect, useState } from 'react';
import axios from 'axios';

type PaginationProps = {
  apiEndPoint: string;
  page: number;
  limit: number;
  getHeroes: Function;
};

export const Pagination: React.FC<PaginationProps> = ({
  apiEndPoint,
  page,
  limit,
  getHeroes,
}) => {
  let [currentPage, setCurrentPage] = useState<number>(1);
  let [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    axios
      .get(`${apiEndPoint}?p=${page}&l=${limit}`)
      .then((res) => {
        const { totalPages, heroes } = res.data;
        setTotalPages(totalPages);
        getHeroes(heroes);
      })
      .catch((err) => console.log(err));
  }, []);

  const generateNumOfPages = () => {
    const pages = [];
    for (let i = 2; i <= totalPages - 1; i++) {
      pages.push(i);
    }
    return pages;
  };

  const generateClassName = (page: number) => {
    if (page === currentPage) {
      return 'pagination-link is-current';
    }
    if (
      (page > currentPage && page < currentPage + 3) ||
      (page >= totalPages - 3 && page < currentPage + 3)
    ) {
      return 'pagination-link';
    }
    return 'pagination-link is-hidden';
  };

  const pageSelectionHandler = (page: number) => {
    axios
      .get(`${apiEndPoint}?p=${page}&l=${limit}`)
      .then((res) => {
        const { totalPages, heroes } = res.data;
        setTotalPages(totalPages);
        getHeroes(heroes);
      })
      .catch((err) => console.log(err));
    setCurrentPage(page);
  };

  const next = () => {
    if (currentPage === totalPages) {
      return;
    }
    pageSelectionHandler(currentPage + 1);
    return setCurrentPage((currentPage += 1));
  };

  const prev = () => {
    if (currentPage === 1) {
      return;
    }
    pageSelectionHandler(currentPage - 1);
    return setCurrentPage((currentPage -= 1));
  };

  return (
    <div className="footer" style={{ padding: '1.5rem' }}>
      <nav
        className="pagination is-centered"
        role="navigation"
        aria-label="pagination"
      >
        <a
          className="pagination-previous"
          title="This is the first page"
          onClick={() => prev()}
        >
          Previous
        </a>
        <a className="pagination-next" onClick={() => next()}>
          Next page
        </a>
        <ul className="pagination-list">
          <li>
            <a
              onClick={() => pageSelectionHandler(1)}
              className={
                1 === currentPage
                  ? 'pagination-link is-current'
                  : 'pagination-link'
              }
              aria-label={1 === currentPage ? `Page ${1}` : `Goto page ${1}`}
            >
              {1}
            </a>
          </li>
          {totalPages < 3 ? null : (
            <li>
              <span className="pagination-ellipsis">&hellip;</span>
            </li>
          )}
          {generateNumOfPages().map((page, ind) => {
            return (
              <li key={ind}>
                <a
                  onClick={() => pageSelectionHandler(page)}
                  className={generateClassName(page)}
                  aria-label={
                    page === currentPage ? `Page ${page}` : `Goto page ${page}`
                  }
                >
                  {page}
                </a>
              </li>
            );
          })}
          {totalPages < 3 ? null : (
            <li>
              <span className="pagination-ellipsis">&hellip;</span>
            </li>
          )}
          {totalPages < 2 ? null : (
            <li>
              <a
                onClick={() => pageSelectionHandler(totalPages)}
                className={
                  totalPages === currentPage
                    ? 'pagination-link is-current'
                    : 'pagination-link'
                }
                aria-label={
                  totalPages === currentPage
                    ? `Page ${totalPages}`
                    : `Goto page ${totalPages}`
                }
              >
                {totalPages}
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
