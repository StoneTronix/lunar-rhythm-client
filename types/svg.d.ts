declare module '*.svg' {
  import { FC, SVGProps } from 'react';
  
  const content: FC<SVGProps<SVGSVGElement> & {
    className?: string;
    color?: string;
  }>;
  
  export default content;
}