import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import style from './style.module.scss';
import { TimeUnitInput } from './TimeUnitInput';

interface Props {
  label: string;
  name: string;
  value: {
    hour: number;
    minute: number;
    second: number;
  };
  handleChange: any;
  errorMessage?: any;
}

const InputTime: FC<Props> = ({
  errorMessage,
  label,
  name,
  value,
  handleChange,
}) => {
  const { t } = useTranslation(['common']);

  return (
    <div className={style.inputTime}>
      <label>{label}</label>
      <div className="d-flex">
        <TimeUnitInput
          label={t('common:hour')}
          value={value.hour}
          handleChange={handleChange}
          name={`${name}.hour`}
          className="mr-2"
          placeholder={t('common:hour')}
        />

        <TimeUnitInput
          label={t('common:minute')}
          value={value.minute}
          handleChange={handleChange}
          name={`${name}.minute`}
          className="mr-2"
          placeholder={t('common:minute')}
        />
        <TimeUnitInput
          label={t('common:second')}
          value={value.second}
          handleChange={handleChange}
          name={`${name}.second`}
          placeholder={t('common:second')}
        />
      </div>
      {errorMessage && <p className="error-text">{errorMessage}</p>}
    </div>
  );
};

export default InputTime;
