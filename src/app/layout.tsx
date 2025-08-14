import './styles/global.scss';
import { Metadata } from 'next';
import { Providers } from './Providers';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import { MainSection } from '@/components/main-section/main-section';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Your Library',
  description: 'My App is a library',
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <MainSection>{children}</MainSection>
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
