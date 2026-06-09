import { useState } from 'react'
import { 
  Star, 
  Search,
  MapPin,
  Sparkles,
  CheckCircle
} from 'lucide-react'
import { testimonials, services } from '../data/mockData'

const ratings = [5, 4, 3, 2, 1]

export default function Reviews() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedService, setSelectedService] = useState<string>('all')

  const filteredReviews = testimonials.filter(review => {
    const matchesRating = selectedRating === null || review.rating === selectedRating
    const matchesSearch = review.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.review_text.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesService = selectedService === 'all' || review.service_name === selectedService
    return matchesRating && matchesSearch && matchesService
  })

  const averageRating = testimonials.reduce((acc, r) => acc + r.rating, 0) / testimonials.length
  const ratingCounts = ratings.map(rating => ({
    rating,
    count: testimonials.filter(t => t.rating === rating).length
  }))

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-16 bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-slate-900" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Testimonials</span>
            <h1 className="font-serif text-5xl font-bold mt-4 mb-6">
              What Our Guests Say
            </h1>
            <p className="text-lg text-white/80">
              Read authentic reviews from our valued clients from around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Rating Overview */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Overall Rating */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                <span className="text-6xl font-bold text-slate-800">{averageRating.toFixed(1)}</span>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.round(averageRating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-slate-500 text-sm mt-1">Based on {testimonials.length} reviews</p>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-4">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-slate-600 text-sm">Verified reviews from real clients</span>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="md:col-span-2">
              <div className="space-y-2">
                {ratingCounts.map(({ rating, count }) => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                    className={`w-full flex items-center gap-4 p-2 rounded-lg transition-colors ${
                      selectedRating === rating ? 'bg-amber-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span className="w-8 text-sm font-medium text-slate-700">{rating} ★</span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${(count / testimonials.length) * 100}%` }}
                      />
                    </div>
                    <span className="w-12 text-sm text-slate-500 text-right">{count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Reviews */}
      <section className="py-12 bg-stone-50">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 bg-white"
            >
              <option value="all">All Services</option>
              {services.map(s => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>

            {selectedRating && (
              <button
                onClick={() => setSelectedRating(null)}
                className="px-4 py-3 bg-amber-100 text-amber-700 rounded-xl hover:bg-amber-200 transition-colors"
              >
                Clear Filter: {selectedRating} ★
              </button>
            )}
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-700 mb-6 leading-relaxed">
                  "{review.review_text}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                      <span className="text-amber-600 font-semibold">
                        {review.client_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{review.client_name}</p>
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <MapPin className="w-3 h-3" />
                        <span>{review.nationality}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service */}
                {review.service_name && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <span className="text-xs text-slate-500">Service: </span>
                    <span className="text-xs text-amber-600">{review.service_name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-16">
              <Sparkles className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No reviews found</h3>
              <p className="text-slate-500">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Google Reviews CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-12 text-center text-white">
            <h2 className="font-serif text-3xl font-bold mb-4">
              See More Reviews on Google
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Read hundreds more verified reviews from our guests on Google. 
              We are proud to maintain a 4.9-star rating!
            </p>
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-amber-600 hover:bg-slate-100 px-8 py-3 rounded-full font-medium transition-colors"
            >
              <span>View Google Reviews</span>
            </a>
          </div>
        </div>
      </section>

      {/* Write Review CTA */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-slate-800 mb-4">
            Have You Visited Us?
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            We would love to hear about your experience. Your feedback helps us 
            improve and helps others discover our spa.
          </p>
          <button className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-full font-medium transition-colors">
            <Star className="w-5 h-5" />
            <span>Write a Review</span>
          </button>
        </div>
      </section>
    </div>
  )
}
