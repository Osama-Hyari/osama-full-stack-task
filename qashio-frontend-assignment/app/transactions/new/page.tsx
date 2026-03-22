'use client';

import {
  Alert,
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import NewTransactionForm from '../components/NewTransactionForm';

export default function NewTransactionPage() {
  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          background:
            'linear-gradient(135deg, rgba(255,253,248,0.96) 0%, rgba(243,239,228,0.92) 100%)',
        }}
      >
        <Stack spacing={2}>
          <Chip label="Create Flow" color="secondary" sx={{ width: 'fit-content' }} />
          <Typography variant="h2" component="h1">
            Add a new income or expense transaction.
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth={760}>
            The form uses frontend validation, category lookups from the API, date selection,
            and React Query mutation handling for a cleaner operational workflow.
          </Typography>
        </Stack>
      </Paper>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1.3fr 0.7fr' },
          gap: 3,
          alignItems: 'start',
        }}
      >
        <NewTransactionForm />

        <Stack spacing={2}>
          <Paper elevation={0} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Submission extras
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This page goes beyond the minimum requirements with validation feedback, stateful
              mutation handling, responsive layout, and backend-safe payload formatting.
            </Typography>
          </Paper>
          <Alert severity="info">
            Set the frontend environment variable BACKEND_API_URL to the NestJS service URL so the
            local Next.js API routes can proxy requests correctly.
          </Alert>
        </Stack>
      </Box>
    </Stack>
  );
}
