import { GetServerSidePropsContext } from 'next';
import { requestServer } from 'utils/apiClient';
import { API_ENDPOINT, PAGE_SIZE } from 'utils/constants';

export const fetchVideoList = (
  {
    context,
  }: {
    context: GetServerSidePropsContext;
  },
  client = false
) => {
  const { query } = context;
  const { page, search, categoryId, subcategoryId } = query;
  const pageNo = isNaN(Number(page)) ? 0 : Number(page) - 1;
  const endpoint = client ? API_ENDPOINT.clientVideoList : API_ENDPOINT.video;

  return requestServer.get({
    url: endpoint,
    context,
    params: {
      pageSize: PAGE_SIZE,
      pageNo,
      keyword: search || '',
      categoryId,
      subcategoryId,
    },
  });
};
