import Navbar from './Navbar';
import { LangProvider } from '@/lib/LangContext';
import { ThemeProvider } from '@/lib/ThemeContext';
import { JsonLd, WebsiteJsonLd } from '@/components/JsonLd';
import './globals.css';

const SITE_URL = 'https://azmiofficial.my.id';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Muhammad Azmi Fatani | Web Developer & Reverse Engineer',
    template: '%s | Muhammad Azmi Fatani',
  },
  description:
    'Personal portfolio of Muhammad Azmi Fatani — Junior Web Developer & Senior Reverse Engineer. Crafting digital experiences with clean code.',
  keywords: [
    'Muhammad Azmi Fatani',
    'Azmi Fatani',
    'Web Developer',
    'Reverse Engineer',
    'Frontend Engineer',
    'Next.js Developer',
    'React Developer',
    'Indonesia',
  ],
  authors: [{ name: 'Muhammad Azmi Fatani' }],
  creator: 'Muhammad Azmi Fatani',
  publisher: 'Muhammad Azmi Fatani',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'id_ID',
    url: SITE_URL,
    siteName: 'AzmiFatani',
    title: 'Muhammad Azmi Fatani | Web Developer & Reverse Engineer',
    description:
      'Personal portfolio of Muhammad Azmi Fatani — Junior Web Developer & Senior Reverse Engineer.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Azmi Fatani',
    description:
      'Junior Web Developer & Senior Reverse Engineer. Crafting digital experiences with clean code.',
    creator: '@azmifatani',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/img/favicon.ico',
    shortcut: '/img/favicon.ico',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout ({children}) {
    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <head>
              <script dangerouslySetInnerHTML={{
                __html: `
                  (function() {
                    try {
                      var t = localStorage.getItem('theme');
                      if (!t) { t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
                      if (t === 'dark') document.documentElement.classList.add('dark');
                    } catch(e) {}
                  })();
                `
              }} />
            </head>
            <body suppressHydrationWarning>
                <JsonLd />
                <WebsiteJsonLd />
                <ThemeProvider>
                    <LangProvider>
                        <Navbar />
                        <main className="min-h-screen pt-20 sm:pt-24">{children}</main>
                    </LangProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
