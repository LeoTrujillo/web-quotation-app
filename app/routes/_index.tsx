import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import QuotationForm from "~/components/QuotationForm";
import QuotationSummary from "~/components/QuotationSummary";
import StepProgress from "~/components/StepProgress";
import { useQuotation } from "~/context/quotation";

const options = [
  { label: "Landing Page", value: "landingPage" },
  { label: "Sitio Web Corporativo", value: "corporateWebsite" },
  { label: "Aplicación Web", value: "webApp" },
  { label: "Aplicación Móvil", value: "mobileApp" },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Cotizador de Web" },
    { name: "description", content: "Cotizador de Web" },
  ];
};

export default function Index() {
  const [currentStep, setCurrentStep] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sections, setSections] = useState(0);
  const [items, setItems] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selected, setSelected] = useState<string>();
  const { updateQuotation } = useQuotation();
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  const handleContinue = () => {
    if (!selected) return;
    updateQuotation({ productType: selected });
    setCurrentStep(2);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div 
      data-testid="main-container"
      className={`flex h-screen w-full items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
    >
      <div className="flex w-full max-w-6xl flex-col items-center gap-8 p-4">
        <header className="w-full text-center">
          <div className="flex justify-between items-center mb-4">
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              <span className="sr-only">Cotizador de Web</span>
            </h1>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </header>
        <div className="flex w-full flex-col items-center gap-8">
          <div className="w-full">
            <StepProgress currentStep={currentStep} totalSteps={4} />
          </div>
          <div className="w-full">
            <QuotationSummary totalPrice={totalPrice} sections={sections} items={items} />
          </div>
          {currentStep === 1 && (
            <div className="p-6 max-w-xl mx-auto w-full">
              <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                ¿Qué quieres cotizar?
              </h2>
              <form className="space-y-4">
                {options.map((opt) => (
                  <label key={opt.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="productType"
                      value={opt.value}
                      checked={selected === opt.value}
                      onChange={() => setSelected(opt.value)}
                      className="accent-blue-600"
                    />
                    <span className={isDarkMode ? 'text-white' : 'text-gray-700'}>
                      {opt.label}
                    </span>
                  </label>
                ))}
                <button
                  type="button"
                  className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  onClick={handleContinue}
                  disabled={!selected}
                >
                  Continuar
                </button>
              </form>
            </div>
          )}
          {currentStep === 2 && (
            <div className="w-full">
              <QuotationForm onSubmit={handleSubmit} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
