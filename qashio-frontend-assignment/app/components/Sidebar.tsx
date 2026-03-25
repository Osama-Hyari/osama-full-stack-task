'use client';

import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useColorMode } from '@/lib/color-mode-context';

export const SIDEBAR_WIDTH = 240;

type NavItem = {
  href: string;
  label: string;
  badge?: React.ReactNode;
  newItem?: boolean;
};

const navItems: NavItem[] = [
  { href: "/transactions", label: "Transactions" },
  { href: "/categories", label: "Categories" },
  { href: "/budgets", label: "Budgets" },
  { href: "/info", label: "Analytics" },
  { href: "/reports", label: "Reports" },
  { href: "/project-tasks", label: "Project Tasks" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { mode, toggleColorMode } = useColorMode();

  return (
    <Box
      component="nav"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 1200,
      }}
    >
      {/* Brand */}
      <Box sx={{ px: 3, pt: 3, pb: 2.5 }}>
        <Typography variant="h5" fontWeight={900} noWrap letterSpacing={2} sx={{ mb: 0.2 }}>
          Qashio
        </Typography>
      </Box>

      <Divider />

      {/* Nav items */}
      <List sx={{ px: 1.5, pt: 1.5, flexGrow: 1 }} disablePadding>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              selected={isActive}
              sx={{
                borderRadius: '12px',
                mb: 0.5,
                display: 'flex',
                alignItems: 'center',
                '&.Mui-selected': {
                  bgcolor: 'secondary.main',
                  color: 'common.white',
                  '&:hover': { bgcolor: '#9a4508' },
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: isActive ? 700 : 500, fontSize: 14 }}
              />
              {item.badge && (
                <Box sx={{ ml: 1, background: '#e53e3e', color: '#fff', borderRadius: '50%', px: 1, fontSize: 12, fontWeight: 700, minWidth: 22, textAlign: 'center' }}>{item.badge}</Box>
              )}
              {item.newItem && (
                <Box sx={{ ml: 1, background: '#3182ce', color: '#fff', borderRadius: 2, px: 1, fontSize: 11, fontWeight: 700 }}>New Items</Box>
              )}
            </ListItemButton>
          );
        })}
      </List>

     
    </Box>
  );
}
