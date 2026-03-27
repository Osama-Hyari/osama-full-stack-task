"use client";
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const tasks = [
  'Backend and frontend Dockerfiles are ready',
  'docker-compose.yml configures all services (API, frontend, DB, Redis, Kafka, etc.)',
  'Kafka integration: backend produces and consumes events, frontend receives real-time updates via WebSocket',
  'Frontend and backend communicate via service names in Docker',
  'Frontend report creation uses correct API contract (query params)',
  'Frontend report list and download links work with backend URLs',
  'Components are modularized (widgets, dialogs, tables)',
  'Categories and reports pages use separated components',
  'All environment variables are handled for Docker and local dev',
  'API proxying and token handling are consistent',
  'UI is full width and responsive',
  'JobId generation uses uuid',
  'Download button only shows for completed reports',
  'All new features are tested and ready for docker compose up',
];

export default function ProjectTasksPage() {
  return (
    <Box maxWidth={700} mx="auto" mt={6}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={800} mb={2}>
          Project Readiness Checklist
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          All major tasks and requirements for this project are listed below. Use this as a final review before deployment or handoff.
        </Typography>
        <List>
          {tasks.map((task, idx) => (
            <ListItem key={idx}>
              <ListItemText primary={task} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
