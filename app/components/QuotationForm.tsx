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
      className="w-full backdrop-blur-md bg-white/30 rounded-lg shadow-lg p-6 border border-white/20"
      data-testid="quotation-form"
      onSubmit={onSubmit}
    >
      <h2 className="text-lg font-medium text-white mb-6">Request Quotation</h2>
      
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition duration-200"
            placeholder="Your full name"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition duration-200"
            placeholder="your@email.com"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition duration-200"
            placeholder="(123) 456-7890"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition duration-200"
            placeholder="Describe your project or needs"
            rows={4}
            required
          />
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg transition duration-200 transform hover:scale-[1.02] backdrop-blur-sm border border-white/20"
          >
            Submit Request
          </button>
        </div>
      </div>
    </form>
  );
};

export default QuotationForm;
