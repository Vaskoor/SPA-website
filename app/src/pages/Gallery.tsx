import { useState } from 'react'
import { 
  Sparkles, 
  X,
  ChevronLeft,
  ChevronRight,
  MapPin
} from 'lucide-react'
import { galleryImages } from '../data/mockData'

const categories = [
  { id: 'all', name: 'All' },
  { id: 'interior', name: 'Interior' },
  { id: 'treatment_rooms', name: 'Treatment Rooms' },
  { id: 'hygiene', name: 'Hygiene' },
  { id: 'team', name: 'Our Team' },
]

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = 'auto'
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-16 bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-slate-900" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Gallery</span>
            <h1 className="font-serif text-5xl font-bold mt-4 mb-6">
              Experience Our Space
            </h1>
            <p className="text-lg text-white/80">
              Take a virtual tour of our facilities and discover the tranquility that awaits you.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-600'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => openLightbox(index)}
                className="group relative aspect-square bg-gradient-to-br from-amber-100 to-stone-200 rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-amber-300" />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-medium">{image.title}</span>
                </div>
              </button>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <Sparkles className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600">No images found</h3>
            </div>
          )}
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-600 font-medium text-sm uppercase tracking-wider">Video Tour</span>
            <h2 className="font-serif text-4xl font-bold text-slate-800 mt-3 mb-4">
              See It to Believe It
            </h2>
          </div>

          <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent" />
            <button className="w-20 h-20 bg-amber-500 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors">
              <Sparkles className="w-8 h-8 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-600 font-medium text-sm uppercase tracking-wider">Location</span>
              <h2 className="font-serif text-4xl font-bold text-slate-800 mt-3 mb-6">
                Visit Us in Thamel
              </h2>
              <p className="text-slate-600 mb-8">
                Located in the heart of Kathmandu's vibrant Thamel district, 
                our spa offers a peaceful sanctuary away from the bustling streets.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Address</p>
                    <p className="text-slate-600 text-sm">
                      Thamel Marg, Thamel, Kathmandu 44600, Nepal
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="aspect-video bg-gradient-to-br from-amber-100 to-stone-200 rounded-2xl flex items-center justify-center">
              <MapPin className="w-24 h-24 text-amber-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
          >
            <X className="w-8 h-8" />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 text-white/80 hover:text-white p-2"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 text-white/80 hover:text-white p-2"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div 
            className="max-w-5xl max-h-[80vh] aspect-[4/3] bg-gradient-to-br from-amber-100 to-stone-200 rounded-lg flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Sparkles className="w-32 h-32 text-amber-400" />
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-center">
            <p className="font-medium">{filteredImages[currentImageIndex]?.title}</p>
            <p className="text-sm text-white/60">
              {currentImageIndex + 1} / {filteredImages.length}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
