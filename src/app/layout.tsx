import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';

import { Footer } from '@/components/layout/Footer';
import { Nav } from '@/components/layout/Nav';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { RevealObserver } from '@/components/motion/RevealObserver';
import { site } from '@/content/site';

import './globals.css';

// La fuente se descarga al compilar y se sirve desde el mismo sitio (sin pedirla a Google en cada visita)
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.role} en Cartagena`, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: `${site.name} — Portafolio`,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [...site.keywords],
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: '#eceef2',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={jakarta.variable} suppressHydrationWarning>
      <head>
        {/* Con JavaScript activo, los elementos .reveal esperan su turno para aparecer */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
        <WhatsAppFloat />
        <RevealObserver />
      </body>
    </html>
  );
}
