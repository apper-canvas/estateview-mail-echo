import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import Button from "@/components/atoms/Button";
import { useFavorites } from "@/hooks/useFavorites";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";

const Favorites = () => {
  const { favoriteProperties, loading, favoritesCount } = useFavorites();
  const [sortBy, setSortBy] = useState("newest");
  const [sortedProperties, setSortedProperties] = useState([]);

  useEffect(() => {
    let sorted = [...favoriteProperties];
    
    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sorted.sort((a, b) => new Date(b.listingDate) - new Date(a.listingDate));
        break;
      case "sqft":
        sorted.sort((a, b) => b.squareFeet - a.squareFeet);
        break;
      default:
        break;
    }
    
    setSortedProperties(sorted);
  }, [favoriteProperties, sortBy]);

  if (!loading && favoritesCount === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Your Favorites
            </h1>
            <p className="text-lg text-gray-600">
              Properties you've saved will appear here.
            </p>
          </div>

          <Empty
            title="No favorite properties yet"
            message="Start exploring properties and add them to your favorites to create your personal collection."
            actionLabel="Browse Properties"
            actionPath="/"
            icon="Heart"
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-display font-bold text-gray-900">
              Your Favorites
            </h1>
            <Link to="/">
              <Button variant="outline" icon="Plus">
                Find More Properties
              </Button>
            </Link>
          </div>
          <p className="text-lg text-gray-600">
            {favoritesCount} {favoritesCount === 1 ? "property" : "properties"} saved to your favorites
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="sqft">Square Footage</option>
            </select>
          </div>
          
          <div className="text-sm text-gray-500">
            {sortedProperties.length} {sortedProperties.length === 1 ? "property" : "properties"}
          </div>
        </div>

        {/* Property Grid */}
        <PropertyGrid
          properties={sortedProperties}
          loading={loading}
          error=""
          onRetry={() => {}}
        />

        {/* Additional Actions */}
        {sortedProperties.length > 0 && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8">
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                Ready to Take the Next Step?
              </h3>
              <p className="text-gray-600 mb-6">
                Contact an agent to schedule tours, get more information, or make an offer on your favorite properties.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" icon="Calendar">
                  Schedule Tours
                </Button>
                <Button variant="secondary" icon="Phone">
                  Contact Agent
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Favorites;