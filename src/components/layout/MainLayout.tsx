import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import BottomNavBar from "./BottomNavBar";

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [userRole, setUserRole] = useState<"customer" | "farmer" | "admin">(
    "customer"
  );
  const isAdminPage = location.pathname.includes("/admin-");

  // This would normally come from authentication context
  // For now, we'll detect based on URL for demo purposes
  useEffect(() => {
    if (location.pathname.includes("/admin-")) {
      setUserRole("admin");
    } else if (location.pathname.includes("/farmer-")) {
      setUserRole("farmer");
    } else {
      setUserRole("customer");
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Only show Navbar for admin users */}
      {userRole === "admin" && (
        <div className="hidden md:block">
          <Navbar />
        </div>
      )}
      <main className="flex-grow pb-16">
        <Outlet />
      </main>
      <BottomNavBar userRole={userRole} />
    </div>
  );
};

export default MainLayout;
