import { Link } from 'react-router-dom'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Instagram,
  Youtube,
  Sparkles,
  Star,
  Award
} from 'lucide-react'

const quickLinks = [
  { path: '/about', label: 'About Us' },
  { path: '/services', label: 'Our Services' },
  { path: '/practitioners', label: 'Our Therapists' },
  { path: '/packages', label: 'Packages & Offers' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/reviews', label: 'Reviews' },
  { path: '/faq', label: 'FAQ' },
  { path: '/contact', label: 'Contact Us' },
]

const services = [
  { path: '/services/traditional-massage', label: 'Traditional Massage' },
  { path: '/services/ayurvedic-treatment', label: 'Ayurvedic Treatment' },
  { path: '/services/deep-tissue', label: 'Deep Tissue Massage' },
  { path: '/services/aromatherapy', label: 'Aromatherapy' },
  { path: '/services/hot-stone', label: 'Hot Stone Therapy' },
  { path: '/services/facial-treatment', label: 'Facial Treatments' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Sparkles className="w-8 h-8 text-amber-400" />
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold">Thamel Spa</span>
                <span className="text-xs text-slate-400">& Wellness</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Experience authentic Ayurvedic treatments and luxury spa therapies 
              in the heart of Thamel, Kathmandu. Your journey to wellness begins here.
            </p>
            
            {/* Badges */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1 bg-green-600/20 text-green-400 px-3 py-1.5 rounded-full text-xs">
                <Award className="w-4 h-4" />
                <span>Certificate of Excellence</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-sm text-slate-400 ml-2">4.9 (2,847 reviews)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.path}>
                  <Link 
                    to={service.path}
                    className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm">
                  Thamel Marg, Thamel<br />
                  Kathmandu 44600, Nepal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <a href="tel:+9771234567890" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">
                  +977 1-234-5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <a href="mailto:info@thamelspa.com" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">
                  info@thamelspa.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm">
                  Open Daily<br />
                  9:00 AM - 9:00 PM
                </span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-4">Follow Us</h4>
              <div className="flex items-center gap-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-500 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-500 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-500 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a 
                  href="https://tripadvisor.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-500 transition-colors"
                >
                  <Award className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm text-center md:text-left">
              © 2024 Thamel Spa & Wellness. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-slate-500 hover:text-amber-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-slate-500 hover:text-amber-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cancellation" className="text-slate-500 hover:text-amber-400 transition-colors">
                Cancellation Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
