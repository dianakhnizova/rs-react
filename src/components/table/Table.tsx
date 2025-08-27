import type { FC } from 'react';
import styles from './Table.module.scss';
import classNames from 'classnames';

interface Props {
  columns: (string | number)[];
  isList?: boolean;
  isInfoList?: boolean;
  handleClick?: () => void;
}

export const Table: FC<Props> = ({
  columns,
  isList,
  isInfoList,
  handleClick,
}) => {
  return (
    <div
      className={classNames(styles.container, {
        [styles.containerList]: isList,
      })}
    >
      {columns.map((label, i) => (
        <div
          key={i}
          className={classNames(
            styles.cell,
            { [styles.cellList]: isList },
            { [styles.cellInfoList]: isInfoList }
          )}
          onClick={isList && i === 0 ? handleClick : undefined}
        >
          {label}
        </div>
      ))}
    </div>
  );
};
