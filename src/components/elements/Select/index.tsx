import { ChangeEvent, FC, ReactNode } from 'react';
import { FormSelect, FormGroup } from 'shards-react';

type ValueType = string | number;

interface Props {
  label: string;
  name: string;
  errorMessage?: ReactNode;
  value: ValueType;
  className?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ label: string; value: ValueType }>;
}

const Select: FC<Props> = ({
  label,
  name,
  options,
  errorMessage,
  onChange,
  className,
  value,
}) => {
  return (
    <FormGroup className={className}>
      <label>{label}</label>
      <FormSelect
        value={value}
        defaultValue={null}
        onChange={onChange}
        name={name}
      >
        <option style={{ display: 'none' }} />
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FormSelect>
      {errorMessage && <p className="error-text">{errorMessage}</p>}
    </FormGroup>
  );
};

export default Select;
