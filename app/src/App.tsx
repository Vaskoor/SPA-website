import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider } from './contexts/AuthContext'
import { CurrencyProvider } from './contexts/CurrencyContext'
import { LanguageProvider } from './contexts/LanguageContext'

// Public Pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Practitioners from './pages/Practitioners'
import PractitionerProfile from './pages/PractitionerProfile'
import Booking from './pages/Booking'
import Packages from './pages/Packages'
import Gallery from './pages/Gallery'
import Reviews from './pages/Reviews'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'

// Client Dashboard
import Dashboard from './pages/Dashboard'
import MyBookings from './pages/MyBookings'
import Profile from './pages/Profile'

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard'
import AdminBookings from './pages/admin/Bookings'
import AdminPractitioners from './pages/admin/Practitioners'
import AdminServices from './pages/admin/Services'
import AdminClients from './pages/admin/Clients'
import AdminReviews from './pages/admin/Reviews'
import AdminReports from './pages/admin/Reports'
import AdminSettings from './pages/admin/Settings'

// Layouts
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <LanguageProvider>
          <Toaster position="top-right" richColors />
          <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/practitioners" element={<Practitioners />} />
              <Route path="/practitioners/:id" element={<PractitionerProfile />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Client Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/bookings" element={<AdminBookings />} />
                <Route path="/admin/practitioners" element={<AdminPractitioners />} />
                <Route path="/admin/services" element={<AdminServices />} />
                <Route path="/admin/clients" element={<AdminClients />} />
                <Route path="/admin/reviews" element={<AdminReviews />} />
                <Route path="/admin/reports" element={<AdminReports />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
              </Route>
            </Route>
          </Routes>
        </LanguageProvider>
      </CurrencyProvider>
    </AuthProvider>
  )
}

export default App
