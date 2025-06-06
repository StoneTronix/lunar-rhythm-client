import { FC } from 'react';

import Icon, { IconName } from '../../Icon/Icon';
import Button, { ButtonProps } from '../Button';

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
    aria-label={ariaLabel || icon}
    {...rest}
  >
    <Icon 
      name={icon}
    />
  </Button>
);

export default ButtonIcon;
