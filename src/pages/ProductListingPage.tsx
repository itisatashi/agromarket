import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: 'Yangi Organik Pomidorlar',
    description: 'Mahalliy yetishtirilgan organik pomidorlar, salatlar va taomlar uchun juda mos.',
    price: 2.99,
    unit: 'funt',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'Yashil Vodi Qishlog‘i',
      image: 'https://images.unsplash.com/photo-1507497806-a3c9eae7e071?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    category: 'Sabzavotlar',
    organic: true,
    location: 'Riverside, Kaliforniya'
  },
  {
    id: 2,
    name: 'Fermer Tuxumlari',
    description: 'Erkin yuradigan tovuqlardan olingan yangi tuxumlar.',
    price: 4.50,
    unit: 'dona (12 ta)',
    image: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'Quyoshli Fermasi',
      image: 'https://images.unsplash.com/photo-1542080681-b52d382432af?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    category: 'Sut mahsulotlari',
    organic: true,
    location: 'Boulder, Kolorado'
  },
  {
    id: 3,
    name: 'Organik Asal',
    description: 'Mahalliy gullardan olinadigan xom va filtrlanmagan asal.',
    price: 8.99,
    unit: 'bankada',
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'Asalarilar Qal’asi',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    category: 'Boshqalar',
    organic: true,
    location: 'Portlend, Oregon'
  },
  {
    id: 4,
    name: 'Yangi Qulupnaylar',
    description: 'Eng pishgan paytda terilgan shirin va sharbali qulupnaylar.',
    price: 3.99,
    unit: 'qadoq (pint)',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'Berry Good Ferma',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    category: 'Mevalar',
    organic: true,
    location: 'Santa Kruz, Kaliforniya'
  },
  {
    id: 5,
    name: 'Organik Kale',
    description: 'Zararkunandalarga qarshi kimyoviy moddalarsiz yetishtirilgan to‘yimli kale.',
    price: 2.49,
    unit: 'bog‘lam',
    image: 'https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'Yashil Barmoqlar Bog‘i',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    category: 'Sabzavotlar',
    organic: true,
    location: 'Eugene, Oregon'
  },
  {
    id: 6,
    name: 'Qo‘ydan Tayyorlangan Pishloq',
    description: 'Mayin va nordon ta’mli, kichik partiyalarda tayyorlangan qo‘y pishlog‘i.',
    price: 6.99,
    unit: '8 oz',
    image: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'Baxtli Qo‘y Fermasi',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    category: 'Sut mahsulotlari',
    organic: true,
    location: 'Sonoma, Kaliforniya'
  },
  {
    id: 7,
    name: 'Qadimiy Sabzi',
    description: 'Turli rangdagi va mazali qadimiy sabzilar, pishirish uchun juda mos.',
    price: 3.49,
    unit: 'bog‘lam',
    image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'Kamalak Ferma',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    category: 'Sabzavotlar',
    organic: true,
    location: 'Madison, Viskonsin'
  },
  {
    id: 8,
    name: 'Yangi Pishirilgan Non',
    description: 'Har kuni yangi pishiriladigan kislotali non.',
    price: 5.99,
    unit: 'dona',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'Qishloq Non Pishiruvchilari',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    category: 'Non mahsulotlari',
    organic: false,
    location: 'Ostin, Texas'
  },
  {
    id: 9,
    name: 'Yaylov Sigir Go‘shti',
    description: 'Yaylovda boqilgan sigirlardan olingan yog‘siz mol go‘shti.',
    price: 7.99,
    unit: 'funt',
    image: 'https://images.unsplash.com/photo-1551135049-8a33b5883817?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'Yashil Yaylovlar Ferma',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    category: 'Go‘sht',
    organic: false,
    location: 'Bozeman, Montana'
  },
  {
    id: 10,
    name: 'Organik Ko‘k Mevalar',
    description: 'Zararkunandalarsiz o‘stirilgan shirin, dumaloq ko‘k mevalar.',
    price: 4.99,
    unit: 'pint',
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'Berry Patch Fermasi',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    category: 'Mevalar',
    organic: true,
    location: 'Burlington, Vermont'
  },
  {
    id: 11,
    name: 'Yangi Rayhon',
    description: 'Xushbo‘y rayhon, italyan taomlari va pesto uchun ideal.',
    price: 2.49,
    unit: 'bog‘lam',
    image: 'https://images.unsplash.com/photo-1600326145552-327c4b33f350?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'O‘simliklar Bog‘i',
      image: 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    category: 'Giyohlar',
    organic: true,
    location: 'Providens, Rod-Aylend'
  },
  {
    id: 12,
    name: 'Tabiiy Qaymoq Siropi',
    description: 'Mahalliy zarang daraxtlaridan olingan sof qaymoq siropi.',
    price: 12.99,
    unit: 'shisha',
    image: 'https://images.unsplash.com/photo-1589496933738-f5c27bc146e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'Shimoliy O‘rmon Shirinligi',
      image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    category: 'Boshqalar',
    organic: false,
    location: 'Burlington, Vermont'
  }
];


