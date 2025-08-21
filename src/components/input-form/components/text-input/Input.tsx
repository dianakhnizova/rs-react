import { forwardRef } from 'react';
import styles from './Input.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string;
  label: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ htmlFor, label, className, ...rest }, ref) => (
    <div className={styles.container}>
      <label htmlFor={htmlFor}>{label}</label>
      <input id={htmlFor} ref={ref} className={className} {...rest} />
    </div>
  )
);

Input.displayName = 'Input';
