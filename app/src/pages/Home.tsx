import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useCurrency } from '../contexts/CurrencyContext'
import { 
  Sparkles, 
  Star, 
  Clock, 
  Shield, 
  Users, 
  Award,
  MapPin,
  ArrowRight,
  Play,
  Check
} from 'lucide-react'
import { services, practitioners, packages, testimonials } from '../data/mockData'

export default function Home() {
  const { formatPrice } = useCurrency()
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const featuredServices = services.filter(s => s.is_featured).slice(0, 4)
  const featuredPractitioners = practitioners.slice(0, 4)
  const featuredPackages = packages.filter(p => p.is_featured).slice(0, 3)
  const featuredTestimonials = testimonials.filter(t => t.is_featured).slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        {/* Background */}
        <div 
          ref={heroRef}
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(/images/hero-spa.jpg)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative h-full container mx-auto px-4 flex items-center">
          <div className="max-w-2xl text-white">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm">#1 Rated Spa in Kathmandu</span>
              </div>
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span className="text-sm">Thamel, Kathmandu</span>
              </div>
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Experience{' '}
              <span className="text-amber-400">Tranquility</span>{' '}
              in the Heart of Thamel
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
              Discover authentic Ayurvedic treatments and luxury spa experiences. 
              Your journey to wellness begins here.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-medium transition-all hover:shadow-lg hover:shadow-amber-500/25"
              >
                <Sparkles className="w-5 h-5" />
                <span>Book Your Session</span>
              </Link>
              <button className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-medium transition-all">
                <Play className="w-5 h-5" />
                <span>Watch Video</span>
              </button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-amber-400">15+</p>
                <p className="text-white/60 text-sm mt-1">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-amber-400">50K+</p>
                <p className="text-white/60 text-sm mt-1">Happy Clients</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-amber-400">4.9</p>
                <p className="text-white/60 text-sm mt-1">Average Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-600 font-medium text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="font-serif text-4xl font-bold text-slate-800 mt-3 mb-4">
              The Thamel Spa Difference
            </h2>
            <p className="text-slate-600">
              We combine ancient Nepali healing traditions with modern luxury to create 
              an unforgettable wellness experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: 'Certified Therapists', desc: 'All our therapists are professionally trained and certified' },
              { icon: Shield, title: 'Highest Hygiene Standards', desc: 'Rigorous sanitation protocols for your safety' },
              { icon: Users, title: 'Private & Discreet', desc: 'Complete privacy for all treatments and sessions' },
              { icon: Clock, title: 'Flexible Hours', desc: 'Open daily from 9 AM to 9 PM for your convenience' },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-2xl hover:bg-amber-50 transition-colors">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-amber-600 font-medium text-sm uppercase tracking-wider">Our Services</span>
              <h2 className="font-serif text-4xl font-bold text-slate-800 mt-3">
                Signature Treatments
              </h2>
            </div>
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium mt-4 md:mt-0"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service) => (
              <Link 
                key={service.id} 
                to={`/services/${service.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 to-stone-200 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-amber-300" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">
                    {service.category}
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-slate-800 mt-2 mb-3 group-hover:text-amber-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-600 font-semibold">
                      From {formatPrice(service.pricing[service.durations[0]].USD)}
                    </span>
                    <span className="text-slate-400 text-sm">
                      {service.durations[0]} min
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Practitioners */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-600 font-medium text-sm uppercase tracking-wider">Our Team</span>
            <h2 className="font-serif text-4xl font-bold text-slate-800 mt-3 mb-4">
              Meet Our Expert Therapists
            </h2>
            <p className="text-slate-600">
              Our team of certified professionals is dedicated to providing you with 
              the highest quality care and attention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPractitioners.map((practitioner) => (
              <Link 
                key={practitioner.id} 
                to={`/practitioners/${practitioner.id}`}
                className="group text-center"
              >
                <div className="relative mb-6">
                  <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-amber-100 to-stone-200 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <Users className="w-20 h-20 text-amber-300" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-1/2 translate-x-16 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    <span>{practitioner.rating}</span>
                  </div>
                </div>
                <h3 className="font-serif text-xl font-semibold text-slate-800 group-hover:text-amber-600 transition-colors">
                  {practitioner.name}
                </h3>
                <p className="text-amber-600 text-sm mt-1">{practitioner.specialties[0]}</p>
                <p className="text-slate-500 text-sm mt-2">{practitioner.years_experience} years experience</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/practitioners"
              className="inline-flex items-center gap-2 border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white px-8 py-3 rounded-full font-medium transition-all"
            >
              <span>View All Therapists</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Special Offers</span>
              <h2 className="font-serif text-4xl font-bold mt-3">
                Wellness Packages
              </h2>
            </div>
            <Link 
              to="/packages" 
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium mt-4 md:mt-0"
            >
              <span>View All Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <div 
                key={pkg.id} 
                className="bg-slate-800 rounded-2xl p-8 hover:bg-slate-700 transition-colors"
              >
                <div className="aspect-video bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-xl mb-6 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-amber-400" />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-3">{pkg.name}</h3>
                <p className="text-slate-400 text-sm mb-6">{pkg.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {pkg.inclusions.slice(0, 3).map((inclusion, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{inclusion}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 line-through text-sm">
                      {formatPrice(pkg.original_price)}
                    </span>
                    <p className="text-2xl font-bold text-amber-400">
                      {formatPrice(pkg.discounted_price)}
                    </p>
                  </div>
                  <Link
                    to="/booking"
                    className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-600 font-medium text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="font-serif text-4xl font-bold text-slate-800 mt-3 mb-4">
              What Our Guests Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  "{testimonial.review_text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-stone-200 flex items-center justify-center">
                    <span className="text-amber-600 font-semibold">
                      {testimonial.client_name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{testimonial.client_name}</p>
                    <p className="text-sm text-slate-500">{testimonial.nationality}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
            >
              <span>Read All Reviews</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Begin Your Wellness Journey?
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            Book your appointment today and experience the authentic healing traditions 
            of Nepal in the heart of Thamel.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-white text-amber-600 hover:bg-slate-100 px-8 py-4 rounded-full font-medium transition-all"
            >
              <Sparkles className="w-5 h-5" />
              <span>Book Now</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white border-2 border-white/30 px-8 py-4 rounded-full font-medium transition-all"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
