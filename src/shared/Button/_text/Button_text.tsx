import { FC } from 'react';

import Button, { ButtonProps } from '../Button';

import styles from './Button_text.module.scss';

type ButtonTextType = 'default' | 'confirm' | 'cancel';

interface ButtonTextProps extends ButtonProps {
  textType?: ButtonTextType;
}

const ButtonText: FC<ButtonTextProps> = ({
  className = '',
  textType = 'default',
  children,
  ...rest
}) => {
  console.log(styles);
  const typeClass = styles[`button_text_${textType}`] || '';

  return (
    <Button
      className={`${styles.buttonText} ${className}`}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonText;
