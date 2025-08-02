import styles from './Button.module.scss';
import ClassNames from 'classnames';
import { ButtonVariant } from './enum';

type Props = {
  variant?: ButtonVariant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = ({
  variant = ButtonVariant.PRIMARY,
  className,
  ...rest
}: Props) => {
  return (
    <button
      className={ClassNames(styles.button, styles[variant], className)}
      {...rest}
    />
  );
};
