export const services = [
  {
    id: 1,
    name: 'Traditional Nepali Massage',
    slug: 'traditional-nepali-massage',
    description: 'Ancient healing techniques passed down through generations, combining pressure point therapy with herbal oils.',
    full_description: 'Experience the authentic healing traditions of Nepal with our signature Traditional Nepali Massage. This ancient therapy combines deep tissue manipulation, pressure point stimulation, and the application of warm herbal oils to release tension, improve circulation, and restore balance to your body and mind.',
    category: 'massage',
    image: '/images/services/traditional-massage.jpg',
    gallery: ['/images/services/tm-1.jpg', '/images/services/tm-2.jpg'],
    durations: [60, 90, 120],
    pricing: {
      '60': { USD: 45, NPR: 6000 },
      '90': { USD: 65, NPR: 8700 },
      '120': { USD: 85, NPR: 11350 }
    } as Record<string, Record<string, number>>,
    benefits: [
      'Relieves muscle tension and pain',
      'Improves blood circulation',
      'Reduces stress and anxiety',
      'Enhances flexibility',
      'Promotes better sleep'
    ],
    contraindications: [
      'Open wounds or skin infections',
      'Severe osteoporosis',
      'Recent surgery',
      'Pregnancy (first trimester)'
    ],
    before_care: [
      'Avoid heavy meals 2 hours before',
      'Stay hydrated',
      'Inform therapist of any medical conditions'
    ],
    after_care: [
      'Drink plenty of water',
      'Avoid strenuous activity for 2 hours',
      'Take a warm bath to enhance benefits'
    ],
    is_featured: true,
    sort_order: 1
  },
  {
    id: 2,
    name: 'Ayurvedic Shirodhara',
    slug: 'ayurvedic-shirodhara',
    description: 'A deeply relaxing treatment where warm herbal oil is poured in a continuous stream over the forehead.',
    full_description: 'Shirodhara is one of the most profound and relaxing Ayurvedic treatments. Warm herbal oil is poured in a gentle, continuous stream over the forehead, specifically targeting the third eye area. This therapy calms the nervous system, reduces anxiety, and promotes deep mental clarity.',
    category: 'ayurveda',
    image: '/images/services/shirodhara.jpg',
    durations: [45, 60],
    pricing: {
      '45': { USD: 55, NPR: 7350 },
      '60': { USD: 75, NPR: 10000 }
    } as Record<string, Record<string, number>>,
    benefits: [
      'Deep relaxation and stress relief',
      'Improves mental clarity',
      'Helps with insomnia',
      'Balances the nervous system',
      'Enhances meditation practice'
    ],
    is_featured: true,
    sort_order: 2
  },
  {
    id: 3,
    name: 'Deep Tissue Massage',
    slug: 'deep-tissue-massage',
    description: 'Intensive massage targeting deeper layers of muscle tissue to relieve chronic pain and tension.',
    full_description: 'Our Deep Tissue Massage uses firm pressure and slow strokes to reach deeper layers of muscle and fascia. This therapeutic massage is ideal for chronic aches, muscle tightness, and injury recovery.',
    category: 'massage',
    image: '/images/services/deep-tissue.jpg',
    durations: [60, 90, 120],
    pricing: {
      '60': { USD: 55, NPR: 7350 },
      '90': { USD: 80, NPR: 10700 },
      '120': { USD: 105, NPR: 14000 }
    } as Record<string, Record<string, number>>,
    benefits: [
      'Relieves chronic muscle pain',
      'Breaks down scar tissue',
      'Improves posture',
      'Increases range of motion',
      'Reduces inflammation'
    ],
    is_featured: false,
    sort_order: 3
  },
  {
    id: 4,
    name: 'Aromatherapy Massage',
    slug: 'aromatherapy-massage',
    description: 'Gentle massage using essential oils to promote relaxation and emotional well-being.',
    full_description: 'Our Aromatherapy Massage combines the power of touch with the therapeutic properties of essential oils. Choose from our selection of custom-blended oils to address your specific needs, whether it\'s relaxation, energy, or balance.',
    category: 'massage',
    image: '/images/services/aromatherapy.jpg',
    durations: [60, 90],
    pricing: {
      '60': { USD: 50, NPR: 6700 },
      '90': { USD: 70, NPR: 9350 }
    } as Record<string, Record<string, number>>,
    benefits: [
      'Reduces stress and anxiety',
      'Improves mood',
      'Enhances relaxation',
      'Boosts immune system',
      'Relieves headaches'
    ],
    is_featured: true,
    sort_order: 4
  },
  {
    id: 5,
    name: 'Hot Stone Therapy',
    slug: 'hot-stone-therapy',
    description: 'Smooth heated stones are placed on key points of the body to melt away tension.',
    full_description: 'Hot Stone Therapy uses smooth, heated basalt stones placed on specific points of the body. The heat penetrates deep into muscles, promoting profound relaxation and easing muscle stiffness.',
    category: 'massage',
    image: '/images/services/hot-stone.jpg',
    durations: [75, 90],
    pricing: {
      '75': { USD: 70, NPR: 9350 },
      '90': { USD: 85, NPR: 11350 }
    } as Record<string, Record<string, number>>,
    benefits: [
      'Deep muscle relaxation',
      'Improves circulation',
      'Reduces stress',
      'Relieves pain',
      'Promotes better sleep'
    ],
    is_featured: false,
    sort_order: 5
  },
  {
    id: 6,
    name: 'Herbal Facial Treatment',
    slug: 'herbal-facial',
    description: 'Natural facial using traditional Ayurvedic herbs and ingredients for glowing skin.',
    full_description: 'Our Herbal Facial Treatment uses pure Ayurvedic herbs, natural clays, and essential oils to cleanse, exfoliate, and nourish your skin. This treatment is customized to your skin type for optimal results.',
    category: 'beauty',
    image: '/images/services/herbal-facial.jpg',
    durations: [60, 90],
    pricing: {
      '60': { USD: 55, NPR: 7350 },
      '90': { USD: 75, NPR: 10000 }
    } as Record<string, Record<string, number>>,
    benefits: [
      'Deep cleansing',
      'Natural skin rejuvenation',
      'Reduces fine lines',
      'Improves skin tone',
      'Hydrates and nourishes'
    ],
    is_featured: false,
    sort_order: 6
  }
]

