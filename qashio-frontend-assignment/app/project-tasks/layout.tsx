export const dynamic = "force-dynamic";
import React from 'react';

import PageLayout from '../components/PageLayout';

export default function ProjectTasksLayout({ children }: { children: React.ReactNode }) {
  return <PageLayout>{children}</PageLayout>;
}
