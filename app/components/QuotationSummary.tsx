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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-medium mb-4 text-gray-800">Quotation Summary</h2>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">Total</span>
        <span className="text-xl font-bold text-gray-800">${totalPrice}</span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">Sections</span>
        <span className="text-gray-600">{sections}</span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">Items</span>
        <span className="text-gray-600">{items}</span>
      </div>
    </div>
  );
};

export default QuotationSummary;
