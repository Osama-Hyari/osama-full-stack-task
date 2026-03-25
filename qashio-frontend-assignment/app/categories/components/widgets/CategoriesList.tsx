import { Box, Paper, Stack, Typography, CircularProgress } from "@mui/material";

export default function CategoriesList({ categories, budgets, loading, error }: {
  categories: any[];
  budgets: any[];
  loading: boolean;
  error: string | null;
}) {
  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, mb: 3, background: '#fffdf8', borderRadius: 3, width: '100%' }}>
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
        <Stack spacing={2} sx={{ width: '100%' }}>
          {categories.map((cat: any) => {
            const catBudgets = budgets.filter((b: any) => b.categoryId === cat.id);
            return (
              <Paper key={cat.id} elevation={1} sx={{ p: 2, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, width: '100%' }}>
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
  );
}
