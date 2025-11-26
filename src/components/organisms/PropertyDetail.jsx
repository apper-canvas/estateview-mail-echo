import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import PropertySpecs from "@/components/molecules/PropertySpecs";
import ImageCarousel from "@/components/molecules/ImageCarousel";
import FavoriteButton from "@/components/molecules/FavoriteButton";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "react-toastify";

const PropertyDetail = ({ property, isOpen, onClose }) => {
  const { isPropertyFavorite, toggleFavorite } = useFavorites();

  const isFavorite = isPropertyFavorite(property.Id);
  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

const handleToggleFavorite = () => {
    toggleFavorite(property.Id);
  };
  const handleContact = () => {
    toast.info("Contact feature would connect with property agent");
  };

  const handleScheduleTour = () => {
    toast.info("Tour scheduling feature would open booking system");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <motion.div
              className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-4">
<Badge variant={property.status === "For Sale" ? "primary" : "accent"}>
                      {property.status}
                    </Badge>
                    <Badge variant="outline">{property.propertyType}</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <FavoriteButton
                      isFavorite={isFavorite}
                      onToggle={handleToggleFavorite}
                      size="lg"
                      variant="floating"
                    />
                    <button
                      onClick={onClose}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <ApperIcon name="X" size={24} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-120px)] custom-scrollbar">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                    {/* Left Column - Images */}
                    <div className="space-y-6">
                      <ImageCarousel 
                        images={property.images} 
                        title={property.title}
                        className="h-auto"
                      />
                    </div>

                    {/* Right Column - Details */}
                    <div className="space-y-6">
                      <div>
                        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
{property.title}
                        </h1>
                        <div className="flex items-center text-gray-600 mb-4">
                          <ApperIcon name="MapPin" size={16} className="mr-2" />
                          <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
                        </div>
                      </div>

                      <PropertySpecs property={property} variant="detailed" />

                      {/* Features */}
{property.features && property.features.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Features & Amenities</h3>
                          <div className="grid grid-cols-2 gap-2">
{property.features.map((feature, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <ApperIcon name="Check" size={16} className="text-green-500" />
                                <span className="text-sm text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button
                          variant="primary"
                          className="flex-1"
                          onClick={handleScheduleTour}
                          icon="Calendar"
                        >
                          Schedule Tour
                        </Button>
                        <Button
                          variant="secondary"
                          className="flex-1"
                          onClick={handleContact}
                          icon="Phone"
                        >
                          Contact Agent
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="px-6 pb-6">
<h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{property.description}</p>
                  </div>

                  {/* Location Map Placeholder */}
                  <div className="px-6 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Location</h3>
                    <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <ApperIcon name="Map" size={48} className="mx-auto mb-2" />
                        <p>Interactive map would be displayed here</p>
                        <p className="text-sm mt-1">
Coordinates: {property.coordinates?.lat}, {property.coordinates?.lng}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PropertyDetail;