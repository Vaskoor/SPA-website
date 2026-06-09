import { useState } from 'react'
import { 
  Search, 
  Plus,
  Edit,
  Trash2,
  Sparkles,
  X
} from 'lucide-react'
import { services } from '../../data/mockData'

export default function AdminServices() {
  const [search, setSearch] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredServices = services.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Services</h1>
          <p className="text-slate-500">Manage spa services and pricing</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500"
        />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="aspect-video bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-12 h-12 text-amber-400" />
            </div>

            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">
                  {service.category}
                </span>
                <h3 className="font-semibold text-slate-800 text-lg">{service.name}</h3>
              </div>
              {service.is_featured && (
                <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-medium">
                  Featured
                </span>
              )}
            </div>

            <p className="text-slate-600 text-sm mb-4 line-clamp-2">{service.description}</p>

            <div className="flex items-center gap-4 mb-4">
              <div>
                <span className="text-xs text-slate-500">From</span>
                <p className="font-bold text-amber-600">${service.pricing[service.durations[0]].USD}</p>
              </div>
              <div className="text-slate-300">|</div>
              <div>
                <span className="text-xs text-slate-500">Duration</span>
                <p className="font-medium text-slate-700">{service.durations.join(', ')} min</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button className="px-3 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
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
              <h2 className="text-xl font-bold text-slate-800">Add New Service</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Service Name</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <select className="w-full px-4 py-2 border border-slate-200 rounded-lg">
                  <option value="massage">Massage</option>
                  <option value="ayurveda">Ayurveda</option>
                  <option value="beauty">Beauty</option>
                  <option value="wellness">Wellness</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea rows={3} className="w-full px-4 py-2 border border-slate-200 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Duration (min)</label>
                  <input type="text" placeholder="60, 90, 120" className="w-full px-4 py-2 border border-slate-200 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Price (USD)</label>
                  <input type="number" className="w-full px-4 py-2 border border-slate-200 rounded-lg" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="featured" className="w-4 h-4 rounded border-slate-300" />
                <label htmlFor="featured" className="text-sm text-slate-700">Feature this service</label>
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
                  Add Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
