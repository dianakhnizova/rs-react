import type { FC } from 'react';
import styles from './Table.module.scss';
import classNames from 'classnames';

interface Props {
  columns: string[];
  isList?: boolean;
}

export const Table: FC<Props> = ({ columns, isList }) => {
  return (
    <div
      className={classNames(styles.container, {
        [styles.containerList]: isList,
      })}
    >
      {columns.map((label, i) => (
        <div
          key={i}
          className={classNames(styles.cell, { [styles.cellList]: isList })}
        >
          {label}
        </div>
      ))}
    </div>
  );
};
