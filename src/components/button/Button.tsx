import styles from './Button.module.scss';
import ClassNames from 'classnames';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = ({ className, ...rest }: Props) => {
  return <button className={ClassNames(styles.button, className)} {...rest} />;
};
