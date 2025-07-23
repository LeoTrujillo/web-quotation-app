import pricingData from '../data/pricing.json';

export interface PricingOption {
  id: string;
  name: string;
  description?: string;
  price: {
    usd: number;
    mxn: number;
  };
}

export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: {
    usd: number;
    mxn: number;
  };
  options: PricingOption[];
}

export interface PricingData {
  services: Service[];
  currency: {
    default: string;
    options: Array<{
      code: string;
      symbol: string;
      name: string;
    }>;
  };
  metadata: {
    lastUpdated: string;
    exchangeRate: {
      usd_to_mxn: number;
    };
  };
}

/**
 * Obtiene todos los servicios disponibles
 */
export function getAllServices(): Service[] {
  return (pricingData as PricingData).services;
}

/**
 * Obtiene un servicio específico por ID
 */
export function getServiceById(serviceId: string): Service | undefined {
  return getAllServices().find(service => service.id === serviceId);
}

/**
 * Obtiene las opciones de un servicio específico
 */
export function getServiceOptions(serviceId: string): PricingOption[] {
  const service = getServiceById(serviceId);
  return service?.options || [];
}

/**
 * Calcula el precio total de un servicio con sus opciones seleccionadas
 */
export function calculateTotalPrice(
  serviceId: string, 
  selectedOptions: string[] = [], 
  currency: 'usd' | 'mxn' = 'usd'
): number {
  const service = getServiceById(serviceId);
  if (!service) return 0;

  let total = service.basePrice[currency];
  
  selectedOptions.forEach(optionId => {
    const option = service.options.find(opt => opt.id === optionId);
    if (option) {
      total += option.price[currency];
    }
  });

  return total;
}

/**
 * Formatea un precio con el símbolo de moneda
 */
export function formatPrice(price: number, currency: 'usd' | 'mxn' = 'usd'): string {
  const symbol = currency === 'usd' ? '$' : '$';
  const formattedPrice = price.toLocaleString(currency === 'usd' ? 'en-US' : 'es-MX');
  return `${symbol}${formattedPrice}`;
}

/**
 * Obtiene las opciones de moneda disponibles
 */
export function getCurrencyOptions() {
  return (pricingData as PricingData).currency.options;
}

/**
 * Obtiene la moneda por defecto
 */
export function getDefaultCurrency(): string {
  return (pricingData as PricingData).currency.default;
}

/**
 * Convierte un precio de USD a MXN
 */
export function convertUsdToMxn(usdPrice: number): number {
  const rate = (pricingData as PricingData).metadata.exchangeRate.usd_to_mxn;
  return Math.round(usdPrice * rate);
}

/**
 * Convierte un precio de MXN a USD
 */
export function convertMxnToUsd(mxnPrice: number): number {
  const rate = (pricingData as PricingData).metadata.exchangeRate.usd_to_mxn;
  return Math.round(mxnPrice / rate);
}

/**
 * Obtiene el resumen de un servicio con opciones seleccionadas
 */
export function getServiceSummary(
  serviceId: string, 
  selectedOptions: string[] = [], 
  currency: 'usd' | 'mxn' = 'usd'
) {
  const service = getServiceById(serviceId);
  if (!service) return null;

  const basePrice = service.basePrice[currency];
  const selectedOptionsData = selectedOptions
    .map(optionId => service.options.find(opt => opt.id === optionId))
    .filter(Boolean) as PricingOption[];
  
  const optionsTotal = selectedOptionsData.reduce((sum, option) => sum + option.price[currency], 0);
  const total = basePrice + optionsTotal;

  return {
    service,
    basePrice,
    selectedOptions: selectedOptionsData,
    optionsTotal,
    total,
    currency
  };
}
