import { 
  Award, 
  Shield, 
  Heart, 
  Leaf, 
  Users, 
  Sparkles,
  Check,
  Star,
  MapPin
} from 'lucide-react'

const certifications = [
  { name: 'ISO 9001:2015', desc: 'Quality Management' },
  { name: 'Ayurveda Board Nepal', desc: 'Certified Ayurvedic Practice' },
  { name: 'Spa Association', desc: 'Member - Nepal Spa Association' },
  { name: 'TripAdvisor', desc: 'Certificate of Excellence' },
]

const hygieneStandards = [
  'All linens changed after every client',
  'Treatment rooms sanitized between sessions',
  'Therapists follow strict hand hygiene protocols',
  'All equipment sterilized after each use',
  'Regular deep cleaning of all facilities',
  'Use of hospital-grade disinfectants',
]

const partnerHotels = [
  'Hyatt Regency Kathmandu',
  'Hotel Yak & Yeti',
  'Radisson Hotel Kathmandu',
  'Shangri-La Hotel',
  'Marriott Kathmandu',
  'Dwarika\'s Hotel',
]

export default function About() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-20 bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-slate-900" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">About Us</span>
            <h1 className="font-serif text-5xl md:text-6xl font-bold mt-4 mb-6">
              Our Story of Wellness
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Since 2009, Thamel Spa & Wellness has been a sanctuary of healing in the heart of Kathmandu, 
              blending ancient Nepali traditions with modern luxury.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-amber-600 font-medium text-sm uppercase tracking-wider">Our Philosophy</span>
              <h2 className="font-serif text-4xl font-bold text-slate-800 mt-3 mb-6">
                Where Ancient Wisdom Meets Modern Luxury
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  At Thamel Spa & Wellness, we believe that true wellness encompasses the body, mind, and spirit. 
                  Our approach is rooted in the ancient healing traditions of Nepal and Ayurveda, which have been 
                  practiced for thousands of years in the Himalayas.
                </p>
                <p>
                  We combine these time-honored techniques with contemporary spa luxury, creating an experience 
                  that is both authentic and indulgent. Every treatment is designed to restore balance, promote 
                  healing, and leave you feeling renewed.
                </p>
                <p>
                  Our commitment to excellence extends beyond our treatments. We maintain the highest standards 
                  of hygiene, employ only certified professionals, and use premium natural products sourced from 
                  the pristine Himalayan region.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 border-2 border-white flex items-center justify-center"
                    >
                      <Users className="w-5 h-5 text-amber-700" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-slate-800">20+ Certified Therapists</p>
                  <p className="text-sm text-slate-500">Dedicated to your wellness</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-amber-400" />
                </div>
                <div className="aspect-square bg-gradient-to-br from-stone-100 to-stone-200 rounded-2xl flex items-center justify-center">
                  <Leaf className="w-12 h-12 text-stone-400" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center">
                  <Heart className="w-12 h-12 text-slate-400" />
                </div>
                <div className="aspect-[3/4] bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center">
                  <Award className="w-16 h-16 text-amber-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-600 font-medium text-sm uppercase tracking-wider">Credentials</span>
            <h2 className="font-serif text-4xl font-bold text-slate-800 mt-3 mb-4">
              Certified & Recognized
            </h2>
            <p className="text-slate-600">
              We maintain the highest standards of quality and professionalism in everything we do.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">{cert.name}</h3>
                <p className="text-slate-500 text-sm">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hygiene Standards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/3] bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl flex items-center justify-center">
                <Shield className="w-32 h-32 text-emerald-500" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-emerald-600 font-medium text-sm uppercase tracking-wider">Your Safety First</span>
              <h2 className="font-serif text-4xl font-bold text-slate-800 mt-3 mb-6">
                Highest Hygiene Standards
              </h2>
              <p className="text-slate-600 mb-8">
                Your health and safety are our top priorities. We follow strict hygiene protocols 
                that exceed industry standards to ensure a safe and comfortable experience.
              </p>

              <ul className="space-y-4">
                {hygieneStandards.map((standard, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-slate-700">{standard}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Our Team</span>
            <h2 className="font-serif text-4xl font-bold mt-3 mb-4">
              Meet the Experts
            </h2>
            <p className="text-white/70">
              Our team of certified professionals brings together decades of experience 
              in traditional healing and modern spa therapies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Dr. Pema Sherpa', role: 'Wellness Director', exp: '20+ years', cert: 'Ayurvedic Doctor' },
              { name: 'Sunita Sharma', role: 'Lead Therapist', exp: '12 years', cert: 'Certified Massage Therapist' },
              { name: 'Rajesh Gurung', role: 'Senior Therapist', exp: '8 years', cert: 'Sports Massage Specialist' },
            ].map((member, index) => (
              <div key={index} className="bg-slate-800 rounded-2xl p-8 text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-amber-400/20 to-amber-500/20 flex items-center justify-center mb-6">
                  <Users className="w-12 h-12 text-amber-400" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-amber-400 text-sm mb-4">{member.role}</p>
                <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
                  <span>{member.exp}</span>
                  <span>•</span>
                  <span>{member.cert}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Hotels */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-600 font-medium text-sm uppercase tracking-wider">Partnerships</span>
            <h2 className="font-serif text-4xl font-bold text-slate-800 mt-3 mb-4">
              Our Partner Hotels
            </h2>
            <p className="text-slate-600">
              We are proud to partner with Kathmandu's finest hotels to offer exclusive 
              spa services to their guests.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {partnerHotels.map((hotel, index) => (
              <div key={index} className="bg-white rounded-xl p-6 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-amber-600" />
                </div>
                <span className="font-medium text-slate-800">{hotel}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-amber-600 font-medium text-sm uppercase tracking-wider">Location</span>
              <h2 className="font-serif text-4xl font-bold text-slate-800 mt-3 mb-6">
                Find Us in the Heart of Thamel
              </h2>
              <p className="text-slate-600 mb-8">
                Located in the vibrant Thamel district, our spa is easily accessible and 
                offers a peaceful retreat from the bustling streets of Kathmandu.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Address</h4>
                    <p className="text-slate-600">
                      Thamel Marg, Thamel<br />
                      Kathmandu 44600, Nepal
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Operating Hours</h4>
                    <p className="text-slate-600">
                      Sunday - Friday: 9:00 AM - 9:00 PM<br />
                      Saturday: 9:00 AM - 10:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="aspect-video bg-gradient-to-br from-amber-100 to-stone-200 rounded-2xl flex items-center justify-center">
              <MapPin className="w-24 h-24 text-amber-400" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
