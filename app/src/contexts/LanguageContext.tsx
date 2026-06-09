import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface Language {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ne', name: 'नेपाली', flag: '🇳🇵' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
]

interface LanguageContextType {
  language: Language
  languages: Language[]
  setLanguage: (code: string) => void
  t: (key: string) => string
}

const translations: Record<string, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.practitioners': 'Therapists',
    'nav.packages': 'Packages',
    'nav.gallery': 'Gallery',
    'nav.reviews': 'Reviews',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.book_now': 'Book Now',
    'hero.title': 'Experience Tranquility in the Heart of Thamel',
    'hero.subtitle': 'Authentic Ayurvedic treatments & luxury spa experiences',
    'hero.cta': 'Book Your Session',
    'footer.copyright': '© 2024 Thamel Spa & Wellness. All rights reserved.',
  },
  ne: {
    'nav.home': 'गृहपृष्ठ',
    'nav.about': 'हाम्रोबारे',
    'nav.services': 'सेवाहरू',
    'nav.practitioners': 'थेरापिस्टहरू',
    'nav.packages': 'प्याकेजहरू',
    'nav.gallery': 'ग्यालेरी',
    'nav.reviews': 'समीक्षाहरू',
    'nav.faq': 'प्रश्नहरू',
    'nav.contact': 'सम्पर्क',
    'nav.book_now': 'अहिले बुक गर्नुहोस्',
    'hero.title': 'थमेलको मुटुमा शान्ति अनुभव गर्नुहोस्',
    'hero.subtitle': 'प्रामाणिक आयुर्वेदिक उपचार र लक्जरी स्पा अनुभवहरू',
    'hero.cta': 'आफ्नो सत्र बुक गर्नुहोस्',
    'footer.copyright': '© 2024 थमेल स्पा र वेलनेस। सर्वाधिकार सुरक्षित।',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(languages[0])

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage) {
      const found = languages.find(l => l.code === savedLanguage)
      if (found) setLanguageState(found)
    }
  }, [])

  const setLanguage = (code: string) => {
    const found = languages.find(l => l.code === code)
    if (found) {
      setLanguageState(found)
      localStorage.setItem('language', code)
    }
  }

  const t = (key: string): string => {
    return translations[language.code]?.[key] || translations['en']?.[key] || key
  }

  return (
    <LanguageContext.Provider value={{
      language,
      languages,
      setLanguage,
      t,
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
