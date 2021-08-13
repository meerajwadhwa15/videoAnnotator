import { Input } from 'components/elements';
import { useTranslation } from 'next-i18next';
import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Button } from 'shards-react';
import { dispatchVerifyEmail } from '../actions';
import { loadingSelector } from '../slice';
import { ResendPasscode } from './ResendPasscode';

export const Verify = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const loading = useAppSelector(loadingSelector);
  const [passcode, setPasscode] = useState<string>('');
  const [error, setError] = useState<string>('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const token = passcode.trim();
    if (!token) {
      return setError(t('signup:passcodeIsRequired'));
    }
    return dispatch(dispatchVerifyEmail({ token }));
  };

  return (
    <div>
      <p>{t('signup:verifyEmailDesc')}</p>
      <form onSubmit={onSubmit} className="d-flex">
        <div className="flex-grow-1 mr-2">
          <Input
            errorMessage={error}
            value={passcode}
            name="passcode"
            onChange={(e) => setPasscode(e.target.value)}
            placeholder={t('signup:enterPasscode')}
          />
        </div>
        <div>
          <Button
            type="submit"
            disabled={loading}
            onClick={onSubmit}
            title="re-sent"
          >
            {loading ? t('login:loadingSigninTitle') : t('common:submitButton')}
          </Button>
        </div>
      </form>
      <ResendPasscode />
    </div>
  );
};
