import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { FormInput } from 'shards-react';
import style from './style.module.scss';

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

export const InputTime: FC<Props> = ({
  errorMessage,
  label,
  name,
  value,
  handleChange,
}) => {
  const { t } = useTranslation(['common']);
  const getValue = (value: number) => {
    return value < 0 ? 0 : value;
  };

  return (
    <div className={style.inputTime}>
      <label>{label}</label>
      <div className="d-flex">
        <FormInput
          value={getValue(value.hour)}
          type="number"
          min="0"
          onChange={handleChange}
          name={`${name}.hour`}
          className="mr-4"
          placeholder={t('common:hour')}
        />
        <FormInput
          value={getValue(value.minute)}
          type="number"
          min="0"
          onChange={handleChange}
          name={`${name}.minute`}
          className="mr-4"
          placeholder={t('common:minute')}
        />
        <FormInput
          value={getValue(value.second)}
          type="number"
          min="0"
          onChange={handleChange}
          name={`${name}.second`}
          placeholder={t('common:second')}
        />
      </div>
      {errorMessage && <p className="error-text">{errorMessage}</p>}
    </div>
  );
};
