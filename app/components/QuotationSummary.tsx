import { FC } from 'react';

/**
 * Interface that defines the properties for the QuotationSummary component
 * @interface QuotationSummaryProps
 * @property {number} totalPrice - The total price of the quotation
 * @property {number} sections - Number of sections included
 * @property {number} items - Total number of items in the quotation
 */
interface QuotationSummaryProps {
  totalPrice: number;
  sections: number;
  items: number;
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
 * />
 * ```
 */
const QuotationSummary: FC<QuotationSummaryProps> = ({ totalPrice, sections, items }) => {
  return (
    <div className="backdrop-blur-md bg-white/30 p-6 rounded-lg shadow-lg border border-white/20 h-full flex flex-col">
      <h2 className="text-lg font-medium mb-6 text-white">Quotation Summary</h2>
      <div className="flex-grow flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white/80">Total</span>
            <span className="text-xl font-bold text-white">${totalPrice}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/80">Sections</span>
            <span className="text-white/80">{sections}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/80">Items</span>
            <span className="text-white/80">{items}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationSummary;
