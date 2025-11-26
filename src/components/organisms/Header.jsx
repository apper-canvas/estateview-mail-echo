import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/utils/cn";

const Header = ({ onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { favoritesCount } = useFavorites();
  const location = useLocation();

  const navigation = [
    { name: "Browse Listings", href: "/", icon: "Home" },
    { name: "Favorites", href: "/favorites", icon: "Heart" },
    { name: "About", href: "/about", icon: "Info" },
    { name: "Contact", href: "/contact", icon: "Mail" }
  ];

  const isActive = (href) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Home" size={20} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-primary">EstateView</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                  isActive(item.href)
                    ? "text-primary bg-primary/5"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                )}
              >
                <ApperIcon name={item.icon} size={16} />
                <span>{item.name}</span>
                {item.href === "/favorites" && favoritesCount > 0 && (
                  <span className="bg-accent text-white text-xs px-1.5 py-0.5 rounded-full">
                    {favoritesCount}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block w-80">
            <SearchBar
              placeholder="Search locations..."
              onSearch={onSearch}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
          >
            <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Search Bar - Mobile */}
        <div className="lg:hidden py-3 border-t border-gray-100">
          <SearchBar
            placeholder="Search locations..."
            onSearch={onSearch}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="px-4 py-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3 py-3 rounded-md text-base font-medium transition-colors duration-200",
                    isActive(item.href)
                      ? "text-primary bg-primary/5"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <ApperIcon name={item.icon} size={20} />
                    <span>{item.name}</span>
                  </div>
                  {item.href === "/favorites" && favoritesCount > 0 && (
                    <span className="bg-accent text-white text-sm px-2 py-1 rounded-full">
                      {favoritesCount}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;