import { FC } from 'react';
import { FormInput } from 'shards-react';

interface Props {
  label: string;
  name: string;
  value: number;
  handleChange: any;
  className?: string;
  placeholder: string;
}

export const TimeUnitInput: FC<Props> = ({
  label,
  name,
  value,
  handleChange,
  className,
  placeholder,
}) => {
  const getValue = (value: number) => {
    return value < 0 ? 0 : value;
  };

  return (
    <div className={`${className} wrapper`}>
      <label>{label}</label>
      <FormInput
        value={getValue(value)}
        type="number"
        min="0"
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
      />
      <style jsx>{`
        .wrapper {
          position: relative;
        }
        label {
          margin-bottom: 4px;
          font-size: 12px;
          font-weight: bold;
          position: absolute;
          top: -12px;
          left: 4px;
          background: #fff;
          padding: 2px;
        }
      `}</style>
    </div>
  );
};
