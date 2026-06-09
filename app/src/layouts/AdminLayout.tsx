import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  LayoutDashboard,
  Calendar,
  Users,
  Sparkles,
  Star,
  BarChart3,
  Settings,
  LogOut,
  Menu
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/bookings', icon: Calendar, label: 'Bookings' },
  { path: '/admin/practitioners', icon: Users, label: 'Therapists' },
  { path: '/admin/services', icon: Sparkles, label: 'Services' },
  { path: '/admin/clients', icon: Users, label: 'Clients' },
  { path: '/admin/reviews', icon: Star, label: 'Reviews' },
  { path: '/admin/reports', icon: BarChart3, label: 'Reports' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <span className="font-serif text-lg font-semibold">Thamel Spa</span>
          </Link>
          <p className="text-xs text-slate-400 mt-1">Admin Panel</p>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-amber-500/20 text-amber-400' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
              <span className="text-amber-400 text-sm font-medium">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-serif font-semibold">Admin Panel</span>
          <div className="w-10" />
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
