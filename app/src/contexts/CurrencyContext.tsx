import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface Currency {
  code: string
  symbol: string
  name: string
  rate: number
}

const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
  { code: 'NPR', symbol: 'Rs', name: 'Nepalese Rupee', rate: 133.50 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.12 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.52 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1.36 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 149.50 },
]

interface CurrencyContextType {
  currency: Currency
  currencies: Currency[]
  setCurrency: (code: string) => void
  formatPrice: (amount: number, targetCurrency?: string) => string
  convertPrice: (amount: number, fromCurrency: string, toCurrency: string) => number
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(currencies[0])

  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency')
    if (savedCurrency) {
      const found = currencies.find(c => c.code === savedCurrency)
      if (found) setCurrencyState(found)
    }
  }, [])

  const setCurrency = (code: string) => {
    const found = currencies.find(c => c.code === code)
    if (found) {
      setCurrencyState(found)
      localStorage.setItem('currency', code)
    }
  }

  const convertPrice = (amount: number, fromCurrency: string, toCurrency: string): number => {
    const from = currencies.find(c => c.code === fromCurrency) || currencies[0]
    const to = currencies.find(c => c.code === toCurrency) || currencies[0]
    const usdAmount = amount / from.rate
    return usdAmount * to.rate
  }

  const formatPrice = (amount: number, targetCurrency?: string): string => {
    const curr = targetCurrency 
      ? currencies.find(c => c.code === targetCurrency) || currency
      : currency
    const converted = convertPrice(amount, 'USD', curr.code)
    return `${curr.symbol}${converted.toFixed(2)}`
  }

  return (
    <CurrencyContext.Provider value={{
      currency,
      currencies,
      setCurrency,
      formatPrice,
      convertPrice,
    }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
