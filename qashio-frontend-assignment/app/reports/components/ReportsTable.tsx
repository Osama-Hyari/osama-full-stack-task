import React from "react";
import {
  Paper,
  Typography,
  Box,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
// const BACKEND_API_URL =
//   process.env.NEXT_PUBLIC_API_URL ||
//   process.env.BACKEND_API_URL ||
//   "http://localhost:4001";
const BackendEndpooint = `${process.env.BACKEND_API_URL || "http://72.62.48.101:4001"}`;

interface ReportsTableProps {
  reports: any[];
  loading: boolean;
  error: string | null;
}

export default function ReportsTable({
  reports,
  loading,
  error,
}: ReportsTableProps) {
  return (
    <Paper sx={{ p: 4, width: "100%" }}>
      <Typography variant="h6" mb={2}>
        Reports List
      </Typography>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight={120}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer sx={{ width: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Job ID</TableCell>
                <TableCell>Date From</TableCell>
                <TableCell>Date To</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Download</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No reports found.
                  </TableCell>
                </TableRow>
              ) : (
                reports.map((report: any, idx: number) => (
                  <TableRow key={report.jobId || idx}>
                    <TableCell>{report.jobId || report.id || "-"}</TableCell>
                    <TableCell>{report.dateFrom || "-"}</TableCell>
                    <TableCell>{report.dateTo || "-"}</TableCell>
                    <TableCell>{report.status || "-"}</TableCell>
                    <TableCell>
                      {report.createdAt
                        ? new Date(report.createdAt).toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {report.status === "completed" && report.downloadLink ? (
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          href={BackendEndpooint + report.downloadLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download
                        </Button>
                      ) : (
                        <Typography color="text.secondary" fontSize={13}>
                          -
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
