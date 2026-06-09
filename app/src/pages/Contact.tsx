import { useState } from 'react'
import { toast } from 'sonner'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  MessageCircle,
  Sparkles,
  Check,
  Star
} from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast.success('Message sent! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-16 bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-slate-900" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Contact Us</span>
            <h1 className="font-serif text-5xl font-bold mt-4 mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-white/80">
              Have questions or need assistance? We're here to help you plan your perfect spa experience.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20 relative z-10">
            {[
              { icon: MapPin, title: 'Visit Us', content: 'Thamel Marg, Thamel\nKathmandu 44600, Nepal', color: 'amber' },
              { icon: Phone, title: 'Call Us', content: '+977 1-234-5678\n+977 980-123-4567', color: 'emerald', href: 'tel:+9771234567890' },
              { icon: Mail, title: 'Email Us', content: 'info@thamelspa.com\nbookings@thamelspa.com', color: 'blue', href: 'mailto:info@thamelspa.com' },
              { icon: Clock, title: 'Opening Hours', content: 'Sun - Fri: 9AM - 9PM\nSaturday: 9AM - 10PM', color: 'purple' },
            ].map((item, index) => {
              const Icon = item.icon
              const content = (
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className={`w-12 h-12 bg-${item.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 text-${item.color}-600`} />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm whitespace-pre-line">{item.content}</p>
                </div>
              )
              
              return item.href ? (
                <a key={index} href={item.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={index}>{content}</div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <span className="text-amber-600 font-medium text-sm uppercase tracking-wider">Send Message</span>
              <h2 className="font-serif text-3xl font-bold text-slate-800 mt-3 mb-6">
                We'd Love to Hear From You
              </h2>
              <p className="text-slate-600 mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                      placeholder="+1 234 567 890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                    >
                      <option value="">Select a subject</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="general">General Question</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-medium transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map */}
            <div>
              <span className="text-amber-600 font-medium text-sm uppercase tracking-wider">Location</span>
              <h2 className="font-serif text-3xl font-bold text-slate-800 mt-3 mb-6">
                Find Us on the Map
              </h2>
              
              <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 to-stone-200 rounded-2xl flex items-center justify-center">
                <MapPin className="w-24 h-24 text-amber-400" />
              </div>

              <div className="mt-6 p-6 bg-white rounded-2xl">
                <h3 className="font-semibold text-slate-800 mb-3">Getting Here</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Located in the heart of Thamel, just 5 minutes walk from Thamel Chowk</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Free pick-up available from partner hotels in Thamel area</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Parking available nearby (paid)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-16 bg-emerald-500">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white text-center md:text-left">
              <h2 className="font-serif text-3xl font-bold mb-2">
                Prefer to Chat?
              </h2>
              <p className="text-white/90">
                Reach us instantly on WhatsApp for quick inquiries and bookings.
              </p>
            </div>
            <a
              href="https://wa.me/9771234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-emerald-600 hover:bg-slate-100 px-8 py-4 rounded-full font-medium transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Hotel Concierge */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-amber-600 font-medium text-sm uppercase tracking-wider">Hotel Guests</span>
                <h2 className="font-serif text-3xl font-bold text-slate-800 mt-3 mb-4">
                  Staying at a Partner Hotel?
                </h2>
                <p className="text-slate-600 mb-6">
                  Guests of our partner hotels enjoy exclusive benefits including 
                  complimentary pick-up, priority booking, and special discounts.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Free pick-up and drop-off',
                    'Priority appointment scheduling',
                    '10% discount on all services',
                    'Express check-in at our spa',
                  ].map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <span className="text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="tel:+9771234567890"
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call for Hotel Booking</span>
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  'Hyatt Regency',
                  'Hotel Yak & Yeti',
                  'Radisson Kathmandu',
                  'Shangri-La',
                ].map((hotel, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <Star className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <span className="font-medium text-slate-800">{hotel}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
