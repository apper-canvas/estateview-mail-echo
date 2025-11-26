import { motion } from "framer-motion";
import { useState } from "react";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import PropertySpecs from "@/components/molecules/PropertySpecs";
import FavoriteButton from "@/components/molecules/FavoriteButton";
import PropertyDetail from "@/components/organisms/PropertyDetail";
import ApperIcon from "@/components/ApperIcon";
import { useFavorites } from "@/hooks/useFavorites";

const PropertyCard = ({ property, className = "" }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isPropertyFavorite, toggleFavorite } = useFavorites();

  const isFavorite = isPropertyFavorite(property.Id);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(property.Id);
  };

  const handleCardClick = () => {
    setIsDetailOpen(true);
  };

  return (
    <>
      <motion.div
        className={`cursor-pointer ${className}`}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        onClick={handleCardClick}
      >
        <Card className="overflow-hidden h-full">
          {/* Image */}
          <div className="relative h-48 bg-gray-200">
            {!imageError ? (
              <img
                src={property.images?.[0]}
                alt={property.title}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <ApperIcon name="ImageOff" size={48} />
              </div>
            )}
            
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            
            {/* Status Badge */}
            <div className="absolute top-3 left-3">
              <Badge variant={property.status === "For Sale" ? "primary" : "accent"}>
                {property.status}
              </Badge>
            </div>

            {/* Favorite Button */}
            <div className="absolute top-3 right-3">
              <FavoriteButton
                isFavorite={isFavorite}
                onToggle={handleToggleFavorite}
                size="sm"
                variant="floating"
              />
            </div>

            {/* Property Type */}
            <div className="absolute bottom-3 left-3">
              <Badge variant="default" className="bg-white/90 text-gray-800">
                {property.propertyType}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-display font-semibold text-lg text-gray-900 line-clamp-1">
                {property.title}
              </h3>
              <p className="text-gray-600 text-sm flex items-center mt-1">
                <ApperIcon name="MapPin" size={14} className="mr-1" />
                {property.address}, {property.city}, {property.state}
              </p>
            </div>

            <PropertySpecs property={property} variant="compact" />

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="text-right">
                <div className="text-2xl font-display font-bold text-primary">
                  {property.status === "For Rent" 
                    ? `$${property.price.toLocaleString()}/mo`
                    : `$${property.price.toLocaleString()}`
                  }
                </div>
                <div className="text-xs text-gray-500">
                  Listed {new Date(property.listingDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Property Detail Modal */}
      {isDetailOpen && (
        <PropertyDetail
          property={property}
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
        />
      )}
    </>
  );
};

export default PropertyCard;