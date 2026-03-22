'use client';

import { FormEvent, useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated, isReady } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const nextPath = searchParams.get('next') || '/transactions';

  useEffect(() => {
    if (isReady && isAuthenticated) {
      router.replace(nextPath);
    }
  }, [isAuthenticated, isReady, nextPath, router]);

  function validateEmailFormat(email: string) {
    // Simple regex for email format
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePassword(password: string) {
    // Basic: at least 6 chars, no spaces
    return password.length >= 6 && !password.includes(' ');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');
    if (!validateEmailFormat(email)) {
      setError('Enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters and contain no spaces.');
      return;
    }

    const result = await login(email, password);
    if (!result?.success) {
      setError(result?.error || 'Invalid credentials.');
      return;
    }
    router.replace(nextPath);
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        px: 2,
        background:
          'radial-gradient(circle at top left, rgba(180,83,9,0.18), transparent 28%), radial-gradient(circle at top right, rgba(20,83,45,0.16), transparent 26%), linear-gradient(180deg, #f8f3ea 0%, #f3efe4 100%)',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 480,
          p: { xs: 3, md: 4 },
          borderRadius: 1,
          backgroundColor: 'rgba(255,253,248,0.92)',
          boxShadow: '0 28px 80px rgba(20, 24, 39, 0.12)',
        }}
      >
        <Stack spacing={3} component="form" onSubmit={handleSubmit}>
          <Stack spacing={1}>
            <Typography variant="h3" sx={{ fontSize: { xs: 34, md: 42 }, color: '#111827' }}>
              Login
            </Typography>
            <Typography color="text.secondary">
              Enter your email and password to open the expense tracker workspace.
            </Typography>
          </Stack>

          {error ? <Alert severity="error">{error}</Alert> : null}

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
            autoComplete="email"
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
            autoComplete="current-password"
          />

          <Button type="submit" variant="contained" color="success" size="large">
            Sign in
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}