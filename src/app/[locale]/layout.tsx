import '@/app/[locale]/styles/global.scss';
import { Metadata } from 'next';
import { Providers } from './Providers';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import { MainSection } from '@/components/main-section/main-section';
import { Flyout } from '@/components/flyout/Flyout';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Your Library',
  description: 'My App is a library',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

const RootLayout = async ({ children, params }: Props) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <Providers>
            <Header />
            <MainSection>{children}</MainSection>
            <Flyout />
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
