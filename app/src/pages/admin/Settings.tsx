import { useState } from 'react'
import { 
  Save,
  Globe,
  Clock,
  MessageSquare,
  Bell,
  Shield,
  Check
} from 'lucide-react'

const currencies = ['USD', 'EUR', 'GBP', 'NPR', 'INR', 'AUD', 'CAD', 'JPY']
const languages = [
  { code: 'en', name: 'English' },
  { code: 'ne', name: 'Nepali' },
  { code: 'hi', name: 'Hindi' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
]

const businessHours = [
  { day: 'Monday', open: '09:00', close: '21:00', isOpen: true },
  { day: 'Tuesday', open: '09:00', close: '21:00', isOpen: true },
  { day: 'Wednesday', open: '09:00', close: '21:00', isOpen: true },
  { day: 'Thursday', open: '09:00', close: '21:00', isOpen: true },
  { day: 'Friday', open: '09:00', close: '21:00', isOpen: true },
  { day: 'Saturday', open: '09:00', close: '22:00', isOpen: true },
  { day: 'Sunday', open: '09:00', close: '22:00', isOpen: true },
]

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const tabs = [
    { id: 'general', name: 'General', icon: Globe },
    { id: 'business', name: 'Business Hours', icon: Clock },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'integrations', name: 'Integrations', icon: MessageSquare },
    { id: 'security', name: 'Security', icon: Shield },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
          <p className="text-slate-500">Manage your spa configuration</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-amber-50 text-amber-600 border-r-2 border-amber-500'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-slate-800 mb-6">General Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Spa Name
                    </label>
                    <input 
                      type="text" 
                      defaultValue="Thamel Spa & Wellness"
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Default Language
                    </label>
                    <select className="w-full px-4 py-2 border border-slate-200 rounded-lg">
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Default Currency
                    </label>
                    <select className="w-full px-4 py-2 border border-slate-200 rounded-lg">
                      {currencies.map(curr => (
                        <option key={curr} value={curr}>{curr}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Time Zone
                    </label>
                    <select className="w-full px-4 py-2 border border-slate-200 rounded-lg">
                      <option value="Asia/Kathmandu">Asia/Kathmandu (GMT+5:45)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Spa Description
                  </label>
                  <textarea 
                    rows={4}
                    defaultValue="Experience authentic Ayurvedic treatments and luxury spa experiences in the heart of Thamel, Kathmandu."
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>
            )}

            {/* Business Hours */}
            {activeTab === 'business' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-slate-800 mb-6">Business Hours</h2>
                
                <div className="space-y-4">
                  {businessHours.map((day, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                      <label className="flex items-center gap-3 flex-1">
                        <input 
                          type="checkbox" 
                          defaultChecked={day.isOpen}
                          className="w-5 h-5 rounded border-slate-300"
                        />
                        <span className="font-medium text-slate-800 w-24">{day.day}</span>
                      </label>
                      <div className="flex items-center gap-3">
                        <input 
                          type="time" 
                          defaultValue={day.open}
                          className="px-3 py-2 border border-slate-200 rounded-lg"
                        />
                        <span className="text-slate-500">to</span>
                        <input 
                          type="time" 
                          defaultValue={day.close}
                          className="px-3 py-2 border border-slate-200 rounded-lg"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-slate-800 mb-6">Notification Settings</h2>
                
                <div className="space-y-4">
                  {[
                    { label: 'New Booking Notification', desc: 'Receive email when a new booking is made', enabled: true },
                    { label: 'Booking Cancellation', desc: 'Receive email when a booking is cancelled', enabled: true },
                    { label: 'Daily Summary', desc: 'Receive daily summary of all activities', enabled: false },
                    { label: 'Low Inventory Alert', desc: 'Get notified when inventory is running low', enabled: true },
                    { label: 'Client Review', desc: 'Receive notification when a client leaves a review', enabled: true },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-medium text-slate-800">{item.label}</p>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Integrations */}
            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-slate-800 mb-6">Integrations</h2>
                
                <div className="space-y-4">
                  {[
                    { name: 'WhatsApp Business', desc: 'Connect your WhatsApp Business account', connected: true },
                    { name: 'Stripe', desc: 'Accept online payments', connected: true },
                    { name: 'Google Calendar', desc: 'Sync bookings with Google Calendar', connected: false },
                    { name: 'Mailchimp', desc: 'Email marketing integration', connected: false },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-medium text-slate-800">{item.name}</p>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                      <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        item.connected 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}>
                        {item.connected ? 'Connected' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-slate-800 mb-6">Security Settings</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="font-medium text-slate-800 mb-2">Two-Factor Authentication</p>
                    <p className="text-sm text-slate-500 mb-4">Add an extra layer of security to your account</p>
                    <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600">
                      Enable 2FA
                    </button>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="font-medium text-slate-800 mb-2">Password Requirements</p>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        Minimum 8 characters
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        At least one uppercase letter
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        At least one number
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="font-medium text-slate-800 mb-2">Session Timeout</p>
                    <select className="px-4 py-2 border border-slate-200 rounded-lg">
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
