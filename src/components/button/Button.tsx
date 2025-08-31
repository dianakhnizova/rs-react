import classNames from 'classnames';
import styles from './Button.module.scss';
import { Variant } from '@/sources/enums';
import { memo } from 'react';

type Props = {
  variant?: Variant;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = memo(
  ({ variant = Variant.PRIMARY, className, children, ...rest }: Props) => {
    return (
      <button
        className={classNames(styles.button, styles[variant], className)}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
