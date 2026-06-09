import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCurrency } from '../contexts/CurrencyContext'
import { 
  Sparkles, 
  Clock, 
  ArrowRight,
  Filter,
  ChevronDown,
  Check
} from 'lucide-react'
import { services } from '../data/mockData'

const categories = [
  { id: 'all', name: 'All Services' },
  { id: 'massage', name: 'Massage' },
  { id: 'ayurveda', name: 'Ayurveda' },
  { id: 'beauty', name: 'Beauty' },
  { id: 'wellness', name: 'Wellness' },
]

export default function Services() {
  const { formatPrice } = useCurrency()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(s => s.category === selectedCategory)

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-16 bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-slate-900" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Our Services</span>
            <h1 className="font-serif text-5xl font-bold mt-4 mb-6">
              Signature Treatments
            </h1>
            <p className="text-lg text-white/80">
              Discover our range of authentic Ayurvedic treatments, therapeutic massages, 
              and luxury spa experiences designed to restore balance and wellness.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500 text-white'
                      : 'bg-white text-slate-600 hover:bg-amber-50 hover:text-amber-600'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-slate-600 hover:bg-amber-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div 
                key={service.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                {/* Image */}
                <div className="aspect-[16/10] bg-gradient-to-br from-amber-100 to-stone-200 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-16 h-16 text-amber-300" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-slate-700 capitalize">
                      {service.category}
                    </span>
                  </div>
                  {service.is_featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-slate-800 mb-3 group-hover:text-amber-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                    {service.description}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-2 mb-6">
                    {service.benefits.slice(0, 3).map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Pricing & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <span className="text-xs text-slate-500">From</span>
                      <p className="text-xl font-bold text-amber-600">
                        {formatPrice(service.pricing[service.durations[0]].USD)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-slate-500 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{service.durations[0]} min</span>
                      </div>
                      <Link
                        to={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1 bg-slate-800 hover:bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <Sparkles className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No services found</h3>
              <p className="text-slate-500">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Not sure which treatment is right for you?
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Our wellness consultants can help you choose the perfect treatment based on your needs and preferences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-amber-600 hover:bg-slate-100 px-8 py-3 rounded-full font-medium transition-colors"
            >
              <span>Contact Us</span>
            </Link>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white border-2 border-white/30 px-8 py-3 rounded-full font-medium transition-colors"
            >
              <span>Book Consultation</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
