import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Calendar, 
  Clock, 
  ChevronRight,
  Sparkles,
  Star,
  X,
  RotateCcw
} from 'lucide-react'
import { toast } from 'sonner'

// Mock bookings data
const mockBookings = [
  {
    id: 1,
    service: 'Traditional Nepali Massage',
    date: '2024-02-15',
    time: '14:00',
    duration: 90,
    practitioner: 'Sunita Sharma',
    status: 'upcoming',
    price: 65,
    currency: 'USD'
  },
  {
    id: 2,
    service: 'Aromatherapy Massage',
    date: '2024-01-20',
    time: '16:30',
    duration: 60,
    practitioner: 'Pooja Rai',
    status: 'completed',
    price: 50,
    currency: 'USD'
  },
  {
    id: 3,
    service: 'Deep Tissue Massage',
    date: '2024-01-05',
    time: '11:00',
    duration: 60,
    practitioner: 'Rajesh Gurung',
    status: 'completed',
    price: 55,
    currency: 'USD'
  },
  {
    id: 4,
    service: 'Hot Stone Therapy',
    date: '2023-12-15',
    time: '15:00',
    duration: 75,
    practitioner: 'Mohan Thapa',
    status: 'cancelled',
    price: 70,
    currency: 'USD'
  }
]

const tabs = [
  { id: 'all', name: 'All Bookings' },
  { id: 'upcoming', name: 'Upcoming' },
  { id: 'completed', name: 'Completed' },
  { id: 'cancelled', name: 'Cancelled' },
]

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState('all')
  const [bookings, setBookings] = useState(mockBookings)

  const filteredBookings = activeTab === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === activeTab)

  const handleCancel = (bookingId: number) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      setBookings(prev => prev.map(b => 
        b.id === bookingId ? { ...b, status: 'cancelled' } : b
      ))
      toast.success('Booking cancelled successfully')
    }
  }

  const handleReschedule = (_bookingId: number) => {
    toast.info('Reschedule feature coming soon!')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-emerald-100 text-emerald-700'
      case 'completed': return 'bg-slate-100 text-slate-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <div className="pt-24 pb-16 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-slate-800 mb-2">
              My Bookings
            </h1>
            <p className="text-slate-600">
              Manage your appointments and view your booking history
            </p>
          </div>
          <Link 
            to="/booking"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            <Sparkles className="w-5 h-5" />
            <span>Book New</span>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-slate-600 hover:bg-amber-50 hover:text-amber-600'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div 
              key={booking.id} 
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Service Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-7 h-7 text-amber-600" />
                  </div>
                  <div>
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
                </div>

                {/* Price & Status */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-bold text-slate-800">${booking.price}</p>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  {/* Actions */}
                  {booking.status === 'upcoming' && (
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleReschedule(booking.id)}
                        className="p-2 hover:bg-amber-50 rounded-lg text-amber-600"
                        title="Reschedule"
                      >
                        <RotateCcw className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleCancel(booking.id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                        title="Cancel"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}

                  {booking.status === 'completed' && (
                    <Link 
                      to={`/bookings/${booking.id}/review`}
                      className="flex items-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      <Star className="w-4 h-4" />
                      <span>Review</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-16">
            <Sparkles className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No bookings found</h3>
            <p className="text-slate-500 mb-6">You don't have any {activeTab !== 'all' ? activeTab : ''} bookings</p>
            <Link 
              to="/booking"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              <span>Book Your First Session</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
