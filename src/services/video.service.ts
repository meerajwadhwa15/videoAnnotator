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
  return requestServer.get({
    url: API_ENDPOINT.video,
    context,
    params: {
      pageNo: page || 0,
      keyword: search || '',
      categoryId,
      subcategoryId,
    },
  });
};
