import React, { useState } from 'react';

// Namuna tahliliy ma'lumotlar
interface SalesData {
  date: string;
  revenue: number;
  orders: number;
}

interface ProductPerformance {
  id: string;
  name: string;
  totalSold: number;
  revenue: number;
  averageRating: number;
}

interface CustomerData {
  region: string;
  customers: number;
  percentage: number;
}

const mockDailySales: SalesData[] = [
  { date: '2023-05-01', revenue: 120.50, orders: 5 },
  { date: '2023-05-02', revenue: 95.75, orders: 4 },
  { date: '2023-05-03', revenue: 210.25, orders: 8 },
  { date: '2023-05-04', revenue: 180.00, orders: 6 },
  { date: '2023-05-05', revenue: 150.50, orders: 5 },
  { date: '2023-05-06', revenue: 225.75, orders: 9 },
  { date: '2023-05-07', revenue: 300.25, orders: 12 },
];

const mockWeeklySales: SalesData[] = [
  { date: '1-hafta', revenue: 850.50, orders: 32 },
  { date: '2-hafta', revenue: 920.75, orders: 38 },
  { date: '3-hafta', revenue: 1100.25, orders: 45 },
  { date: '4-hafta', revenue: 980.00, orders: 40 },
];

const mockMonthlySales: SalesData[] = [
  { date: 'Yan', revenue: 3200.50, orders: 125 },
  { date: 'Fev', revenue: 2800.75, orders: 110 },
  { date: 'Mar', revenue: 3500.25, orders: 140 },
  { date: 'Apr', revenue: 3800.00, orders: 155 },
  { date: 'May', revenue: 4100.50, orders: 165 },
];

const mockTopProducts: ProductPerformance[] = [
  { id: '1', name: 'Organik olmalar', totalSold: 120, revenue: 359.80, averageRating: 4.8 },
  { id: '3', name: 'Organik sabzilar', totalSold: 85, revenue: 169.15, averageRating: 4.5 },
  { id: '5', name: 'Organik karam', totalSold: 65, revenue: 161.85, averageRating: 4.7 },
  { id: '7', name: 'Yangi pomidorlar', totalSold: 95, revenue: 331.55, averageRating: 4.6 },
];

const mockCustomerRegions: CustomerData[] = [
  { region: 'Shahar', customers: 250, percentage: 50 },
  { region: 'Shahar atrofi', customers: 150, percentage: 30 },
  { region: 'Qishloq', customers: 100, percentage: 20 },
];

const FarmerAnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  
  // Vaqt oralig'iga qarab sotuvlar ma'lumotlarini tanlash
  const salesData = timeRange === 'daily' 
    ? mockDailySales 
    : timeRange === 'weekly' 
      ? mockWeeklySales 
      : mockMonthlySales;
  
  // Jami daromad va buyurtmalarni hisoblash
  const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0);
  const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0);
  
  // O'rtacha buyurtma qiymatini hisoblash
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  // Grafik masshtablash uchun maksimal qiymatlarni hisoblash
  const maxRevenue = Math.max(...salesData.map(day => day.revenue));
  const maxOrders = Math.max(...salesData.map(day => day.orders));

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tahliliy boshqaruv paneli</h1>
      
      {/* Vaqt oralig'ini tanlash */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Sotuvlar ko'rsatkichlari</h2>
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <button
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                timeRange === 'daily'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setTimeRange('daily')}
            >
              Kunlik
            </button>
            <button
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                timeRange === 'weekly'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setTimeRange('weekly')}
            >
              Haftalik
            </button>
            <button
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                timeRange === 'monthly'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setTimeRange('monthly')}
            >
              Oylik
            </button>
          </div>
        </div>
      </div>
      
      {/* Asosiy ko'rsatkichlar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Jami daromad</h3>
          <p className="text-2xl font-bold text-gray-900">{totalRevenue.toFixed(2)} so'm</p>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-500 font-medium">↑ 12.5%</span>
            <span className="text-gray-500 ml-2">oldingi davrga nisbatan</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Jami buyurtmalar</h3>
          <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-500 font-medium">↑ 8.3%</span>
            <span className="text-gray-500 ml-2">oldingi davrga nisbatan</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">O'rtacha buyurtma qiymati</h3>
          <p className="text-2xl font-bold text-gray-900">{averageOrderValue.toFixed(2)} so'm</p>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-500 font-medium">↑ 3.7%</span>
            <span className="text-gray-500 ml-2">oldingi davrga nisbatan</span>
          </div>
        </div>
      </div>
      
      {/* Sotuvlar grafigi */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Sotuvlar tendensiyasi</h2>
        <div className="h-64 relative">
          {/* Bu soddalashtirilgan grafik vizualizatsiya */}
          <div className="absolute inset-0 flex items-end">
            {salesData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                {/* Daromad ustuni */}
                <div 
                  className="w-4/5 bg-primary rounded-t" 
                  style={{ 
                    height: `${(data.revenue / maxRevenue) * 70}%`,
                    maxWidth: '30px'
                  }}
                ></div>
                {/* Buyurtmalar ustuni */}
                <div 
                  className="w-4/5 bg-secondary mt-1 rounded-t" 
                  style={{ 
                    height: `${(data.orders / maxOrders) * 20}%`,
                    maxWidth: '30px'
                  }}
                ></div>
                <div className="mt-2 text-xs text-gray-500 truncate w-full text-center">
                  {data.date}
                </div>
              </div>
            ))}
          </div>
          <div className="absolute top-0 left-0 h-full border-r border-gray-200 flex flex-col justify-between text-xs text-gray-500">
            <span>{maxRevenue.toFixed(0)} so'm</span>
            <span>{(maxRevenue / 2).toFixed(0)} so'm</span>
            <span>0 so'm</span>
          </div>
        </div>
        <div className="mt-4 flex justify-center space-x-6">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Daromad</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-secondary rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Buyurtmalar</span>
          </div>
        </div>
      </div>
      
      {/* Eng yaxshi mahsulotlar */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Eng ko'p sotilgan mahsulotlar</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mahsulot</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sotilgan miqdor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Daromad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">O'rt. baho</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockTopProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.totalSold}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.revenue.toFixed(2)} so'm</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900 mr-2">{product.averageRating.toFixed(1)}</span>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(product.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Mijozlar demografiyasi */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Mijozlar demografiyasi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Mijozlar hududlari</h3>
            <div className="space-y-4">
              {mockCustomerRegions.map((region) => (
                <div key={region.region}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{region.region}</span>
                    <span className="text-sm text-gray-500">{region.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${region.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Mijozlar mamnuniyati</h3>
            <div className="flex items-center justify-center h-full">
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                    strokeDasharray="100, 100"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#2F855A"
                    strokeWidth="3"
                    strokeDasharray="85, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">85%</span>
                  <span className="text-sm text-gray-500">Mamnun</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerAnalyticsPage;
