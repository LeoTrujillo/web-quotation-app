import { FC } from 'react';

/**
 * Interface that defines the properties for the StepProgress component
 * @interface StepProgressProps
 * @property {number} currentStep - The current step in the process
 * @property {number} totalSteps - The total number of steps in the process
 */
interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { number: 1, title: "Seleccionar Servicio" },
  { number: 2, title: "Información de Contacto" },
  { number: 3, title: "Confirmación" }
];

/**
 * Component that displays a progress bar to indicate advancement in a multi-step process
 * @component
 * @param {StepProgressProps} props - The component properties
 * @returns {JSX.Element} Progress bar with numbered steps
 * 
 * @example
 * ```tsx
 * <StepProgress currentStep={2} totalSteps={4} />
 * ```
 */
const StepProgress: FC<StepProgressProps> = ({ currentStep }) => {
  return (
    <div className="w-full p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-center relative gap-12 md:gap-4 pb-4 md:pb-20">
        {steps.map((step, index) => (
          <div key={step.number} className="relative flex items-center w-full md:w-1/3">
            {/* Mobile vertical line (before) */}
            {index > 0 && (
              <div className="absolute h-12 w-[2px] -translate-y-[3.5rem] left-5 md:hidden">
                <div className="absolute w-full h-full bg-slate-300" />
                <div 
                  className={`absolute w-full transition-all duration-700 ease-in-out
                    ${currentStep > step.number ? 'bg-blue-600' : 'bg-slate-400'}`}
                  style={{ 
                    height: currentStep > step.number ? '100%' : 
                           currentStep === step.number ? '50%' : '0%',
                    transitionDelay: `${index * 200}ms`
                  }}
                />
              </div>
            )}

            <div className="flex w-full items-center">
              {/* Desktop horizontal line (before circle) */}
              {index > 0 && (
                <div className="hidden md:block h-[2px] w-full relative top-0">
                  <div className="absolute w-full h-full bg-slate-300" />
                  <div 
                    className={`absolute h-full transition-all duration-700 ease-in-out
                      ${currentStep > step.number ? 'bg-blue-600' : 'bg-slate-400'}`}
                    style={{ 
                      width: currentStep >= step.number ? '100%' : 
                             currentStep === step.number - 1 ? '50%' : '0%',
                      transitionDelay: `${index * 200}ms`
                    }}
                  />
                </div>
              )}

              {/* Step circle and content */}
              <div className="flex flex-row md:flex-col items-start md:items-center relative">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 relative z-10
                    transform transition-all duration-500 ease-in-out shrink-0 font-semibold
                    ${currentStep > step.number 
                      ? 'bg-blue-600 border-blue-600 text-white scale-110' 
                      : currentStep === step.number
                      ? 'bg-white border-blue-600 text-blue-600 scale-110 shadow-md'
                      : 'bg-white border-slate-300 text-slate-400 scale-100'}`}
                >
                  {step.number}
                </div>
                
                {/* Title */}
                <div className="ml-4 md:ml-0 md:absolute md:top-12 md:left-1/2 md:-translate-x-1/2 text-left md:text-center md:w-full">
                  <div className={`text-sm font-medium transition-all duration-500 ease-in-out whitespace-nowrap ${
                    currentStep >= step.number ? 'text-slate-800' : 'text-slate-500'
                  }`}>
                    {step.title}
                  </div>
                </div>
              </div>

              {/* Desktop horizontal line (after circle) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block h-[2px] w-full relative top-0">
                  <div className="absolute w-full h-full bg-slate-300" />
                  <div 
                    className={`absolute h-full transition-all duration-700 ease-in-out
                      ${currentStep > step.number ? 'bg-blue-600' : 'bg-slate-400'}`}
                    style={{ 
                      width: currentStep > step.number ? '100%' : 
                             currentStep === step.number ? '50%' : '0%',
                      transitionDelay: `${index * 200}ms`
                    }}
                  />
                </div>
              )}
            </div>

            {/* Mobile vertical line (after) */}
            {index < steps.length - 1 && (
              <div className="absolute h-12 w-[2px] translate-y-[3.5rem] left-5 md:hidden">
                <div className="absolute w-full h-full bg-slate-300" />
                <div 
                  className={`absolute w-full transition-all duration-700 ease-in-out
                    ${currentStep > step.number ? 'bg-blue-600' : 'bg-slate-400'}`}
                  style={{ 
                    height: currentStep > step.number ? '100%' : 
                           currentStep === step.number ? '50%' : '0%',
                    transitionDelay: `${index * 200}ms`
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepProgress;
