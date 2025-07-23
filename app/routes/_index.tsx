import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import QuotationForm from "~/components/QuotationForm";
import QuotationSummary from "~/components/QuotationSummary";
import StepProgress from "~/components/StepProgress";
import PricingCalculator from "~/components/PricingCalculator";
import { useQuotation } from "~/context/quotation";

export const meta: MetaFunction = () => {
  return [
    { title: "Web Quotation" },
    { name: "description", content: "Web Quotation" },
  ];
};

export default function Index() {
  const [currentStep, setCurrentStep] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState<'usd' | 'mxn'>('usd');
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const { updateQuotation } = useQuotation();
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    console.log(data);
    // Aquí se podría enviar a un paso 3 de confirmación
    setCurrentStep(3);
  };

  const handlePriceUpdate = (total: number, currency: string) => {
    setTotalPrice(total);
    setSelectedCurrency(currency as 'usd' | 'mxn');
  };

  const handleContinue = () => {
    if (!selectedService) return;
    updateQuotation({ 
      productType: selectedService,
      selectedOptions,
      totalPrice,
      currency: selectedCurrency
    });
    setCurrentStep(2);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleServiceSelection = (serviceId: string, options: string[]) => {
    setSelectedService(serviceId);
    setSelectedOptions(options);
  };

  const canGoBack = currentStep > 1;
  const isLastStep = currentStep === 3;

  return (
    <div 
      data-testid="main-container"
      className="w-full"
    >
      <div className="w-full py-4 sm:py-8">
        <div className="flex w-full max-w-7xl flex-col items-center gap-6 sm:gap-8 p-4 mx-auto">
          <header className="w-full text-center">
            <div className="flex justify-between items-center">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800">
                Calculadora de Precios
              </h1>
            </div>
          </header>

          {/* Progress bar section */}
          <div className="w-full -mb-4">
            <StepProgress currentStep={currentStep} totalSteps={3} />
          </div>

          {/* Main content area with two columns */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
            {/* Left column - Forms */}
            <div>
              {currentStep === 1 && (
                <div className="backdrop-blur-md bg-white/70 rounded-xl shadow-lg border border-white/30 p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 text-slate-800">
                    Selecciona tu servicio y opciones
                  </h2>
                  <PricingCalculator 
                    onPriceUpdate={handlePriceUpdate}
                    onServiceSelection={handleServiceSelection}
                  />
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <button
                      type="button"
                      className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors font-medium text-sm sm:text-base shadow-md"
                      onClick={handleContinue}
                      disabled={!selectedService || totalPrice === 0}
                    >
                      Continuar con la cotización
                    </button>
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <div>
                  <QuotationForm 
                    onSubmit={handleSubmit} 
                    onBack={handleBack}
                    quotationData={{
                      serviceId: selectedService,
                      selectedOptions,
                      totalPrice,
                      currency: selectedCurrency
                    }}
                  />
                </div>
              )}
              {currentStep === 3 && (
                <div className="backdrop-blur-md bg-white/70 rounded-xl shadow-lg border border-white/30 p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 text-slate-800">
                    ¡Cotización Enviada!
                  </h2>
                  <div className="text-center space-y-4">
                    <div className="text-6xl mb-4">🎉</div>
                    <p className="text-slate-700">
                      Tu solicitud de cotización ha sido enviada exitosamente. 
                      Nos pondremos en contacto contigo pronto.
                    </p>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentStep(1);
                          setSelectedService('');
                          setSelectedOptions([]);
                          setTotalPrice(0);
                        }}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                      >
                        Nueva Cotización
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right column - Summary */}
            <div>
              <QuotationSummary 
                totalPrice={totalPrice} 
                sections={selectedOptions.length} 
                items={selectedService ? 1 : 0} 
                selectedService={selectedService}
                selectedOptions={selectedOptions}
                currency={selectedCurrency}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
