import { FC, useState } from 'react';
import { generateQuotationPDF } from '~/utils/pdfGenerator';

/**
 * Interface that defines the properties for the QuotationForm component
 * @interface QuotationFormProps
 * @property {function} onSubmit - Function that handles form submission
 * @property {function} onBack - Function that handles going back to previous step
 * @property {any} data - The form data to be submitted
 */
interface QuotationFormProps {
  onSubmit: (data: any) => void;
  onBack?: () => void;
  quotationData?: {
    serviceId: string;
    selectedOptions: string[];
    totalPrice: number;
    currency: 'usd' | 'mxn';
  };
}

/**
 * Form component for requesting a quotation
 * @component
 * @param {QuotationFormProps} props - The component properties
 * @returns {JSX.Element} Form with fields for name, email, phone, and message
 * 
 * @example
 * ```tsx
 * const handleSubmit = (data) => {
 *   console.log(data);
 * };
 * 
 * <QuotationForm onSubmit={handleSubmit} onBack={handleBack} />
 * ```
 */
const QuotationForm: FC<QuotationFormProps> = ({ onSubmit, onBack, quotationData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    };

    // Simular envío
    setTimeout(() => {
      onSubmit(data);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleDownloadPDF = async () => {
    if (!quotationData) return;
    
    setIsGeneratingPDF(true);
    try {
      // Obtener datos del formulario
      const form = document.querySelector('form[data-testid="quotation-form"]') as HTMLFormElement;
      const formData = new FormData(form);
      
      const customerInfo = {
        name: formData.get('name') as string || 'Cliente',
        email: formData.get('email') as string || 'cliente@email.com',
        phone: formData.get('phone') as string || undefined,
        message: formData.get('message') as string || undefined,
      };

      await generateQuotationPDF({
        ...quotationData,
        customerInfo
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Por favor, inténtalo de nuevo.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="w-full backdrop-blur-md bg-white/70 rounded-xl shadow-lg p-4 sm:p-6 border border-white/30">
      <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-4 sm:mb-6">Información de Contacto</h2>
      
      <form 
        className="space-y-4 sm:space-y-5"
        data-testid="quotation-form"
        onSubmit={handleFormSubmit}
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
            Nombre completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm sm:text-base"
            placeholder="Tu nombre completo"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm sm:text-base"
            placeholder="tu@email.com"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm sm:text-base"
            placeholder="(123) 456-7890"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm sm:text-base resize-none"
            placeholder="Describe tu proyecto o necesidades específicas"
            rows={4}
            required
          />
        </div>
        
        <div className="pt-4 space-y-3">
          {/* Botón de descarga PDF */}
          {quotationData && (
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white font-medium rounded-lg transition-colors transform hover:scale-[1.02] shadow-md text-sm sm:text-base flex items-center justify-center space-x-2"
            >
              {isGeneratingPDF ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generando PDF...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Descargar Cotización PDF</span>
                </>
              )}
            </button>
          )}

          {/* Botones de navegación */}
          <div className="flex space-x-4">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="flex-1 px-4 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors font-medium text-sm sm:text-base flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Atrás</span>
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-medium rounded-lg transition-colors transform hover:scale-[1.02] shadow-md text-sm sm:text-base flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Enviar Cotización</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuotationForm;
