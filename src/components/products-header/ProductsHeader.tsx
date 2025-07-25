import styles from './ProductsHeader.module.scss';

interface Props {
  title?: string;
  description: string;
  image: string;
}

export const ProductsHeader = ({ title, description, image }: Props) => {
  return (
    <div className={styles.productsHeaderContainer}>
      <p className={styles.titleName}>{title}</p>
      <p className={styles.titleDescription}>{description}</p>
      <p className={styles.titleImage}>{image}</p>
    </div>
  );
};
