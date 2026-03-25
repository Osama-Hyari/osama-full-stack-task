"use client";

import {
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Category } from "@/app/types";
import { useTransactionStore } from "@/app/hooks/useTransactionStore";
import React, { useState, useEffect } from "react";
import { useLocalization } from "@/lib/localization-context";

interface TransactionFiltersPanelProps {
  categories: Category[];
}

export default function TransactionFiltersPanel({
  categories,
}: TransactionFiltersPanelProps) {
  const { t } = useLocalization();
  const filters = useTransactionStore((state) => state.filters);
  const setSearchTerm = useTransactionStore((state) => state.setSearchTerm);
  const setType = useTransactionStore((state) => state.setType);
  const setCategoryId = useTransactionStore((state) => state.setCategoryId);
  const setDateRange = useTransactionStore((state) => state.setDateRange);
  const setAmountRange = useTransactionStore((state) => state.setAmountRange);
  const resetFilters = useTransactionStore((state) => state.resetFilters);

  // Local state for staged filter values
  const [localFilters, setLocalFilters] = useState({
    searchTerm: filters.searchTerm,
    type: filters.type,
    categoryId: filters.categoryId,
    dateRange: { ...filters.dateRange },
    amountRange: { ...filters.amountRange },
  });

  // Sync local state when global filters change (e.g., reset)
  useEffect(() => {
    setLocalFilters({
      searchTerm: filters.searchTerm,
      type: filters.type,
      categoryId: filters.categoryId,
      dateRange: { ...filters.dateRange },
      amountRange: { ...filters.amountRange },
    });
  }, [filters]);

  const handleApplyFilters = () => {
    setSearchTerm(localFilters.searchTerm);
    setType(localFilters.type as "all" | "income" | "expense");
    setCategoryId(localFilters.categoryId);
    setDateRange(
      localFilters.dateRange.startDate,
      localFilters.dateRange.endDate,
    );
    setAmountRange("min", localFilters.amountRange.min);
    setAmountRange("max", localFilters.amountRange.max);
  };

  return (
    <Paper elevation={0} sx={{ p: 3 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        spacing={2}
      >
        <BoxTitle title={t("filters.title")} subtitle={t("filters.subtitle")} />
        <Button onClick={resetFilters} variant="text" color="inherit">
          {t("filters.reset")}
        </Button>
      </Stack>

      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={2}
        sx={{ mt: 3, alignItems: { lg: "center" } }}
      >
        <TextField
          label={t("filters.quick")}
          value={localFilters.searchTerm}
          onChange={(event) =>
            setLocalFilters((prev) => ({
              ...prev,
              searchTerm: event.target.value,
            }))
          }
          placeholder={t("filters.placeholder")}
          fullWidth
        />
        <TextField
          select
          label={t("filters.type")}
          value={localFilters.type}
          onChange={(event) =>
            setLocalFilters((prev) => ({
              ...prev,
              type: event.target.value as "all" | "income" | "expense",
            }))
          }
          sx={{ minWidth: 170 }}
        >
          <MenuItem value="all">{t("filters.allTypes")}</MenuItem>
          <MenuItem value="income">{t("filters.income")}</MenuItem>
          <MenuItem value="expense">{t("filters.expense")}</MenuItem>
        </TextField>
        <TextField
          select
          label={t("filters.category")}
          value={localFilters.categoryId}
          onChange={(event) =>
            setLocalFilters((prev) => ({
              ...prev,
              categoryId: event.target.value,
            }))
          }
          sx={{ minWidth: 210 }}
        >
          <MenuItem value="">{t("filters.allCategories")}</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Stack direction={{ xs: "column", lg: "row" }} spacing={2} sx={{ mt: 2 }}>
        <DatePicker
          label={t("filters.from")}
          value={localFilters.dateRange.startDate}
          onChange={(date) =>
            setLocalFilters((prev) => ({
              ...prev,
              dateRange: { ...prev.dateRange, startDate: date },
            }))
          }
          slotProps={{ textField: { fullWidth: true } }}
        />
        <DatePicker
          label={t("filters.to")}
          value={localFilters.dateRange.endDate}
          onChange={(date) =>
            setLocalFilters((prev) => ({
              ...prev,
              dateRange: { ...prev.dateRange, endDate: date },
            }))
          }
          slotProps={{ textField: { fullWidth: true } }}
        />
        <TextField
          type="number"
          label={t("filters.minAmount")}
          value={localFilters.amountRange.min}
          onChange={(event) =>
            setLocalFilters((prev) => ({
              ...prev,
              amountRange: { ...prev.amountRange, min: event.target.value },
            }))
          }
          fullWidth
        />
        <TextField
          type="number"
          label={t("filters.maxAmount")}
          value={localFilters.amountRange.max}
          onChange={(event) =>
            setLocalFilters((prev) => ({
              ...prev,
              amountRange: { ...prev.amountRange, max: event.target.value },
            }))
          }
          fullWidth
        />
      </Stack>
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleApplyFilters}
          sx={{ minWidth: 160, fontWeight: 700 }}
        >
          {t("filters.apply") && t("filters.apply").trim() !== ""
            ? t("filters.apply")
            : "Apply Filters"}{" "}
        </Button>
      </Stack>
    </Paper>
  );
}

function BoxTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Stack spacing={0.75}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {subtitle}
      </Typography>
    </Stack>
  );
}
