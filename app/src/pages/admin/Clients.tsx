import { useState } from 'react'
import { 
  Search, 
  MoreHorizontal,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Gift
} from 'lucide-react'

const mockClients = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1 234 567 890', nationality: 'United States', bookings: 12, totalSpent: 780, isVip: true, loyaltyPoints: 450 },
  { id: 2, name: 'Michael Chen', email: 'michael@example.com', phone: '+65 9876 5432', nationality: 'Singapore', bookings: 8, totalSpent: 520, isVip: false, loyaltyPoints: 280 },
  { id: 3, name: 'Emma Williams', email: 'emma@example.com', phone: '+44 20 7946 0958', nationality: 'United Kingdom', bookings: 15, totalSpent: 1250, isVip: true, loyaltyPoints: 890 },
  { id: 4, name: 'Hans Mueller', email: 'hans@example.com', phone: '+49 30 12345678', nationality: 'Germany', bookings: 5, totalSpent: 340, isVip: false, loyaltyPoints: 150 },
  { id: 5, name: 'Yuki Tanaka', email: 'yuki@example.com', phone: '+81 3-1234-5678', nationality: 'Japan', bookings: 6, totalSpent: 420, isVip: false, loyaltyPoints: 210 },
]

export default function AdminClients() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(search.toLowerCase()) ||
                         client.email.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || 
                         (filter === 'vip' && client.isVip) ||
                         (filter === 'regular' && !client.isVip)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Clients</h1>
          <p className="text-slate-500">Manage client profiles and preferences</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search clients..."
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
          <option value="all">All Clients</option>
          <option value="vip">VIP Only</option>
          <option value="regular">Regular</option>
        </select>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Client</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Contact</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Nationality</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Bookings</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Loyalty</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-slate-500">Total Spent</th>
              <th className="py-4 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-600 font-medium">
                        {client.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-800">{client.name}</span>
                        {client.isVip && (
                          <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-medium">
                            VIP
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {client.email}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Phone className="w-3 h-3" />
                      {client.phone}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1 text-slate-600">
                    <MapPin className="w-4 h-4" />
                    {client.nationality}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1 text-slate-600">
                    <Calendar className="w-4 h-4" />
                    {client.bookings}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1 text-amber-600">
                    <Gift className="w-4 h-4" />
                    {client.loyaltyPoints} pts
                  </div>
                </td>
                <td className="py-4 px-6 text-right font-medium">${client.totalSpent}</td>
                <td className="py-4 px-6">
                  <button className="p-2 hover:bg-slate-200 rounded-lg">
                    <MoreHorizontal className="w-5 h-5 text-slate-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
