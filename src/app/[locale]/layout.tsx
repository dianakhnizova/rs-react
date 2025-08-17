import '@/app/[locale]/styles/global.scss';
import { Providers } from './Providers';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import { MainSection } from '@/components/main-section/main-section';
import { Flyout } from '@/components/flyout/Flyout';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: [{ url: '/favicon.png', type: 'image/png', sizes: '32x32' }],
      shortcut: ['/favicon.png'],
      apple: ['/favicon.png'],
    },
  };
}

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