export const practitioners = [
  {
    id: 1,
    employee_code: 'TSP001',
    name: 'Sunita Sharma',
    bio: 'Certified Ayurvedic therapist with 12 years of experience in traditional healing practices.',
    full_bio: 'Sunita Sharma is a highly skilled Ayurvedic therapist who has dedicated over a decade to mastering traditional Nepali and Ayurvedic healing techniques. Trained at the prestigious Ayurveda Campus in Kathmandu, she specializes in Shirodhara, Abhyanga, and therapeutic massage. Her gentle yet effective approach has earned her a loyal following among both local and international clients.',
    years_experience: 12,
    specialties: ['Ayurvedic Treatments', 'Shirodhara', 'Traditional Massage'],
    certifications: ['Bachelor of Ayurvedic Medicine', 'Certified Massage Therapist', 'Yoga Instructor'],
    languages_spoken: ['English', 'Nepali', 'Hindi'],
    gender: 'female',
    rating: 4.9,
    total_reviews: 328,
    is_available: true,
    photo: '/images/practitioners/sunita.jpg',
    services: [1, 2, 4]
  },
  {
    id: 2,
    employee_code: 'TSP002',
    name: 'Rajesh Gurung',
    bio: 'Expert deep tissue and sports massage therapist with international training.',
    full_bio: 'Rajesh Gurung brings world-class expertise to Thamel Spa, having trained in Thailand, India, and Switzerland. His specialization in deep tissue and sports massage makes him the go-to therapist for athletes and those with chronic pain conditions. Rajesh combines Eastern wisdom with Western techniques for optimal results.',
    years_experience: 8,
    specialties: ['Deep Tissue', 'Sports Massage', 'Trigger Point Therapy'],
    certifications: ['ITEC Level 3 Massage', 'Sports Massage Certification', 'Thai Massage Master'],
    languages_spoken: ['English', 'Nepali', 'Hindi', 'Thai'],
    gender: 'male',
    rating: 4.8,
    total_reviews: 256,
    is_available: true,
    photo: '/images/practitioners/rajesh.jpg',
    services: [3, 5]
  },
  {
    id: 3,
    employee_code: 'TSP003',
    name: 'Pooja Rai',
    bio: 'Skilled aromatherapist and relaxation specialist with a calming touch.',
    full_bio: 'Pooja Rai is known for her intuitive understanding of essential oils and her ability to create deeply relaxing experiences. Certified in clinical aromatherapy, she customizes each treatment to address both physical and emotional needs. Her clients often describe her sessions as transformative.',
    years_experience: 6,
    specialties: ['Aromatherapy', 'Swedish Massage', 'Relaxation Therapy'],
    certifications: ['Clinical Aromatherapy', 'Swedish Massage', 'Reflexology'],
    languages_spoken: ['English', 'Nepali', 'Hindi'],
    gender: 'female',
    rating: 4.9,
    total_reviews: 198,
    is_available: true,
    photo: '/images/practitioners/pooja.jpg',
    services: [4, 6]
  },
  {
    id: 4,
    employee_code: 'TSP004',
    name: 'Mohan Thapa',
    bio: 'Master therapist specializing in hot stone therapy and energy healing.',
    full_bio: 'Mohan Thapa has spent 15 years perfecting his craft in hot stone therapy and energy work. Trained in both Nepal and Hawaii, he brings a unique blend of Himalayan and Polynesian healing traditions to his practice. His sessions are deeply grounding and restorative.',
    years_experience: 15,
    specialties: ['Hot Stone Therapy', 'Energy Healing', 'Chakra Balancing'],
    certifications: ['Hot Stone Master', 'Reiki Master', 'Crystal Healing'],
    languages_spoken: ['English', 'Nepali'],
    gender: 'male',
    rating: 4.7,
    total_reviews: 412,
    is_available: true,
    photo: '/images/practitioners/mohan.jpg',
    services: [5, 1]
  },
  {
    id: 5,
    employee_code: 'TSP005',
    name: 'Anjali Karki',
    bio: 'Beauty and wellness expert specializing in facial treatments and skin care.',
    full_bio: 'Anjali Karki is our lead beauty therapist with expertise in both traditional and modern skincare techniques. She has trained in Korea and India, bringing the best of Asian beauty secrets to our spa. Her facial treatments are legendary among our clientele.',
    years_experience: 7,
    specialties: ['Facial Treatments', 'Skin Care', 'Natural Beauty'],
    certifications: ['Diploma in Beauty Therapy', 'Korean Skincare Specialist', 'Herbal Formulation'],
    languages_spoken: ['English', 'Nepali', 'Hindi', 'Korean'],
    gender: 'female',
    rating: 4.8,
    total_reviews: 167,
    is_available: true,
    photo: '/images/practitioners/anjali.jpg',
    services: [6, 4]
  },
  {
    id: 6,
    employee_code: 'TSP006',
    name: 'Bikash Tamang',
    bio: 'Traditional healer trained in ancient Tibetan and Nepali massage techniques.',
    full_bio: 'Bikash Tamang comes from a family of traditional healers and has been practicing since his teenage years. His knowledge of Tibetan and ancient Nepali massage techniques is unparalleled. He is particularly sought after for his therapeutic treatments for chronic conditions.',
    years_experience: 20,
    specialties: ['Traditional Healing', 'Tibetan Massage', 'Therapeutic Treatments'],
    certifications: ['Traditional Healing Certification', 'Tibetan Medicine Basics'],
    languages_spoken: ['English', 'Nepali', 'Tibetan'],
    gender: 'male',
    rating: 4.9,
    total_reviews: 534,
    is_available: true,
    photo: '/images/practitioners/bikash.jpg',
    services: [1, 2, 3]
  }
]

