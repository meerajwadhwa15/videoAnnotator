import React, { FC, ChangeEvent, ReactNode } from 'react';
import {
  FormGroup,
  FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'shards-react';
import styles from './style.module.scss';

interface InputProps {
  label?: string;
  value: string;
  name: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  errorMessage?: ReactNode;
  autoComplete?: string;
  prefix?: ReactNode;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({ label, errorMessage, prefix, ...props }) => {
  return (
    <FormGroup className={styles.Input}>
      <label>{label}</label>
      <InputGroup seamless>
        {prefix && (
          <InputGroupAddon type="prepend">
            <InputGroupText>{prefix}</InputGroupText>
          </InputGroupAddon>
        )}
        <FormInput {...props} invalid={!!errorMessage} />
      </InputGroup>
      {errorMessage && (
        <p data-testid="inputError" className="error-text">
          {errorMessage}
        </p>
      )}
    </FormGroup>
  );
};

export default Input;
