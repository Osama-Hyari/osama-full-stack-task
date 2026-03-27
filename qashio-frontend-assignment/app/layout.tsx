import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';
import KafkaEventsSnackbar from '@/components/KafkaEventsSnackbar';

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
        <Providers>
          <KafkaEventsSnackbar />
          {children}
        </Providers>
      </body>
    </html>
  );
} 