export const packages = [
  {
    id: 1,
    name: 'Couples Retreat',
    slug: 'couples-retreat',
    description: 'A romantic spa experience for two, including side-by-side massages and private relaxation time.',
    type: 'couple',
    services: ['Traditional Nepali Massage', 'Aromatherapy Session'],
    duration_days: 1,
    original_price: 180,
    discounted_price: 150,
    currency: 'USD',
    inclusions: [
      '90-minute couples massage',
      'Private jacuzzi session',
      'Champagne and fruits',
      'Rose petal bath setup'
    ],
    image: '/images/packages/couples-retreat.jpg',
    is_featured: true
  },
  {
    id: 2,
    name: '3-Day Wellness Journey',
    slug: 'wellness-journey',
    description: 'Comprehensive wellness program designed to detoxify, rejuvenate, and restore balance.',
    type: 'multi_day',
    services: ['Ayurvedic Consultation', 'Daily Massage', 'Yoga Sessions'],
    duration_days: 3,
    original_price: 450,
    discounted_price: 380,
    currency: 'USD',
    inclusions: [
      'Daily 90-minute massage',
      'Ayurvedic consultation',
      'Yoga and meditation sessions',
      'Healthy meals',
      'Herbal supplements'
    ],
    image: '/images/packages/wellness-journey.jpg',
    is_featured: true
  },
  {
    id: 3,
    name: 'Trekker Recovery Package',
    slug: 'trekker-recovery',
    description: 'Specially designed for trekkers returning from the mountains.',
    type: 'seasonal',
    services: ['Deep Tissue Massage', 'Foot Reflexology', 'Hot Stone Therapy'],
    duration_days: 1,
    original_price: 120,
    discounted_price: 95,
    currency: 'USD',
    inclusions: [
      '2-hour deep tissue massage',
      'Foot reflexology session',
      'Hot stone therapy',
      'Herbal tea service'
    ],
    image: '/images/packages/trekker-recovery.jpg',
    is_featured: true
  },
  {
    id: 4,
    name: 'Hotel Guest Special',
    slug: 'hotel-guest-special',
    description: 'Exclusive offer for guests of our partner hotels.',
    type: 'hotel_guest',
    services: ['Traditional Massage', 'Facial Treatment'],
    duration_days: 1,
    original_price: 100,
    discounted_price: 75,
    currency: 'USD',
    inclusions: [
      '60-minute traditional massage',
      '30-minute express facial',
      'Complimentary pick-up'
    ],
    image: '/images/packages/hotel-special.jpg',
    is_featured: false
  }
]

