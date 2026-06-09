import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  Calendar, 
  Clock, 
  Star, 
  Gift, 
  User, 
  ChevronRight,
  Sparkles,
  MapPin
} from 'lucide-react'

// Mock data for dashboard
const upcomingBookings = [
  {
    id: 1,
    service: 'Traditional Nepali Massage',
    date: '2024-02-15',
    time: '14:00',
    duration: 90,
    practitioner: 'Sunita Sharma',
    status: 'confirmed'
  }
]

const recentBookings = [
  {
    id: 2,
    service: 'Aromatherapy Massage',
    date: '2024-01-20',
    practitioner: 'Pooja Rai',
    status: 'completed'
  },
  {
    id: 3,
    service: 'Deep Tissue Massage',
    date: '2024-01-05',
    practitioner: 'Rajesh Gurung',
    status: 'completed'
  }
]

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="pt-24 pb-16 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-slate-800 mb-2">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-slate-600">
            Here's what's happening with your wellness journey.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Bookings', value: '12', icon: Calendar, color: 'amber' },
            { label: 'Loyalty Points', value: '450', icon: Gift, color: 'emerald' },
            { label: 'Next Booking', value: '3 days', icon: Clock, color: 'blue' },
            { label: 'Reviews Given', value: '8', icon: Star, color: 'purple' },
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className={`w-10 h-10 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-slate-500 text-sm">{stat.label}</p>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Bookings */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl font-bold text-slate-800">
                  Upcoming Bookings
                </h2>
                <Link 
                  to="/my-bookings" 
                  className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center gap-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div 
                      key={booking.id} 
                      className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-amber-50 rounded-xl"
                    >
                      <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-7 h-7 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800">{booking.service}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {booking.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {booking.time}
                          </span>
                          <span>{booking.duration} min</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">
                          with {booking.practitioner}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium capitalize">
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-600 mb-4">No upcoming bookings</p>
                  <Link 
                    to="/booking"
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                    <span>Book Now</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-slate-800 mb-6">
                Recent Bookings
              </h2>

              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div 
                    key={booking.id} 
                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl"
                  >
                    <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-800">{booking.service}</h3>
                      <p className="text-sm text-slate-500">
                        {booking.date} • with {booking.practitioner}
                      </p>
                    </div>
                    <span className="bg-slate-200 text-slate-600 px-3 py-1 rounded-full text-xs font-medium capitalize">
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{user?.name}</h3>
                  <p className="text-slate-500 text-sm">{user?.email}</p>
                  {user?.is_vip && (
                    <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-medium mt-1 inline-block">
                      VIP Member
                    </span>
                  )}
                </div>
              </div>
              <Link 
                to="/profile"
                className="block w-full text-center border border-slate-200 hover:border-amber-500 hover:text-amber-600 text-slate-600 py-2.5 rounded-xl transition-colors"
              >
                Edit Profile
              </Link>
            </div>

            {/* Loyalty Card */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="w-6 h-6" />
                <h3 className="font-semibold">Loyalty Program</h3>
              </div>
              <p className="text-white/80 text-sm mb-4">
                You have <span className="font-bold text-white">450 points</span>
              </p>
              <div className="bg-white/20 rounded-full h-2 mb-2">
                <div className="bg-white rounded-full h-2 w-3/4" />
              </div>
              <p className="text-white/70 text-xs">
                50 more points for next reward
              </p>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link 
                  to="/booking"
                  className="flex items-center gap-3 p-3 hover:bg-amber-50 rounded-xl transition-colors"
                >
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-amber-600" />
                  </div>
                  <span className="text-slate-700">Book Appointment</span>
                </Link>
                <Link 
                  to="/services"
                  className="flex items-center gap-3 p-3 hover:bg-amber-50 rounded-xl transition-colors"
                >
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                  </div>
                  <span className="text-slate-700">Browse Services</span>
                </Link>
                <Link 
                  to="/contact"
                  className="flex items-center gap-3 p-3 hover:bg-amber-50 rounded-xl transition-colors"
                >
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-amber-600" />
                  </div>
                  <span className="text-slate-700">Contact Support</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
