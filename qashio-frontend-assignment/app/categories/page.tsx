"use client";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import CategoriesList from "./components/widgets/CategoriesList";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [budgets, setBudgets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetch("/api/categories").then((res) =>
        res.ok ? res.json() : Promise.reject("Failed to fetch categories"),
      ),
      fetch("/api/budgets").then((res) =>
        res.ok ? res.json() : []
      ).then((bud) => Array.isArray(bud.data) ? bud.data : bud).catch(() => []),
    ])
      .then(([cat, bud]) => {
        setCategories(cat);
        setBudgets(Array.isArray(bud) ? bud : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(typeof err === "string" ? err : "Failed to load data");
        setBudgets([]);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 800, letterSpacing: '-0.03em' }}>
        Categories
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Browse all categories and see their associated budgets. Click a category for more details (future feature).
      </Typography>
      <CategoriesList
        categories={categories}
        budgets={budgets}
        loading={loading}
        error={error}
      />
    </Box>
  );
}
