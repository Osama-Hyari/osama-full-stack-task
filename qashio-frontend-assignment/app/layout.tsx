import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'Expense Tracker Workspace',
  description: 'Monitor transactions, budgets, and category performance from one frontend workspace.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
} 