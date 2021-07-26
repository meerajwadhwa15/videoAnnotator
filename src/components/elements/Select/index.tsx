import { ChangeEvent, FC } from 'react';
import { FormSelect, FormGroup } from 'shards-react';

type ValueType = string | number;

interface Props {
  label: string;
  name: string;
  errorMessage?: string;
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
}) => {
  return (
    <FormGroup className={className}>
      <label>{label}</label>
      <FormSelect defaultValue={null} onChange={onChange} name={name}>
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
