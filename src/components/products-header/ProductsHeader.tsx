import styles from './ProductsHeader.module.scss';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  authors?: string;
  year?: number | string;
  printType?: string;
}

export const ProductsHeader = ({
  title,
  description,
  image,
  year,
  authors,
  printType,
}: Props) => {
  return (
    <div className={styles.container}>
      {title && <p className={styles.title}>{title}</p>}
      {description && <p className={styles.title}>{description}</p>}
      {image && <p className={styles.title}>{image}</p>}
      {authors && <p className={styles.title}>{authors}</p>}
      {year && <p className={styles.title}>{year}</p>}
      {printType && <p className={styles.title}>{printType}</p>}
    </div>
  );
};
