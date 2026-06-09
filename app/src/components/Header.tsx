import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCurrency } from '../contexts/CurrencyContext'
import { useLanguage } from '../contexts/LanguageContext'
import {
  Menu,
  X,
  Phone,
  Globe,
  DollarSign,
  ChevronDown,
  User,
  Calendar,
  LogOut,
  Sparkles
} from 'lucide-react'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/practitioners', label: 'Therapists' },
  { path: '/packages', label: 'Packages' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/reviews', label: 'Reviews' },
  { path: '/faq', label: 'FAQ' },
  { path: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  
  const { user, isAuthenticated, logout } = useAuth()
  const { currency, currencies, setCurrency } = useCurrency()
  const { language, languages, setLanguage } = useLanguage()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      {/* Top Bar */}
      <div className={`${isScrolled ? 'hidden' : 'block'} bg-slate-900 text-white text-sm`}>
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+9771234567890" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
              <Phone className="w-4 h-4" />
              <span>+977 1-234-5678</span>
            </a>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline text-slate-300">Open 9 AM - 9 PM Daily</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 hover:text-amber-400 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{language.flag}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl py-2 text-slate-800">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setLangDropdownOpen(false)
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-amber-50 flex items-center gap-2 ${
                        language.code === lang.code ? 'bg-amber-50 text-amber-600' : ''
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 hover:text-amber-400 transition-colors"
              >
                <DollarSign className="w-4 h-4" />
                <span>{currency.code}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 text-slate-800">
                  {currencies.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        setCurrency(curr.code)
                        setCurrencyDropdownOpen(false)
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-amber-50 flex items-center justify-between ${
                        currency.code === curr.code ? 'bg-amber-50 text-amber-600' : ''
                      }`}
                    >
                      <span>{curr.name}</span>
                      <span className="text-slate-400">{curr.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className={`w-8 h-8 ${isScrolled ? 'text-amber-600' : 'text-amber-500'}`} />
            <div className="flex flex-col">
              <span className={`font-serif text-xl font-bold ${isScrolled ? 'text-slate-800' : 'text-white'}`}>
                Thamel Spa
              </span>
              <span className={`text-xs ${isScrolled ? 'text-slate-500' : 'text-white/70'}`}>
                & Wellness
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-amber-500 ${
                  location.pathname === link.path 
                    ? 'text-amber-500' 
                    : isScrolled ? 'text-slate-700' : 'text-white/90'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Book Now Button */}
            <Link
              to="/booking"
              className="hidden sm:inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-full font-medium transition-all hover:shadow-lg hover:shadow-amber-500/25"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`flex items-center gap-2 p-2 rounded-full transition-colors ${
                    isScrolled ? 'hover:bg-slate-100' : 'hover:bg-white/10'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 text-slate-800">
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-amber-50"
                    >
                      <User className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/my-bookings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-amber-50"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>My Bookings</span>
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-amber-50 text-amber-600"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Admin Panel</span>
                      </Link>
                    )}
                    <hr className="my-2" />
                    <button
                      onClick={() => {
                        logout()
                        setUserDropdownOpen(false)
                      }}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className={`hidden sm:flex items-center gap-2 text-sm font-medium ${
                  isScrolled ? 'text-slate-700' : 'text-white'
                } hover:text-amber-500 transition-colors`}
              >
                <User className="w-5 h-5" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg ${
                isScrolled ? 'hover:bg-slate-100' : 'hover:bg-white/10'
              }`}
            >
              {mobileMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? 'text-slate-800' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? 'text-slate-800' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-white rounded-2xl shadow-xl p-4">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? 'bg-amber-50 text-amber-600 font-medium'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <hr className="my-4" />
            <Link
              to="/booking"
              className="flex items-center justify-center gap-2 bg-amber-500 text-white px-5 py-3 rounded-lg font-medium"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
