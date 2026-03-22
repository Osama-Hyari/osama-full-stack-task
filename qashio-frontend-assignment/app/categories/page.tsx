"use client";
import { useEffect, useState } from "react";
import { Box, Paper, Stack, Typography, CircularProgress } from "@mui/material";

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
      <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, mb: 3, background: '#fffdf8', borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Categories List
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <Typography color="error" fontWeight={600}>{error}</Typography>
          </Box>
        ) : categories.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <Typography color="text.secondary">No categories found.</Typography>
          </Box>
        ) : (
          <Stack spacing={2}>
            {categories.map((cat: any) => {
              const catBudgets = budgets.filter((b: any) => b.categoryId === cat.id);
              return (
                <Paper key={cat.id} elevation={1} sx={{ p: 2, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                  <Typography fontWeight={700} fontSize={18} sx={{ flex: 1 }}>{cat.name}</Typography>
                  <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                    {catBudgets.length === 0 ? (
                      <Typography color="text.secondary" fontSize={14}>No budget</Typography>
                    ) : (
                      catBudgets.map((b: any) => (
                        <Box key={b.id} sx={{ bgcolor: '#f3efe4', px: 1.5, py: 0.5, borderRadius: 1, fontSize: 14, fontWeight: 600, color: '#b45309', minWidth: 80, textAlign: 'center' }}>
                          Budget: {b.amount}
                        </Box>
                      ))
                    )}
                  </Stack>
                </Paper>
              );
            })}
          </Stack>
        )}
      </Paper>
    </Box>
  );
}
