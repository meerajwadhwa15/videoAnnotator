import React, { FC, ChangeEvent } from 'react';
import { FormGroup, FormInput } from 'shards-react';
import styles from './style.module.scss';

interface InputProps {
  label: string;
  value: string;
  name: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  errorMessage?: string;
  autoComplete?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({ label, errorMessage, ...props }) => {
  return (
    <FormGroup className={styles.Input}>
      <label>{label}</label>
      <FormInput {...props} />
      {errorMessage && <p className="error-text">{errorMessage}</p>}
    </FormGroup>
  );
};

export default Input;
