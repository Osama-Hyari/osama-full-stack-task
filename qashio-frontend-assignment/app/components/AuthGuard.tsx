'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from '@/lib/auth-context';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isReady } = useAuth();

  useEffect(() => {
    if (!isReady || isAuthenticated) {
      return;
    }

    const nextPath = pathname && pathname !== '/' ? `?next=${encodeURIComponent(pathname)}` : '';
    router.replace(`/login${nextPath}`);
  }, [isAuthenticated, isReady, pathname, router]);

  if (!isReady || !isAuthenticated) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background:
            'radial-gradient(circle at top left, rgba(180,83,9,0.16), transparent 28%), radial-gradient(circle at top right, rgba(20,83,45,0.14), transparent 24%), linear-gradient(180deg, #f8f3ea 0%, #f3efe4 100%)',
        }}
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

  return <>{children}</>;
}