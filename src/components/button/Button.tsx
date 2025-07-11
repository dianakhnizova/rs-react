import { Component } from 'react';
import styles from './Button.module.scss';
import ClassNames from 'classnames';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  className?: string;
}

export class Button extends Component<Props> {
  public render() {
    const { onClick, className, ...rest } = this.props;

    return (
      <button
        onClick={onClick}
        className={ClassNames(styles.button, className)}
        {...rest}
      />
    );
  }
}
