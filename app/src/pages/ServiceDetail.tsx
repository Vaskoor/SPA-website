import { useParams, Link } from 'react-router-dom'
import { useCurrency } from '../contexts/CurrencyContext'
import { 
  Sparkles, 
  Clock, 
  Check,
  AlertTriangle,
  Info,
  Star,
  ArrowLeft,
  Calendar,
  ChevronRight,
  Heart
} from 'lucide-react'
import { services, practitioners, testimonials } from '../data/mockData'
import { useState } from 'react'

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { formatPrice } = useCurrency()
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null)

  const service = services.find(s => s.slug === slug)
  
  if (!service) {
    return (
      <div className="pt-32 pb-20 text-center">
        <Sparkles className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-slate-600 mb-2">Service not found</h1>
        <Link to="/services" className="text-amber-600 hover:underline">
          Back to services
        </Link>
      </div>
    )
  }

  const eligiblePractitioners = practitioners.filter(p => 
    p.services.includes(service.id) && p.is_available
  )

  const serviceReviews = testimonials.filter(t => 
    t.service_name === service.name
  )

  const defaultDuration = service.durations[0]
  const currentDuration = selectedDuration || defaultDuration

  return (
    <div className="pt-24">
      {/* Breadcrumb */}
      <div className="bg-stone-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-amber-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/services" className="hover:text-amber-600">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-800">{service.name}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 bg-stone-50">
        <div className="container mx-auto px-4">
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to services</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 to-stone-200 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-24 h-24 text-amber-300" />
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {service.category}
                </span>
                {service.is_featured && (
                  <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    Featured
                  </span>
                )}
              </div>

              <h1 className="font-serif text-4xl font-bold text-slate-800 mb-4">
                {service.name}
              </h1>

              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                {service.full_description || service.description}
              </p>

              {/* Duration Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Select Duration
                </label>
                <div className="flex flex-wrap gap-3">
                  {service.durations.map((duration) => (
                    <button
                      key={duration}
                      onClick={() => setSelectedDuration(duration)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all ${
                        currentDuration === duration
                          ? 'border-amber-500 bg-amber-50 text-amber-700'
                          : 'border-slate-200 hover:border-amber-300'
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      <span>{duration} min</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-bold text-amber-600">
                  {formatPrice(service.pricing[currentDuration].USD)}
                </span>
                <span className="text-slate-500">/ session</span>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/booking"
                  state={{ serviceId: service.id, duration: currentDuration }}
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-medium transition-all"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Now</span>
                </Link>
                <button className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-amber-500 hover:text-amber-600 px-6 py-4 rounded-full font-medium transition-all">
                  <Heart className="w-5 h-5" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Benefits */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-slate-800 mb-6">
                  Benefits
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Before/After Care */}
              {(service.before_care || service.after_care) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {service.before_care && (
                    <div className="bg-amber-50 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Info className="w-5 h-5 text-amber-600" />
                        <h3 className="font-semibold text-slate-800">Before Your Session</h3>
                      </div>
                      <ul className="space-y-3">
                        {service.before_care.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                            <span className="text-amber-500 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {service.after_care && (
                    <div className="bg-emerald-50 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Check className="w-5 h-5 text-emerald-600" />
                        <h3 className="font-semibold text-slate-800">After Your Session</h3>
                      </div>
                      <ul className="space-y-3">
                        {service.after_care.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                            <span className="text-emerald-500 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Contraindications */}
              {service.contraindications && (
                <div className="bg-red-50 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <h3 className="font-semibold text-slate-800">Please Note</h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    This treatment may not be suitable for individuals with the following conditions:
                  </p>
                  <ul className="space-y-2">
                    {service.contraindications.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-red-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Reviews */}
              {serviceReviews.length > 0 && (
                <div>
                  <h2 className="font-serif text-2xl font-bold text-slate-800 mb-6">
                    Client Reviews
                  </h2>
                  <div className="space-y-4">
                    {serviceReviews.map((review) => (
                      <div key={review.id} className="bg-stone-50 rounded-xl p-6">
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-slate-700 mb-4">"{review.review_text}"</p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                            <span className="text-amber-600 font-medium">
                              {review.client_name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{review.client_name}</p>
                            <p className="text-sm text-slate-500">{review.nationality}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Eligible Practitioners */}
              <div className="bg-stone-50 rounded-2xl p-6">
                <h3 className="font-serif text-xl font-bold text-slate-800 mb-4">
                  Available Therapists
                </h3>
                <div className="space-y-4">
                  {eligiblePractitioners.slice(0, 4).map((practitioner) => (
                    <Link
                      key={practitioner.id}
                      to={`/practitioners/${practitioner.id}`}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-stone-200 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">{practitioner.name}</p>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{practitioner.rating}</span>
                          <span>•</span>
                          <span>{practitioner.years_experience} yrs exp</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/practitioners"
                  className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 text-sm font-medium mt-4"
                >
                  <span>View all therapists</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Quick Book */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white">
                <h3 className="font-serif text-xl font-bold mb-4">
                  Book This Treatment
                </h3>
                <p className="text-white/70 text-sm mb-6">
                  Select your preferred date and time. We'll match you with the best available therapist.
                </p>
                <Link
                  to="/booking"
                  state={{ serviceId: service.id, duration: currentDuration }}
                  className="block w-full bg-amber-500 hover:bg-amber-600 text-white text-center py-3 rounded-full font-medium transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
