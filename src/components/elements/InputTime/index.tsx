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
  return (
    <div className={style.inputTime}>
      <label>{label}</label>
      <div className="d-flex">
        <FormInput
          value={value.hour}
          type="number"
          onChange={handleChange}
          name={`${name}.hour`}
          className="mr-4"
          placeholder="Hour"
        />
        <FormInput
          value={value.minute}
          type="number"
          onChange={handleChange}
          name={`${name}.minute`}
          className="mr-4"
          placeholder="Minute"
        />
        <FormInput
          value={value.second}
          type="number"
          onChange={handleChange}
          name={`${name}.second`}
          placeholder="Second"
        />
      </div>
      {errorMessage && <p className="error-text">{errorMessage}</p>}
    </div>
  );
};
