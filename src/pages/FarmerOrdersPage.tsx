import React, { useState } from 'react';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  TruckIcon, 
  ClockIcon, 
  PhoneIcon,
  MapPinIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

// Namuna buyurtma ma'lumotlari
interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  date: string;
  total: number;
  status: 'kutilmoqda' | 'qabul qilingan' | 'tayyorlanmoqda' | 'tayyor' | 'yetkazilgan' | 'bekor qilingan';
  deliveryMethod: 'olib ketish' | 'yetkazib berish';
  products: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    orderNumber: 'ORD-001',
    date: '2023-05-15T10:30:00Z',
    status: 'kutilmoqda',
    total: 35.97,
    customerName: 'John Smith',
    customerPhone: '+1 (555) 123-4567',
    customerAddress: '123 Main St, Anytown, CA 12345',
    deliveryMethod: 'olib ketish',
    products: [
      {
        id: '1',
        name: 'Organic Apples',
        quantity: 3,
        price: 2.99,
        image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '2',
        name: 'Farm Fresh Eggs',
        quantity: 2,
        price: 4.50,
        image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '4',
        name: 'Artisanal Cheese',
        quantity: 1,
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
    ],
  },
  {
    id: 'ORD-002',
    orderNumber: 'ORD-002',
    date: '2023-05-10T14:45:00Z',
    status: 'qabul qilingan',
    total: 42.75,
    customerName: 'Emily Johnson',
    customerPhone: '+1 (555) 987-6543',
    customerAddress: '456 Oak Ave, Springfield, IL 67890',
    deliveryMethod: 'yetkazib berish',
    products: [
      {
        id: '3',
        name: 'Organic Strawberries',
        quantity: 2,
        price: 5.99,
        image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '5',
        name: 'Fresh Baked Bread',
        quantity: 1,
        price: 6.49,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '7',
        name: 'Grass-Fed Beef',
        quantity: 1,
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
    ],
  },
  {
    id: 'ORD-003',
    orderNumber: 'ORD-003',
    date: '2023-05-05T09:15:00Z',
    status: 'tayyorlanmoqda',
    total: 28.45,
    customerName: 'Michael Brown',
    customerPhone: '+1 (555) 456-7890',
    customerAddress: '789 Pine Ln, Riverside, TX 54321',
    deliveryMethod: 'olib ketish',
    products: [
      {
        id: '6',
        name: 'Local Honey',
        quantity: 1,
        price: 8.50,
        image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '8',
        name: 'Organic Spinach',
        quantity: 2,
        price: 3.99,
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '9',
        name: 'Fresh Milk',
        quantity: 1,
        price: 4.49,
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
    ],
  },
  {
    id: 'ORD-004',
    orderNumber: 'ORD-004',
    date: '2023-05-01T16:20:00Z',
    status: 'tayyor',
    total: 19.97,
    customerName: 'Sarah Wilson',
    customerPhone: '+1 (555) 789-0123',
    customerAddress: '321 Maple Dr, Lakeside, WA 13579',
    deliveryMethod: 'olib ketish',
    products: [
      {
        id: '10',
        name: 'Organic Carrots',
        quantity: 1,
        price: 3.49,
        image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '11',
        name: 'Fresh Basil',
        quantity: 1,
        price: 2.99,
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '12',
        name: 'Free-Range Chicken',
        quantity: 1,
        price: 13.49,
        image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
    ],
  },
  {
    id: 'ORD-005',
    orderNumber: 'ORD-005',
    date: '2023-04-25T11:10:00Z',
    status: 'yetkazilgan',
    total: 31.96,
    customerName: 'David Miller',
    customerPhone: '+1 (555) 234-5678',
    customerAddress: '654 Cedar St, Mountain View, OR 97531',
    deliveryMethod: 'yetkazib berish',
    products: [
      {
        id: '13',
        name: 'Organic Potatoes',
        quantity: 2,
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '14',
        name: 'Artisanal Jam',
        quantity: 1,
        price: 6.99,
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '15',
        name: 'Organic Tomatoes',
        quantity: 3,
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
    ],
  }
];

const FarmerOrdersPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filter orders based on status and search query
  const filteredOrders = mockOrders.filter(order => {
    const matchesFilter = activeFilter === 'all' || order.status === activeFilter;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Handle order status update
  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    // In a real app, this would make an API call
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
    
    // For demo purposes, we'll just close the detail view
    setSelectedOrder(null);
  };

  // Simulate refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status color and icon
  const getStatusInfo = (status: Order['status']) => {
    switch (status) {
      case 'kutilmoqda':
        return { 
          color: 'bg-yellow-100 text-yellow-800',
          icon: <ClockIcon className="w-5 h-5 mr-1" />
        };
      case 'qabul qilingan':
        return { 
          color: 'bg-blue-100 text-blue-800',
          icon: <CheckCircleIcon className="w-5 h-5 mr-1" />
        };
      case 'tayyorlanmoqda':
        return { 
          color: 'bg-purple-100 text-purple-800',
          icon: <ArrowPathIcon className="w-5 h-5 mr-1" />
        };
      case 'tayyor':
        return { 
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircleIcon className="w-5 h-5 mr-1" />
        };
      case 'yetkazilgan':
        return { 
          color: 'bg-green-100 text-green-800',
          icon: <TruckIcon className="w-5 h-5 mr-1" />
        };
      case 'bekor qilingan':
        return { 
          color: 'bg-red-100 text-red-800',
          icon: <XCircleIcon className="w-5 h-5 mr-1" />
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800',
          icon: <ClockIcon className="w-5 h-5 mr-1" />
        };
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Buyurtmalarni boshqarish</h1>
        <button 
          onClick={handleRefresh}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowPathIcon className={`w-5 h-5 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Buyurtma ID yoki mijoz nomi bo'yicha qidirish..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="flex overflow-x-auto space-x-2 pb-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            Barcha buyurtmalar
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeFilter === 'kutilmoqda' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'
            }`}
            onClick={() => setActiveFilter('kutilmoqda')}
          >
            Yangi buyurtmalar
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeFilter === 'qabul qilingan' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'
            }`}
            onClick={() => setActiveFilter('qabul qilingan')}
          >
            Qabul qilingan
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeFilter === 'tayyorlanmoqda' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'
            }`}
            onClick={() => setActiveFilter('tayyorlanmoqda')}
          >
            Tayyorlanmoqda
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeFilter === 'tayyor' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'
            }`}
            onClick={() => setActiveFilter('tayyor')}
          >
            Tayyor
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeFilter === 'yetkazilgan' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'
            }`}
            onClick={() => setActiveFilter('yetkazilgan')}
          >
            Yetkazilgan
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeFilter === 'bekor qilingan' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'
            }`}
            onClick={() => setActiveFilter('bekor qilingan')}
          >
            Bekor qilingan
          </button>
        </div>
      </div>

      {/* Order List or Detail View */}
      {selectedOrder ? (
        // Order Detail View
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Order Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Order {selectedOrder.id}</h2>
                <p className="text-sm text-gray-500">{formatDate(selectedOrder.date)}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Customer Info */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-md font-semibold text-gray-800 mb-2">Mijoz ma'lumotlari</h3>
            <div className="flex items-center mb-3">
              <div>
                <p className="font-medium">{selectedOrder.customerName}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <PhoneIcon className="w-4 h-4 mr-1" />
                  <span>{selectedOrder.customerPhone}</span>
                </div>
              </div>
            </div>
            <div className="flex items-start text-sm text-gray-500">
              <MapPinIcon className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
              <span>{selectedOrder.customerAddress}</span>
            </div>
          </div>

          {/* Delivery Method */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              {selectedOrder.deliveryMethod === 'olib ketish' ? 'Olib ketish ma\'lumotlari' : 'Yetkazib berish ma\'lumotlari'}
            </h3>
            <p className="text-sm text-gray-600">
              {selectedOrder.deliveryMethod === 'olib ketish' ? 'Mijoz o\'zi olib ketadi' : 'Mijoz manziliga yetkazib berish'}
            </p>
          </div>

          {/* Order Items */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-md font-semibold text-gray-800 mb-2">Buyurtma mahsulotlari</h3>
            <div className="space-y-3">
              {selectedOrder.products.map(product => (
                <div key={product.id} className="flex items-center">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-12 h-12 rounded-md object-cover mr-3"
                  />
                  <div className="flex-grow">
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-500">${product.price.toFixed(2)} × {product.quantity}</p>
                  </div>
                  <p className="font-medium text-gray-800">${(product.price * product.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex justify-between font-bold text-gray-800">
                <span>Jami</span>
                <span>${selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 bg-gray-50">
            <h3 className="text-md font-semibold text-gray-800 mb-3">Buyurtma holatini yangilash</h3>
            <div className="grid grid-cols-2 gap-3">
              {selectedOrder.status === 'kutilmoqda' && (
                <>
                  <button 
                    onClick={() => updateOrderStatus(selectedOrder.id, 'qabul qilingan')}
                    className="btn-primary py-2"
                  >
                    Buyurtmani qabul qilish
                  </button>
                  <button 
                    onClick={() => updateOrderStatus(selectedOrder.id, 'bekor qilingan')}
                    className="btn-secondary py-2"
                  >
                    Bekor qilish
                  </button>
                </>
              )}
              
              {selectedOrder.status === 'qabul qilingan' && (
                <button 
                  onClick={() => updateOrderStatus(selectedOrder.id, 'tayyorlanmoqda')}
                  className="btn-primary py-2 col-span-2"
                >
                  Tayyorlashni boshlash
                </button>
              )}
              
              {selectedOrder.status === 'tayyorlanmoqda' && (
                <button 
                  onClick={() => updateOrderStatus(selectedOrder.id, 'tayyor')}
                  className="btn-primary py-2 col-span-2"
                >
                  Tayyor deb belgilash
                </button>
              )}
              
              {selectedOrder.status === 'tayyor' && (
                <button 
                  onClick={() => updateOrderStatus(selectedOrder.id, 'yetkazilgan')}
                  className="btn-primary py-2 col-span-2"
                >
                  {selectedOrder.deliveryMethod === 'olib ketish' ? 'Olib ketildi deb belgilash' : 'Yetkazildi deb belgilash'}
                </button>
              )}
              
              {(selectedOrder.status === 'yetkazilgan' || selectedOrder.status === 'bekor qilingan') && (
                <p className="text-center text-gray-500 col-span-2">
                  Bu buyurtma {selectedOrder.status === 'yetkazilgan' ? 'yetkazilgan' : 'bekor qilingan'} va yangilab bo'lmaydi.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Order List View
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Sizning mezonlaringizga mos buyurtmalar topilmadi.</p>
            </div>
          ) : (
            filteredOrders.map(order => {
              const { color, icon } = getStatusInfo(order.status);
              const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });
              return (
                <div 
                  key={order.id}
                  className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{order.id}</h3>
                      <p className="text-gray-600 text-sm">{formattedDate}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full flex items-center ${color}`}>
                      {icon}
                      <span className="text-sm font-medium capitalize">{order.status}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-700">
                        <span className="font-medium">{order.customerName}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.deliveryMethod === 'olib ketish' ? 'Olib ketish' : 'Yetkazib berish'}
                      </p>
                    </div>
                    
                    <div className="mt-3 flex overflow-x-auto space-x-2">
                      {order.products.map(product => (
                        <div key={product.id} className="flex-shrink-0 w-12">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                          <span className="block text-xs text-center mt-1 text-gray-500">×{product.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {order.status === 'kutilmoqda' && (
                    <div className="px-4 py-3 bg-yellow-50 border-t border-yellow-100 flex justify-between mt-3">
                      <span className="text-sm font-medium text-yellow-800">Yangi buyurtma! Harakat talab qilinadi</span>
                      <span className="text-sm text-yellow-800">Ko'rish uchun bosing</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default FarmerOrdersPage;
