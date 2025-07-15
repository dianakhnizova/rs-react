import { Component } from 'react';
import styles from './Button.module.scss';
import ClassNames from 'classnames';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export class Button extends Component<Props> {
  public render() {
    const { className, ...rest } = this.props;

    return (
      <button className={ClassNames(styles.button, className)} {...rest} />
    );
  }
}
