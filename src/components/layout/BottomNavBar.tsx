import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ShoppingCartIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  ChartBarIcon,
  ArchiveBoxIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  ShoppingCartIcon as ShoppingCartIconSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
  UserIcon as UserIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  ArchiveBoxIcon as ArchiveBoxIconSolid,
  BellIcon as BellIconSolid,
} from "@heroicons/react/24/solid";

// Define interface for navigation items
interface NavItem {
  name: string;
  path: string;
  icon: React.ForwardRefExoticComponent<any>;
  activeIcon: React.ForwardRefExoticComponent<any>;
  badge?: number;
}

// Define navigation items for different user roles
const customerNavItems: NavItem[] = [
  { name: "Home", path: "/app", icon: HomeIcon, activeIcon: HomeIconSolid },
  {
    name: "Cart",
    path: "/app/cart",
    icon: ShoppingCartIcon,
    activeIcon: ShoppingCartIconSolid,
  },
  {
    name: "Orders",
    path: "/app/orders",
    icon: ClipboardDocumentListIcon,
    activeIcon: ClipboardDocumentListIconSolid,
  },
  {
    name: "Profile",
    path: "/app/profile",
    icon: UserIcon,
    activeIcon: UserIconSolid,
  },
];

const farmerNavItems: NavItem[] = [
  {
    name: "Dashboard",
    path: "/app/farmer-dashboard",
    icon: HomeIcon,
    activeIcon: HomeIconSolid,
    badge: 3,
  },
  {
    name: "Products",
    path: "/app/farmer-products",
    icon: ArchiveBoxIcon,
    activeIcon: ArchiveBoxIconSolid,
  },
  {
    name: "Orders",
    path: "/app/farmer-orders",
    icon: ClipboardDocumentListIcon,
    activeIcon: ClipboardDocumentListIconSolid,
    badge: 2,
  },
  {
    name: "Analytics",
    path: "/app/farmer-analytics",
    icon: ChartBarIcon,
    activeIcon: ChartBarIconSolid,
  },
  {
    name: "Profile",
    path: "/app/farmer-profile",
    icon: UserIcon,
    activeIcon: UserIconSolid,
  },
];

interface BottomNavBarProps {
  userRole?: "customer" | "farmer" | "admin";
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({
  userRole = "customer",
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [hasNotifications, setHasNotifications] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Check if there are any notifications (for visual indicator)
  useEffect(() => {
    // In a real app, this would connect to a notification service
    const checkNotifications = async () => {
      // Simulate API call to check notifications
      try {
        // This would be an actual API call in a real app
        const hasUnread = userRole === "farmer" || userRole === "admin";
        setHasNotifications(hasUnread);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        setHasNotifications(false);
      }
    };
    
    checkNotifications();
    // Set up a periodic check (e.g., every minute)
    const intervalId = setInterval(checkNotifications, 60000);
    
    return () => clearInterval(intervalId);
  }, [userRole]);

  // Check if screen is mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Don't show bottom nav on admin pages
  if (currentPath.includes("/admin-")) {
    return null;
  }

  // For admin users, only show on mobile
  // For farmers and customers, always show
  if (userRole === "admin" && !isMobile) {
    return null;
  }

  // Select navigation items based on user role
  const navItems = userRole === "farmer" ? farmerNavItems : customerNavItems;

  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive =
            (item.path === "/app" &&
              (currentPath === "/app" || currentPath === "/app/")) ||
            (item.path !== "/app" && currentPath.startsWith(item.path));

          const Icon = isActive ? item.activeIcon : item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full ${
                isActive ? "text-primary" : "text-gray-500"
              }`}
            >
              <div className="relative">
                <Icon className="w-6 h-6" />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-xs text-white bg-accent rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavBar;
