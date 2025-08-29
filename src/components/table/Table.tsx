import { useEffect, useState, type FC } from 'react';
import styles from './Table.module.scss';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectSelectedYear } from '@/store/slices/year/selectors';

interface Props {
  columns: (string | number)[];
  isList?: boolean;
  isInfoList?: boolean;
  isActive?: boolean;
  handleClick?: () => void;
  highlightIndex?: number[];
}

export const Table: FC<Props> = ({
  columns,
  isList,
  isInfoList,
  isActive,
  handleClick,
  highlightIndex,
}) => {
  const selectedYear = useSelector(selectSelectedYear);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    setIsHighlighted(true);

    const timeout = setTimeout(() => {
      setIsHighlighted(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [selectedYear]);

  return (
    <div
      className={classNames(styles.container, {
        [styles.containerList]: isList,
      })}
    >
      {columns.map((label, i) => (
        <div
          key={i}
          className={classNames(styles.cell, {
            [styles.cellList]: isList,
            [styles.cellInfoList]: isInfoList,
            [styles.active]: isList && i === 0 && isActive,
            [styles.highlightIndex]:
              isHighlighted && highlightIndex?.includes(i),
          })}
          onClick={isList && i === 0 ? handleClick : undefined}
        >
          {label}
        </div>
      ))}
    </div>
  );
};
