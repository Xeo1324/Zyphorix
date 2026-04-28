import type { Metadata } from 'next';
import { AuthProvider } from '@/lib/context/AuthProvider';
import { ToastProvider } from '@/lib/context/ToastProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zyphorix - Your Project Vault',
  description: 'Premium digital storage warehouse for your projects. Manage, showcase, and organize your engineering portfolio like never before.',
  keywords: ['portfolio', 'projects', 'vault', 'digital storage', 'showcase'],
  authors: [{ name: 'Zyphorix' }],
  creator: 'Zyphorix',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0f0f0f" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <AuthProvider>
          <ToastProvider />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