export const testimonials = [
  {
    id: 1,
    client_name: 'Sarah Johnson',
    nationality: 'United States',
    avatar: '/images/testimonials/sarah.jpg',
    rating: 5,
    review_text: 'Absolutely incredible experience! The Traditional Nepali Massage was exactly what I needed after trekking. Sunita was amazing and really understood where I needed attention.',
    service_name: 'Traditional Nepali Massage',
    is_featured: true
  },
  {
    id: 2,
    client_name: 'Michael Chen',
    nationality: 'Singapore',
    avatar: '/images/testimonials/michael.jpg',
    rating: 5,
    review_text: 'Best spa experience in Kathmandu. The Shirodhara treatment put me in such a deep state of relaxation. Highly recommend!',
    service_name: 'Ayurvedic Shirodhara',
    is_featured: true
  },
  {
    id: 3,
    client_name: 'Emma Williams',
    nationality: 'United Kingdom',
    avatar: '/images/testimonials/emma.jpg',
    rating: 5,
    review_text: 'My husband and I did the Couples Retreat package for our anniversary. It was magical! The staff went above and beyond to make it special.',
    service_name: 'Couples Retreat',
    is_featured: true
  },
  {
    id: 4,
    client_name: 'Hans Mueller',
    nationality: 'Germany',
    avatar: '/images/testimonials/hans.jpg',
    rating: 5,
    review_text: 'Professional, clean, and authentic. Rajesh helped fix my back pain that I had for months. Will definitely return!',
    service_name: 'Deep Tissue Massage',
    is_featured: false
  },
  {
    id: 5,
    client_name: 'Yuki Tanaka',
    nationality: 'Japan',
    avatar: '/images/testimonials/yuki.jpg',
    rating: 5,
    review_text: 'The attention to detail and hygiene standards are excellent. The aromatherapy massage was heavenly.',
    service_name: 'Aromatherapy Massage',
    is_featured: false
  }
]

