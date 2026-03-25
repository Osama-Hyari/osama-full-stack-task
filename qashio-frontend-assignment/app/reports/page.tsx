"use client"
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box } from '@mui/material';
import ReportsHeader from './components/ReportsHeader';
import AddReportDialog from './components/AddReportDialog';
import ReportsTable from './components/ReportsTable';


const ReportsPage = () => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [jobId, setJobId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reports, setReports] = useState<any[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [reportsError, setReportsError] = useState<string | null>(null);

  const fetchReports = async () => {
    setLoadingReports(true);
    setReportsError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/reports/big-transactions/list', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch reports');
      const data = await response.json();
      setReports(Array.isArray(data) ? data : (data.reports || []));
    } catch (err: any) {
      setReportsError(err.message || 'Unknown error');
    } finally {
      setLoadingReports(false);
    }
  };

  React.useEffect(() => {
    fetchReports();
  }, []);


  const handleDialogOpen = () => {
    setDateFrom('');
    setDateTo('');
    setJobId(null);
    setError(null);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  function generateRandomJobId() {
    return uuidv4();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setJobId(null);
    const randomJobId = generateRandomJobId();
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({ dateFrom, dateTo }).toString();
      const response = await fetch(`/api/reports/big-transactions/job?${params}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to start report job');
      const data = await response.json();
      setJobId(data.jobId || randomJobId);
      setDialogOpen(false);
      await fetchReports();
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box width="100%" px={0} mt={6}>
      <ReportsHeader onAdd={handleDialogOpen} />
      <AddReportDialog
        open={dialogOpen}
        dateFrom={dateFrom}
        dateTo={dateTo}
        loading={loading}
        error={error}
        jobId={jobId}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
      />
      <ReportsTable
        reports={reports}
        loading={loadingReports}
        error={reportsError}
      />
    </Box>
  );
};

export default ReportsPage;
