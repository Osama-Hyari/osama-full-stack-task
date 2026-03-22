import { render, screen } from '@testing-library/react';
import SummaryHighlights from '@/app/transactions/components/SummaryHighlights';

describe('SummaryHighlights', () => {
  it('renders summary metrics', () => {
    render(
      <SummaryHighlights
        isLoading={false}
        summary={{ totalIncome: 2200, totalExpense: 850, net: 1350 }}
        transactionCount={14}
        categoryCount={6}
      />,
    );

    expect(screen.getByText('Income')).toBeInTheDocument();
    expect(screen.getByText('$2,200.00')).toBeInTheDocument();
    expect(screen.getByText('$850.00')).toBeInTheDocument();
    expect(screen.getByText('$1,350.00')).toBeInTheDocument();
    expect(screen.getByText('14 txns / 6 cats')).toBeInTheDocument();
  });
});