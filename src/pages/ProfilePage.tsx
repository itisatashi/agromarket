import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
  const [user, setUser] = useState<User>(mockUser);
  // Different tabs for different user roles
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
        { id: 'profile', label: 'Profile' },
        { id: 'farm', label: 'Farm Details' },
        { id: 'banking', label: 'Banking Info' },
        { id: 'addresses', label: 'Addresses' },
        { id: 'preferences', label: 'Preferences' }
      ];
    } else {
      return [
        { id: 'profile', label: 'Profile' },
        { id: 'addresses', label: 'Addresses' },
        { id: 'payment', label: 'Payment Methods' },
        { id: 'preferences', label: 'Preferences' }
      ];
    }
  };

  const tabs = getTabs();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className={`${userRole === 'farmer' ? 'bg-secondary' : 'bg-primary'} p-6 text-white`}>
          <div className="flex items-center">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full border-4 border-white"
            />
            <div className="ml-6">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-200">{user.email}</p>
              <p className="text-gray-200">{user.phone}</p>
              <div className="mt-2">
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${userRole === 'farmer' ? 'bg-accent text-white' : 'bg-white text-primary'}`}>
                  {userRole === 'farmer' ? 'Farmer' : 'Customer'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === tab.id ? `border-${userRole === 'farmer' ? 'secondary' : 'primary'} text-${userRole === 'farmer' ? 'secondary' : 'primary'}` : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                onClick={() => setActiveTab(tab.id as any)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Profile Information */}
          {activeTab === 'profile' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Profile Information</h2>
                <button
                  className={`text-${userRole === 'farmer' ? 'secondary' : 'primary'} hover:text-${userRole === 'farmer' ? 'secondary' : 'primary'}-dark`}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-${userRole === 'farmer' ? 'secondary' : 'primary'} focus:border-${userRole === 'farmer' ? 'secondary' : 'primary'}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-${userRole === 'farmer' ? 'secondary' : 'primary'} focus:border-${userRole === 'farmer' ? 'secondary' : 'primary'}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-${userRole === 'farmer' ? 'secondary' : 'primary'} focus:border-${userRole === 'farmer' ? 'secondary' : 'primary'}`}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-${userRole === 'farmer' ? 'secondary' : 'primary'} hover:bg-${userRole === 'farmer' ? 'secondary' : 'primary'}-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${userRole === 'farmer' ? 'secondary' : 'primary'}`}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                      <p className="mt-1 text-sm text-gray-900">{user.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                      <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                      <p className="mt-1 text-sm text-gray-900">{user.phone}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Account Type</h3>
                      <p className="mt-1 text-sm text-gray-900 capitalize">{userRole}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Addresses */}
          {activeTab === 'addresses' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Your Addresses</h2>
                <button className="text-primary hover:text-primary-dark text-sm font-medium">
                  Add New Address
                </button>
              </div>

              <div className="space-y-6">
                {user.addresses.map((address) => (
                  <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 capitalize">
                          {address.type} Address
                          {address.isDefault && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Default
                            </span>
                          )}
                        </h3>
                        <div className="mt-2 text-sm text-gray-500">
                          <p>{address.street}</p>
                          <p>
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                          <p>{address.country}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-primary hover:text-primary-dark text-sm font-medium">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Methods */}
          {activeTab === 'payment' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Payment Methods</h2>
                <button className="text-primary hover:text-primary-dark text-sm font-medium">
                  Add Payment Method
                </button>
              </div>

              <div className="space-y-6">
                {user.paymentMethods.map((method) => (
                  <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {method.type === 'credit_card' ? 'Credit Card' : 'PayPal'}
                          {method.isDefault && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Default
                            </span>
                          )}
                        </h3>
                        {method.type === 'credit_card' && (
                          <p className="mt-1 text-sm text-gray-500">
                            •••• •••• •••• {method.lastFour} | Expires {method.expiryDate}
                          </p>
                        )}
                        {method.type === 'paypal' && (
                          <p className="mt-1 text-sm text-gray-500">{user.email}</p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-primary hover:text-primary-dark text-sm font-medium">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preferences */}
          {activeTab === 'preferences' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6">Notification Preferences</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="order-updates"
                          name="order-updates"
                          type="checkbox"
                          defaultChecked
                          className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="order-updates" className="font-medium text-gray-700">
                          Order Updates
                        </label>
                        <p className="text-gray-500">
                          Receive emails about your order status and shipping updates.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="promotions"
                          name="promotions"
                          type="checkbox"
                          defaultChecked
                          className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="promotions" className="font-medium text-gray-700">
                          Promotions and Deals
                        </label>
                        <p className="text-gray-500">
                          Receive emails about special offers, discounts, and seasonal deals.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="newsletter"
                          name="newsletter"
                          type="checkbox"
                          className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="newsletter" className="font-medium text-gray-700">
                          Newsletter
                        </label>
                        <p className="text-gray-500">
                          Receive our monthly newsletter with farming tips and recipes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900">App Preferences</h3>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="dark-mode"
                          name="dark-mode"
                          type="checkbox"
                          className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="dark-mode" className="font-medium text-gray-700">
                          Dark Mode
                        </label>
                        <p className="text-gray-500">Use dark theme for the application.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Actions */}
      <div className="mt-6 flex justify-center">
        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
