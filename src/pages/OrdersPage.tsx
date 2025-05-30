import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock order data
interface Order {
  id: string;
  date: string;
  status: 'faol' | 'jarayonda' | `jo'natildi` | 'yakunlangan' | 'bekor qilindi';
  total: number;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
  }[];
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2023-05-15T10:30:00Z',
    status: 'yakunlangan',
    total: 35.97,
    items: [
      {
        id: '1',
        name: 'Organik Olmalar',
        quantity: 3,
        price: 2.99,
        imageUrl: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '2',
        name: 'Fermer Tuxumlari',
        quantity: 2,
        price: 4.50,
        imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '4',
        name: 'Qo‘lbola Pishloq',
        quantity: 1,
        price: 8.99,
        imageUrl: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
    ],
  },
  {
    id: 'ORD-002',
    date: '2023-05-10T14:45:00Z',
    status: `jo'natildi`,
    total: 27.95,
    items: [
      {
        id: '3',
        name: 'Organik Sabzi',
        quantity: 2,
        price: 1.99,
        imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '5',
        name: 'Organik Asal',
        quantity: 1,
        price: 7.50,
        imageUrl: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '6',
        name: 'Yangi Sut',
        quantity: 2,
        price: 3.99,
        imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
    ],
  },
  {
    id: 'ORD-003',
    date: '2023-05-05T09:15:00Z',
    status: `faol`,
    total: 15.97,
    items: [
      {
        id: '7',
        name: 'Yangi Pomidor',
        quantity: 2,
        price: 3.49,
        imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '8',
        name: 'Organik Ismaloq',
        quantity: 1,
        price: 2.99,
        imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '9',
        name: 'Chorva Go‘shti',
        quantity: 1,
        price: 6.00,
        imageUrl: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
    ],
  },
];

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return ['faol', 'jarayonda', `jo'natildi`].includes(order.status);
    if (activeTab === 'completed') return ['yakunlangan', `bekor qilindi`].includes(order.status);
    return true;
  });

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'faol':
        return 'bg-yellow-100 text-yellow-800';
      case 'jarayonda':
        return 'bg-blue-100 text-blue-800';
      case `jo'natildi`:
        return 'bg-purple-100 text-purple-800';
      case `yakunlangan`:
        return 'bg-green-100 text-green-800';
      case `bekor qilindi`:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Buyurtmalarim</h1>
      
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'all'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('all')}
        >
          Barcha buyurtmalar
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'active'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('active')}
        >
          Faollar
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'completed'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('completed')}
        >
          Yakunlanganlar
        </button>
      </div>
      
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <p className="text-sm text-gray-500">Buyurtma #{order.id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 flex items-center">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-900">
                    {order.total.toFixed(2)} so'm
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <ul className="divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="py-4 flex">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">{item.price.toFixed(2)} so'm</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.price.toFixed(2)} so'm x {item.quantity}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
                <Link
                  to={`/orders/${order.id}`}
                  className="text-primary hover:text-primary-dark text-sm font-medium"
                >
                  Tafsilotlarni ko‘rish
                </Link>
                {order.status === `yakunlangan` && (
                  <button className="text-primary hover:text-primary-dark text-sm font-medium">
                    Fikr bildirish
                  </button>
                )}
                {order.status === `faol` && (
                  <button 
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                    onClick={() => {
                      setOrders(orders.map(o => 
                        o.id === order.id ? { ...o, status: `bekor qilindi` } : o
                      ));
                    }}
                  >
                    Buyurtmani bekor qilish
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Buyurtmalar topilmadi</h3>
          <p className="mt-1 text-sm text-gray-500">
            {activeTab === 'all'
              ? "Siz hali hech qanday buyurtma bermagansiz."
              : activeTab === 'active'
              ? "Faol buyurtmalaringiz yo‘q."
              : "Yakunlangan buyurtmalaringiz yo‘q."}
          </p>
          <div className="mt-6">
            <Link
              to="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Mahsulotlarni ko‘rish
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
