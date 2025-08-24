import classNames from 'classnames';
import styles from './Button.module.scss';
import { Variant } from '@/sources/enums';

type Props = {
  variant?: Variant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = ({
  variant = Variant.PRIMARY,
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
