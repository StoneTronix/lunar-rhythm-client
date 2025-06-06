import { FC } from 'react';
import Icon, { IconName } from '../../Icon/Icon';
import Button, { ButtonProps } from '../Button';
import styles from './ButtonIcon.module.scss';

interface ButtonIconProps extends Omit<ButtonProps, 'children'> {
  icon: IconName;
  ariaLabel?: string;
}

const ButtonIcon: FC<ButtonIconProps> = ({
  icon,  
  ariaLabel,
  ...rest
}) => (
  <Button
    className={`${styles.button_icon}`}
    aria-label={ariaLabel || icon}
    {...rest}
  >
    <Icon 
      name={icon}
    />
  </Button>
);

export default ButtonIcon;