export const faqs = [
  {
    id: 1,
    question: 'Do I need to make a reservation?',
    answer: 'While walk-ins are welcome, we highly recommend making a reservation to ensure availability, especially during peak hours and weekends. You can book online, via WhatsApp, or by calling us directly.',
    category: 'booking'
  },
  {
    id: 2,
    question: 'What is your cancellation policy?',
    answer: 'We understand plans can change. We offer free cancellation up to 24 hours before your appointment. Cancellations within 24 hours may incur a 50% charge. No-shows will be charged the full amount.',
    category: 'cancellation'
  },
  {
    id: 3,
    question: 'Do you accept international credit cards?',
    answer: 'Yes, we accept all major international credit cards including Visa, MasterCard, and American Express. We also accept cash in NPR, USD, EUR, and GBP.',
    category: 'payment'
  },
  {
    id: 4,
    question: 'Is it safe for solo female travelers?',
    answer: 'Absolutely. We prioritize the safety and comfort of all our guests. We have female therapists available, private treatment rooms with secure locks, and our staff is trained to ensure a safe environment.',
    category: 'international'
  },
  {
    id: 5,
    question: 'What hygiene measures do you follow?',
    answer: 'We maintain the highest hygiene standards. All linens are changed after each client, rooms are sanitized between treatments, therapists follow strict hand hygiene protocols, and we use only sterilized equipment.',
    category: 'hygiene'
  },
  {
    id: 6,
    question: 'Can I choose my therapist?',
    answer: 'Yes, you can request a specific therapist when booking. However, availability depends on their schedule. If your preferred therapist is unavailable, we will suggest someone with similar expertise.',
    category: 'services'
  },
  {
    id: 7,
    question: 'Do you offer hotel pick-up?',
    answer: 'Yes, we offer complimentary pick-up and drop-off for guests staying at our partner hotels in the Thamel area. Please mention this when booking.',
    category: 'international'
  },
  {
    id: 8,
    question: 'What should I wear?',
    answer: 'We provide disposable undergarments and robes for your treatment. You can undress to your comfort level. Our therapists are trained to ensure your privacy and modesty at all times.',
    category: 'services'
  }
]

export const galleryImages = [
  { id: 1, category: 'interior', image: '/images/gallery/interior-1.jpg', title: 'Reception Area' },
  { id: 2, category: 'interior', image: '/images/gallery/interior-2.jpg', title: 'Relaxation Lounge' },
  { id: 3, category: 'treatment_rooms', image: '/images/gallery/room-1.jpg', title: 'VIP Treatment Room' },
  { id: 4, category: 'treatment_rooms', image: '/images/gallery/room-2.jpg', title: 'Couples Suite' },
  { id: 5, category: 'treatment_rooms', image: '/images/gallery/room-3.jpg', title: 'Ayurvedic Room' },
  { id: 6, category: 'hygiene', image: '/images/gallery/hygiene-1.jpg', title: 'Sterilization Station' },
  { id: 7, category: 'hygiene', image: '/images/gallery/hygiene-2.jpg', title: 'Fresh Linens' },
  { id: 8, category: 'team', image: '/images/gallery/team-1.jpg', title: 'Our Team' },
  { id: 9, category: 'team', image: '/images/gallery/team-2.jpg', title: 'Therapist Training' },
]

export const businessHours = [
  { day: 'monday', is_open: true, open_time: '09:00', close_time: '21:00' },
  { day: 'tuesday', is_open: true, open_time: '09:00', close_time: '21:00' },
  { day: 'wednesday', is_open: true, open_time: '09:00', close_time: '21:00' },
  { day: 'thursday', is_open: true, open_time: '09:00', close_time: '21:00' },
  { day: 'friday', is_open: true, open_time: '09:00', close_time: '21:00' },
  { day: 'saturday', is_open: true, open_time: '09:00', close_time: '22:00' },
  { day: 'sunday', is_open: true, open_time: '09:00', close_time: '22:00' },
]
