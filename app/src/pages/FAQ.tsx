import { useState } from 'react'
import { 
  ChevronDown, 
  Search,
  MessageCircle,
  Phone,
  Mail,
  Sparkles
} from 'lucide-react'
import { faqs } from '../data/mockData'

const categories = [
  { id: 'all', name: 'All Questions' },
  { id: 'booking', name: 'Booking' },
  { id: 'cancellation', name: 'Cancellation' },
  { id: 'international', name: 'International Guests' },
  { id: 'hygiene', name: 'Hygiene & Safety' },
  { id: 'payment', name: 'Payment' },
  { id: 'services', name: 'Services' },
]

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [openItems, setOpenItems] = useState<number[]>([])

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-16 bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-slate-900" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Help Center</span>
            <h1 className="font-serif text-5xl font-bold mt-4 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-white/80">
              Find answers to common questions about our services, booking process, and policies.
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-lg"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-4 sticky top-24">
                <h3 className="font-semibold text-slate-800 mb-4 px-4">Categories</h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-amber-50 text-amber-600 font-medium'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ List */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {filteredFaqs.map((faq) => {
                  const isOpen = openItems.includes(faq.id)
                  return (
                    <div 
                      key={faq.id} 
                      className="bg-white rounded-2xl overflow-hidden shadow-sm"
                    >
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-medium text-slate-800 pr-4">{faq.question}</span>
                        <ChevronDown 
                          className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {filteredFaqs.length === 0 && (
                <div className="text-center py-16">
                  <Sparkles className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-600 mb-2">No questions found</h3>
                  <p className="text-slate-500">Try a different search term or category</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl font-bold text-slate-800 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-slate-600">
              Our team is here to help. Reach out to us through any of the channels below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a 
              href="https://wa.me/9771234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-50 rounded-2xl p-8 text-center hover:bg-emerald-100 transition-colors"
            >
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">WhatsApp</h3>
              <p className="text-slate-600 text-sm">Chat with us instantly</p>
            </a>

            <a 
              href="tel:+9771234567890"
              className="bg-amber-50 rounded-2xl p-8 text-center hover:bg-amber-100 transition-colors"
            >
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Phone</h3>
              <p className="text-slate-600 text-sm">+977 1-234-5678</p>
            </a>

            <a 
              href="mailto:info@thamelspa.com"
              className="bg-slate-50 rounded-2xl p-8 text-center hover:bg-slate-100 transition-colors"
            >
              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-slate-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Email</h3>
              <p className="text-slate-600 text-sm">info@thamelspa.com</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
