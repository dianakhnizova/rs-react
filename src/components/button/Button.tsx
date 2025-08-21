import classNames from 'classnames';
import styles from './Button.module.scss';
import { ButtonVariant } from './enums';

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
      className={classNames(styles.button, styles[variant], className)}
      {...rest}
    />
  );
};
