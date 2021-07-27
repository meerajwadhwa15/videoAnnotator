import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from 'redux/hooks';
import { messageSelector } from './slice';

export function useVideoToastMessage({ toggleEditModal, clearSearchKeyword }) {
  const message = useAppSelector(messageSelector);
  const { t } = useTranslation('home');
  useEffect(() => {
    if (message.type === 'success' && message.text === 'edit_video_success') {
      toast.success(t('editSuccessMsg'));
      toggleEditModal();
      clearSearchKeyword();
    }

    if (message.type === 'error' && message.text === 'edit_video_error') {
      toast.error(t('editErrorMsg'));
    }

    if (message.type === 'success' && message.text === 'create_video_success') {
      toast.success(t('createSuccessMsg'));
      clearSearchKeyword();
      toggleEditModal();
    }

    if (message.type === 'error' && message.text === 'create_video_error') {
      toast.error(t('createErrorMsg'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);
}
