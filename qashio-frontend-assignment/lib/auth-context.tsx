'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const AUTH_STORAGE_KEY = 'expense-tracker-auth';
const AUTH_TOKEN_KEY = 'expense-tracker-token';
const LOGIN_ENDPOINT = '/api/login';

interface StoredAuthSession {
  email: string;
  token: string;
}

interface AuthContextValue {
  email: string | null;
  isAuthenticated: boolean;
  isReady: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string } | undefined>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  email: null,
  isAuthenticated: false,
  isReady: false,
  login: async () => Promise.reject({ success: false, error: 'Not implemented' }),
  logout: () => {},
});

function readStoredSession(): StoredAuthSession | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as StoredAuthSession;
    return parsed?.email ? parsed : null;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const session = readStoredSession();
    setEmail(session?.email ?? null);
    setIsReady(true);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      email,
      isAuthenticated: Boolean(email),
      isReady,
      login: async (nextEmail: string, password: string) => {
        const trimmedEmail = nextEmail.trim();
        if (!trimmedEmail || !password.trim()) {
          return { success: false, error: 'Missing email or password.' };
        }

        try {
          const response = await fetch(LOGIN_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: trimmedEmail, password }),
          });
          const result = await response.json();
          if (result.success && result.email && result.token) {
            const session = { email: result.email, token: result.token };
            window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
            window.localStorage.setItem(AUTH_TOKEN_KEY, result.token);
            setEmail(result.email);
            return { success: true };
          }
          return { success: false, error: result.error || 'Invalid credentials.' };
        } catch {
          return { success: false, error: 'Login failed. Please try again.' };
        }
      },
      logout: () => {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
        window.localStorage.removeItem(AUTH_TOKEN_KEY);
        setEmail(null);
      },
    }),
    [email, isReady],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}