import { FC } from 'react';
import { getServiceById, formatPrice } from '~/utils/pricing';

/**
 * Interface that defines the properties for the QuotationSummary component
 * @interface QuotationSummaryProps
 * @property {number} totalPrice - The total price of the quotation
 * @property {number} sections - Number of sections included
 * @property {number} items - Total number of items in the quotation
 * @property {string} selectedService - The selected service ID
 * @property {string[]} selectedOptions - Array of selected option IDs
 * @property {string} currency - The selected currency
 */
interface QuotationSummaryProps {
  totalPrice: number;
  sections: number;
  items: number;
  selectedService?: string;
  selectedOptions?: string[];
  currency?: 'usd' | 'mxn';
}

/**
 * Component that displays a summary of the current quotation
 * @component
 * @param {QuotationSummaryProps} props - The component properties
 * @returns {JSX.Element} Panel with quotation summary
 * 
 * @example
 * ```tsx
 * <QuotationSummary
 *   totalPrice={1500}
 *   sections={3}
 *   items={10}
 *   selectedService="landingPage"
 *   selectedOptions={["contactForm", "animations"]}
 *   currency="usd"
 * />
 * ```
 */
const QuotationSummary: FC<QuotationSummaryProps> = ({ 
  totalPrice, 
  sections, 
  items, 
  selectedService,
  selectedOptions = [],
  currency = 'usd'
}) => {
  const service = selectedService ? getServiceById(selectedService) : null;
  const selectedOptionsData = selectedOptions
    .map(optionId => service?.options.find(opt => opt.id === optionId))
    .filter(Boolean);

  return (
    <div className="backdrop-blur-md bg-white/70 p-4 sm:p-6 rounded-xl shadow-lg border border-white/30">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-slate-800">Resumen de Cotización</h2>
      <div className="space-y-4">
        {/* Service Information */}
        {service && (
          <div className="p-3 bg-slate-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-1">{service.name}</h3>
            <p className="text-sm text-slate-600">{service.description}</p>
          </div>
        )}

        {/* Selected Options */}
        {selectedOptionsData.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-slate-700 text-sm">Opciones seleccionadas:</h4>
            <div className="space-y-1">
              {selectedOptionsData.map((option, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">• {option?.name}</span>
                  <span className="text-slate-700 font-medium">
                    +{formatPrice(option?.price[currency] || 0, currency)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total Price */}
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <span className="text-slate-700 font-medium">Total</span>
          <span className="text-xl sm:text-2xl font-bold text-blue-600">
            {formatPrice(totalPrice, currency)}
          </span>
        </div>

        {/* Additional Info */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Servicios</span>
            <span className="text-slate-800 font-medium">{items}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Opciones</span>
            <span className="text-slate-800 font-medium">{sections}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationSummary;
