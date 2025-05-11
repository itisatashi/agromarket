import React, { useState } from 'react';
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
    state: string;
    zipCode: string;
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
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  role: 'customer',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  addresses: [
    {
      id: 'ADDR-001',
      type: 'shipping',
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      country: 'USA',
      isDefault: true,
    },
    {
      id: 'ADDR-002',
      type: 'billing',
      street: '456 Oak Ave',
      city: 'Somewhere',
      state: 'NY',
      zipCode: '67890',
      country: 'USA',
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
    },
    {
      id: 'PAY-002',
      type: 'paypal',
      isDefault: false,
    },
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
        { id: 'profile', label: 'Profile', icon: <UserIcon className="w-5 h-5" /> },
        { id: 'farm', label: 'Farm', icon: <BuildingStorefrontIcon className="w-5 h-5" /> },
        { id: 'banking', label: 'Banking', icon: <BanknotesIcon className="w-5 h-5" /> },
        { id: 'addresses', label: 'Addresses', icon: <MapPinIcon className="w-5 h-5" /> },
        { id: 'preferences', label: 'Preferences', icon: <BellIcon className="w-5 h-5" /> }
      ];
    } else {
      return [
        { id: 'profile', label: 'Profile', icon: <UserIcon className="w-5 h-5" /> },
        { id: 'addresses', label: 'Addresses', icon: <MapPinIcon className="w-5 h-5" /> },
        { id: 'payment', label: 'Payment', icon: <CreditCardIcon className="w-5 h-5" /> },
        { id: 'preferences', label: 'Preferences', icon: <BellIcon className="w-5 h-5" /> }
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
                  {userRole === 'farmer' ? 'Farmer' : 'Customer'}
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
                <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
                <button
                  className={`text-${primaryColor} hover:text-${primaryColor}/80 flex items-center text-sm font-medium`}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <>
                      <XMarkIcon className="w-4 h-4 mr-1" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <PencilIcon className="w-4 h-4 mr-1" />
                      Edit
                    </>
                  )}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:outline-none transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:outline-none transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:outline-none transition-colors"
                        placeholder="+1 (123) 456-7890"
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
                        Save Changes
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
                          <span className="text-sm font-medium text-gray-500">Full Name</span>
                        </div>
                        <div className="w-2/3">
                          <span className="text-sm text-gray-900">{user.name}</span>
                        </div>
                      </div>
                      <div className="flex items-center border-b border-gray-200 pb-3">
                        <div className="w-1/3">
                          <span className="text-sm font-medium text-gray-500">Email</span>
                        </div>
                        <div className="w-2/3">
                          <span className="text-sm text-gray-900">{user.email}</span>
                        </div>
                      </div>
                      <div className="flex items-center border-b border-gray-200 pb-3">
                        <div className="w-1/3">
                          <span className="text-sm font-medium text-gray-500">Phone</span>
                        </div>
                        <div className="w-2/3">
                          <span className="text-sm text-gray-900">{user.phone}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-1/3">
                          <span className="text-sm font-medium text-gray-500">Account Type</span>
                        </div>
                        <div className="w-2/3">
                          <span className="text-sm text-gray-900 capitalize">{userRole}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Account Security</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Password</p>
                          <p className="text-xs text-gray-500">Last changed 3 months ago</p>
                        </div>
                        <button className={`text-${primaryColor} text-sm font-medium flex items-center`}>
                          Change
                          <ChevronRightIcon className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Two-Factor Authentication</p>
                          <p className="text-xs text-gray-500">Not enabled</p>
                        </div>
                        <button className={`text-${primaryColor} text-sm font-medium flex items-center`}>
                          Enable
                          <ChevronRightIcon className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-center">
                      <button className="text-white bg-red-500 hover:bg-red-600 text-sm font-medium flex items-center justify-center px-4 py-2 rounded-lg w-full">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
                        Log out
                      </button>
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
              <h2 className="text-lg font-semibold text-gray-800">Your Addresses</h2>
              <button className={`text-${primaryColor} hover:text-${primaryColor}/80 flex items-center text-sm font-medium`}>
                <PlusCircleIcon className="w-4 h-4 mr-1" />
                Add New Address
              </button>
            </div>

            <div className="space-y-4">
              {user.addresses.map((address) => (
                <div key={address.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 capitalize flex items-center">
                          {address.type} Address
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
                        {address.city}, {address.state} {address.zipCode}
                      </p>
                      <p>{address.country}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {address.isDefault ? 'Default address for shipping' : 'Set as default'}
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
              <h2 className="text-lg font-semibold text-gray-800">Payment Methods</h2>
              <button className={`text-${primaryColor} hover:text-${primaryColor}/80 flex items-center text-sm font-medium`}>
                <PlusCircleIcon className="w-4 h-4 mr-1" />
                Add Payment Method
              </button>
            </div>

            <div className="space-y-4">
              {user.paymentMethods.map((method) => (
                <div key={method.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 flex items-center">
                          {method.type === 'credit_card' ? 'Credit Card' : 'PayPal'}
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
                            <p className="text-xs text-gray-500">Expires {method.expiryDate}</p>
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
                        {method.isDefault ? 'Default payment method' : 'Set as default'}
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
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h2>
              
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
                        Order Updates
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Receive notifications about your order status and shipping updates.
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
                        Promotions and Deals
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Receive notifications about special offers, discounts, and seasonal deals.
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
                        Newsletter
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Receive our monthly newsletter with farming tips and recipes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">App Preferences</h2>
              
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
                        Dark Mode
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Use dark theme for the application.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className={`px-6 py-2 bg-${primaryColor} text-white font-medium rounded-lg hover:bg-${primaryColor}/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${primaryColor}`}>
                Save Preferences
              </button>
            </div>
          </div>
        )}
        
        {/* Farm Details Tab - Farmer Only */}
        {activeTab === 'farm' && userRole === 'farmer' && (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Farm Details</h2>
              <button className={`text-${primaryColor} hover:text-${primaryColor}/80 flex items-center text-sm font-medium`}>
                <PencilIcon className="w-4 h-4 mr-1" />
                Edit
              </button>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center border-b border-gray-200 pb-3">
                    <div className="w-1/3">
                      <span className="text-sm font-medium text-gray-500">Farm Name</span>
                    </div>
                    <div className="w-2/3">
                      <span className="text-sm text-gray-900">Green Valley Organics</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center border-b border-gray-200 pb-3">
                    <div className="w-1/3">
                      <span className="text-sm font-medium text-gray-500">Farm Type</span>
                    </div>
                    <div className="w-2/3">
                      <span className="text-sm text-gray-900">Organic Produce</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center border-b border-gray-200 pb-3">
                    <div className="w-1/3">
                      <span className="text-sm font-medium text-gray-500">Location</span>
                    </div>
                    <div className="w-2/3">
                      <span className="text-sm text-gray-900">Anytown, CA, USA</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center border-b border-gray-200 pb-3">
                    <div className="w-1/3">
                      <span className="text-sm font-medium text-gray-500">Size</span>
                    </div>
                    <div className="w-2/3">
                      <span className="text-sm text-gray-900">25 acres</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-1/3">
                      <span className="text-sm font-medium text-gray-500">Description</span>
                    </div>
                    <div className="w-2/3">
                      <p className="text-sm text-gray-900">Green Valley Organics is a family-owned farm specializing in organic fruits and vegetables. We've been farming using sustainable practices for over 15 years.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-md font-semibold text-gray-800 mb-4">Certifications</h3>
              
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">USDA Organic</h4>
                        <p className="text-xs text-gray-500">Expires: 12/31/2025</p>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Non-GMO Project Verified</h4>
                        <p className="text-xs text-gray-500">Expires: 06/30/2025</p>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
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
              <h2 className="text-lg font-semibold text-gray-800">Banking Information</h2>
              <button className={`text-${primaryColor} hover:text-${primaryColor}/80 flex items-center text-sm font-medium`}>
                <PencilIcon className="w-4 h-4 mr-1" />
                Edit
              </button>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center border-b border-gray-200 pb-3">
                    <div className="w-1/3">
                      <span className="text-sm font-medium text-gray-500">Account Holder</span>
                    </div>
                    <div className="w-2/3">
                      <span className="text-sm text-gray-900">John Doe</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center border-b border-gray-200 pb-3">
                    <div className="w-1/3">
                      <span className="text-sm font-medium text-gray-500">Bank Name</span>
                    </div>
                    <div className="w-2/3">
                      <span className="text-sm text-gray-900">First National Bank</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center border-b border-gray-200 pb-3">
                    <div className="w-1/3">
                      <span className="text-sm font-medium text-gray-500">Account Type</span>
                    </div>
                    <div className="w-2/3">
                      <span className="text-sm text-gray-900">Business Checking</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center border-b border-gray-200 pb-3">
                    <div className="w-1/3">
                      <span className="text-sm font-medium text-gray-500">Account Number</span>
                    </div>
                    <div className="w-2/3">
                      <span className="text-sm text-gray-900">••••••••5678</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-1/3">
                      <span className="text-sm font-medium text-gray-500">Routing Number</span>
                    </div>
                    <div className="w-2/3">
                      <span className="text-sm text-gray-900">••••••1234</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-md font-semibold text-gray-800 mb-4">Payment History</h3>
              
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">May 2025 Payout</h4>
                        <p className="text-xs text-gray-500">Processed on May 5, 2025</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">$1,245.00</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">April 2025 Payout</h4>
                        <p className="text-xs text-gray-500">Processed on April 5, 2025</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">$987.50</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">March 2025 Payout</h4>
                        <p className="text-xs text-gray-500">Processed on March 5, 2025</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">$1,102.75</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                  <button className={`text-${primaryColor} text-sm font-medium flex items-center`}>
                    View All Transactions
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
