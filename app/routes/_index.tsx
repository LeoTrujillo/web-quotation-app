import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import QuotationForm from "~/components/QuotationForm";
import QuotationSummary from "~/components/QuotationSummary";
import StepProgress from "~/components/StepProgress";
import { useQuotation } from "~/context/quotation";

const options = [
  { label: "Landing Page", value: "landingPage" },
  { label: "Corporate Website", value: "corporateWebsite" },
  { label: "Web Application", value: "webApp" },
  { label: "Mobile Application", value: "mobileApp" },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Web Quotation" },
    { name: "description", content: "Web Quotation" },
  ];
};

export default function Index() {
  const [currentStep, setCurrentStep] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sections, setSections] = useState(0);
  const [items, setItems] = useState(0);
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

  return (
    <div 
      data-testid="main-container"
      className="flex min-h-screen w-full items-center justify-center py-8"
    >
      <div className="flex w-full max-w-7xl flex-col items-center gap-8 p-4">
        <header className="w-full text-center">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">
              <span className="sr-only">Web Quotation</span>
            </h1>
          </div>
        </header>

        {/* Progress bar section */}
        <div className="w-full -mb-4">
          <StepProgress currentStep={currentStep} totalSteps={3} />
        </div>

        {/* Main content area with two columns */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left column - Forms */}
          <div className="h-full">
            {currentStep === 1 && (
              <div className="backdrop-blur-md bg-white/30 rounded-lg shadow-lg border border-white/20 p-6 h-full flex flex-col">
                <h2 className="text-xl font-bold mb-6 text-white">
                  What would you like to quote?
                </h2>
                <form className="space-y-4 flex-grow flex flex-col">
                  <div className="flex-grow space-y-4">
                    {options.map((opt) => (
                      <label key={opt.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="productType"
                          value={opt.value}
                          checked={selected === opt.value}
                          onChange={() => setSelected(opt.value)}
                          className="accent-white"
                        />
                        <span className="text-white">
                          {opt.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="mt-auto px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded hover:bg-white/40 disabled:bg-white/10 disabled:cursor-not-allowed transition-colors backdrop-blur-sm border border-white/20"
                    onClick={handleContinue}
                    disabled={!selected}
                  >
                    Continue
                  </button>
                </form>
              </div>
            )}
            {currentStep === 2 && (
              <div className="h-full">
                <QuotationForm onSubmit={handleSubmit} />
              </div>
            )}
          </div>

          {/* Right column - Summary */}
          <div className="h-full">
            <QuotationSummary totalPrice={totalPrice} sections={sections} items={items} />
          </div>
        </div>
      </div>
    </div>
  );
}
