export const dynamic = "force-dynamic";
import AuthGuard from '../components/AuthGuard';
import PageLayout from '../components/PageLayout';

export default function CategoriesLayout({
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
