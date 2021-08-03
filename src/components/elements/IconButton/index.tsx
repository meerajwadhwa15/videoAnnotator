import { FC } from 'react';
import { Button } from 'shards-react';

interface Props {
  theme?: string;
  type?: string;
  title: string;
  className?: string;
  onClick: (event: any) => void;
  disabled?: boolean;
  iconName: string;
}

const IconButton: FC<Props> = ({
  theme,
  title,
  className,
  onClick,
  disabled,
  iconName,
}) => {
  return (
    <Button
      title={title}
      theme={theme}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      <i className="material-icons">{iconName}</i>
    </Button>
  );
};

export default IconButton;
