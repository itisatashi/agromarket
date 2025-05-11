import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon,
  MapPinIcon,
  ArrowPathIcon,
  ChevronRightIcon,
  StarIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline';

// Define interfaces for type safety
interface Seller {
  name: string;
  image: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  seller: Seller;
  organic?: boolean;
}

interface Farmer {
  id: number;
  name: string;
  distance: number;
  rating: number;
  reviewCount: number;
  image: string;
  products: number;
  specialties: string[];
}

const HomePage: React.FC = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  // Use useRef for scroll containers
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const productsScrollRef = useRef<HTMLDivElement>(null);
  const farmersScrollRef = useRef<HTMLDivElement>(null);
  
  // Pull-to-refresh functionality simulation
  const handlePullToRefresh = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };
  
  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);
  
  // Handle voice search
  const startVoiceSearch = () => {
    setIsVoiceListening(true);
    // In a real app, this would use the Web Speech API
    setTimeout(() => {
      setIsVoiceListening(false);
      setSearchQuery('organic vegetables');
    }, 2000);
  };
  
  // Mock seasonal promotions data
  const seasonalPromotions = [
    {
      id: 1,
      title: 'Summer Harvest Festival',
      description: 'Fresh picks from local farms at special prices',
      image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      discount: '20% OFF',
      endDate: 'July 30'
    },
    {
      id: 2,
      title: 'Organic Week',
      description: 'Certified organic products from trusted farmers',
      image: 'https://images.unsplash.com/photo-1470072768013-bf9532016c10?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      discount: '15% OFF',
      endDate: 'August 15'
    }
  ];
  
  // Mock product categories
  const productCategories = [
    { id: 1, name: 'Vegetables', icon: '🥦', count: 128 },
    { id: 2, name: 'Fruits', icon: '🍎', count: 93 },
    { id: 3, name: 'Dairy', icon: '🥛', count: 45 },
    { id: 4, name: 'Eggs', icon: '🥚', count: 18 },
    { id: 5, name: 'Meat', icon: '🥩', count: 37 },
    { id: 6, name: 'Honey', icon: '🍯', count: 12 },
    { id: 7, name: 'Herbs', icon: '🌿', count: 24 },
    { id: 8, name: 'Bakery', icon: '🍞', count: 31 }
  ];
  
  // Mock featured products data
  const featuredProducts: Product[] = [
    {
      id: 1,
      name: 'Fresh Organic Tomatoes',
      description: 'Locally grown organic tomatoes, perfect for salads and cooking.',
      price: 2.99,
      unit: 'lb',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      seller: {
        name: 'Green Valley Farm',
        image: 'https://images.unsplash.com/photo-1507497806-a3c9eae7e071?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      organic: true
    },
    {
      id: 2,
      name: 'Farm Fresh Eggs',
      description: 'Free-range eggs from pasture-raised chickens.',
      price: 4.50,
      unit: 'dozen',
      image: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      seller: {
        name: 'Sunny Side Farm',
        image: 'https://images.unsplash.com/photo-1542080681-b52d382432af?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      organic: false
    },
    {
      id: 3,
      name: 'Organic Honey',
      description: 'Raw, unfiltered honey from local wildflowers.',
      price: 8.99,
      unit: 'jar',
      image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      seller: {
        name: 'Bee Haven Apiaries',
        image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      organic: true
    },
    {
      id: 4,
      name: 'Fresh Strawberries',
      description: 'Sweet, juicy strawberries picked at peak ripeness.',
      price: 3.99,
      unit: 'pint',
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      seller: {
        name: 'Berry Good Farm',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      organic: true
    },
    {
      id: 5,
      name: 'Organic Kale',
      description: 'Nutrient-dense kale grown without pesticides.',
      price: 2.49,
      unit: 'bunch',
      image: 'https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      seller: {
        name: 'Green Thumb Gardens',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      organic: true
    },
    {
      id: 6,
      name: 'Artisanal Goat Cheese',
      description: 'Creamy, tangy goat cheese made in small batches.',
      price: 6.99,
      unit: '8 oz',
      image: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      seller: {
        name: 'Happy Goat Dairy',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      organic: false
    }
  ];

  // Mock farmers near you data
  const nearbyFarmers: Farmer[] = [
    {
      id: 1,
      name: 'Green Valley Farm',
      distance: 2.3, // miles
      rating: 4.8,
      reviewCount: 124,
      image: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      products: 32,
      specialties: ['Organic Vegetables', 'Fruits']
    },
    {
      id: 5,
      name: 'Fresh Leaf Gardens',
      distance: 1.9,
      rating: 4.7,
      reviewCount: 182,
      image: 'https://images.unsplash.com/photo-1582515073490-39981397c445?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      products: 28,
      specialties: ['Herbs', 'Leafy Greens']
    },
    {
      id: 3,
      name: 'Hillside Dairy',
      distance: 4.2,
      rating: 4.9,
      reviewCount: 156,
      image: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      products: 24,
      specialties: ['Dairy', 'Cheese']
    },
    {
      id: 4,
      name: 'Honey Haven Apiary',
      distance: 5.1,
      rating: 4.7,
      reviewCount: 72,
      image: 'https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      products: 15,
      specialties: ['Honey', 'Beeswax Products']
    }
  ];
  
  // Mock recently viewed products
  const recentlyViewedProducts: Product[] = [
    {
      id: 10,
      name: 'Organic Spinach',
      description: 'Fresh organic spinach grown without pesticides',
      price: 2.49,
      unit: 'bunch',
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      seller: {
        name: 'Green Valley Farm',
        image: 'https://images.unsplash.com/photo-1542080681-b52d382432af?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      }
    },
    {
      id: 11,
      name: 'Grass-Fed Beef',
      description: 'Premium grass-fed beef from free-range cattle',
      price: 12.99,
      unit: 'lb',
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      seller: {
        name: 'Highland Ranch',
        image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      }
    },
    {
      id: 12,
      name: 'Artisanal Cheese',
      description: 'Handcrafted cheese using traditional methods',
      price: 8.99,
      unit: 'piece',
      image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      seller: {
        name: 'Hillside Dairy',
        image: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      }
    }
  ];
  

  return (
    <div className="bg-background pb-16">
      {/* Pull-to-refresh indicator */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center py-2 bg-white shadow">
          <ArrowPathIcon className="w-5 h-5 text-primary animate-spin" />
          <span className="ml-2 text-primary font-medium text-sm">Refreshing...</span>
        </div>
      )}

      {/* Hero Section with Seasonal Promotions */}
      <div className="relative overflow-hidden">
        <div className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide">
          {seasonalPromotions.map((promo) => (
            <div key={promo.id} className="snap-center shrink-0 w-full">
              <div className="relative h-56 md:h-72 w-screen max-w-full">
                <img 
                  src={promo.image} 
                  alt={promo.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-end p-6">
                  <div className="bg-accent text-white text-xs font-bold px-2 py-1 rounded-full w-fit mb-2">
                    {promo.discount} • Ends {promo.endDate}
                  </div>
                  <h1 className="text-2xl font-bold text-white mb-1">{promo.title}</h1>
                  <p className="text-white/90 text-sm mb-3">{promo.description}</p>
                  <Link 
                    to="/app/products" 
                    className="bg-white text-primary font-bold py-2 px-4 mb-2 rounded-full w-fit hover:bg-gray-100 transition duration-300"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
          {seasonalPromotions.map((_, index) => (
            <div key={index} className={`h-1.5 w-1.5 rounded-full ${index === 0 ? 'bg-white' : 'bg-white/50'}`}></div>
          ))}
        </div>
      </div>
      
      {/* Search Bar with Voice Input */}
      <div className="px-4 -mt-6 mb-6 relative z-10">
        <div className={`relative flex items-center bg-white rounded-full shadow-lg ${isSearchFocused ? 'ring-2 ring-primary' : ''}`}>
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 ml-4" />
          <input
            type="text"
            placeholder="Search for fresh products..."
            className="flex-grow py-3 px-2 rounded-full focus:outline-none text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </div>
      </div>

      {/* Product Categories with Horizontal Scrolling */}
      <div className="mb-8 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Categories</h2>
          <Link to="/app/products" className="text-primary text-sm font-medium flex items-center">
            View All <ChevronRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div 
          className="flex overflow-x-auto pb-4 scrollbar-hide gap-3"
          ref={categoryScrollRef}
        >
          {productCategories.map((category) => (
            <Link 
              key={category.id} 
              to={`/app/products?category=${category.name.toLowerCase()}`}
              className="flex-shrink-0 flex flex-col items-center justify-center bg-white rounded-lg shadow-sm p-4 w-24 h-24 border border-gray-100"
            >
              <span className="text-2xl mb-2">{category.icon}</span>
              <span className="text-sm font-medium text-gray-800">{category.name}</span>
              <span className="text-xs text-gray-500">{category.count} items</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="mb-8 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Featured Products</h2>
          <Link to="/app/products" className="text-primary text-sm font-medium flex items-center">
            View All <ChevronRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div 
          className="flex overflow-x-auto pb-4 scrollbar-hide gap-4"
          ref={productsScrollRef}
        >
          {featuredProducts.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm overflow-hidden">
              <Link to={`/app/products/${product.id}`} className="block">
                <div className="h-40 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                  {product.organic && (
                    <div className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                      Organic
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-1 truncate">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <img 
                      src={product.seller.image} 
                      alt={product.seller.name} 
                      className="w-5 h-5 rounded-full mr-1"
                    />
                    <span className="text-xs text-gray-500">{product.seller.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-bold">${product.price.toFixed(2)}/{product.unit}</span>
                    <button className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition">
                      <ShoppingCartIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Farmers Near You */}
      <div className="mb-8 px-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h2 className="text-lg font-bold text-gray-800 mr-2">Farmers Near You</h2>
            <MapPinIcon className="w-5 h-5 text-primary" />
          </div>
          <Link to="/app/farmers" className="text-primary text-sm font-medium flex items-center">
            View All <ChevronRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div 
          className="flex overflow-x-auto pb-4 scrollbar-hide gap-4"
          ref={farmersScrollRef}
        >
          {nearbyFarmers.map((farmer) => (
            <div key={farmer.id} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm overflow-hidden">
              <Link to={`/app/farmers/${farmer.id}`} className="block">
                <div className="h-32 overflow-hidden">
                  <img 
                    src={farmer.image} 
                    alt={farmer.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-1">{farmer.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <StarIcon className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-700 ml-1">{farmer.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({farmer.reviewCount})</span>
                    </div>
                    <div className="ml-auto flex items-center text-sm text-gray-500">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      <span>{farmer.distance} mi</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {farmer.specialties.map((specialty, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{farmer.products} products</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Viewed Products */}
      <div className="mb-8 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Recently Viewed</h2>
          <button className="text-gray-400 text-sm">
            Clear
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recentlyViewedProducts.map((product) => (
            <div key={product.id} className="flex bg-white rounded-lg shadow-sm overflow-hidden">
              <Link to={`/app/products/${product.id}`} className="flex w-full">
                <div className="w-1/3 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-3">
                  <h3 className="font-medium text-gray-800 text-sm mb-1 truncate">{product.name}</h3>
                  <div className="flex items-center mb-1">
                    <img 
                      src={product.seller.image} 
                      alt={product.seller.name} 
                      className="w-4 h-4 rounded-full mr-1"
                    />
                    <span className="text-xs text-gray-500">{product.seller.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-bold text-sm">${product.price.toFixed(2)}/{product.unit}</span>
                    <button className="p-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition">
                      <ShoppingCartIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
