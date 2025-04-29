// app/__tests__/StepProgress.test.tsx
import { render, screen } from '@testing-library/react';
import StepProgress from '~/components/StepProgress';

describe('StepProgress component', () => {
  it('renders current step', () => {
    render(<StepProgress currentStep={2} totalSteps={4} />);
    expect(screen.getByText('Paso 2 de 4')).toBeInTheDocument();
  });
});
