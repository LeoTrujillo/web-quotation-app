import { FC } from 'react';

interface QuotationSummaryProps {
  totalPrice: number;
  sections: number;
  items: number;
}

const QuotationSummary: FC<QuotationSummaryProps> = ({ totalPrice, sections, items }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-medium mb-4 text-gray-800">Resumen de la cotización</h2>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">Total</span>
        <span className="text-xl font-bold text-gray-800">${totalPrice}</span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">Secciones</span>
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
