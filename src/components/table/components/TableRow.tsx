import classNames from 'classnames';
import { FC, memo } from 'react';
import styles from './TableRow.module.scss';

export const TableRow: FC<{
  row: (string | number)[];
  highlightIndex?: number[];
  isHighlighted: boolean;
}> = memo(({ row, highlightIndex, isHighlighted }) => (
  <tr>
    {row.map((cell, i) => (
      <td
        key={i}
        className={classNames({
          [styles.highlighted]: isHighlighted && highlightIndex?.includes(i),
        })}
      >
        {cell}
      </td>
    ))}
  </tr>
));
