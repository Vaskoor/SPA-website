import { useState } from 'react'
import { 
  Calendar, 
  Search, 
  Filter,
  ChevronLeft,
  ChevronRight,
  Plus,
  MoreHorizontal,
  Clock
} from 'lucide-react'

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-emerald-100 text-emerald-700',
  in_progress: 'bg-blue-100 text-blue-700',
  completed: 'bg-slate-100 text-slate-700',
  cancelled: 'bg-red-100 text-red-700',
}

const mockBookings = [
  { id: 'SPA20240201001', client: 'Sarah Johnson', service: 'Traditional Massage', practitioner: 'Sunita Sharma', date: '2024-02-01', time: '14:00', status: 'confirmed', amount: 65 },
  { id: 'SPA20240201002', client: 'Michael Chen', service: 'Shirodhara', practitioner: 'Bikash Tamang', date: '2024-02-01', time: '15:30', status: 'in_progress', amount: 75 },
  { id: 'SPA20240201003', client: 'Emma Williams', service: 'Couples Package', practitioner: 'Sunita Sharma', date: '2024-02-01', time: '16:00', status: 'pending', amount: 150 },
  { id: 'SPA20240201004', client: 'Hans Mueller', service: 'Deep Tissue', practitioner: 'Rajesh Gurung', date: '2024-02-01', time: '17:00', status: 'confirmed', amount: 55 },
  { id: 'SPA20240201005', client: 'Yuki Tanaka', service: 'Aromatherapy', practitioner: 'Pooja Rai', date: '2024-02-02', time: '10:00', status: 'confirmed', amount: 50 },
]

export default function AdminBookings() {
  const [view, setView] = useState('list') // list, calendar
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Bookings</h1>
          <p className="text-slate-500">Manage all appointments and reservations</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button 
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${view === 'list' ? 'bg-white shadow-sm' : 'text-slate-600'}`}
            >
              List
            </button>
            <button 
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${view === 'calendar' ? 'bg-white shadow-sm' : 'text-slate-600'}`}
            >
              Calendar
            </button>
          </div>
          <button className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Plus className="w-4 h-4" />
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search bookings..."
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
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">
          <Filter className="w-4 h-4" />
          <span>More Filters</span>
        </button>
      </div>

      {/* Content */}
      {view === 'list' ? (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Booking ID</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Client</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Service</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Therapist</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Date & Time</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Status</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-500">Amount</th>
                <th className="py-4 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {mockBookings.map((booking) => (
                <tr key={booking.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-6">
                    <span className="font-mono text-sm text-slate-600">{booking.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <span className="text-amber-600 text-sm font-medium">
                          {booking.client.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-slate-800">{booking.client}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{booking.service}</td>
                  <td className="py-4 px-6 text-slate-600">{booking.practitioner}</td>
                  <td className="py-4 px-6">
                    <div className="text-slate-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {booking.date}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                        <Clock className="w-3 h-3" />
                        {booking.time}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[booking.status]}`}>
                      {booking.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right font-medium">${booking.amount}</td>
                  <td className="py-4 px-6">
                    <button className="p-2 hover:bg-slate-200 rounded-lg">
                      <MoreHorizontal className="w-5 h-5 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-slate-100">
            <p className="text-sm text-slate-500">Showing 1-5 of 24 bookings</p>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-slate-100 rounded-lg disabled:opacity-50" disabled>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="w-8 h-8 bg-amber-500 text-white rounded-lg font-medium">1</button>
              <button className="w-8 h-8 hover:bg-slate-100 rounded-lg font-medium">2</button>
              <button className="w-8 h-8 hover:bg-slate-100 rounded-lg font-medium">3</button>
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">Calendar View</h3>
            <p className="text-slate-500">Calendar integration coming soon</p>
          </div>
        </div>
      )}
    </div>
  )
}
