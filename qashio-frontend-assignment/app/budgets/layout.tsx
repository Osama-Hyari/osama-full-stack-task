import AuthGuard from '../components/AuthGuard';
import PageLayout from '../components/PageLayout';

export default function BudgetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <PageLayout>{children}</PageLayout>
    </AuthGuard>
  );
}
