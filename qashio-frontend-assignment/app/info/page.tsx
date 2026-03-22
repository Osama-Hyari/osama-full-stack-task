
"use client";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import CategoryIcon from "@mui/icons-material/Category";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PaidIcon from "@mui/icons-material/Paid";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";


function formatCurrency(amount: number) {
  return `AED ${amount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

type InfoSummary = {
  income: number;
  expense: number;
  net: number;
  count: number;
  average: number;
  largest: {
    amount: number;
    type: string;
    category: string;
    date: string;
  };
  smallest: {
    amount: number;
    type: string;
    category: string;
    date: string;
  };
  typeBreakdown: {
    income: number;
    expense: number;
  };
  categoryBreakdown: { name: string; total: number }[];
  mostCommonCategory: string;
  incomePercent: number;
  expensePercent: number;
  dateFrom: string;
  dateTo: string;
};

function SummaryCard({ title, value, description, color, chipLabel, chipColor }: {
  title: string;
  value: string;
  description: string;
  color?: string;
  chipLabel?: string;
  chipColor?: "success" | "error" | "primary" | "info";
}) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 1,
        minHeight: { xs: 160, md: 180 },
        height: '100%',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
      }}
    >
      <Typography variant="subtitle2" color="text.secondary" mb={1}>{title}</Typography>
      <Typography variant="h4" fontWeight={700} mb={1} color={color}>{value}</Typography>
      <Typography variant="body2" color="text.secondary">{description}</Typography>
      {chipLabel && <Chip label={chipLabel} color={chipColor} size="small" sx={{ mt: 1 }} />}
    </Paper>
  );
}



export default function InfoPage() {
  const defaultSummary: InfoSummary = {
    income: 0,
    expense: 0,
    net: 0,
    count: 0,
    average: 0,
    largest: { amount: 0, type: '', category: '', date: '' },
    smallest: { amount: 0, type: '', category: '', date: '' },
    typeBreakdown: { income: 0, expense: 0 },
    categoryBreakdown: [],
    mostCommonCategory: '',
    incomePercent: 0,
    expensePercent: 0,
    dateFrom: '',
    dateTo: '',
  };
  const [data, setData] = useState<InfoSummary>(defaultSummary);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/api/transactions/summary/report")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch info summary");
        return res.json();
      })
      .then((json) => {
        setData({ ...defaultSummary, ...json });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
        setData(defaultSummary);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ p: { xs: 1, md: 3 } }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Info
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 200 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : data ? (
        <>
          {/* Date Range */}
          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <CalendarMonthIcon color="primary" />
            <Typography variant="subtitle2" color="text.secondary">
              {formatDate(data.dateFrom)} - {formatDate(data.dateTo)}
            </Typography>
            <Chip label={`Most Common: ${data.mostCommonCategory}`} size="small" color="info" icon={<CategoryIcon />} />
          </Stack>

  {/* // Ensure there is no local Grid definition shadowing the MUI Grid import. If there is, rename it or remove it.
  // The correct prop for MUI Grid is 'item', ensure it is used correctly. */}
          {/* Main Summary Cards */}
          <Grid container spacing={3} mb={1}>
            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="INCOME" value={formatCurrency(data.income)} description="Total income in range" color="success.main" chipLabel={`${data.incomePercent.toFixed(2)}%`} chipColor="success" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="EXPENSE" value={formatCurrency(data.expense)} description="Total expense in range" color="error.main" chipLabel={`${data.expensePercent.toFixed(2)}%`} chipColor="error" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="NET" value={formatCurrency(data.net)} description="Net = Income - Expense" color="primary.main" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="TRANSACTIONS" value={String(data.count)} description="Total transactions" chipLabel={`Avg: ${formatCurrency(data.average)}`} chipColor="info" />
            </Grid>
          </Grid>

          {/* Largest & Smallest Transactions */}
          <Grid container spacing={3} mb={1}>
            <Grid item xs={12} sm={6} md={6}>
              <Paper elevation={1} sx={{ p: 2.5, borderRadius: 3, minHeight: 120, display: "flex", flexDirection: "column", gap: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <TrendingUpIcon color="primary" />
                  <Typography fontWeight={700}>Largest Transaction</Typography>
                </Stack>
                <Typography variant="h6" color={data.largest?.type === "INCOME" ? "success.main" : "error.main"}>
                  {formatCurrency(data.largest?.amount)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.largest?.type} - {data.largest?.category} on {formatDate(data.largest?.date)}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Paper elevation={1} sx={{ p: 2.5, borderRadius: 3, minHeight: 120, display: "flex", flexDirection: "column", gap: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <TrendingDownIcon color="secondary" />
                  <Typography fontWeight={700}>Smallest Transaction</Typography>
                </Stack>
                <Typography variant="h6" color={data.smallest?.type === "INCOME" ? "success.main" : "error.main"}>
                  {formatCurrency(data.smallest?.amount)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.smallest?.type} - {data.smallest?.category} on {formatDate(data.smallest?.date)}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Category Breakdown */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, mt: 2, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={700} mb={1}>Category Breakdown</Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              {data.categoryBreakdown?.map((cat) => (
                <Grid item xs={12} sm={6} md={4} key={cat.name}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, display: "flex", alignItems: "center", gap: 2 }}>
                    <CategoryIcon color="primary" />
                    <Box>
                      <Typography fontWeight={600}>{cat.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{formatCurrency(cat.total)}</Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Type Breakdown */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={700} mb={1}>Type Breakdown</Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack direction="row" spacing={2}>
              <Chip icon={<PaidIcon />} label={`Income: ${formatCurrency(data.typeBreakdown?.income)}`} color="success" />
              <Chip icon={<ReceiptLongIcon />} label={`Expense: ${formatCurrency(data.typeBreakdown?.expense)}`} color="error" />
            </Stack>
          </Paper>
        </>
      ) : null}
    </Box>
  );
}
