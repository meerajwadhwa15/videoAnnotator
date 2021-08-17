import { GetServerSidePropsContext } from 'next';
import { requestServer } from 'utils/apiClient';
import { API_ENDPOINT, PAGE_SIZE, CONSUMER_PAGE_SIZE } from 'utils/constants';

export const fetchVideoList = (
  {
    context,
  }: {
    context: GetServerSidePropsContext;
  },
  client = false
) => {
  const { query } = context;
  const { page, search, categoryId, subcategoryId, playlist } = query;
  const pageNo = isNaN(Number(page)) ? 0 : Number(page) - 1;
  const endpoint = client ? API_ENDPOINT.clientVideoList : API_ENDPOINT.video;
  const itemPerPage = client ? CONSUMER_PAGE_SIZE : PAGE_SIZE;

  return requestServer.get({
    url: endpoint,
    context,
    params: {
      playlistId: playlist,
      pageSize: itemPerPage,
      pageNo,
      keyword: search || '',
      categoryId,
      subcategoryId,
    },
  });
};
