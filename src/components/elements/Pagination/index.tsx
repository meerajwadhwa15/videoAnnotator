import { FC } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import ReactPaginate from 'react-paginate';
import style from './style.module.scss';
import classNames from 'classnames';

interface Props {
  unit: string;
  totalPage: number;
  totalRecord: number;
  showTotalRecords?: boolean;
}

export const Pagination: FC<Props> = ({
  totalPage,
  totalRecord,
  unit,
  showTotalRecords = true,
}) => {
  const { query, pathname } = useRouter();
  const { t } = useTranslation('common');
  const currentPage = Number(query.page || 1);

  const setNewPage = ({ selected }) => {
    const page = selected + 1;
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
      <p className={style.totalRecordWrapper}>
        {showTotalRecords && totalRecord > 0 && (
          <strong>
            {t('common:totalItem', { count: totalRecord })} {unit}.
          </strong>
        )}
      </p>

      {totalPage > 1 && (
        <ReactPaginate
          containerClassName={style.paginationContainer}
          previousLabel={<i className="material-icons">arrow_back</i>}
          nextLabel={<i className="material-icons">arrow_forward</i>}
          activeClassName="text-white bg-primary font-weight-bold"
          onPageChange={setNewPage}
          disabledClassName={style.disabled}
          previousClassName={classNames(style.paginateItem, 'pl-2 pr-2')}
          nextClassName={classNames(style.paginateItem, 'pl-2 pr-2')}
          pageClassName={classNames(style.paginateItem)}
          forcePage={currentPage - 1}
          onPageActive={() => null}
          pageCount={totalPage}
          marginPagesDisplayed={3}
          pageRangeDisplayed={4}
        />
      )}
    </nav>
  );
};
