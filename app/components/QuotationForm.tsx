import { FC } from 'react';

/**
 * Interface that defines the properties for the QuotationForm component
 * @interface QuotationFormProps
 * @property {function} onSubmit - Function that handles form submission
 * @property {any} data - The form data to be submitted
 */
interface QuotationFormProps {
  onSubmit: (data: any) => void;
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
 * <QuotationForm onSubmit={handleSubmit} />
 * ```
 */
const QuotationForm: FC<QuotationFormProps> = ({ onSubmit }) => {
  return (
    <form 
      className="w-full bg-[#fff] rounded-lg shadow-md p-6"
      data-testid="quotation-form"
      onSubmit={onSubmit}
    >
      <h2 className="text-lg font-medium text-gray-800 mb-6">Request Quotation</h2>
      
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
            placeholder="Your full name"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
            placeholder="your@email.com"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
            placeholder="(123) 456-7890"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
            placeholder="Describe your project or needs"
            rows={4}
            required
          />
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 transform hover:scale-[1.02]"
          >
            Submit Request
          </button>
        </div>
      </div>
    </form>
  );
};

export default QuotationForm;
