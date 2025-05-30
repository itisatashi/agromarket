import React, { useState } from 'react';

// Namuna mahsulot ma'lumotlari
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  unit: string;
  category: string;
  organic: boolean;
  images: string[];
  status: 'faol' | 'qabul qilinmagan' | 'qoralama';
  createdAt: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organik olmalar',
    description: 'Bogimizdan terilgan yangi organik olmalar.',
    price: 2.99,
    stock: 100,
    unit: 'kg',
    category: 'Mevalar',
    organic: true,
    images: [
      'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ],
    status: 'faol',
    createdAt: '2023-05-15T10:30:00Z',
  },
  {
    id: '3',
    name: 'Organik sabzilar',
    description: 'Yangi yigilgan organik sabzilar.',
    price: 1.99,
    stock: 75,
    unit: 'boglam',
    category: 'Sabzavotlar',
    organic: true,
    images: [
      'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ],
    status: 'qabul qilinmagan',
    createdAt: '2023-05-16T14:45:00Z',
  },
  {
    id: '5',
    name: 'Organik karam',
    description: 'Pestitsidlarsiz yetishtiriladigan foydali moddalar bilan boy karam.',
    price: 2.49,
    stock: 50,
    unit: 'boglam',
    category: 'Sabzavotlar',
    organic: true,
    images: [
      'https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ],
    status: 'faol',
    createdAt: '2023-05-14T09:15:00Z',
  },
  {
    id: '7',
    name: 'Yangi pomidorlar',
    description: 'Eng yaxshi pishgan, sersuv pomidorlar.',
    price: 3.49,
    stock: 60,
    unit: 'kg',
    category: 'Sabzavotlar',
    organic: false,
    images: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ],
    status: 'qoralama',
    createdAt: '2023-05-13T11:30:00Z',
  },
];

const FarmerProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory ? product.category === filterCategory : true;
      const matchesStatus = filterStatus ? product.status === filterStatus : true;
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'date-asc') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === 'date-desc') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0;
    });

  // Get unique categories for filter
  const categories = Array.from(new Set(products.map(product => product.category)));

  // Handle product status change
  const handleStatusChange = (productId: string, newStatus: 'faol' | 'qabul qilinmagan' | 'qoralama') => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, status: newStatus } : product
    ));
  };

  // Handle product deletion
  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Siz ushbu mahsulotni o‘chirib tashlamoqchi ekanligingizga ishonchingiz komilmi?')) {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  // Get status badge color
  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'faol':
        return 'bg-green-100 text-green-800';
      case 'qabul qilinmagan':
        return 'bg-yellow-100 text-yellow-800';
      case 'qoralama':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Mahsulotlarim</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary"
        >
          Yangi mahsulot qo'shish
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Qidirish</label>
            <input
              type="text"
              id="search"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Mahsulotlarni qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Kategoriya</label>
            <select
              id="category"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">Barcha kategoriyalar</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Barchasi</option>
              <option value="faol">Faol</option>
              <option value="qabul qilinmagan">Qabul qilinmagan</option>
              <option value="qoralama">Qoralama</option>
            </select>
          </div>
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              id="sort"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Default</option>
              <option value="name-asc">Nomi (A-Z)</option>
              <option value="name-desc">Nomi (Z-A)</option>
              <option value="price-asc">Narxi (Eng pastdan)</option>
              <option value="price-desc">Narxi (Eng pastdan)</option>
              <option value="date-asc">Qo'shilgan sana (Eng pastdan)</option>
              <option value="date-desc">Qo'shilgan sana (Eng pastdan)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products List */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h2>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(product.status)}`}>
                    {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                  </span>
                </div>
                <p className="text-primary font-medium">{product.price.toFixed(2)} so'm / {product.unit}</p>
                <p className="text-sm text-gray-500 mt-1">Stock: {product.stock} {product.unit}</p>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <select
                      value={product.status}
                      onChange={(e) => handleStatusChange(product.id, e.target.value as 'faol' | 'qabul qilinmagan' | 'qoralama')}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="faol">Faol</option>
                      <option value="qabul qilinmagan">Qabul qilinmagan</option>
                      <option value="qoralama">Qoralama</option>
                    </select>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="text-primary hover:text-primary-dark text-sm font-medium"
                    >
                      Tahrirlash
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      O'chirish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Mahsulotlar topilmadi</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterCategory || filterStatus
              ? "No products match your current filters."
              : "Get started by adding your first product."}
          </p>
          <div className="mt-6">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Yangi mahsulot qo'shish
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Product Modal would go here */}
      {/* This would be a form with fields for all product properties */}
      {/* For brevity, it's not included in this implementation */}
    </div>
  );
};

export default FarmerProductsPage;
