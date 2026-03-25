

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import TransactionsPageClient from './TransactionsPageClient';

export default async function TransactionsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('expense-tracker-token')?.value;
  if (!token) {
    redirect('/login?next=/transactions');
  }
  // If authenticated, render the client page
  return <TransactionsPageClient />;
}

