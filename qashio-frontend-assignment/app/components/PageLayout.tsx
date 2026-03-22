'use client';


import { Container, Box } from '@mui/material';
import NavBar from './NavBar';
import Sidebar, { SIDEBAR_WIDTH } from './Sidebar';
import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        position: 'relative',
        background:
          'radial-gradient(circle at top left, rgba(180,83,9,0.16), transparent 28%), radial-gradient(circle at top right, rgba(20,83,45,0.14), transparent 24%), linear-gradient(180deg, #f8f3ea 0%, #f3efe4 100%)',
        overflow: 'hidden',
      }}
    >
      <Sidebar />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', height: '100%', overflow: 'auto', ml: `${SIDEBAR_WIDTH}px` }}>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage:
              'linear-gradient(rgba(20,83,45,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(20,83,45,0.03) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.7), transparent 90%)',
          }}
        />
        <NavBar />
        <Container
          component="main"
          maxWidth="xl"
          sx={{
            mt: { xs: 2, md: 4 },
            mb: { xs: 2, md: 4 },
            flexGrow: 1,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            px: { xs: 1, sm: 2, md: 3 },
            width: '100%',
            minWidth: 0,
            minHeight: 0,
          }}
        >
          {children}
        </Container>
        <Box 
          component="footer" 
          sx={{ 
            py: 3,
            px: 2,
            backgroundColor: 'rgba(255,253,248,0.72)', 
            borderTop: '1px solid', 
            borderColor: 'divider' 
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', color: 'text.secondary', fontSize: 14 }}>
              Expense Tracker frontend built for interview delivery using Next.js App Router, MUI, and React Query.
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}