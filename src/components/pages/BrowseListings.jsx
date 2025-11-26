import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FilterSidebar from "@/components/organisms/FilterSidebar";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import propertyService from "@/services/api/propertyService";

const BrowseListings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 5000000,
    propertyTypes: [],
    bedrooms: null,
    bathrooms: null,
    location: "",
    sortBy: "newest"
  });

  const loadProperties = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await propertyService.getByFilters(filters);
      setProperties(data);
    } catch (err) {
      setError("Failed to load properties. Please try again.");
      console.error("Error loading properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, [filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRetry = () => {
    loadProperties();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Find Your Perfect Property
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover amazing properties in your area. Use our advanced filters to find exactly what you're looking for.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            </div>
          </aside>

          {/* Main Content - Property Grid */}
          <main className="flex-1">
            <PropertyGrid
              properties={properties}
              loading={loading}
              error={error}
              onRetry={handleRetry}
            />
          </main>
        </div>
      </motion.div>
    </div>
  );
};

export default BrowseListings;