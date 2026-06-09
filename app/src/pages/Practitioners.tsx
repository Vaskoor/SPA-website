import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Sparkles, 
  Star, 
  Filter,
  Search,
  ChevronDown,
  Award,
  Languages,
  ArrowRight
} from 'lucide-react'
import { practitioners } from '../data/mockData'

const specialties = [
  'All',
  'Ayurvedic Treatments',
  'Deep Tissue',
  'Traditional Massage',
  'Aromatherapy',
  'Hot Stone Therapy',
]

const genders = [
  { id: 'all', name: 'All' },
  { id: 'female', name: 'Female' },
  { id: 'male', name: 'Male' },
]

export default function Practitioners() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All')
  const [selectedGender, setSelectedGender] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filteredPractitioners = practitioners.filter(p => {
    const matchesSpecialty = selectedSpecialty === 'All' || p.specialties.includes(selectedSpecialty)
    const matchesGender = selectedGender === 'all' || p.gender === selectedGender
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesSpecialty && matchesGender && matchesSearch && p.is_available
  })

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-16 bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-slate-900" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Our Team</span>
            <h1 className="font-serif text-5xl font-bold mt-4 mb-6">
              Expert Therapists
            </h1>
            <p className="text-lg text-white/80">
              Meet our team of certified professionals dedicated to your wellness journey. 
              Each therapist brings unique expertise and years of experience.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search therapists or specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-full focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-full hover:bg-amber-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {/* Gender Filter */}
              <div className="flex items-center gap-1 bg-slate-100 rounded-full p-1">
                {genders.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGender(g.id)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedGender === g.id
                        ? 'bg-white text-slate-800 shadow-sm'
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-500 mb-3">Filter by Specialty</p>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty) => (
                  <button
                    key={specialty}
                    onClick={() => setSelectedSpecialty(specialty)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedSpecialty === specialty
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-600'
                    }`}
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Practitioners Grid */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-slate-600">
              Showing <span className="font-medium text-slate-800">{filteredPractitioners.length}</span> therapists
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPractitioners.map((practitioner) => (
              <Link
                key={practitioner.id}
                to={`/practitioners/${practitioner.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                {/* Image */}
                <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 to-stone-200 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-20 h-20 text-amber-300" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-slate-800">{practitioner.rating}</span>
                    <span className="text-slate-500 text-sm">({practitioner.total_reviews})</span>
                  </div>

                  {/* Availability */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      Available
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">
                    {practitioner.name}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <Award className="w-4 h-4" />
                    <span>{practitioner.years_experience} years experience</span>
                  </div>

                  <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                    {practitioner.bio}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {practitioner.specialties.slice(0, 3).map((specialty, idx) => (
                      <span 
                        key={idx}
                        className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* Languages */}
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                    <Languages className="w-4 h-4" />
                    <span>{practitioner.languages_spoken.join(', ')}</span>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-amber-600 font-medium text-sm">
                      View Profile
                    </span>
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                      <ArrowRight className="w-4 h-4 text-amber-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredPractitioners.length === 0 && (
            <div className="text-center py-16">
              <Sparkles className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No therapists found</h3>
              <p className="text-slate-500">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Can't Decide? Let Us Help
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Our wellness consultants can recommend the perfect therapist based on your needs and preferences.
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 bg-white text-amber-600 hover:bg-slate-100 px-8 py-3 rounded-full font-medium transition-colors"
          >
            <span>Get Recommendations</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
