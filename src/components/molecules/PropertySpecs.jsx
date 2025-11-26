import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const PropertySpecs = ({ property, variant = "default", className = "" }) => {
  const formatPrice = (price) => {
    if (property.status === "For Rent") {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${price.toLocaleString()}`;
  };

  const formatSquareFeet = (sqft) => {
    return `${sqft.toLocaleString()} sq ft`;
  };

  const specs = [
    {
      icon: "Bed",
      value: property.bedrooms,
      label: property.bedrooms === 1 ? "bedroom" : "bedrooms"
    },
    {
      icon: "Bath",
      value: property.bathrooms,
      label: property.bathrooms === 1 ? "bathroom" : "bathrooms"
    },
    {
      icon: "Square",
      value: formatSquareFeet(property.squareFeet),
      label: ""
    }
  ];

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-4 text-sm text-gray-600 ${className}`}>
        {specs.map((spec, index) => (
          <div key={index} className="flex items-center gap-1">
            <ApperIcon name={spec.icon} size={16} className="text-gray-400" />
            <span>{spec.value} {spec.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "detailed") {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-display font-bold text-primary">
            {formatPrice(property.price)}
          </h3>
          <Badge variant={property.status === "For Sale" ? "primary" : "accent"}>
            {property.status}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {specs.map((spec, index) => (
            <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
              <ApperIcon name={spec.icon} size={20} className="text-primary mx-auto mb-1" />
              <div className="font-semibold text-gray-900">{spec.value}</div>
              <div className="text-xs text-gray-500 capitalize">{spec.label}</div>
            </div>
          ))}
          
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <ApperIcon name="Calendar" size={20} className="text-primary mx-auto mb-1" />
            <div className="font-semibold text-gray-900">{property.yearBuilt}</div>
            <div className="text-xs text-gray-500">Built</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Property Type</h4>
          <Badge variant="outline">{property.propertyType}</Badge>
        </div>
        
        {property.lotSize > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Lot Size</h4>
            <div className="text-gray-600">{property.lotSize} acres</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-display font-bold text-primary">
          {formatPrice(property.price)}
        </h3>
        <Badge variant={property.status === "For Sale" ? "primary" : "accent"}>
          {property.status}
        </Badge>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-gray-600">
        {specs.map((spec, index) => (
          <div key={index} className="flex items-center gap-1">
            <ApperIcon name={spec.icon} size={16} className="text-gray-400" />
            <span>{spec.value} {spec.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertySpecs;