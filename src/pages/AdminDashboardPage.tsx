import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Admin dashboard uchun namunali ma'lumotlar
const mockStats = {
  totalUsers: 245,
  farmers: 78,
  customers: 167,
  totalProducts: 312,
  pendingProducts: 24,
  totalOrders: 189,
  revenue: 15742.50
};

// So'nggi faoliyat uchun namunali ma'lumotlar
const mockActivity = [
  {
    id: 1,
    type: 'user_registration',
    user: 'Sarah Johnson',
    role: 'Fermer',
    date: '2025-05-04T14:32:00Z',
    details: 'Yangi fermer ro\'yxatdan o\'tdi'
  },
  {
    id: 2,
    type: 'product_listing',
    user: 'Yashil Vodiy Fermasi',
    product: 'Organik qulupnay',
    date: '2025-05-04T12:15:00Z',
    details: 'Yangi mahsulot tasdiqlash kutilmoqda'
  },
  {
    id: 3,
    type: 'order',
    user: 'Michael Chen',
    amount: 32.47,
    date: '2025-05-04T10:45:00Z',
    details: 'Yangi buyurtma berildi'
  },
  {
    id: 4,
    type: 'user_registration',
    user: 'David Rodriguez',
    role: 'Xaridor',
    date: '2025-05-03T19:22:00Z',
    details: 'Yangi xaridor ro\'yxatdan o\'tdi'
  },
  {
    id: 5,
    type: 'product_listing',
    user: 'Quyoshli Ferma',
    product: 'Ferma toza tuxumlari',
    date: '2025-05-03T16:08:00Z',
    details: 'Mahsulot tasdiqlandi'
  }
];

// Oylik statistika uchun namunali ma'lumotlar
const mockMonthlyData = {
  users: [12, 18, 22, 15, 24, 33, 28, 35, 41, 46, 52, 58],
  products: [25, 32, 38, 42, 48, 55, 62, 68, 75, 82, 90, 98],
  orders: [42, 48, 55, 62, 70, 78, 85, 92, 100, 110, 120, 130],
  months: ['May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek', 'Yan', 'Fev', 'Mar', 'Apr']
};

const AdminDashboardPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-extrabold text-text-primary">Admin Boshqaruv Paneli</h1>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link to="/app/admin-users" className="btn-secondary">
              Foydalanuvchilarni boshqarish
            </Link>
            <Link to="/app/admin-products" className="btn-secondary">
              Mahsulotlarni boshqarish
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Users Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-text-secondary truncate">Jami foydalanuvchilar</dt>
                    <dd>
                      <div className="text-lg font-medium text-text-primary">{mockStats.totalUsers}</div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4 text-sm">
                <span className="text-text-secondary">{mockStats.farmers} Fermerlar, {mockStats.customers} Xaridorlar</span>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/app/admin-users" className="font-medium text-primary hover:text-primary/80">
                  Barcha foydalanuvchilarni ko'rish
                </Link>
              </div>
            </div>
          </div>

          {/* Total Products Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-text-secondary truncate">Jami mahsulotlar</dt>
                    <dd>
                      <div className="text-lg font-medium text-text-primary">{mockStats.totalProducts}</div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4 text-sm">
                <span className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs font-medium">
                  {mockStats.pendingProducts} tasdiqlash kutilmoqda
                </span>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/admin-products" className="font-medium text-primary hover:text-primary/80">
                  Barcha mahsulotlarni ko'rish
                </Link>
              </div>
            </div>
          </div>

          {/* Total Orders Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-text-secondary truncate">Jami buyurtmalar</dt>
                    <dd>
                      <div className="text-lg font-medium text-text-primary">{mockStats.totalOrders}</div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4 text-sm">
                <span className="text-green-600">
                  <svg className="inline h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  12% o'sish
                </span>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary/80">
                  Barcha buyurtmalarni ko'rish
                </a>
              </div>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-accent rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-text-secondary truncate">Jami daromad</dt>
                    <dd>
                      <div className="text-lg font-medium text-text-primary">{mockStats.revenue.toFixed(2)} so'm</div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4 text-sm">
                <span className="text-green-600">
                  <svg className="inline h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  8.5% o'sish
                </span>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary/80">
                  Moliyaviy hisobotlarni ko'rish
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-text-primary mb-4">So'nggi faoliyat</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {mockActivity.map((activity) => (
                <li key={activity.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {activity.type === 'user_registration' && (
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                          </div>
                        )}
                        {activity.type === 'product_listing' && (
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                        )}
                        {activity.type === 'order' && (
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-text-primary">{activity.details}</div>
                          <div className="text-sm text-text-secondary">
                            {activity.type === 'user_registration' && (
                              <span>Foydalanuvchi: {activity.user} ({activity.role})</span>
                            )}
                            {activity.type === 'product_listing' && (
                              <span>Mahsulot: {activity.product} - {activity.user}</span>
                            )}
                            {activity.type === 'order' && (
                              <span>Buyurtma: {activity.amount} so'm - {activity.user}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <div className="text-sm text-text-secondary">
                          {new Date(activity.date).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-medium text-text-primary">Tahlillar</h2>
            <div className="mt-4 sm:mt-0">
              <div className="flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => setTimeRange('week')}
                  className={`${
                    timeRange === 'week'
                      ? 'bg-primary text-white'
                      : 'bg-white text-text-secondary hover:bg-gray-50'
                  } relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`}
                >
                  Hafta
                </button>
                <button
                  type="button"
                  onClick={() => setTimeRange('month')}
                  className={`${
                    timeRange === 'month'
                      ? 'bg-primary text-white'
                      : 'bg-white text-text-secondary hover:bg-gray-50'
                  } relative inline-flex items-center px-4 py-2 border-t border-b border-gray-300 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`}
                >
                  Oy
                </button>
                <button
                  type="button"
                  onClick={() => setTimeRange('year')}
                  className={`${
                    timeRange === 'year'
                      ? 'bg-primary text-white'
                      : 'bg-white text-text-secondary hover:bg-gray-50'
                  } relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`}
                >
                  Yil
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {/* Users Growth Chart */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-text-primary">Foydalanuvchilar o'sishi</h3>
                  <span className="text-green-600 text-sm font-medium">+24%</span>
                </div>
                <div className="mt-4 h-48 flex items-end space-x-2">
                  {mockMonthlyData.users.map((value, index) => (
                    <div key={index} className="flex-1 bg-primary/10 rounded-t">
                      <div 
                        className="bg-primary rounded-t h-0 transition-all duration-300"
                        style={{ height: `${(value / Math.max(...mockMonthlyData.users)) * 100}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-12 gap-2 text-xs text-text-secondary">
                  {mockMonthlyData.months.map((month, index) => (
                    <div key={index} className="text-center">
                      {month.substring(0, 1)}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Growth Chart */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-text-primary">Mahsulotlar o'sishi</h3>
                  <span className="text-green-600 text-sm font-medium">+32%</span>
                </div>
                <div className="mt-4 h-48 flex items-end space-x-2">
                  {mockMonthlyData.products.map((value, index) => (
                    <div key={index} className="flex-1 bg-green-100 rounded-t">
                      <div 
                        className="bg-green-500 rounded-t h-0 transition-all duration-300"
                        style={{ height: `${(value / Math.max(...mockMonthlyData.products)) * 100}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-12 gap-2 text-xs text-text-secondary">
                  {mockMonthlyData.months.map((month, index) => (
                    <div key={index} className="text-center">
                      {month.substring(0, 1)}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Orders Growth Chart */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-text-primary">Buyurtmalar o'sishi</h3>
                  <span className="text-green-600 text-sm font-medium">+18%</span>
                </div>
                <div className="mt-4 h-48 flex items-end space-x-2">
                  {mockMonthlyData.orders.map((value, index) => (
                    <div key={index} className="flex-1 bg-blue-100 rounded-t">
                      <div 
                        className="bg-blue-500 rounded-t h-0 transition-all duration-300"
                        style={{ height: `${(value / Math.max(...mockMonthlyData.orders)) * 100}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-12 gap-2 text-xs text-text-secondary">
                  {mockMonthlyData.months.map((month, index) => (
                    <div key={index} className="text-center">
                      {month.substring(0, 1)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboardPage;
