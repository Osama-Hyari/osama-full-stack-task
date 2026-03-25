"use client";

import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";

const LOGIN_ENDPOINT = "/api/login";

interface AuthContextValue {
  email: string | null;
  isAuthenticated: boolean;
  isReady: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string } | undefined>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    async function checkSession() {
      console.log('[AuthProvider] checkSession triggered, pathname:', pathname);
      try {
        const res = await fetch("/api/session", { cache: "no-store" });
        const data = await res.json();
        console.log("[AuthProvider] /api/session response", data);
        if (data.authenticated && data.email) {
          setEmail(data.email);
          console.log('[AuthProvider] setEmail:', data.email);
        } else {
          setEmail(null);
          console.log('[AuthProvider] setEmail: null (not authenticated)');
        }
      } catch (err) {
        console.error("[AuthProvider] /api/session error", err);
        setEmail(null);
      } finally {
        setIsReady(true);
        console.log('[AuthProvider] setIsReady: true');
      }
    }
    checkSession();
  }, [pathname]);

  const value = useMemo<AuthContextValue>(() => ({
    email,
    isAuthenticated: Boolean(email),
    isReady,
    login: async (nextEmail: string, password: string) => {
      const trimmedEmail = nextEmail.trim();
      if (!trimmedEmail || !password.trim()) {
        console.log('[AuthProvider] login: missing email or password');
        return { success: false, error: "Missing email or password." };
      }
      try {
        const response = await fetch(LOGIN_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmedEmail, password }),
        });
        const result = await response.json();
        console.log('[AuthProvider] login response:', result);
        if (result.success && result.email && result.token) {
          const lang = navigator.language || "en";
          document.cookie = `expense-tracker-lang=${lang}; path=/; SameSite=Lax`;
          await fetch("/api/session", { cache: "no-store" });
          console.log('[AuthProvider] login success, reloading page');
          window.location.reload();
          return { success: true };
        }
        console.log('[AuthProvider] login failed:', result.error);
        return {
          success: false,
          error: result.error || "Invalid credentials.",
        };
      } catch (err) {
        console.error('[AuthProvider] login error:', err);
        return { success: false, error: "Login failed. Please try again." };
      }
    },
    logout: () => {
      setEmail(null);
      console.log('[AuthProvider] logout: setEmail(null)');
    },
  }), [email, isReady]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
