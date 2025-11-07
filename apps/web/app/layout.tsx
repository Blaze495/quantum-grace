import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Quantum Grace - Track. Build. Evolve.',
  description: 'Your personal operating system for becoming your best self. Track habits, set goals, and evolve with data-driven insights.',
  keywords: ['habit tracker', 'goal setting', 'productivity', 'self-improvement', 'personal growth'],
  authors: [{ name: 'Quantum Grace' }],
  creator: 'Quantum Grace',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://quantumgrace.com',
    title: 'Quantum Grace - Track. Build. Evolve.',
    description: 'Your personal operating system for becoming your best self.',
    siteName: 'Quantum Grace',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quantum Grace',
    description: 'Track. Build. Evolve.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
