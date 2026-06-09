import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const phoneNumber = '9771234567890'
  const message = 'Hello! I would like to inquire about your spa services.'
  
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-white" />
      <span className="absolute right-full mr-3 bg-slate-800 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat with us
      </span>
    </button>
  )
}
