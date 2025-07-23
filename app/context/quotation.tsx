import { createContext ,useContext, useState, ReactNode } from "react";

type ProductType = "landingPage" | "corporateWebsite" | "webApp" | "mobileApp";

interface QuotationData {
  productType: string;
  selectedOptions?: string[];
  totalPrice?: number;
  currency?: 'usd' | 'mxn';
  details? : {
    [key in ProductType]?: {
      sections: number;
      items: number;
    };
  };
  extras?: {
    [key: string]: boolean;
  };
  setProductType: (productType: string) => void;
  setDetails: (details: { [key in ProductType]?: { sections: number; items: number; } }) => void;
  setExtras: (extras: { [key: string]: boolean }) => void;
}

interface QuotationContextType {
  quotation: QuotationData;
  updateQuotation: (data: Partial<QuotationData>) => void;
}

const QuotationContext = createContext<QuotationContextType | undefined>(undefined);

export function QuotationProvider({ children }: { children: ReactNode }) {
  const [quotation, setQuotation] = useState<QuotationData>({
    productType: '',
    selectedOptions: [],
    totalPrice: 0,
    currency: 'usd',
    setProductType: (type: string) => {},
    setDetails: (details) => {},
    setExtras: (extras) => {}
  });

  const updateQuotation = (data: Partial<QuotationData>) => {
    setQuotation((prev) => ({ ...prev, ...data }));
  };

  return (
    <QuotationContext.Provider value={{ quotation, updateQuotation }}>
      {children}
    </QuotationContext.Provider>
  );
}

export function useQuotation() {
  const context = useContext(QuotationContext);
  if (!context) throw new Error("useQuotation must be used within a QuotationProvider");
  return context;
}