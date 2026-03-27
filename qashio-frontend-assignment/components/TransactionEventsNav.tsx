"use client";
import Link from 'next/link';

import { useTransactionEvents } from '@/hooks/useTransactionEvents';
import { useLoginEvents } from '@/hooks/useLoginEvents';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';


  const [lastTransactionEvent, setLastTransactionEvent] = useState<any>(null);
  const [lastLoginEvent, setLastLoginEvent] = useState<any>(null);
  const { isAuthenticated } = useAuth();

  // Only listen to events after login
  if (isAuthenticated) {
    useTransactionEvents((event) => {
      setLastTransactionEvent(event);
    });

    useLoginEvents((event) => {
      setLastLoginEvent(event);
    });
  }

  return (
    <nav style={{ padding: 16, background: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
      <Link href="/">Home</Link> |{' '}
      <Link href="/transactions">Transactions</Link> |{' '}
      <Link href="/categories">Categories</Link> |{' '}
      <Link href="/budgets">Budgets</Link>
      {lastTransactionEvent && (
        <span style={{ marginLeft: 24, color: 'green' }}>
          Last transaction event: {lastTransactionEvent.event || 'created'}
          {lastTransactionEvent.amount !== undefined && ` (amount: ${lastTransactionEvent.amount})`}
        </span>
      )}
      {lastLoginEvent && (
        <span style={{ marginLeft: 24, color: 'blue' }}>
          Last login: {lastLoginEvent.email} at {new Date(lastLoginEvent.timestamp).toLocaleTimeString()}
        </span>
      )}
    </nav>
  );
}
