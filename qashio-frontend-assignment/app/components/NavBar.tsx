'use client';

import {
  AppBar,
  Avatar,
  Toolbar,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useLocalization } from '@/lib/localization-context';

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { email, logout } = useAuth();
  const { t, locale, setLocale } = useLocalization();
  const currentSection = searchParams.get('section') || 'transactions';
  const navItems = [
    { key: 'transactions', label: t('nav.transactions'), href: '/transactions?section=transactions' },
    { key: 'categories', label: t('nav.categories'), href: '/transactions?section=categories' },
    { key: 'budgets', label: t('nav.budgets'), href: '/transactions?section=budgets' },
  ];
  const userInitial = email?.charAt(0).toUpperCase() || 'U';

  function handleLogout() {
    logout();
    router.replace('/login');
  }

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: "1px solid rgba(17, 24, 39, 0.08)",
        backgroundColor: "rgba(255,255,255,0.95)",
        backdropFilter: "saturate(160%) blur(8px)",
      }}
    >
      <Toolbar
        sx={{
          minHeight: 86,
          display: "grid",
          gridTemplateColumns: { xs: "1fr auto", lg: "auto 1fr auto" },
          gap: 2,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.2}>
          <Avatar
            sx={{
              width: 34,
              height: 34,
              bgcolor: "#14532d",
              fontSize: 14,
              fontWeight: 800,
            }}
          >
            {userInitial}
          </Avatar>
          <Typography
            sx={{
              display: { xs: "none", md: "block" },
              color: "#334155",
              fontWeight: 600,
            }}
          >
            {email}
          </Typography>
        </Stack>

        {/* <Stack
          direction="row"
          spacing={0.2}
          alignItems="center"
          sx={{ display: { xs: "none", lg: "flex" }, justifySelf: "center" }}
        >
          {navItems.map((item) => (
            <Button
              key={item.label}
              component={Link}
              href={item.href}
              color="inherit"
              sx={{
                px: 1.4,
                py: 0.9,
                borderRadius: 2,
                color: "#111827",
                fontSize: 20,
                fontWeight:
                  pathname === "/transactions" && currentSection === item.key
                    ? 700
                    : 500,
                letterSpacing: "-0.01em",
                backgroundColor:
                  pathname === "/transactions" && currentSection === item.key
                    ? "rgba(17,24,39,0.06)"
                    : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(17,24,39,0.04)",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack> */}

        <Stack
          direction="row"
          spacing={1.25}
          alignItems="center"
          justifySelf="end"
        >
          {/* <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: "#14532d",
                fontSize: 14,
                fontWeight: 800,
              }}
            >
              {userInitial}
            </Avatar>
            <Typography
              sx={{
                display: { xs: "none", md: "block" },
                color: "#334155",
                fontWeight: 600,
              }}
            >
              {email}
            </Typography>
          </Stack> */}

          {/* <Button
            component={Link}
            href="/transactions"
            color="inherit"
            sx={{
              fontWeight: 600,
              fontSize: 19,
              color: "#111827",
              minWidth: 0,
              px: 1,
            }}
          >
            {t("nav.dashboard")}
          </Button> */}

          <Stack
            direction="row"
            spacing={0.45}
            sx={{
              p: 0.35,
              borderRadius: 999,
              backgroundColor: "rgba(17,24,39,0.05)",
            }}
          >
            <Button
              color="inherit"
              onClick={() => setLocale("en")}
              sx={{
                minWidth: 0,
                px: 1.1,
                py: 0.45,
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 700,
                backgroundColor: locale === "en" ? "#ffffff" : "transparent",
                boxShadow:
                  locale === "en" ? "0 2px 6px rgba(17,24,39,0.14)" : "none",
              }}
            >
              🇬🇧 EN
            </Button>
            <Button
              color="inherit"
              onClick={() => setLocale("ar")}
              sx={{
                minWidth: 0,
                px: 1.1,
                py: 0.45,
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 700,
                backgroundColor: locale === "ar" ? "#ffffff" : "transparent",
                boxShadow:
                  locale === "ar" ? "0 2px 6px rgba(17,24,39,0.14)" : "none",
              }}
            >
              🇦🇪 AR
            </Button>
          </Stack>

          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              fontWeight: 600,
              fontSize: 16,
              color: "#475569",
              minWidth: 0,
              px: 1,
            }}
          >
            Logout
          </Button>
{/* 
          <Button
            component={Link}
            href={
              pathname === "/transactions/new"
                ? "/transactions"
                : "/transactions/new"
            }
            variant="contained"
            color="inherit"
            sx={{
              px: { xs: 2, md: 2.6 },
              py: 1,
              borderRadius: 2.2,
              fontWeight: 700,
              fontSize: 19,
              color: "#1e293b",
              backgroundColor: "#f7f7f8",
              boxShadow: "0 6px 14px rgba(17, 24, 39, 0.12)",
              "&:hover": {
                backgroundColor: "#efeff1",
              },
            }}
          >
            {t("nav.newTransaction")}
          </Button> */}
        </Stack>
      </Toolbar>
    </AppBar>
  );
} 