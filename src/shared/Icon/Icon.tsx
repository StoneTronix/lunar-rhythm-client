import { FC } from 'react';
import * as Icons from "../../assets/icons";
import styles from './Icon.module.scss';

export type IconName = keyof typeof Icons;

interface IconProps {
  className?: string;
  name: IconName;
  color?: string;  
}

const Icon: FC<IconProps> = ({
  className = '',
  name,
  color = 'currentColor',
}) => {
  const SvgIcon = Icons[name];

  if (!SvgIcon) return null;

  return (
    <SvgIcon
      className={`${styles.icon} ${className}`}
      color={color}
    />
  );
};

export default Icon;