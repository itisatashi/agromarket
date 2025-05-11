import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock product data
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  farmerId: string;
  farmerName: string;
  status: 'active' | 'pending' | 'rejected';
  description: string;
  imageUrl: string;
  createdAt: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Apples',
    category: 'Fruits',
    price: 2.99,
    stock: 100,
    farmerId: 'f1',
    farmerName: 'Green Valley Farm',
    status: 'active',
    description: 'Fresh organic apples picked from our orchard.',
    imageUrl: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    createdAt: '2023-05-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Farm Fresh Eggs',
    category: 'Dairy & Eggs',
    price: 4.50,
    stock: 50,
    farmerId: 'f2',
    farmerName: 'Sunrise Poultry',
    status: 'active',
    description: 'Free-range eggs from pasture-raised chickens.',
    imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    createdAt: '2023-05-14T08:15:00Z',
  },
  {
    id: '3',
    name: 'Organic Carrots',
    category: 'Vegetables',
    price: 1.99,
    stock: 75,
    farmerId: 'f1',
    farmerName: 'Green Valley Farm',
    status: 'pending',
    description: 'Freshly harvested organic carrots.',
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    createdAt: '2023-05-16T14:45:00Z',
  },
  {
    id: '4',
    name: 'Artisanal Cheese',
    category: 'Dairy & Eggs',
    price: 8.99,
    stock: 25,
    farmerId: 'f3',
    farmerName: 'Hillside Dairy',
    status: 'active',
    description: 'Hand-crafted artisanal cheese made from local milk.',
    imageUrl: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    createdAt: '2023-05-13T11:20:00Z',
  },
  {
    id: '5',
    name: 'Organic Honey',
    category: 'Other',
    price: 7.50,
    stock: 30,
    farmerId: 'f4',
    farmerName: 'Bee Haven Apiary',
    status: 'rejected',
    description: 'Pure, raw honey from our local beehives.',
    imageUrl: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    createdAt: '2023-05-12T09:10:00Z',
  },
];

const AdminProductManagementPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
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

  // Handle product status change
  const handleStatusChange = (productId: string, newStatus: 'active' | 'pending' | 'rejected') => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, status: newStatus } : product
    ));
  };

  // Handle product deletion
  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  // Open product details modal
  const openProductModal = (product: Product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  // Get unique categories for filter
  const categories = Array.from(new Set(products.map(product => product.category)));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
        <Link 
          to="/admin-dashboard" 
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              id="search"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Search by name or farmer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              id="category"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
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
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
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
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="date-asc">Date Added (Oldest)</option>
              <option value="date-desc">Date Added (Newest)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded-full object-cover" src={product.imageUrl} alt={product.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.farmerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${product.status === 'active' ? 'bg-green-100 text-green-800' : 
                          product.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => openProductModal(product)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        View
                      </button>
                      <div className="inline-block relative">
                        <select
                          value={product.status}
                          onChange={(e) => handleStatusChange(product.id, e.target.value as 'active' | 'pending' | 'rejected')}
                          className="text-sm border border-gray-300 rounded px-2 py-1 mr-3"
                        >
                          <option value="active">Active</option>
                          <option value="pending">Pending</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No products found matching the criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Details Modal */}
      {isModalOpen && currentProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={currentProduct.imageUrl} 
                    alt={currentProduct.name} 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{currentProduct.name}</h2>
                  <p className="text-gray-600 mb-4">{currentProduct.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium">{currentProduct.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-medium">${currentProduct.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Stock</p>
                      <p className="font-medium">{currentProduct.stock} units</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className={`font-medium ${
                        currentProduct.status === 'active' ? 'text-green-600' : 
                        currentProduct.status === 'pending' ? 'text-yellow-600' : 
                        'text-red-600'
                      }`}>
                        {currentProduct.status.charAt(0).toUpperCase() + currentProduct.status.slice(1)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">Farmer</p>
                    <p className="font-medium">{currentProduct.farmerName}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Added On</p>
                    <p className="font-medium">
                      {new Date(currentProduct.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded mr-2"
              >
                Close
              </button>
              <select
                value={currentProduct.status}
                onChange={(e) => {
                  handleStatusChange(currentProduct.id, e.target.value as 'active' | 'pending' | 'rejected');
                  setCurrentProduct({...currentProduct, status: e.target.value as 'active' | 'pending' | 'rejected'});
                }}
                className="border border-gray-300 rounded px-3 py-2 mr-2"
              >
                <option value="active">Set Active</option>
                <option value="pending">Set Pending</option>
                <option value="rejected">Set Rejected</option>
              </select>
              <button 
                onClick={() => {
                  handleDeleteProduct(currentProduct.id);
                  setIsModalOpen(false);
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductManagementPage;
