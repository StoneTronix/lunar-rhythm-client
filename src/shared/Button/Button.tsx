import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string,
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const Button: FC<ButtonProps> = ({
  children,
  className = '',
  type = 'button',
  ...rest
}) => (
  <button
    type={type}
    className={className}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
