import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'sonner'
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Lock,
  Camera,
  Check,
  Sparkles
} from 'lucide-react'

const currencies = ['USD', 'EUR', 'GBP', 'NPR', 'INR', 'AUD', 'CAD', 'JPY']
const languages = [
  { code: 'en', name: 'English' },
  { code: 'ne', name: 'Nepali' },
  { code: 'hi', name: 'Hindi' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
]

export default function Profile() {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    nationality: user?.nationality || '',
    preferred_language: user?.preferred_language || 'en',
    preferred_currency: user?.preferred_currency || 'USD',
    date_of_birth: user?.date_of_birth || '',
    medical_notes: user?.medical_notes || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    updateUser({ ...user!, ...formData })
    toast.success('Profile updated successfully')
    setIsEditing(false)
    setIsSaving(false)
  }

  return (
    <div className="pt-24 pb-16 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-slate-800 mb-2">
              My Profile
            </h1>
            <p className="text-slate-600">
              Manage your personal information and preferences
            </p>
          </div>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 border border-slate-200 rounded-full font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full font-medium transition-colors disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto">
                  <User className="w-16 h-16 text-amber-600" />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-amber-500 hover:bg-amber-600 rounded-full flex items-center justify-center text-white transition-colors">
                    <Camera className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <h2 className="font-serif text-xl font-bold text-slate-800 mb-1">
                {user?.name}
              </h2>
              <p className="text-slate-500 mb-4">{user?.email}</p>
              
              {user?.is_vip && (
                <span className="bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-medium">
                  VIP Member
                </span>
              )}

              <div className="mt-8 pt-8 border-t border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-500">Loyalty Points</span>
                  <span className="font-bold text-amber-600">450</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Total Bookings</span>
                  <span className="font-bold text-slate-800">12</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-6">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:bg-slate-50 disabled:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:bg-slate-50 disabled:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:bg-slate-50 disabled:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nationality
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:bg-slate-50 disabled:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Preferred Language
                  </label>
                  <select
                    name="preferred_language"
                    value={formData.preferred_language}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:bg-slate-50 disabled:text-slate-500"
                  >
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code}>{lang.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Preferred Currency
                  </label>
                  <select
                    name="preferred_currency"
                    value={formData.preferred_currency}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:bg-slate-50 disabled:text-slate-500"
                  >
                    {currencies.map(curr => (
                      <option key={curr} value={curr}>{curr}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Medical Notes (Optional)
                  </label>
                  <textarea
                    name="medical_notes"
                    value={formData.medical_notes}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows={3}
                    placeholder="Any allergies, medical conditions, or special requirements..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:bg-slate-50 disabled:text-slate-500"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    This information helps our therapists provide better care
                  </p>
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="bg-white rounded-2xl p-8 shadow-sm mt-6">
              <h3 className="font-semibold text-slate-800 mb-6">Security</h3>
              <button className="inline-flex items-center gap-2 border border-slate-200 hover:border-amber-500 hover:text-amber-600 text-slate-600 px-6 py-3 rounded-xl transition-colors">
                <Lock className="w-5 h-5" />
                <span>Change Password</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
