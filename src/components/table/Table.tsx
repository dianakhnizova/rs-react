import { useEffect, useState, type FC } from 'react';
import styles from './Table.module.scss';
import { useSelector } from 'react-redux';
import { selectSelectedYear } from '@/store/slices/year/selectors';
import { TableRow } from './components/TableRow';

interface Props {
  headers: (string | number)[];
  rows: (string | number)[][];
  highlightIndex?: number[];
}

export const Table: FC<Props> = ({ headers, rows, highlightIndex }) => {
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
    <table className={styles.container}>
      <thead className={styles.header}>
        <tr>
          {headers.map((header, i) => (
            <th key={i}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            row={row}
            highlightIndex={highlightIndex}
            isHighlighted={isHighlighted}
          />
        ))}
      </tbody>
    </table>
  );
};
