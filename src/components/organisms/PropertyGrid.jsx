import { motion } from "framer-motion";
import PropertyCard from "@/components/organisms/PropertyCard";
import Loading from "@/components/ui/Loading";
import ErrorView from "@/components/ui/ErrorView";
import Empty from "@/components/ui/Empty";

const PropertyGrid = ({ 
  properties, 
  loading, 
  error, 
  onRetry,
  className = "" 
}) => {
  if (loading) {
    return <Loading type="properties" />;
  }

  if (error) {
    return (
      <ErrorView
        message={error}
        onRetry={onRetry}
        className="min-h-96"
      />
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <Empty
        title="No properties found"
        message="Try adjusting your search criteria or clear filters to see more properties."
        actionLabel="Clear Filters"
        icon="Home"
        className="min-h-96"
      />
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {properties.length} {properties.length === 1 ? "Property" : "Properties"} Found
        </h2>
      </div>

      {/* Property Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {properties.map((property, index) => (
          <motion.div
            key={property.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PropertyGrid;