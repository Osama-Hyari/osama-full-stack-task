'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode, useMemo, useState } from 'react';
import rtlPlugin from 'stylis-plugin-rtl';
import { AuthProvider } from '@/lib/auth-context';
import { AppLocalizationProvider, useLocalization } from '@/lib/localization-context';

const buildTheme = (direction: 'ltr' | 'rtl') =>
  createTheme({
  direction,
  palette: {
    primary: {
      main: '#14532d',
      light: '#1d7a3b',
    },
    secondary: {
      main: '#b45309',
    },
    background: {
      default: '#f5f1e8',
      paper: '#fffdf8',
    },
    success: {
      main: '#166534',
    },
    error: {
      main: '#b42318',
    },
    warning: {
      main: '#c2410c',
    },
  },
  typography: {
    fontFamily: 'var(--font-manrope), "Segoe UI", sans-serif',
    h1: {
      fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
      fontWeight: 800,
      letterSpacing: '-0.04em',
    },
    h2: {
      fontWeight: 800,
      letterSpacing: '-0.03em',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 18,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: `1px solid ${alpha('#14532d', 0.08)}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 18,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: alpha('#ffffff', 0.88),
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          backgroundColor: alpha('#ffffff', 0.72),
        },
        columnHeaders: {
          backgroundColor: alpha('#14532d', 0.06),
        },
      },
    },
  },
});

const ltrCache = createCache({
  key: 'mui',
});

const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

ltrCache.compat = true;
rtlCache.compat = true;

function LocalizedThemeLayer({ children }: { children: ReactNode }) {
  const { isRTL } = useLocalization();
  const theme = useMemo(() => buildTheme(isRTL ? 'rtl' : 'ltr'), [isRTL]);
  const cache = isRTL ? rtlCache : ltrCache;

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppLocalizationProvider>
          <LocalizedThemeLayer>{children}</LocalizedThemeLayer>
        </AppLocalizationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
} 