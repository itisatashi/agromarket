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

// Mock order data
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'delivered' | 'canceled';
  total: number;
  items: OrderItem[];
  customer: {
    id: string;
    name: string;
    phone: string;
    address: string;
    imageUrl?: string;
  };
  deliveryMethod: 'pickup' | 'delivery';
  deliveryTime?: string;
  notes?: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2023-05-15T10:30:00Z',
    status: 'pending',
    total: 35.97,
    customer: {
      id: 'CUST-001',
      name: 'John Smith',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, Anytown, CA 12345',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    deliveryMethod: 'pickup',
    deliveryTime: '2023-05-16T16:00:00Z',
    notes: 'Please make sure eggs are well-packed',
    items: [
      {
        id: '1',
        name: 'Organic Apples',
        quantity: 3,
        price: 2.99,
        imageUrl: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '2',
        name: 'Farm Fresh Eggs',
        quantity: 2,
        price: 4.50,
        imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '4',
        name: 'Artisanal Cheese',
        quantity: 1,
        price: 8.99,
        imageUrl: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
    ],
  },
  {
    id: 'ORD-002',
    date: '2023-05-10T14:45:00Z',
    status: 'accepted',
    total: 42.75,
    customer: {
      id: 'CUST-002',
      name: 'Emily Johnson',
      phone: '+1 (555) 987-6543',
      address: '456 Oak Ave, Springfield, IL 67890',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    deliveryMethod: 'delivery',
    deliveryTime: '2023-05-11T12:00:00Z',
    items: [
      {
        id: '3',
        name: 'Organic Strawberries',
        quantity: 2,
        price: 5.99,
        imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '5',
        name: 'Fresh Baked Bread',
        quantity: 1,
        price: 6.49,
        imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '7',
        name: 'Grass-Fed Beef',
        quantity: 1,
        price: 12.99,
        imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
    ],
  },
  {
    id: 'ORD-003',
    date: '2023-05-05T09:15:00Z',
    status: 'preparing',
    total: 28.45,
    customer: {
      id: 'CUST-003',
      name: 'Michael Brown',
      phone: '+1 (555) 456-7890',
      address: '789 Pine Ln, Riverside, TX 54321',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    deliveryMethod: 'pickup',
    deliveryTime: '2023-05-06T10:00:00Z',
    items: [
      {
        id: '6',
        name: 'Local Honey',
        quantity: 1,
        price: 8.50,
        imageUrl: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '8',
        name: 'Organic Spinach',
        quantity: 2,
        price: 3.99,
        imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '9',
        name: 'Fresh Milk',
        quantity: 1,
        price: 4.49,
        imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
    ],
  },
  {
    id: 'ORD-004',
    date: '2023-05-01T16:20:00Z',
    status: 'ready',
    total: 19.97,
    customer: {
      id: 'CUST-004',
      name: 'Sarah Wilson',
      phone: '+1 (555) 789-0123',
      address: '321 Maple Dr, Lakeside, WA 13579',
      imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    deliveryMethod: 'pickup',
    deliveryTime: '2023-05-02T14:00:00Z',
    items: [
      {
        id: '10',
        name: 'Organic Carrots',
        quantity: 1,
        price: 3.49,
        imageUrl: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '11',
        name: 'Fresh Basil',
        quantity: 1,
        price: 2.99,
        imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '12',
        name: 'Free-Range Chicken',
        quantity: 1,
        price: 13.49,
        imageUrl: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
    ],
  },
  {
    id: 'ORD-005',
    date: '2023-04-25T11:10:00Z',
    status: 'delivered',
    total: 31.96,
    customer: {
      id: 'CUST-005',
      name: 'David Miller',
      phone: '+1 (555) 234-5678',
      address: '654 Cedar St, Mountain View, OR 97531',
      imageUrl: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    deliveryMethod: 'delivery',
    deliveryTime: '2023-04-26T13:00:00Z',
    items: [
      {
        id: '13',
        name: 'Organic Potatoes',
        quantity: 2,
        price: 4.99,
        imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '14',
        name: 'Artisanal Jam',
        quantity: 1,
        price: 6.99,
        imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '15',
        name: 'Organic Tomatoes',
        quantity: 3,
        price: 4.99,
        imageUrl: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
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
                          order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
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
      case 'pending':
        return { 
          color: 'bg-yellow-100 text-yellow-800',
          icon: <ClockIcon className="w-5 h-5 mr-1" />
        };
      case 'accepted':
        return { 
          color: 'bg-blue-100 text-blue-800',
          icon: <CheckCircleIcon className="w-5 h-5 mr-1" />
        };
      case 'preparing':
        return { 
          color: 'bg-purple-100 text-purple-800',
          icon: <ArrowPathIcon className="w-5 h-5 mr-1" />
        };
      case 'ready':
        return { 
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircleIcon className="w-5 h-5 mr-1" />
        };
      case 'delivered':
        return { 
          color: 'bg-green-100 text-green-800',
          icon: <TruckIcon className="w-5 h-5 mr-1" />
        };
      case 'canceled':
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
        <h1 className="text-2xl font-bold text-gray-800">Manage Orders</h1>
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
            placeholder="Search by order ID or customer name..."
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
            All Orders
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeFilter === 'pending' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'
            }`}
            onClick={() => setActiveFilter('pending')}
          >
            New Orders
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeFilter === 'accepted' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'
            }`}
            onClick={() => setActiveFilter('accepted')}
          >
            Accepted
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeFilter === 'preparing' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'
            }`}
            onClick={() => setActiveFilter('preparing')}
          >
            Preparing
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeFilter === 'ready' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'
            }`}
            onClick={() => setActiveFilter('ready')}
          >
            Ready
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeFilter === 'delivered' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'
            }`}
            onClick={() => setActiveFilter('delivered')}
          >
            Completed
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeFilter === 'canceled' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'
            }`}
            onClick={() => setActiveFilter('canceled')}
          >
            Canceled
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
            <h3 className="text-md font-semibold text-gray-800 mb-2">Customer Information</h3>
            <div className="flex items-center mb-3">
              {selectedOrder.customer.imageUrl && (
                <img 
                  src={selectedOrder.customer.imageUrl} 
                  alt={selectedOrder.customer.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
              )}
              <div>
                <p className="font-medium">{selectedOrder.customer.name}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <PhoneIcon className="w-4 h-4 mr-1" />
                  <span>{selectedOrder.customer.phone}</span>
                </div>
              </div>
            </div>
            <div className="flex items-start text-sm text-gray-500">
              <MapPinIcon className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
              <span>{selectedOrder.customer.address}</span>
            </div>
          </div>

          {/* Delivery Method */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              {selectedOrder.deliveryMethod === 'pickup' ? 'Pickup Information' : 'Delivery Information'}
            </h3>
            <p className="text-sm text-gray-600">
              {selectedOrder.deliveryMethod === 'pickup' ? 'Customer will pick up' : 'Delivery to customer address'}
            </p>
            {selectedOrder.deliveryTime && (
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Time:</span> {formatDate(selectedOrder.deliveryTime)}
              </p>
            )}
            {selectedOrder.notes && (
              <div className="mt-2 p-2 bg-yellow-50 rounded-md text-sm text-gray-700">
                <span className="font-medium">Notes:</span> {selectedOrder.notes}
              </div>
            )}
          </div>

          {/* Order Items */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-md font-semibold text-gray-800 mb-2">Order Items</h3>
            <div className="space-y-3">
              {selectedOrder.items.map(item => (
                <div key={item.id} className="flex items-center">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-12 h-12 rounded-md object-cover mr-3"
                  />
                  <div className="flex-grow">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} × {item.quantity}</p>
                  </div>
                  <p className="font-medium text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex justify-between font-bold text-gray-800">
                <span>Total</span>
                <span>${selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 bg-gray-50">
            <h3 className="text-md font-semibold text-gray-800 mb-3">Update Order Status</h3>
            <div className="grid grid-cols-2 gap-3">
              {selectedOrder.status === 'pending' && (
                <>
                  <button 
                    onClick={() => updateOrderStatus(selectedOrder.id, 'accepted')}
                    className="btn-primary py-2"
                  >
                    Accept Order
                  </button>
                  <button 
                    onClick={() => updateOrderStatus(selectedOrder.id, 'canceled')}
                    className="btn-secondary py-2"
                  >
                    Decline Order
                  </button>
                </>
              )}
              
              {selectedOrder.status === 'accepted' && (
                <button 
                  onClick={() => updateOrderStatus(selectedOrder.id, 'preparing')}
                  className="btn-primary py-2 col-span-2"
                >
                  Start Preparing
                </button>
              )}
              
              {selectedOrder.status === 'preparing' && (
                <button 
                  onClick={() => updateOrderStatus(selectedOrder.id, 'ready')}
                  className="btn-primary py-2 col-span-2"
                >
                  Mark as Ready
                </button>
              )}
              
              {selectedOrder.status === 'ready' && (
                <button 
                  onClick={() => updateOrderStatus(selectedOrder.id, 'delivered')}
                  className="btn-primary py-2 col-span-2"
                >
                  {selectedOrder.deliveryMethod === 'pickup' ? 'Mark as Picked Up' : 'Mark as Delivered'}
                </button>
              )}
              
              {(selectedOrder.status === 'delivered' || selectedOrder.status === 'canceled') && (
                <p className="text-center text-gray-500 col-span-2">
                  This order is {selectedOrder.status === 'delivered' ? 'completed' : 'canceled'} and cannot be updated.
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
              <p className="text-gray-500">No orders found matching your criteria.</p>
            </div>
          ) : (
            filteredOrders.map(order => {
              const { color, icon } = getStatusInfo(order.status);
              return (
                <div 
                  key={order.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-bold text-gray-800">{order.id}</h3>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs flex items-center ${color}`}>
                            {icon}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{formatDate(order.date)}</p>
                      </div>
                      <p className="font-bold text-gray-800">${order.total.toFixed(2)}</p>
                    </div>
                    
                    <div className="mt-3 flex items-center">
                      {order.customer.imageUrl && (
                        <img 
                          src={order.customer.imageUrl} 
                          alt={order.customer.name}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                      )}
                      <span className="text-sm font-medium">{order.customer.name}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">
                        {order.deliveryMethod === 'pickup' ? 'Pickup' : 'Delivery'}
                      </span>
                      {order.deliveryTime && (
                        <>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-500">{formatDate(order.deliveryTime)}</span>
                        </>
                      )}
                    </div>
                    
                    <div className="mt-3 flex overflow-x-auto space-x-2">
                      {order.items.map(item => (
                        <div key={item.id} className="flex-shrink-0 w-12">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                          <span className="block text-xs text-center mt-1 text-gray-500">×{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {order.status === 'pending' && (
                    <div className="px-4 py-3 bg-yellow-50 border-t border-yellow-100 flex justify-between">
                      <span className="text-sm font-medium text-yellow-800">New order! Action required</span>
                      <span className="text-sm text-yellow-800">Tap to view</span>
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
