import {
  hasTransactionFormErrors,
  toTransactionPayload,
  validateTransactionForm,
} from '@/lib/transaction-form';

describe('transaction-form helpers', () => {
  it('flags missing and invalid fields', () => {
    const errors = validateTransactionForm({
      amount: '0',
      categoryId: '',
      date: null,
      type: 'expense',
    });

    expect(errors.amount).toBe('Amount must be greater than 0.');
    expect(errors.categoryId).toBe('Select a category.');
    expect(errors.date).toBe('Choose a valid date.');
    expect(hasTransactionFormErrors(errors)).toBe(true);
  });

  it('maps valid form values to the backend payload', () => {
    const date = new Date('2026-03-19T10:30:00.000Z');

    const payload = toTransactionPayload({
      amount: '245.5',
      categoryId: 'cat-1',
      date,
      type: 'income',
    });

    expect(payload).toEqual({
      amount: 245.5,
      categoryId: 'cat-1',
      date: '2026-03-19T10:30:00.000Z',
      type: 'income',
    });
  });
});
