import { FC } from 'react';
import Button, { ButtonProps } from '../Button';
import styles from './ButtonText.module.scss';

interface ButtonTextProps extends Omit<ButtonProps, 'children'> {
  ariaLabel?: string;
}

const ButtonIcon: FC<ButtonTextProps> = ({  
  ariaLabel,
  ...rest
}) => (
  <Button
    children={null} 
    className={`${styles.button_icon}`}
    aria-label={ariaLabel}
    {...rest}  >    
  </Button>
);

export default ButtonIcon;
