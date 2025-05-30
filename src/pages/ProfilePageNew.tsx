import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  UserIcon, 
  MapPinIcon, 
  CreditCardIcon, 
  BellIcon, 
  BuildingStorefrontIcon, 
  BanknotesIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ChevronRightIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';

// Mock user data
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'farmer';
  avatar: string;
  addresses: {
    id: string;
    type: 'billing' | 'shipping';
    street: string;
    city: string;
    country: string;
    isDefault: boolean;
  }[];
  paymentMethods: {
    id: string;
    type: 'credit_card' | 'paypal';
    lastFour?: string;
    expiryDate?: string;
    isDefault: boolean;
  }[];
}

const mockUser: User = {
  id: 'USR-001',
  name: 'Isnatdinov Islam',
  email: 'isnatdinov.islam@gmail.com',
  phone: '+998991234567',
  role: 'customer',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  addresses: [
    {
      id: 'ADDR-001',
      type: 'shipping',
      street: 'Qarligash kochasi N7 uy',
      city: 'Nukus',
      country: 'Uzbekistan',
      isDefault: true,
    },
  ],
  paymentMethods: [
    {
      id: 'PAY-001',
      type: 'credit_card',
      lastFour: '4242',
      expiryDate: '04/25',
      isDefault: true,
    }
  ],
};

