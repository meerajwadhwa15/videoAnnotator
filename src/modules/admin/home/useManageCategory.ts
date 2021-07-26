import { Category } from 'models/category.modle';
import { useEffect, useState } from 'react';
import { request } from 'utils/apiClient';

export function useManageCategory({ category }) {
  const [subs, setSubs] = useState<Record<string, Category[]>>({});
  const [loading, setLoadingCategory] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingCategory(true);
        const result: any = await request.get(`category/${category}/sub`);
        return setSubs({ ...subs, [category]: result });
      } catch (error) {
        setSubs(subs);
      } finally {
        setLoadingCategory(false);
      }
    };
    if (category && !subs[category]) {
      fetchData();
    }
  }, [category, subs]);

  return { subs, loadingSubs: loading };
}
