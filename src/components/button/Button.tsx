import styles from './Button.module.scss';
import ClassNames from 'classnames';
import { ButtonVariant } from './enum';

type Props = {
  variant?: ButtonVariant;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = ({
  variant = ButtonVariant.PRIMARY,
  children,
  className,
  ...rest
}: Props) => {
  return (
    <button
      className={ClassNames(styles.button, styles[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
};
