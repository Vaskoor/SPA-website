import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCurrency } from '../contexts/CurrencyContext'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'sonner'
import { 
  Calendar, 
  Clock, 
  User, 
  ChevronRight, 
  ChevronLeft,
  Check,
  Sparkles,
  Users,
  CreditCard,
  Info,
  AlertTriangle
} from 'lucide-react'
import { services, practitioners } from '../data/mockData'

const steps = [
  { id: 1, name: 'Service', icon: Sparkles },
  { id: 2, name: 'Practitioner', icon: User },
  { id: 3, name: 'Date & Time', icon: Calendar },
  { id: 4, name: 'Details', icon: Info },
  { id: 5, name: 'Payment', icon: CreditCard },
]

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00'
]

export default function Booking() {
  const location = useLocation()
  const navigate = useNavigate()
  const { formatPrice } = useCurrency()
  const { isAuthenticated } = useAuth()

  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState<number | null>(location.state?.serviceId || null)
  const [selectedDuration, setSelectedDuration] = useState<number | null>(location.state?.duration || null)
  const [selectedPractitioner, setSelectedPractitioner] = useState<number | null>(location.state?.practitionerId || null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [genderPreference, setGenderPreference] = useState('no_preference')
  const [pressurePreference, setPressurePreference] = useState('medium')
  const [specialRequests, setSpecialRequests] = useState('')
  const [medicalDisclaimer, setMedicalDisclaimer] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const service = selectedService ? services.find(s => s.id === selectedService) : null
  const eligiblePractitioners = service 
    ? practitioners.filter(p => p.services.includes(service.id) && p.is_available)
    : []

  useEffect(() => {
    if (!isAuthenticated) {
      toast.info('Please sign in to book an appointment')
      navigate('/login', { state: { from: '/booking' } })
    }
  }, [isAuthenticated, navigate])

  const calculateTotal = () => {
    if (!service || !selectedDuration) return 0
    return service.pricing[selectedDuration].USD
  }

  const handleNext = () => {
    if (currentStep === 1 && (!selectedService || !selectedDuration)) {
      toast.error('Please select a service and duration')
      return
    }
    if (currentStep === 3 && (!selectedDate || !selectedTime)) {
      toast.error('Please select a date and time')
      return
    }
    if (currentStep === 4 && !medicalDisclaimer) {
      toast.error('Please accept the medical disclaimer')
      return
    }
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsProcessing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    toast.success('Booking confirmed! Check your email for details.')
    navigate('/my-bookings')
  }

  // Generate next 14 days
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date.toISOString().split('T')[0]
  })

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="pt-24 pb-16 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-slate-800 mb-4">
            Book Your Appointment
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto">
            Follow the steps below to schedule your wellness session with us.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = step.id === currentStep
              const isCompleted = step.id < currentStep
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex flex-col items-center
                    ${isActive ? 'text-amber-600' : isCompleted ? 'text-emerald-600' : 'text-slate-400'}
                  `}>
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center mb-2
                      ${isActive ? 'bg-amber-100' : isCompleted ? 'bg-emerald-100' : 'bg-slate-100'}
                    `}>
                      {isCompleted ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <span className="text-xs font-medium hidden sm:block">{step.name}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`
                      w-12 sm:w-24 h-0.5 mx-2 sm:mx-4
                      ${isCompleted ? 'bg-emerald-500' : 'bg-slate-200'}
                    `} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-slate-800 mb-6">
                  Select a Service
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setSelectedService(s.id)
                        setSelectedDuration(null)
                      }}
                      className={`
                        text-left p-6 rounded-2xl border-2 transition-all
                        ${selectedService === s.id 
                          ? 'border-amber-500 bg-amber-50' 
                          : 'border-slate-200 bg-white hover:border-amber-300'
                        }
                      `}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium capitalize">
                          {s.category}
                        </span>
                        {selectedService === s.id && (
                          <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">{s.name}</h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{s.description}</p>
                      <p className="text-amber-600 font-semibold">
                        From {formatPrice(s.pricing[s.durations[0]].USD)}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {selectedService && service && (
                <div>
                  <h3 className="font-semibold text-slate-800 mb-4">Select Duration</h3>
                  <div className="flex flex-wrap gap-3">
                    {service.durations.map((duration) => (
                      <button
                        key={duration}
                        onClick={() => setSelectedDuration(duration)}
                        className={`
                          flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all
                          ${selectedDuration === duration
                            ? 'border-amber-500 bg-amber-50 text-amber-700'
                            : 'border-slate-200 bg-white hover:border-amber-300'
                          }
                        `}
                      >
                        <Clock className="w-4 h-4" />
                        <span>{duration} minutes</span>
                        <span className="text-slate-400">|</span>
                        <span className="font-semibold">
                          {formatPrice(service.pricing[duration].USD)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Practitioner Selection */}
          {currentStep === 2 && (
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-800 mb-6">
                Choose Your Therapist
              </h2>
              <p className="text-slate-600 mb-6">
                Select a specific therapist or let us match you with the best available option.
              </p>

              <button
                onClick={() => setSelectedPractitioner(null)}
                className={`
                  w-full p-6 rounded-2xl border-2 mb-4 transition-all text-left
                  ${selectedPractitioner === null
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-slate-200 bg-white hover:border-amber-300'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Let us choose</h3>
                    <p className="text-slate-600 text-sm">
                      We'll match you with the best available therapist
                    </p>
                  </div>
                </div>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {eligiblePractitioners.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPractitioner(p.id)}
                    className={`
                      p-6 rounded-2xl border-2 transition-all text-left
                      ${selectedPractitioner === p.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-slate-200 bg-white hover:border-amber-300'
                      }
                    `}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-stone-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-7 h-7 text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800">{p.name}</h3>
                        <p className="text-amber-600 text-sm">{p.specialties[0]}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                          <span>⭐ {p.rating}</span>
                          <span>•</span>
                          <span>{p.years_experience} yrs exp</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Date & Time */}
          {currentStep === 3 && (
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-800 mb-6">
                Select Date & Time
              </h2>

              <div className="mb-8">
                <h3 className="font-semibold text-slate-800 mb-4">Select Date</h3>
                <div className="flex gap-3 overflow-x-auto pb-4">
                  {availableDates.map((date) => {
                    const d = new Date(date)
                    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' })
                    const dayNum = d.getDate()
                    const isSelected = selectedDate === date
                    
                    return (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`
                          flex-shrink-0 w-20 h-24 rounded-2xl border-2 flex flex-col items-center justify-center transition-all
                          ${isSelected
                            ? 'border-amber-500 bg-amber-50 text-amber-700'
                            : 'border-slate-200 bg-white hover:border-amber-300'
                          }
                        `}
                      >
                        <span className="text-xs uppercase">{dayName}</span>
                        <span className="text-2xl font-bold">{dayNum}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {selectedDate && (
                <div>
                  <h3 className="font-semibold text-slate-800 mb-4">Select Time</h3>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`
                          py-3 px-4 rounded-xl border-2 transition-all
                          ${selectedTime === time
                            ? 'border-amber-500 bg-amber-50 text-amber-700'
                            : 'border-slate-200 bg-white hover:border-amber-300'
                          }
                        `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Details */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <h2 className="font-serif text-2xl font-bold text-slate-800">
                Additional Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Gender Preference
                  </label>
                  <div className="flex gap-3">
                    {[
                      { id: 'no_preference', label: 'No Preference' },
                      { id: 'female', label: 'Female' },
                      { id: 'male', label: 'Male' },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setGenderPreference(option.id)}
                        className={`
                          flex-1 py-3 px-4 rounded-xl border-2 transition-all
                          ${genderPreference === option.id
                            ? 'border-amber-500 bg-amber-50 text-amber-700'
                            : 'border-slate-200 bg-white hover:border-amber-300'
                          }
                        `}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Pressure Preference
                  </label>
                  <div className="flex gap-3">
                    {[
                      { id: 'light', label: 'Light' },
                      { id: 'medium', label: 'Medium' },
                      { id: 'firm', label: 'Firm' },
                      { id: 'deep', label: 'Deep' },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setPressurePreference(option.id)}
                        className={`
                          flex-1 py-3 px-4 rounded-xl border-2 transition-all
                          ${pressurePreference === option.id
                            ? 'border-amber-500 bg-amber-50 text-amber-700'
                            : 'border-slate-200 bg-white hover:border-amber-300'
                          }
                        `}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Any specific areas to focus on, allergies, or other requests..."
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Promo Code (Optional)
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                  <button className="px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Medical Disclaimer */}
              <div className="bg-amber-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Medical Disclaimer</h3>
                    <p className="text-slate-600 text-sm mb-4">
                      I confirm that I have no medical conditions that would make massage therapy 
                      inadvisable. I understand that massage therapy is not a substitute for medical 
                      treatment and I should consult a physician for any medical concerns.
                    </p>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={medicalDisclaimer}
                        onChange={(e) => setMedicalDisclaimer(e.target.checked)}
                        className="w-5 h-5 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-slate-700">I agree to the medical disclaimer</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Payment */}
          {currentStep === 5 && (
            <div className="space-y-8">
              <h2 className="font-serif text-2xl font-bold text-slate-800">
                Confirm & Pay
              </h2>

              {/* Booking Summary */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-800 mb-4">Booking Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Service</span>
                    <span className="font-medium">{service?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Duration</span>
                    <span className="font-medium">{selectedDuration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Date & Time</span>
                    <span className="font-medium">{selectedDate} at {selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Therapist</span>
                    <span className="font-medium">
                      {selectedPractitioner 
                        ? practitioners.find(p => p.id === selectedPractitioner)?.name 
                        : 'Best available'}
                    </span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-amber-600">{formatPrice(calculateTotal())}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="font-semibold text-slate-800 mb-4">Payment Method</h3>
                <div className="space-y-3">
                  {['Credit Card', 'PayPal', 'Pay at Spa'].map((method) => (
                    <label
                      key={method}
                      className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-amber-300 transition-colors"
                    >
                      <input type="radio" name="payment" className="w-5 h-5 text-amber-500" defaultChecked={method === 'Credit Card'} />
                      <span className="flex-1">{method}</span>
                      {method === 'Credit Card' && <CreditCard className="w-5 h-5 text-slate-400" />}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-12">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`
                inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all
                ${currentStep === 1
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-600 hover:bg-slate-100'
                }
              `}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-medium transition-all"
              >
                <span>Continue</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-medium transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Booking</span>
                    <Check className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
