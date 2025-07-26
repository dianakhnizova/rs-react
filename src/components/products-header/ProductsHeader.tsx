import styles from './ProductsHeader.module.scss';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  authors?: string;
  pageCount?: number | string;
  printType?: string;
}

export const ProductsHeader = ({
  title,
  description,
  image,
  pageCount,
  authors,
  printType,
}: Props) => {
  return (
    <div className={styles.container}>
      {title && <p className={styles.title}>{title}</p>}
      {description && <p className={styles.title}>{description}</p>}
      {image && <p className={styles.title}>{image}</p>}
      {authors && <p className={styles.title}>{authors}</p>}
      {pageCount && <p className={styles.title}>{pageCount}</p>}
      {printType && <p className={styles.title}>{printType}</p>}
    </div>
  );
};
