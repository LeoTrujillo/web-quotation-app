import { render } from '@testing-library/react';
import { vi } from 'vitest';
import QuotationForm from '~/components/QuotationForm';

describe('QuotationForm component', () => {
  it('renders without crashing', () => {
    const mockSubmit = vi.fn();
    render(<QuotationForm onSubmit={mockSubmit} />);
    expect(true).toBe(true);
  });
});
