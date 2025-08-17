import styles from './main-section.module.css';

interface Props {
  children: React.ReactNode;
}

export const MainSection = ({ children }: Props) => {
  return <main className={styles.section}>{children} </main>;
};
