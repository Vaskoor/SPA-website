import { useState } from 'react'
import { 
  Search, 
  Plus,
  MoreHorizontal,
  Star,
  X,
  Sparkles
} from 'lucide-react'
import { practitioners } from '../../data/mockData'

export default function AdminPractitioners() {
  const [search, setSearch] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredPractitioners = practitioners.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.specialties.some(s => s.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Therapists</h1>
          <p className="text-slate-500">Manage therapist profiles and schedules</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Therapist</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search therapists..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPractitioners.map((practitioner) => (
          <div key={practitioner.id} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-amber-600" />
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${practitioner.is_available ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                <button className="p-2 hover:bg-slate-100 rounded-lg">
                  <MoreHorizontal className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>

            <h3 className="font-semibold text-slate-800 text-lg">{practitioner.name}</h3>
            <p className="text-amber-600 text-sm mb-3">{practitioner.specialties[0]}</p>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-medium">{practitioner.rating}</span>
                <span className="text-slate-500 text-sm">({practitioner.total_reviews})</span>
              </div>
              <span className="text-slate-400">|</span>
              <span className="text-slate-600 text-sm">{practitioner.years_experience} years</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {practitioner.specialties.slice(0, 3).map((specialty, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs">
                  {specialty}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
              <span>Languages: {practitioner.languages_spoken.join(', ')}</span>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                View Profile
              </button>
              <button className="flex-1 border border-slate-200 hover:border-amber-500 hover:text-amber-600 py-2 rounded-lg text-sm font-medium transition-colors">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Add New Therapist</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                <input type="tel" className="w-full px-4 py-2 border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Specialties</label>
                <input type="text" placeholder="Comma separated" className="w-full px-4 py-2 border border-slate-200 rounded-lg" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Years Experience</label>
                  <input type="number" className="w-full px-4 py-2 border border-slate-200 rounded-lg" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
                  <select className="w-full px-4 py-2 border border-slate-200 rounded-lg">
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                >
                  Add Therapist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
