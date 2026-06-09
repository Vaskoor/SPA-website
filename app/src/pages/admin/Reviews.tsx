import { useState } from 'react'
import { 
  Search, 
  Star,
  Check,
  X,
  Flag
} from 'lucide-react'

const mockReviews = [
  { id: 1, client: 'Sarah Johnson', service: 'Traditional Massage', practitioner: 'Sunita Sharma', rating: 5, review: 'Absolutely incredible experience! The massage was exactly what I needed after trekking.', date: '2024-01-20', status: 'approved', isFeatured: true },
  { id: 2, client: 'Michael Chen', service: 'Shirodhara', practitioner: 'Bikash Tamang', rating: 5, review: 'Best spa experience in Kathmandu. Highly recommend!', date: '2024-01-18', status: 'approved', isFeatured: true },
  { id: 3, client: 'Emma Williams', service: 'Couples Package', practitioner: 'Sunita Sharma', rating: 5, review: 'Magical experience for our anniversary!', date: '2024-01-15', status: 'pending', isFeatured: false },
  { id: 4, client: 'John Doe', service: 'Deep Tissue', practitioner: 'Rajesh Gurung', rating: 3, review: 'Good but could be better', date: '2024-01-10', status: 'pending', isFeatured: false },
  { id: 5, client: 'Anonymous', service: 'Aromatherapy', practitioner: 'Pooja Rai', rating: 2, review: 'Not satisfied with the service', date: '2024-01-05', status: 'flagged', isFeatured: false },
]

export default function AdminReviews() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filteredReviews = mockReviews.filter(review => {
    const matchesSearch = review.client.toLowerCase().includes(search.toLowerCase()) ||
                         review.review.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || review.status === filter
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-emerald-100 text-emerald-700'
      case 'pending': return 'bg-amber-100 text-amber-700'
      case 'flagged': return 'bg-red-100 text-red-700'
      default: return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Reviews</h1>
          <p className="text-slate-500">Manage customer reviews and feedback</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500"
          />
        </div>
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-lg"
        >
          <option value="all">All Reviews</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="flagged">Flagged</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              {/* Rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                  />
                ))}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-slate-800">{review.client}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 text-sm">{review.service}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 text-sm">{review.practitioner}</span>
                </div>
                <p className="text-slate-600 mb-3">"{review.review}"</p>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(review.status)}`}>
                    {review.status}
                  </span>
                  {review.isFeatured && (
                    <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                  <span className="text-slate-400 text-sm">{review.date}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {review.status === 'pending' && (
                  <>
                    <button className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200">
                      <Check className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                      <X className="w-5 h-5" />
                    </button>
                  </>
                )}
                <button className="p-2 bg-amber-100 text-amber-600 rounded-lg hover:bg-amber-200">
                  <Star className="w-5 h-5" />
                </button>
                <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200">
                  <Flag className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
