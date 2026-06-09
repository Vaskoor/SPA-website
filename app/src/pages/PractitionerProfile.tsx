import { useParams, Link } from 'react-router-dom'
import { 
  Sparkles, 
  Star, 
  ArrowLeft,
  Award,
  Languages,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  MapPin,
  Briefcase
} from 'lucide-react'
import { practitioners, services, testimonials } from '../data/mockData'

export default function PractitionerProfile() {
  const { id } = useParams<{ id: string }>()
  const practitioner = practitioners.find(p => p.id === Number(id))

  if (!practitioner) {
    return (
      <div className="pt-32 pb-20 text-center">
        <Sparkles className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-slate-600 mb-2">Therapist not found</h1>
        <Link to="/practitioners" className="text-amber-600 hover:underline">
          Back to therapists
        </Link>
      </div>
    )
  }

  const practitionerServices = services.filter(s => practitioner.services.includes(s.id))
  const practitionerReviews = testimonials.filter(t => 
    t.service_name && practitionerServices.some(ps => ps.name === t.service_name)
  )

  return (
    <div className="pt-24">
      {/* Breadcrumb */}
      <div className="bg-stone-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-amber-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/practitioners" className="hover:text-amber-600">Therapists</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-800">{practitioner.name}</span>
          </div>
        </div>
      </div>

      {/* Profile Header */}
      <section className="py-12 bg-stone-50">
        <div className="container mx-auto px-4">
          <Link 
            to="/practitioners" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to therapists</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Image */}
            <div className="lg:col-span-1">
              <div className="aspect-[3/4] bg-gradient-to-br from-amber-100 to-stone-200 rounded-2xl flex items-center justify-center relative">
                <Sparkles className="w-32 h-32 text-amber-300" />
                
                {/* Availability Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    Available Today
                  </span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="font-serif text-4xl font-bold text-slate-800 mb-2">
                    {practitioner.name}
                  </h1>
                  <p className="text-amber-600 font-medium">{practitioner.specialties[0]}</p>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-800">{practitioner.rating}</span>
                  <span className="text-slate-500">({practitioner.total_reviews} reviews)</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <Briefcase className="w-4 h-4 text-amber-500" />
                  <span className="text-slate-700">{practitioner.years_experience} years exp</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span className="text-slate-700">{practitioner.certifications.length} certifications</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <Languages className="w-4 h-4 text-amber-500" />
                  <span className="text-slate-700">{practitioner.languages_spoken.join(', ')}</span>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-8">
                <h2 className="font-semibold text-slate-800 mb-3">About</h2>
                <p className="text-slate-600 leading-relaxed">
                  {practitioner.full_bio || practitioner.bio}
                </p>
              </div>

              {/* Specialties */}
              <div className="mb-8">
                <h2 className="font-semibold text-slate-800 mb-3">Specialties</h2>
                <div className="flex flex-wrap gap-2">
                  {practitioner.specialties.map((specialty, idx) => (
                    <span 
                      key={idx}
                      className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-8">
                <h2 className="font-semibold text-slate-800 mb-3">Certifications</h2>
                <ul className="space-y-2">
                  {practitioner.certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-600">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/booking"
                  state={{ practitionerId: practitioner.id }}
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-medium transition-all"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book with {practitioner.name.split(' ')[0]}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-slate-800 mb-8">
            Services by {practitioner.name.split(' ')[0]}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practitionerServices.map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.slug}`}
                className="group bg-stone-50 rounded-xl p-6 hover:bg-amber-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="bg-white text-slate-600 px-3 py-1 rounded-full text-xs font-medium capitalize">
                    {service.category}
                  </span>
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                  {service.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {service.durations.join(', ')} min
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      {practitionerReviews.length > 0 && (
        <section className="py-16 bg-stone-50">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold text-slate-800 mb-8">
              Client Reviews
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practitionerReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-4">"{review.review_text}"</p>
                  <div className="flex items-center justify-between">
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
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Availability */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold mb-4">
                Book Your Session
              </h2>
              <p className="text-white/70 mb-8">
                {practitioner.name} is available for appointments throughout the week. 
                Book now to secure your preferred time slot.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium">Operating Hours</p>
                    <p className="text-white/70 text-sm">9:00 AM - 9:00 PM Daily</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-white/70 text-sm">Thamel, Kathmandu</p>
                  </div>
                </div>
              </div>

              <Link
                to="/booking"
                state={{ practitionerId: practitioner.id }}
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-medium transition-all"
              >
                <Calendar className="w-5 h-5" />
                <span>Check Availability</span>
              </Link>
            </div>

            <div className="aspect-video bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-2xl flex items-center justify-center">
              <Calendar className="w-24 h-24 text-amber-400" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
