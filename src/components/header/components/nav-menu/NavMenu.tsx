import { PagePath } from '@/sources/page-path/enums';
import styles from './NavMenu.module.scss';
import { messages } from './messages';
import Link from 'next/link';

export const NavMenu = () => {
  return (
    <nav className={styles.container}>
      <Link href={PagePath.aboutPage} className={styles.link}>
        {messages.titleAboutLink}
      </Link>
    </nav>
  );
};
