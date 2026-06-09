import { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  Download,
  BarChart3
} from 'lucide-react'

const reportTypes = [
  { id: 'revenue', name: 'Revenue Report', icon: DollarSign },
  { id: 'bookings', name: 'Booking Analytics', icon: Calendar },
  { id: 'clients', name: 'Client Demographics', icon: Users },
  { id: 'services', name: 'Service Performance', icon: BarChart3 },
]

const revenueData = [
  { month: 'Jan', revenue: 12500, bookings: 180 },
  { month: 'Feb', revenue: 15200, bookings: 210 },
  { month: 'Mar', revenue: 18900, bookings: 245 },
  { month: 'Apr', revenue: 16800, bookings: 220 },
  { month: 'May', revenue: 21400, bookings: 280 },
  { month: 'Jun', revenue: 23800, bookings: 310 },
]

const topServices = [
  { name: 'Traditional Massage', bookings: 245, revenue: 15800 },
  { name: 'Shirodhara', bookings: 180, revenue: 12600 },
  { name: 'Deep Tissue', bookings: 156, revenue: 7800 },
  { name: 'Couples Package', bookings: 89, revenue: 12500 },
]

const nationalityData = [
  { country: 'United States', count: 345, percentage: 28 },
  { country: 'United Kingdom', count: 234, percentage: 19 },
  { country: 'Germany', count: 189, percentage: 15 },
  { country: 'Australia', count: 156, percentage: 13 },
  { country: 'Japan', count: 123, percentage: 10 },
  { country: 'Others', count: 189, percentage: 15 },
]

export default function AdminReports() {
  const [activeReport, setActiveReport] = useState('revenue')
  const [dateRange, setDateRange] = useState('6months')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Reports & Analytics</h1>
          <p className="text-slate-500">View detailed insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="6months">Last 6 Months</option>
            <option value="year">Last Year</option>
          </select>
          <button className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="flex flex-wrap gap-2">
        {reportTypes.map((report) => {
          const Icon = report.icon
          return (
            <button
              key={report.id}
              onClick={() => setActiveReport(report.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeReport === report.id
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{report.name}</span>
            </button>
          )
        })}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$108,600', change: '+24%', trend: 'up' },
          { label: 'Total Bookings', value: '1,445', change: '+18%', trend: 'up' },
          { label: 'New Clients', value: '234', change: '+12%', trend: 'up' },
          { label: 'Avg. Rating', value: '4.9', change: '+0.1', trend: 'up' },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-slate-500 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            <div className={`flex items-center gap-1 text-sm mt-2 ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
              {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      {activeReport === 'revenue' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-6">Revenue Trend</h3>
            <div className="h-64 flex items-end gap-4">
              {revenueData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-amber-500 rounded-t-lg transition-all hover:bg-amber-600"
                    style={{ height: `${(data.revenue / 25000) * 200}px` }}
                  />
                  <span className="text-sm text-slate-500">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-6">Top Services</h3>
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">{service.name}</p>
                    <p className="text-sm text-slate-500">{service.bookings} bookings</p>
                  </div>
                  <p className="font-semibold text-amber-600">${service.revenue.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Client Demographics */}
      {activeReport === 'clients' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-6">Client Nationality</h3>
            <div className="space-y-4">
              {nationalityData.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-700">{item.country}</span>
                    <span className="text-slate-500 text-sm">{item.count} ({item.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-6">Key Metrics</h3>
            <div className="space-y-6">
              {[
                { label: 'Returning Clients', value: '68%', desc: 'Clients who booked more than once' },
                { label: 'Average Booking Value', value: '$75', desc: 'Per session average' },
                { label: 'Client Satisfaction', value: '4.9/5', desc: 'Based on 1,234 reviews' },
                { label: 'VIP Members', value: '45', desc: 'Premium tier clients' },
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-800">{metric.label}</p>
                    <p className="text-sm text-slate-500">{metric.desc}</p>
                  </div>
                  <p className="text-xl font-bold text-amber-600">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Other Reports Placeholder */}
      {activeReport !== 'revenue' && activeReport !== 'clients' && (
        <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
          <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">Report Coming Soon</h3>
          <p className="text-slate-500">This report is being generated. Check back later.</p>
        </div>
      )}
    </div>
  )
}
