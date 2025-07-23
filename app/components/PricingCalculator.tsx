import React, { FC, useState, useEffect } from 'react';
import { 
  getAllServices, 
  getServiceOptions, 
  calculateTotalPrice, 
  formatPrice,
  getCurrencyOptions,
  type Service,
  type PricingOption
} from '~/utils/pricing';

interface PricingCalculatorProps {
  onPriceUpdate?: (total: number, currency: string) => void;
  onServiceSelection?: (serviceId: string, options: string[]) => void;
}

const PricingCalculator: FC<PricingCalculatorProps> = ({ 
  onPriceUpdate, 
  onServiceSelection 
}) => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [currency, setCurrency] = useState<'usd' | 'mxn'>('usd');
  
  const services = getAllServices();
  const currencyOptions = getCurrencyOptions();
  const serviceOptions = selectedService ? getServiceOptions(selectedService) : [];
  const totalPrice = calculateTotalPrice(selectedService, selectedOptions, currency);

  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId);
    setSelectedOptions([]); // Reset options when service changes
  };

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleCurrencyChange = (newCurrency: 'usd' | 'mxn') => {
    setCurrency(newCurrency);
  };

  // Notify parent component of price changes
  useEffect(() => {
    onPriceUpdate?.(totalPrice, currency);
  }, [totalPrice, currency, onPriceUpdate]);

  // Notify parent component of service selection
  useEffect(() => {
    onServiceSelection?.(selectedService, selectedOptions);
  }, [selectedService, selectedOptions, onServiceSelection]);

  return (
    <div className="space-y-6">
      {/* Currency Selector */}
      <div className="flex justify-end">
        <div className="flex space-x-2">
          {currencyOptions.map(option => (
            <button
              key={option.code}
              onClick={() => handleCurrencyChange(option.code as 'usd' | 'mxn')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                currency === option.code
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {option.code.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Service Selection */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Selecciona tu servicio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedService === service.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              onClick={() => handleServiceChange(service.id)}
            >
              <h4 className="font-semibold text-slate-800">{service.name}</h4>
              <p className="text-sm text-slate-600 mt-1">{service.description}</p>
              <p className="text-lg font-bold text-blue-600 mt-2">
                {formatPrice(service.basePrice[currency], currency)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Options Selection */}
      {selectedService && serviceOptions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Opciones adicionales</h3>
          <div className="space-y-3">
            {serviceOptions.map((option) => (
              <label
                key={option.id}
                className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option.id)}
                  onChange={() => handleOptionToggle(option.id)}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <span className="font-medium text-slate-800">{option.name}</span>
                  {option.description && (
                    <p className="text-sm text-slate-600">{option.description}</p>
                  )}
                </div>
                <span className="font-semibold text-blue-600">
                  +{formatPrice(option.price[currency], currency)}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Total Price */}
      {selectedService && (
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Precio Total</h3>
          <div className="text-3xl font-bold text-blue-600">
            {formatPrice(totalPrice, currency)}
          </div>
          <p className="text-sm text-slate-600 mt-1">
            {selectedOptions.length} opciones seleccionadas
          </p>
        </div>
      )}
    </div>
  );
};

export default PricingCalculator; 