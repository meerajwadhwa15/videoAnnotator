import { FC, ReactNode } from 'react';
import style from './style.module.scss';

interface ButtonProps {
  /**
   * Button is primary (default) or secondary
   */
  primary?: boolean;
  /**
   * Button contents
   */
  label: ReactNode;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
const Button: FC<ButtonProps> = ({
  label,
  onClick,
  size = 'medium',
  primary = true,
  ...restProps
}) => {
  const modeClassname = primary ? style.btnPrimary : style.btnSecondary;
  const sizeClassname = style[`btn--${size}`];
  return (
    <button
      className={`${style.btn} ${modeClassname} ${sizeClassname}`}
      onClick={onClick}
      {...restProps}
    >
      {label}
    </button>
  );
};

export default Button;
