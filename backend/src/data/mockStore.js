const SAMPLE_PRODUCTS = [
  {
    _id: 'prod-1',
    name: 'Minimalist Desk Lamp',
    price: 89.0,
    rating: 4.8,
    category: 'Home & Kitchen',
    availability: true,
    image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
    description: 'A warm, focused desk lamp with low-energy LED output and matte aluminum finish.',
    createdAt: '2026-01-03T10:00:00.000Z'
  },
  {
    _id: 'prod-2',
    name: 'Wireless Noise-Canceling Headphones',
    price: 219.0,
    rating: 4.9,
    category: 'Electronics',
    availability: true,
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    description: 'Over-ear comfort, deep bass, and adaptive noise cancelation for work and travel.',
    createdAt: '2026-01-05T12:00:00.000Z'
  },
  {
    _id: 'prod-3',
    name: 'Smart Fitness Watch',
    price: 149.0,
    rating: 4.6,
    category: 'Sports & Fitness',
    availability: true,
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    description: 'Track steps, heart rate, sleep quality, and workouts with a 7-day battery.',
    createdAt: '2026-01-06T15:00:00.000Z'
  },
  {
    _id: 'prod-4',
    name: 'Ceramic Pour-Over Coffee Set',
    price: 59.0,
    rating: 4.5,
    category: 'Food & Beverages',
    availability: true,
    image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
    description: 'Manual brew set crafted for clean extraction and richer coffee flavor.',
    createdAt: '2026-01-07T09:00:00.000Z'
  },
  {
    _id: 'prod-5',
    name: 'Ergonomic Office Chair',
    price: 299.0,
    rating: 4.7,
    category: 'Home & Kitchen',
    availability: true,
    image_url: 'https://images.unsplash.com/photo-1505798577917-a65157d3320a?auto=format&fit=crop&w=900&q=80',
    description: 'Lumbar support and breathable mesh built for all-day posture and comfort.',
    createdAt: '2026-01-08T08:30:00.000Z'
  },
  {
    _id: 'prod-6',
    name: 'Mechanical Keyboard',
    price: 129.0,
    rating: 4.8,
    category: 'Electronics',
    availability: true,
    image_url: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80',
    description: 'Hot-swappable switches, tactile feel, and compact layout for productivity.',
    createdAt: '2026-01-10T11:00:00.000Z'
  },
  {
    _id: 'prod-7',
    name: 'Hydrating Skin Care Kit',
    price: 74.0,
    rating: 4.4,
    category: 'Beauty & Personal Care',
    availability: true,
    image_url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80',
    description: 'Daily cleanser, serum, and moisturizer routine for balanced skin health.',
    createdAt: '2026-01-11T10:00:00.000Z'
  },
  {
    _id: 'prod-8',
    name: 'Minimal Leather Backpack',
    price: 179.0,
    rating: 4.6,
    category: 'Accessories',
    availability: true,
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    description: 'Sleek profile with padded laptop sleeve and weather-resistant exterior.',
    createdAt: '2026-01-12T14:30:00.000Z'
  },
  {
    _id: 'prod-9',
    name: 'Resistance Bands Pack',
    price: 34.0,
    rating: 4.3,
    category: 'Sports & Fitness',
    availability: true,
    image_url: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=80',
    description: 'Five-level resistance set for home workouts, mobility, and rehab.',
    createdAt: '2026-01-14T07:50:00.000Z'
  },
  {
    _id: 'prod-10',
    name: 'Bamboo Notebook Set',
    price: 24.0,
    rating: 4.2,
    category: 'Books & Stationery',
    availability: true,
    image_url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
    description: 'Eco-friendly ruled pages with premium paper for writing and journaling.',
    createdAt: '2026-01-15T12:10:00.000Z'
  },
  {
    _id: 'prod-11',
    name: 'Children Puzzle Set',
    price: 39.0,
    rating: 4.5,
    category: 'Toys & Games',
    availability: true,
    image_url: 'https://images.unsplash.com/photo-1616486701797-0f33f61038e1?auto=format&fit=crop&w=900&q=80',
    description: 'Colorful logic puzzles that help kids build focus and problem-solving skills.',
    createdAt: '2026-01-16T13:20:00.000Z'
  },
  {
    _id: 'prod-12',
    name: 'Vitamin Organizer Kit',
    price: 19.0,
    rating: 4.1,
    category: 'Health & Wellness',
    availability: true,
    image_url: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=900&q=80',
    description: 'Weekly pill organizer with labeled compartments and travel-ready case.',
    createdAt: '2026-01-17T09:40:00.000Z'
  }
];

const cartsByEmail = new Map();
const queuesByEmail = new Map();
const ordersByEmail = new Map();

const createId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;

const getCart = (email) => cartsByEmail.get(email) || [];
const setCart = (email, items) => cartsByEmail.set(email, items);

const getQueue = (email) => queuesByEmail.get(email) || [];
const setQueue = (email, items) => queuesByEmail.set(email, items);

const getOrders = (email) => ordersByEmail.get(email) || [];
const setOrders = (email, items) => ordersByEmail.set(email, items);

const getAllOrders = () => {
  const all = [];
  for (const [email, list] of ordersByEmail.entries()) {
    for (const order of list) {
      all.push({ ...order, email });
    }
  }
  return all;
};

module.exports = {
  SAMPLE_PRODUCTS,
  cartsByEmail,
  queuesByEmail,
  ordersByEmail,
  createId,
  getCart,
  setCart,
  getQueue,
  setQueue,
  getOrders,
  setOrders,
  getAllOrders,
};
