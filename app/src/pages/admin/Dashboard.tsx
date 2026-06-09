import { useState } from 'react'
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Clock,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles
} from 'lucide-react'

const stats = [
  { 
    title: "Today's Bookings", 
    value: '24', 
    change: '+12%', 
    trend: 'up',
    icon: Calendar, 
    color: 'amber' 
  },
  { 
    title: 'Revenue Today', 
    value: '$1,450', 
    change: '+8%', 
    trend: 'up',
    icon: DollarSign, 
    color: 'emerald' 
  },
  { 
    title: 'Active Clients', 
    value: '156', 
    change: '+5%', 
    trend: 'up',
    icon: Users, 
    color: 'blue' 
  },
  { 
    title: 'Avg. Rating', 
    value: '4.9', 
    change: '+0.2', 
    trend: 'up',
    icon: Star, 
    color: 'purple' 
  },
]

const recentBookings = [
  { id: 1, client: 'Sarah Johnson', service: 'Traditional Massage', time: '14:00', status: 'confirmed', amount: 65 },
  { id: 2, client: 'Michael Chen', service: 'Shirodhara', time: '15:30', status: 'in_progress', amount: 75 },
  { id: 3, client: 'Emma Williams', service: 'Couples Package', time: '16:00', status: 'pending', amount: 150 },
  { id: 4, client: 'Hans Mueller', service: 'Deep Tissue', time: '17:00', status: 'confirmed', amount: 55 },
]

const topPractitioners = [
  { name: 'Sunita Sharma', bookings: 45, rating: 4.9, revenue: 2890 },
  { name: 'Rajesh Gurung', bookings: 38, rating: 4.8, revenue: 2340 },
  { name: 'Pooja Rai', bookings: 32, rating: 4.9, revenue: 1980 },
]

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState('today')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500">Welcome back! Here's what's happening today.</p>
        </div>
        <select 
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-lg text-sm"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                  <TrendIcon className="w-4 h-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-slate-500 text-sm">{stat.title}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Today's Bookings</h2>
            <a href="/admin/bookings" className="text-amber-600 hover:text-amber-700 text-sm font-medium">
              View All
            </a>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Client</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Service</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Time</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-amber-600 text-sm font-medium">
                            {booking.client.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-slate-800">{booking.client}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600">{booking.service}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-slate-600">
                        <Clock className="w-4 h-4" />
                        {booking.time}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                        booking.status === 'in_progress' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-medium">${booking.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Practitioners */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Top Therapists</h2>
            <a href="/admin/practitioners" className="text-amber-600 hover:text-amber-700 text-sm font-medium">
              View All
            </a>
          </div>

          <div className="space-y-4">
            {topPractitioners.map((practitioner, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{practitioner.name}</p>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <span>{practitioner.bookings} bookings</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {practitioner.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-slate-800">${practitioner.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'New Booking', href: '/admin/bookings', color: 'amber' },
          { label: 'Add Therapist', href: '/admin/practitioners', color: 'emerald' },
          { label: 'Add Service', href: '/admin/services', color: 'blue' },
          { label: 'View Reports', href: '/admin/reports', color: 'purple' },
        ].map((action, index) => (
          <a
            key={index}
            href={action.href}
            className={`bg-${action.color}-50 hover:bg-${action.color}-100 text-${action.color}-700 px-6 py-4 rounded-xl font-medium transition-colors text-center`}
          >
            {action.label}
          </a>
        ))}
      </div>
    </div>
  )
}
