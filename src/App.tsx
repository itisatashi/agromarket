import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./components/layout/MainLayout";

// Pages
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import FarmerDashboardPage from "./pages/FarmerDashboardPage";
import FarmerProductsPage from "./pages/FarmerProductsPage";
import FarmerOrdersPage from "./pages/FarmerOrdersPage";
import FarmerAnalyticsPage from "./pages/FarmerAnalyticsPage";
import ProfilePage from "./pages/ProfilePageNew"; // Using the redesigned profile page
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminUserManagementPage from "./pages/AdminUserManagementPage";
import AdminProductManagementPage from "./pages/AdminProductManagementPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Flow */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginRegisterPage />} />

        {/* Main App */}
        <Route path="app" element={<MainLayout />}>
          {/* Customer Routes */}
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductListingPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route
            path="profile"
            element={<ProfilePage userRole="customer" />}
          />

          {/* Farmer Routes */}
          <Route path="farmer-dashboard" element={<FarmerDashboardPage />} />
          <Route path="farmer-products" element={<FarmerProductsPage />} />
          <Route path="farmer-orders" element={<FarmerOrdersPage />} />
          <Route path="farmer-analytics" element={<FarmerAnalyticsPage />} />
          <Route
            path="farmer-profile"
            element={<ProfilePage userRole="farmer" />}
          />

          {/* Admin Routes - with role protection */}
          <Route path="admin-dashboard" element={<AdminDashboardPage />} />
          <Route path="admin-users" element={<AdminUserManagementPage />} />
          <Route
            path="admin-products"
            element={<AdminProductManagementPage />}
          />
          <Route
            path="admin-profile"
            element={<ProfilePage userRole="admin" />}
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
