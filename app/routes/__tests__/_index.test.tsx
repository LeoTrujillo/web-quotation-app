import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { QuotationProvider } from '~/context/quotation';
import Index from '../_index';

// Mock useNavigate
vi.mock('@remix-run/react', () => ({
  useNavigate: () => vi.fn(),
}));

describe('Index Page', () => {
  const renderComponent = () => {
    return render(
      <QuotationProvider>
        <Index />
      </QuotationProvider>
    );
  };

  it('renders the main title', () => {
    renderComponent();
    expect(screen.getByText('Cotizador de Web')).toBeInTheDocument();
  });

  it('toggles dark mode when clicking the theme button', () => {
    renderComponent();
    const themeButton = screen.getByRole('button', { name: /cambiar a modo/i });
    const container = screen.getByTestId('main-container');
    
    expect(container).toHaveClass('bg-gray-100');
    fireEvent.click(themeButton);
    expect(container).toHaveClass('bg-gray-900');
  });

  it('enables continue button only when an option is selected', () => {
    renderComponent();
    const continueButton = screen.getByRole('button', { name: /continuar/i });
    expect(continueButton).toBeDisabled();

    const landingPageOption = screen.getByLabelText('Landing Page');
    fireEvent.click(landingPageOption);
    expect(continueButton).toBeEnabled();
  });

  it('shows all product type options', () => {
    renderComponent();
    const options = [
      'Landing Page',
      'Sitio Web Corporativo',
      'Aplicación Web',
      'Aplicación Móvil'
    ];

    options.forEach(option => {
      expect(screen.getByLabelText(option)).toBeInTheDocument();
    });
  });

  it('updates step progress when continuing to next step', () => {
    renderComponent();
    const landingPageOption = screen.getByLabelText('Landing Page');
    const continueButton = screen.getByRole('button', { name: /continuar/i });

    fireEvent.click(landingPageOption);
    fireEvent.click(continueButton);

    // Verify that QuotationForm is rendered
    expect(screen.queryByText('¿Qué quieres cotizar?')).not.toBeInTheDocument();
    expect(screen.getByTestId('quotation-form')).toBeInTheDocument();
  });
}); 