interface ProfilePageProps {
  userRole?: 'customer' | 'farmer' | 'admin';
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userRole = 'customer' }) => {
  const [user, setUser] = useState<User>({...mockUser, role: userRole as 'customer' | 'farmer'});
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'payment' | 'preferences' | 'farm' | 'banking'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      ...user,
      ...formData,
    });
    setIsEditing(false);
  };

  // Determine which tabs to show based on user role
  const getTabs = () => {
    if (userRole === 'farmer') {
      return [
        { id: 'profile', label: 'Profil', icon: <UserIcon className="w-5 h-5" /> },
        { id: 'farm', label: 'Ferma', icon: <BuildingStorefrontIcon className="w-5 h-5" /> },
        { id: 'banking', label: 'Bank', icon: <BanknotesIcon className="w-5 h-5" /> },
        { id: 'preferences', label: 'Boshqarish', icon: <BellIcon className="w-5 h-5" /> }
      ];
    } else {
      return [
        { id: 'profile', label: 'Profil', icon: <UserIcon className="w-5 h-5" /> },
        { id: 'addresses', label: 'Manzillar', icon: <MapPinIcon className="w-5 h-5" /> },
        { id: 'payment', label: `To'lov`, icon: <CreditCardIcon className="w-5 h-5" /> },
        { id: 'preferences', label: 'Boshqarish', icon: <BellIcon className="w-5 h-5" /> }
      ];
    }
  };

  const tabs = getTabs();
  const primaryColor = userRole === 'farmer' ? '#e5e7eb' : '#000';

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Profile Header - Mobile First Design */}
      <div className={`bg-gradient-to-r from-[#3afc54] to-[#08a31d]/80 text-white`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-6">
            <div className="relative mb-4 sm:mb-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-green-600 rounded-full p-1 shadow-md">
                <PencilIcon className={`w-5 h-5 text-${primaryColor}`} />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-white/80 text-sm">{user.email}</p>
              <div className="mt-2">
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-white/20 backdrop-blur-sm">
                  {userRole === 'farmer' ? 'Fermer' : 'Xaridor'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Tab Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-10 overflow-x-auto">
        <div className="flex px-2 py-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex flex-1 flex-col items-center justify-center py-3 px-1 text-xs font-medium transition-colors
                ${activeTab === tab.id 
                  ? `text-${primaryColor} border-b-2 border-${primaryColor}` 
                  : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              <div className="mb-1">{tab.icon}</div>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Profile Information */}
          {activeTab === 'profile' && (
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Shaxsiy ma'lumotlar</h2>
                <button
                  className={`text-${primaryColor} hover:text-${primaryColor}/80 flex items-center text-sm font-medium`}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <>
                      <XMarkIcon className="w-4 h-4 mr-1" />
                      Bekor qilish
                    </>
                  ) : (
                    <>
                      <PencilIcon className="w-4 h-4 mr-1" />
                      Tahrirlash
                    </>
                  )}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        To'liq ism
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:outline-none transition-colors"
                        placeholder="To'liq ismingiz"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Elektron pochta
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:outline-none transition-colors"
                        placeholder="sizning.email@misol.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefon raqami
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:outline-none transition-colors"
                        placeholder="+998 (xx) xxx-xxxx"
                      />
                    </div>
                  </div>
                  <div className="pt-4">
                    <button
                      type="submit"
                      className={`w-full sm:w-auto px-6 py-2 bg-${primaryColor} text-white font-medium rounded-lg hover:bg-${primaryColor}/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${primaryColor}`}
                    >
                      <div className="flex items-center justify-center">
                        <CheckIcon className="w-4 h-4 mr-2" />
                        O'zgarishlarni saqlash
                      </div>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-4">
                      <div className="flex items-center border-b border-gray-200 pb-3">
                        <div className="w-1/3">
                          <span className="text-sm font-medium text-gray-500">To'liq ism</span>
                        </div>
                        <div className="w-2/3">
                          <span className="text-sm text-gray-900">{user.name}</span>
                        </div>
                      </div>
                      <div className="flex items-center border-b border-gray-200 pb-3">
                        <div className="w-1/3">
                          <span className="text-sm font-medium text-gray-500">Elektron pochta</span>
                        </div>
                        <div className="w-2/3">
                          <span className="text-sm text-gray-900">{user.email}</span>
                        </div>
                      </div>
                      <div className="flex items-center border-b border-gray-200 pb-3">
                        <div className="w-1/3">
                          <span className="text-sm font-medium text-gray-500">Telefon</span>
                        </div>
                        <div className="w-2/3">
                          <span className="text-sm text-gray-900">{user.phone}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-1/3">
                          <span className="text-sm font-medium text-gray-500">Hisob turi</span>
                        </div>
                        <div className="w-2/3">
                          <span className="text-sm text-gray-900 capitalize">{userRole}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Hisob xavfsizligi</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Parol</p>
                          <p className="text-xs text-gray-500">Oxirgi o'zgartirilgan vaqt: 3 oy oldin</p>
                        </div>
                        <button className={`text-${primaryColor} text-sm font-medium flex items-center`}>
                          O'zgartirish
                          <ChevronRightIcon className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Ikki bosqichli autentifikatsiya</p>
                          <p className="text-xs text-gray-500">Yoqilmagan</p>
                        </div>
                        <button className={`text-${primaryColor} text-sm font-medium flex items-center`}>
                          Yoqish
                          <ChevronRightIcon className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-center">
                      <Link to="/login" className="text-white bg-red-500 hover:bg-red-600 text-sm font-medium flex items-center justify-center px-4 py-2 rounded-lg w-full">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
                        Chiqish
                      </Link >
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Sizning manzillaringiz</h2>
              <button className={`text-${primaryColor} hover:text-${primaryColor}/80 flex items-center text-sm font-medium`}>
                <PlusCircleIcon className="w-4 h-4 mr-1" />
                Yangi manzil qo'shish
              </button>
            </div>

            <div className="space-y-4">
              {user.addresses.map((address) => (
                <div key={address.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 capitalize flex items-center">
                          {address.type === 'shipping' ? 'Yetkazib berish' : 'Tolov'} manzili
                          {address.isDefault && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Default
                            </span>
                          )}
                        </h3>
                      </div>
                      <div className="flex space-x-3">
                        <button className={`text-${primaryColor} hover:text-${primaryColor}/80 text-sm font-medium`}>
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-500 space-y-1">
                      <p>{address.street}</p>
                      <p>
                        {address.city}
                      </p>
                      <p>{address.country}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {address.isDefault ? 'Yetkazib berish uchun asosiy manzil' : 'Asosiy sifatida belgilash'}
                      </span>
                      {!address.isDefault && (
                        <button className={`text-${primaryColor} text-sm font-medium`}>
                          Set as Default
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment Methods Tab */}
        {activeTab === 'payment' && (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">To'lov usullari</h2>
              <button className={`text-${primaryColor} hover:text-${primaryColor}/80 flex items-center text-sm font-medium`}>
                <PlusCircleIcon className="w-4 h-4 mr-1" />
                To'lov usulini qo'shish
              </button>
            </div>

            <div className="space-y-4">
              {user.paymentMethods.map((method) => (
                <div key={method.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 flex items-center">
                          {method.type === 'credit_card' ? 'Kredit karta' : 'PayPal'}
                          {method.isDefault && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Default
                            </span>
                          )}
                        </h3>
                      </div>
                      <div className="flex space-x-3">
                        <button className={`text-${primaryColor} hover:text-${primaryColor}/80 text-sm font-medium`}>
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2">
                      {method.type === 'credit_card' && (
                        <div className="flex items-center">
                          <div className="bg-gray-100 rounded p-2 mr-3">
                            <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-900">•••• •••• •••• {method.lastFour}</p>
                            <p className="text-xs text-gray-500">Amal qilish muddati: {method.expiryDate}</p>
                          </div>
                        </div>
                      )}
                      {method.type === 'paypal' && (
                        <div className="flex items-center">
                          <div className="bg-gray-100 rounded p-2 mr-3">
                            <svg className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.641.641 0 0 1 .632-.54h6.012c2.658 0 4.53.625 5.225 1.74.605.96.76 1.965.455 3.235l-.03.136v.374c-.123 3.3-2.603 5.33-6.876 5.33h-1.75a.75.75 0 0 0-.742.639l-.996 6.288a.639.639 0 0 1-.632.541l-.166-.006z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-900">PayPal</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {method.isDefault ? 'Asosiy to\'lov usuli' : 'Asosiy sifatida belgilash'}
                      </span>
                      {!method.isDefault && (
                        <button className={`text-${primaryColor} text-sm font-medium`}>
                          Set as Default
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="p-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Bildirishnoma sozlamalari</h2>
              
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 space-y-4">
                  <div className="flex items-start space-x-3 pb-3 border-b border-gray-100">
                    <div className="flex-shrink-0 pt-0.5">
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="order-updates" defaultChecked className="sr-only peer" />
                        <div className={`block w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-${primaryColor} peer`}></div>
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:left-5"></div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="order-updates" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Buyurtma yangilanishlari
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Buyurtmangiz holati va yetkazib berish yangiliklari haqida bildirishnomalarni oling.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 pb-3 border-b border-gray-100">
                    <div className="flex-shrink-0 pt-0.5">
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="promotions" defaultChecked className="sr-only peer" />
                        <div className={`block w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-${primaryColor} peer`}></div>
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:left-5"></div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="promotions" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Aksiyalar va takliflar
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Maxsus takliflar, chegirmalar va mavsumiy aksiyalar haqida bildirishnomalarni oling.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 pt-0.5">
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="newsletter" className="sr-only peer" />
                        <div className={`block w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-${primaryColor} peer`}></div>
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:left-5"></div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="newsletter" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Yangiliklar
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Fermerlik maslahatlari va retseptlari bilan oylik yangiliklar byulletenini oling.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Ilova sozlamalari</h2>
              
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 pt-0.5">
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="dark-mode" className="sr-only peer" />
                        <div className={`block w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-${primaryColor} peer`}></div>
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:left-5"></div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="dark-mode" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Qorong'i rejim
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Ilova uchun qorong'i mavzudan foydalaning.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className={`px-6 py-2 bg-${primaryColor} text-white font-medium rounded-lg hover:bg-${primaryColor}/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${primaryColor}`}>
                Sozlamalarni saqlash
              </button>
            </div>
          </div>
        )}
        
        {/* Farm Details Tab - Farmer Only */}
        {activeTab === 'farm' && userRole === 'farmer' && (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Ferma ma'lumotlari</h2>
              <button className={`text-${primaryColor} hover:text-${primaryColor}/80 flex items-center text-sm font-medium`}>
                <PencilIcon className="w-4 h-4 mr-1" />
                Tahrirlash
              </button>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center border-b border-gray-200 pb-3">
                    <div className="w-1/3">
                      <span className="text-sm font-medium text-gray-500">Ferma nomi</span>
                    </div>
                    <div className="w-2/3">
                      <span className="text-sm text-gray-900">Alpamosh</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center border-b border-gray-200 pb-3">
                    <div className="w-1/3">
                      <span className="text-sm font-medium text-gray-500">Ferma turi</span>
                    </div>
                    <div className="w-2/3">
                      <span className="text-sm text-gray-900">Organik mahsulotlar</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center border-b border-gray-200 pb-3">
                    <div className="w-1/3">
                      <span className="text-sm font-medium text-gray-500">Joylashuv</span>
                    </div>
                    <div className="w-2/3">
                      <span className="text-sm text-gray-900">Bahor mahallasi,Xorazm, Uzbekistan</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center border-b border-gray-200 pb-3">
                    <div className="w-1/3">
                      <span className="text-sm font-medium text-gray-500">Hajmi</span>
                    </div>
                    <div className="w-2/3">
                      <span className="text-sm text-gray-900">25 gektar</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-1/3">
                      <span className="text-sm font-medium text-gray-500">Tavsif</span>
                    </div>
                    <div className="w-2/3">
                      <p className="text-sm text-gray-900">Yashil Vodiy Organik - bu organik meva va sabzavotlarga ixtisoslashgan oilaviy ferma. Biz 15 yildan ortiq vaqt davomida barqaror amaliyotlardan foydalangan holda dehqonchilik qilib kelmoqdamiz.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Banking Info Tab - Farmer Only */}
        {activeTab === 'banking' && userRole === 'farmer' && (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Bank ma'lumotlari</h2>
              <button className={`text-${primaryColor} hover:text-${primaryColor}/80 flex items-center text-sm font-medium`}>
                <PencilIcon className="w-4 h-4 mr-1" />
                Tahrirlash
              </button>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center border-b border-gray-200 pb-3">
                    <div className="w-1/3">
                      <span className="text-sm font-medium text-gray-500">Hisob egasi</span>
                    </div>
                    <div className="w-2/3">
                      <span className="text-sm text-gray-900">Islam Isnatdinov</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center border-b border-gray-200 pb-3">
                    <div className="w-1/3">
                      <span className="text-sm font-medium text-gray-500">Bank nomi</span>
                    </div>
                    <div className="w-2/3">
                      <span className="text-sm text-gray-900">Turan Bank</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center border-b border-gray-200 pb-3">
                    <div className="w-1/3">
                      <span className="text-sm font-medium text-gray-500">Hisob turi</span>
                    </div>
                    <div className="w-2/3">
                      <span className="text-sm text-gray-900">Biznes hisob</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center border-b border-gray-200 pb-3">
                    <div className="w-1/3">
                      <span className="text-sm font-medium text-gray-500">Hisob raqami</span>
                    </div>
                    <div className="w-2/3">
                      <span className="text-sm text-gray-900">••••••••5678</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-1/3">
                      <span className="text-sm font-medium text-gray-500">Bank routing raqami</span>
                    </div>
                    <div className="w-2/3">
                      <span className="text-sm text-gray-900">••••••1234</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-md font-semibold text-gray-800 mb-4">To'lovlar tarixi</h3>
              
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">2025-yil may to'lovi</h4>
                        <p className="text-xs text-gray-500">2025-yil 5-mayda qayta ishlangan</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">1 245,00 so'm</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">2025-yil aprel to'lovi</h4>
                        <p className="text-xs text-gray-500">2025-yil 5-aprelda qayta ishlangan</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">987,50 so'm</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">2025-yil mart to'lovi</h4>
                        <p className="text-xs text-gray-500">2025-yil 5-martda qayta ishlangan</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">1 102,75 so'm</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                  <button className={`text-${primaryColor} text-sm font-medium flex items-center`}>
                    Barcha tranzaksiyalarni ko'rish
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
