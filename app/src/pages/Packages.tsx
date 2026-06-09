import { Link } from 'react-router-dom'
import { useCurrency } from '../contexts/CurrencyContext'
import { 
  Sparkles, 
  Heart,
  Users,
  Calendar,
  Gift,
  Check,
  ArrowRight,
  Star
} from 'lucide-react'
import { packages } from '../data/mockData'

const packageTypes = [
  { id: 'couple', name: 'Couples', icon: Heart, desc: 'Romantic experiences for two' },
  { id: 'multi_day', name: 'Multi-Day', icon: Calendar, desc: 'Extended wellness journeys' },
  { id: 'seasonal', name: 'Seasonal', icon: Sparkles, desc: 'Limited-time special offers' },
  { id: 'hotel_guest', name: 'Hotel Guests', icon: Users, desc: 'Exclusive hotel partnerships' },
]

export default function Packages() {
  const { formatPrice } = useCurrency()

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-20 bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-slate-900" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Special Offers</span>
            <h1 className="font-serif text-5xl font-bold mt-4 mb-6">
              Wellness Packages
            </h1>
            <p className="text-lg text-white/80">
              Discover our curated packages designed for couples, wellness seekers, 
              and those looking for the ultimate spa experience.
            </p>
          </div>
        </div>
      </section>

      {/* Package Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {packageTypes.map((type) => {
              const Icon = type.icon
              return (
                <div key={type.id} className="text-center p-6 rounded-2xl bg-stone-50 hover:bg-amber-50 transition-colors">
                  <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-1">{type.name}</h3>
                  <p className="text-slate-500 text-sm">{type.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-600 font-medium text-sm uppercase tracking-wider">Featured</span>
            <h2 className="font-serif text-4xl font-bold text-slate-800 mt-3 mb-4">
              Our Most Popular Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.filter(p => p.is_featured).map((pkg) => (
              <div 
                key={pkg.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                {/* Image */}
                <div className="aspect-[16/10] bg-gradient-to-br from-amber-100 to-amber-200 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-16 h-16 text-amber-400" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium capitalize">
                      {pkg.type.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Savings */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Save {Math.round((1 - pkg.discounted_price / pkg.original_price) * 100)}%
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">{pkg.description}</p>

                  {/* Inclusions */}
                  <ul className="space-y-2 mb-6">
                    {pkg.inclusions.slice(0, 3).map((inclusion, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">{inclusion}</span>
                      </li>
                    ))}
                    {pkg.inclusions.length > 3 && (
                      <li className="text-sm text-amber-600">
                        +{pkg.inclusions.length - 3} more
                      </li>
                    )}
                  </ul>

                  {/* Pricing & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <span className="text-slate-400 line-through text-sm">
                        {formatPrice(pkg.original_price)}
                      </span>
                      <p className="text-2xl font-bold text-amber-600">
                        {formatPrice(pkg.discounted_price)}
                      </p>
                    </div>
                    <Link
                      to="/booking"
                      state={{ packageId: pkg.id }}
                      className="inline-flex items-center gap-2 bg-slate-800 hover:bg-amber-500 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Cards */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Gift Cards</span>
              <h2 className="font-serif text-4xl font-bold mt-3 mb-6">
                Share the Gift of Wellness
              </h2>
              <p className="text-white/70 mb-8 leading-relaxed">
                Give your loved ones the gift of relaxation and rejuvenation. Our gift cards 
                can be used for any service or package and never expire.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  'Available in any denomination',
                  'Never expires',
                  'Can be used for any service',
                  'Beautiful digital or physical card',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-amber-400" />
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/booking"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-medium transition-all"
              >
                <Gift className="w-5 h-5" />
                <span>Purchase Gift Card</span>
              </Link>
            </div>

            <div className="aspect-square bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-2xl flex items-center justify-center">
              <Gift className="w-32 h-32 text-amber-400" />
            </div>
          </div>
        </div>
      </section>

      {/* All Packages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-slate-800 mb-8">
            All Packages
          </h2>

          <div className="space-y-6">
            {packages.map((pkg) => (
              <div 
                key={pkg.id} 
                className="flex flex-col md:flex-row gap-6 p-6 bg-stone-50 rounded-2xl hover:bg-amber-50 transition-colors"
              >
                <div className="w-full md:w-48 h-32 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-12 h-12 text-amber-400" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">
                        {pkg.type.replace('_', ' ')}
                      </span>
                      <h3 className="font-serif text-xl font-semibold text-slate-800">{pkg.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 line-through text-sm">
                        {formatPrice(pkg.original_price)}
                      </span>
                      <p className="text-xl font-bold text-amber-600">
                        {formatPrice(pkg.discounted_price)}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-4">{pkg.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {pkg.duration_days} day{pkg.duration_days > 1 ? 's' : ''}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {pkg.inclusions.length} inclusions
                      </span>
                    </div>
                    <Link
                      to="/booking"
                      state={{ packageId: pkg.id }}
                      className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center gap-1"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Create Your Custom Package
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Can't find what you're looking for? Contact us to create a personalized 
            wellness package tailored to your needs.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-amber-600 hover:bg-slate-100 px-8 py-3 rounded-full font-medium transition-colors"
          >
            <span>Contact Us</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
