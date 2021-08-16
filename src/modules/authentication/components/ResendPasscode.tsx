import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from 'redux/hooks';
import { request } from 'utils/apiClient';
import { API_ENDPOINT } from 'utils/constants';

const MAX_COUNT = 60;

export const ResendPasscode = () => {
  const [count, setCount] = useState<number>(MAX_COUNT);
  const [loading, setLoading] = useState<boolean>(false);
  const enabled = !loading && count === 0;
  const { t } = useTranslation();
  const email = useAppSelector((state) => state.authClient.confirmEmail);

  useEffect(() => {
    if (count === 0) return;
    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [count]);

  const handleClick = async () => {
    if (!enabled) return;
    setLoading(true);
    try {
      await request.post(`${API_ENDPOINT.resetPasscode}?email=${email}`);
      toast.success(t('signup:resendPasscodeSuccess'));
      setCount(MAX_COUNT);
    } catch {
      toast.error(t('signup:resendPasscodeFail'));
    } finally {
      setLoading(false);
    }
  };

  const text = () => {
    if (loading) return 'Loading...';

    if (count === 0) return t('signup:resendPasscode');

    return t('signup:resendPasscodeCountDown', { count });
  };

  if (!email) return null;

  return (
    <p
      onClick={handleClick}
      style={{ opacity: enabled ? 1 : 0.6 }}
      className={classNames(
        { 'cursor-pointer': enabled },
        { 'hover-underline': enabled }
      )}
    >
      {text()}
    </p>
  );
};
