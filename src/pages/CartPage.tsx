import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: 'Fresh Organic Tomatoes',
    price: 2.99,
    quantity: 2,
    unit: 'lb',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: 'Green Valley Farm'
  },
  {
    id: 5,
    name: 'Organic Kale',
    price: 2.49,
    quantity: 1,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: 'Green Thumb Gardens'
  },
  {
    id: 3,
    name: 'Organic Honey',
    price: 8.99,
    quantity: 1,
    unit: 'jar',
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: 'Bee Haven Apiaries'
  }
];

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Delivery fee
  const deliveryFee = 4.99;
  
  // Calculate total
  const total = subtotal + deliveryFee - promoDiscount;

  // Update quantity of an item
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Remove an item from cart
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Apply promo code
  const applyPromoCode = () => {
    // Mock promo code validation
    if (promoCode.toUpperCase() === 'FRESH10') {
      const discount = subtotal * 0.1; // 10% discount
      setPromoDiscount(discount);
      setPromoApplied(true);
    } else {
      setPromoDiscount(0);
      setPromoApplied(false);
      alert('Invalid promo code');
    }
  };

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold text-text-primary mb-8">Your Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            {/* Cart Items */}
            <div className="lg:col-span-7">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="py-6 flex">
                    <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>

                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-text-primary">
                          <h3>
                            <Link to={`/products/${item.id}`} className="hover:text-primary">
                              {item.name}
                            </Link>
                          </h3>
                          <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-text-secondary">Seller: {item.seller}</p>
                        <p className="mt-1 text-sm text-text-secondary">${item.price.toFixed(2)} per {item.unit}</p>
                      </div>
                      
                      <div className="flex-1 flex items-end justify-between text-sm">
                        <div className="flex items-center">
                          <button
                            type="button"
                            className="text-text-primary hover:text-primary"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <span className="mx-2 text-text-primary">{item.quantity}</span>
                          <button
                            type="button"
                            className="text-text-primary hover:text-primary"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-primary hover:text-primary/80"
                            onClick={() => removeItem(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6">
                <Link
                  to="/products"
                  className="flex items-center text-primary hover:text-primary/80"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-16 lg:mt-0 lg:col-span-5">
              <div className="bg-white rounded-lg shadow-sm px-6 py-6">
                <h2 className="text-lg font-medium text-text-primary">Order Summary</h2>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-text-secondary">Subtotal</p>
                    <p className="text-text-primary font-medium">${subtotal.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-text-secondary">Delivery Fee</p>
                    <p className="text-text-primary font-medium">${deliveryFee.toFixed(2)}</p>
                  </div>
                  
                  {promoApplied && (
                    <div className="flex items-center justify-between text-primary">
                      <p>Promo Discount</p>
                      <p>-${promoDiscount.toFixed(2)}</p>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <p className="text-lg font-medium text-text-primary">Total</p>
                    <p className="text-lg font-bold text-primary">${total.toFixed(2)}</p>
                  </div>
                </div>
                
                {/* Promo Code */}
                <div className="mt-6">
                  <label htmlFor="promo-code" className="block text-sm font-medium text-text-primary">
                    Promo Code
                  </label>
                  <div className="mt-1 flex space-x-2">
                    <input
                      type="text"
                      id="promo-code"
                      name="promo-code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                      placeholder="Enter code"
                    />
                    <button
                      type="button"
                      onClick={applyPromoCode}
                      className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-text-primary hover:bg-gray-200"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="mt-2 text-sm text-primary">Promo code applied!</p>
                  )}
                </div>
                
                {/* Checkout Button */}
                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full bg-primary border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Proceed to Checkout
                  </button>
                </div>
                
                {/* Secure Checkout Message */}
                <div className="mt-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-secondary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <p className="ml-2 text-sm text-text-secondary">Secure checkout</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="mt-4 text-2xl font-bold text-text-primary">Your cart is empty</h2>
            <p className="mt-2 text-text-secondary">Looks like you haven't added any products to your cart yet.</p>
            <div className="mt-6">
              <Link
                to="/products"
                className="btn-primary inline-block"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
