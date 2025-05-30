import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: 'Yangi organik pomidorlar',
    description: 'Mahalliy yetishtirilgan organik pomidorlar, salat va ovqat pishirish uchun juda mos. Bizning pomidorlarimiz sun’iy pestitsidlar yoki o‘g‘itlarsiz yetishtirilgan, shuning uchun siz eng sof va mazali mahsulotni olasiz. Ular eng pishgan vaqtda terib olinadi, bu esa foydalilik va mazani oshiradi.',
    price: 2.99,
    unit: 'lb',
    images: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1524593166156-312f362cada0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    seller: {
      name: 'Yashil Vodiy Fermasi',
      image: 'https://images.unsplash.com/photo-1542080681-b52d382432af?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      location: 'Riverside, Kaliforniya',
      since: 2015
    },
    category: 'Sabzavotlar',
    organic: true,
    availableQuantity: 50,
    harvestedDate: '2025-05-01',
    nutritionFacts: 'A va C vitaminlari, kaliy va likopen bilan boyitilgan.',
    relatedProducts: [2, 5, 7]
  },
  {
    id: 2,
    name: 'Fermadan yangi tuxumlar',
    description: 'Yashil yaylovlarda erkin yuradigan tovuqlardan olingan tuxumlar. Tovuqlarimiz tabiiy, organik donlar bilan oziqlanadi. Bu esa tuxumlarning sarig‘i yorqin va ta’mi alohida bo‘lishini ta’minlaydi.',
    price: 4.50,
    unit: 'dona (12 ta)',
    images: [
      'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1510130146128-7a7b6afb6f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    seller: {
      name: 'Quyoshli Tomon Ferma',
      image: 'https://images.unsplash.com/photo-1542080681-b52d382432af?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      location: 'Boulder, Kolorado',
      since: 2018
    },
    category: 'Sut mahsulotlari',
    organic: true,
    availableQuantity: 30,
    harvestedDate: '2025-05-03',
    nutritionFacts: 'Protein, D vitamini va B guruh vitaminlariga boy.',
    relatedProducts: [6, 9, 1]
  },
  {
    id: 5,
    name: 'Organik karavay',
    description: 'Pestitsidlarsiz yetishtirilgan foydali karavay. Karavayimiz ehtiyotkorlik bilan parvarish qilinadi va eng yumshoq va mazali bosqichda terib olinadi.',
    price: 2.49,
    unit: 'dasta',
    images: [
      'https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1515543904379-3d757abe3d10?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1594282486552-05a9f0a53f09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    seller: {
      name: 'Yashil Barmoqlar Bog‘i',
      image: 'https://images.unsplash.com/photo-1542080681-b52d382432af?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      location: 'Eugene, Oregon',
      since: 2016
    },
    category: 'Sabzavotlar',
    organic: true,
    availableQuantity: 25,
    harvestedDate: '2025-05-02',
    nutritionFacts: 'K, A va C vitaminlariga, antioksidantlar va tolalarga boy.',
    relatedProducts: [1, 7, 11]
  }
];


const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '1');
  
  // Find the product by ID
  const product = mockProducts.find(p => p.id === productId) || mockProducts[0];
  
  // State for quantity selector
  const [quantity, setQuantity] = useState(1);
  
  // State for selected image
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Find related products
  const relatedProducts = product.relatedProducts
    .map(id => mockProducts.find(p => p.id === id))
    .filter(p => p !== undefined);

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/app" className="text-text-secondary hover:text-primary">Bosh sahifa</Link>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li>
              <Link to="/app/products" className="text-text-secondary hover:text-primary">Mahsulotlar</Link>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li>
              <span className="text-text-primary font-medium">{product.name}</span>
            </li>
          </ol>
        </nav>
        
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product Images */}
          <div className="lg:max-w-lg lg:self-start">
            <div className="overflow-hidden rounded-lg mb-4">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-96 object-cover object-center"
              />
            </div>
            <div className="flex space-x-2 overflow-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 h-20 w-20 rounded-md overflow-hidden ${index === selectedImageIndex ? 'ring-2 ring-primary' : 'ring-1 ring-gray-200'}`}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="mt-10 lg:mt-0">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-extrabold text-text-primary">{product.name}</h1>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-primary">${product.price?.toFixed(2) || '0.00'}</span>
                  <span className="ml-2 text-text-secondary">{product.unit} uchun</span>
                </div>
              </div>
              {product.organic && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Organik
                </span>
              )}
            </div>
            
            {/* Product Description */}
            <div className="mt-6">
              <h2 className="text-lg font-medium text-text-primary">Tavsif</h2>
              <div className="mt-2 space-y-4 text-text-secondary">
                <p>{product.description}</p>
              </div>
            </div>
            
            {/* Product Details */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-lg font-medium text-text-primary">Tafsilotlar</h2>
              <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span className="ml-2 text-text-secondary">Kategoriya: {product.category}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="ml-2 text-text-secondary">Yig'ilgan sana: {product.harvestedDate}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                  <span className="ml-2 text-text-secondary">Mavjud: {product.availableQuantity} {product.unit}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="ml-2 text-text-secondary">Ozuqaviy qiymati: {product.nutritionFacts}</span>
                </div>
              </div>
            </div>
            
            {/* Seller Information */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-lg font-medium text-text-primary">Sotuvchi haqida ma'lumot</h2>
              <div className="mt-4 flex items-center">
                <img
                  src={product.seller.image}
                  alt={product.seller.name}
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-base font-medium text-text-primary">{product.seller.name}</h3>
                  <div className="flex items-center text-sm text-text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {product.seller.location}
                  </div>
                  <div className="text-sm text-text-secondary">{product.seller.since} yildan beri sotuvda</div>
                </div>
                <button className="ml-auto btn-secondary text-sm">
                  Sotuvchi bilan bog'lanish
                </button>
              </div>
            </div>
            
            {/* Add to Cart */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="flex items-center">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    type="button"
                    className="p-2 text-text-primary hover:text-primary"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.availableQuantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.min(product.availableQuantity, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-12 text-center border-0 focus:ring-0"
                  />
                  <button
                    type="button"
                    className="p-2 text-text-primary hover:text-primary"
                    onClick={() => setQuantity(Math.min(product.availableQuantity, quantity + 1))}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
                <span className="ml-4 text-text-secondary">
                  Jami: <span className="font-medium text-text-primary">${((product.price || 0) * quantity).toFixed(2)}</span>
                </span>
                <button className="ml-auto btn-primary">
                  Savatga qo'shish
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-text-primary">O'xshash mahsulotlar</h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((relatedProduct) => relatedProduct && (
              <div key={relatedProduct.id} className="group relative bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="w-full h-60 overflow-hidden">
                  <img
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between">
                    <h3 className="text-sm text-text-primary font-medium">
                      <Link to={`/products/${relatedProduct.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {relatedProduct.name}
                      </Link>
                    </h3>
                    <p className="text-sm font-medium text-primary">${relatedProduct.price?.toFixed(2) || '0.00'}/{relatedProduct.unit || 'unit'}</p>
                  </div>
                  <p className="mt-1 text-sm text-text-secondary line-clamp-2">{relatedProduct.description}</p>
                  <div className="mt-4 flex items-center">
                    <div className="flex-shrink-0">
                      <img className="h-8 w-8 rounded-full" src={relatedProduct.seller.image} alt={relatedProduct.seller.name} />
                    </div>
                    <p className="ml-2 text-sm text-text-secondary">{relatedProduct.seller.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
