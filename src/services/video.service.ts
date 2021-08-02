import { GetServerSidePropsContext } from 'next';
import { requestServer } from 'utils/apiClient';
import { API_ENDPOINT } from 'utils/constants';

export const fetchVideoList = ({
  context,
}: {
  context: GetServerSidePropsContext;
}) => {
  const { query } = context;
  const { page, search, categoryId, subcategoryId } = query;
  const pageNo = isNaN(Number(page)) ? 0 : Number(page) - 1;
  return requestServer.get({
    url: API_ENDPOINT.video,
    context,
    params: {
      pageNo,
      keyword: search || '',
      categoryId,
      subcategoryId,
    },
  });
};