// Categories for filter
const categories = [
  'Barchasi',
  'Sabzavotlar',
  'Mevalar',
  'Sut mahsulotlari',
  'Go‘sht',
  'Non mahsulotlari',
  'Giyohlar',
  'Boshqalar'
];


const ProductListingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 20 });
  const [organicOnly, setOrganicOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  // Filter products based on search, category, price range, and organic filter
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Barchasi' || product.category === selectedCategory;
    const matchesPriceRange = product.price >= priceRange.min && product.price <= priceRange.max;
    const matchesOrganic = !organicOnly || product.organic;
    
    return matchesSearch && matchesCategory && matchesPriceRange && matchesOrganic;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    // Default: newest (by id in our mock data)
    return b.id - a.id;
  });

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-extrabold text-text-primary mb-8">Mahsulotlarni ko'rish</h1>
        
        {/* Search and Sort */}
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <input
                type="text"
                placeholder="Mahsulotlarni qidirish..."
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <select
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Eng yangi</option>
              <option value="price-low">Narx: Pastdan yuqoriga</option>
              <option value="price-high">Narx: Yuqoridan pastga</option>
            </select>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-text-primary mb-4">Filtrlar</h2>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-text-primary mb-2">Kategoriya</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`category-${category}`}
                        name="category"
                        type="radio"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label htmlFor={`category-${category}`} className="ml-3 text-sm text-text-secondary">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-text-primary mb-2">Narx oralig'i</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-text-secondary">${priceRange.min}</span>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="1"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-text-secondary">${priceRange.max}</span>
                </div>
              </div>
              
              {/* Organic Filter */}
              <div>
                <div className="flex items-center">
                  <input
                    id="organic-only"
                    name="organic-only"
                    type="checkbox"
                    checked={organicOnly}
                    onChange={() => setOrganicOnly(!organicOnly)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="organic-only" className="ml-3 text-sm text-text-secondary">
                    Faqat organik
                  </label>
                </div>
              </div>
              
              {/* Reset Filters Button */}
              <button
                className="mt-6 w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-text-primary hover:bg-gray-50"
                onClick={() => {
                  setSelectedCategory('All');
                  setPriceRange({ min: 0, max: 20 });
                  setOrganicOnly(false);
                }}
              >
                Filtrlarni tiklash
              </button>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="w-full lg:w-3/4">
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <Link to={`/app/products/${product.id}`} className="block">
                      <div className="h-48 w-full overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    </Link>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <Link to={`/app/products/${product.id}`} className="block">
                          <h3 className="text-lg font-medium text-text-primary hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <span className="text-primary font-bold">${product.price.toFixed(2)}/{product.unit}</span>
                      </div>
                      <p className="mt-1 text-sm text-text-secondary line-clamp-2">{product.description}</p>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <img className="h-8 w-8 rounded-full" src={product.seller.image} alt={product.seller.name} />
                          <span className="ml-2 text-sm text-text-secondary">{product.seller.name}</span>
                        </div>
                        {product.organic && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Organik
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-4">
                        <button className="w-full btn-primary text-center">
                          Savatga qo'shish
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-text-primary">Mahsulotlar topilmadi</h3>
                <p className="mt-2 text-text-secondary">Filtrlaringizni yoki qidiruv so'zingizni o'zgartirib ko'ring.</p>
              </div>
            )}
            
            {/* Pagination - simplified for MVP */}
            {sortedProducts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-text-secondary hover:bg-gray-50">
                    <span className="sr-only">Oldingi</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary text-sm font-medium text-white">
                    1
                  </a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-text-secondary hover:bg-gray-50">
                    2
                  </a>
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-text-secondary hover:bg-gray-50">
                    <span className="sr-only">Keyingi</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
