import { FC } from 'react';
import { useRouter } from 'next/router';
import range from 'lodash/range';
import classNames from 'classnames';

interface Props {
  totalPages: number;
}

export const Pagination: FC<Props> = ({ totalPages }) => {
  const { query, pathname } = useRouter();

  const currentPage = Number(query.page || 1);

  const setNewPage = (page: number) => {
    const newQuery: any = {
      ...(query || {}),
      page: page.toString(),
    };
    if (page <= 1) {
      delete newQuery.page;
    }
    const queryString = new URLSearchParams(newQuery).toString();
    window.location.href = `${pathname}${queryString ? `?${queryString}` : ''}`;
  };

  if (totalPages < 2) return null;

  return (
    <nav aria-label="...">
      <ul className="pagination justify-content-end pagination-md">
        <li
          onClick={() => setNewPage(currentPage - 1)}
          className={classNames('page-item', { disabled: currentPage < 2 })}
        >
          <a className="page-link">Prev</a>
        </li>
        {range(1, totalPages + 1).map((page) => (
          <li
            key={page}
            className={classNames('page-item', {
              active: page === currentPage,
            })}
          >
            <span onClick={() => setNewPage(page)} className="page-link">
              {page}
            </span>
          </li>
        ))}
        <li
          onClick={() => setNewPage(currentPage + 1)}
          className={classNames('page-item', {
            disabled: currentPage > totalPages - 1,
          })}
        >
          <a className="page-link">Next</a>
        </li>
      </ul>
    </nav>
  );
};
