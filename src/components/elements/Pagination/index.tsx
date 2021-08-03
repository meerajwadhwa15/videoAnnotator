import { FC } from 'react';
import { useRouter } from 'next/router';
import range from 'lodash/range';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

interface Props {
  unit: string;
  totalPage: number;
  totalRecord: number;
}

export const Pagination: FC<Props> = ({ totalPage, totalRecord, unit }) => {
  const { query, pathname } = useRouter();
  const { t } = useTranslation('common');
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

  return (
    <nav aria-label="..." className="d-flex justify-content-between">
      {totalRecord > 0 && (
        <p>
          <strong>
            {t('common:totalItem', { count: totalRecord })} {unit}.
          </strong>
        </p>
      )}
      {totalPage > 1 && (
        <ul className="pagination justify-content-end pagination-md">
          <li
            onClick={() => setNewPage(currentPage - 1)}
            className={classNames('page-item', { disabled: currentPage < 2 })}
          >
            <a className="page-link">Prev</a>
          </li>
          {range(1, totalPage + 1).map((page) => (
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
              disabled: currentPage > totalPage - 1,
            })}
          >
            <a className="page-link">Next</a>
          </li>
        </ul>
      )}
    </nav>
  );
};
