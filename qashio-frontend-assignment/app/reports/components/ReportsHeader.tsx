import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';

export default function ReportsHeader({ onAdd }: { onAdd: () => void }) {
  return (
    <Paper sx={{ p: 4, mb: 4, width: '100%' }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h5">Big Transactions Reports</Typography>
        <Button variant="contained" color="primary" onClick={onAdd}>
          Add New Report
        </Button>
      </Box>
    </Paper>
  );
}
