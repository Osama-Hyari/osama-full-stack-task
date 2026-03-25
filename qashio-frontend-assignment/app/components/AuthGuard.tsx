"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "@/lib/auth-context";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isReady } = useAuth();

  useEffect(() => {
    console.log("AuthGuard useEffect:", {
      pathname,
      isAuthenticated,
      isReady,
    });

    if (!isReady) return;
    if (!isAuthenticated && pathname !== "/login") {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, isReady, pathname, router]);

  if (!isReady) {
    console.log("AuthGuard rendering loading state:", {
      pathname,
      isAuthenticated,
      isReady,
    });
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background:
            "radial-gradient(circle at top left, rgba(180,83,9,0.16), transparent 28%), radial-gradient(circle at top right, rgba(20,83,45,0.14), transparent 24%), linear-gradient(180deg, #f8f3ea 0%, #f3efe4 100%)",
        }}
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
