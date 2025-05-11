import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface NavbarProps {
  userRole?: 'customer' | 'farmer' | 'admin';
}

const Navbar: React.FC<NavbarProps> = ({ userRole = 'customer' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // For demo purposes, default to logged in
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // For mobile-only approach, detect screen size
  const [isMobile, setIsMobile] = useState(true);
  
  // Add scroll event listener to make navbar more compact when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Check if screen is mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // If it's a farmer or customer on desktop, we don't show this navbar at all
  // Only show for admin on desktop, or for mobile users
  if ((userRole === 'farmer' || userRole === 'customer') && !isMobile) {
    return null;
  }
  
  return (
    <nav className={`bg-white shadow-md sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'py-1' : 'py-2'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/app" className="flex-shrink-0 flex items-center">
              <span className={`text-primary font-heading font-bold ${isScrolled ? 'text-lg' : 'text-xl'}`}>AgroMarket</span>
            </Link>
          </div>

          {/* Search Icon (Mobile) */}
          {userRole === 'customer' && (
            <div className="flex items-center">
              <Link to="/app/search" className="p-2 text-text-primary">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </Link>
            </div>
          )}

          {/* Desktop Navigation - Only for admin */}
          {userRole === 'admin' && !isMobile && (
            <div className="hidden md:flex md:items-center md:space-x-8">
              <div className="flex space-x-8">
                <Link to="/app" className="text-text-primary hover:text-primary text-sm font-medium">
                  Home
                </Link>
                <Link to="/app/admin-dashboard" className="text-text-primary hover:text-primary text-sm font-medium">
                  Dashboard
                </Link>
                <Link to="/app/admin-users" className="text-text-primary hover:text-primary text-sm font-medium">
                  Users
                </Link>
                <Link to="/app/admin-products" className="text-text-primary hover:text-primary text-sm font-medium">
                  Products
                </Link>
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-primary hover:text-primary focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute w-full bg-white shadow-lg z-50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/app" 
              className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-primary hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {/* Customer links */}
            {userRole === 'customer' && (
              <>
                <Link 
                  to="/app/products" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  to="/app/cart" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cart
                </Link>
                <Link 
                  to="/app/orders" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Orders
                </Link>
                <Link 
                  to="/app/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
              </>
            )}
            
            {/* Farmer links */}
            {userRole === 'farmer' && (
              <>
                <Link 
                  to="/app/farmer-dashboard" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/app/farmer-products" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  to="/app/farmer-orders" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Orders
                </Link>
                <Link 
                  to="/app/farmer-analytics" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Analytics
                </Link>
                <Link 
                  to="/app/farmer-profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
              </>
            )}
            
            {/* Admin links */}
            {userRole === 'admin' && (
              <>
                <Link 
                  to="/app/admin-dashboard" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/app/admin-users" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Users
                </Link>
                <Link 
                  to="/app/admin-products" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  to="/app/admin-profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
              </>
            )}
          </div>

          {/* User Actions (Mobile) */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2 space-y-1">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-primary hover:bg-gray-50"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-primary hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/login" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-primary hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
