import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import Input from "@/components/atoms/Input";
import PriceRange from "@/components/molecules/PriceRange";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const FilterSidebar = ({ filters, onFiltersChange, className = "" }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handlePriceChange = (priceRange) => {
    const updatedFilters = { 
      ...localFilters, 
      priceMin: priceRange[0], 
      priceMax: priceRange[1] 
    };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handlePropertyTypeChange = (type, checked) => {
    const currentTypes = localFilters.propertyTypes || [];
    let updatedTypes;
    
    if (checked) {
      updatedTypes = [...currentTypes, type];
    } else {
      updatedTypes = currentTypes.filter(t => t !== type);
    }
    
    handleFilterChange("propertyTypes", updatedTypes);
  };

  const clearFilters = () => {
    const clearedFilters = {
      priceMin: 0,
      priceMax: 5000000,
      propertyTypes: [],
      bedrooms: null,
      bathrooms: null,
      location: "",
      sortBy: "newest"
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const propertyTypes = ["House", "Condo", "Townhouse", "Apartment", "Loft", "Duplex"];
  const bedroomOptions = [0, 1, 2, 3, 4, 5];
  const bathroomOptions = [1, 1.5, 2, 2.5, 3, 3.5, 4];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Collapse Toggle - Mobile */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full justify-between"
          icon={isCollapsed ? "ChevronDown" : "ChevronUp"}
          iconPosition="right"
        >
          Filters
        </Button>
      </div>

      <motion.div
        className={cn("space-y-6", isCollapsed && "lg:block hidden")}
        initial={false}
        animate={{ height: isCollapsed ? 0 : "auto", opacity: isCollapsed ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Location Search */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <ApperIcon name="Search" size={16} className="mr-2" />
            Location
          </h3>
          <SearchBar
            placeholder="City, State, or Address"
            value={localFilters.location || ""}
            onSearch={(value) => handleFilterChange("location", value)}
          />
        </Card>

        {/* Price Range */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <ApperIcon name="DollarSign" size={16} className="mr-2" />
            Price Range
          </h3>
          <PriceRange
            min={0}
            max={5000000}
            value={[localFilters.priceMin || 0, localFilters.priceMax || 5000000]}
            onChange={handlePriceChange}
            step={50000}
          />
        </Card>

        {/* Property Type */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <ApperIcon name="Home" size={16} className="mr-2" />
            Property Type
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {propertyTypes.map((type) => (
              <label key={type} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(localFilters.propertyTypes || []).includes(type)}
                  onChange={(e) => handlePropertyTypeChange(type, e.target.checked)}
                  className="w-4 h-4 text-accent focus:ring-accent border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Bedrooms & Bathrooms */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <ApperIcon name="Bed" size={16} className="mr-2" />
            Bedrooms & Bathrooms
          </h3>
          <div className="space-y-4">
            <Select
              label="Minimum Bedrooms"
              value={localFilters.bedrooms || ""}
              onChange={(e) => handleFilterChange("bedrooms", e.target.value ? parseInt(e.target.value) : null)}
            >
              <option value="">Any</option>
              {bedroomOptions.map((num) => (
                <option key={num} value={num}>
                  {num === 0 ? "Studio" : `${num}+ bedroom${num !== 1 ? "s" : ""}`}
                </option>
              ))}
            </Select>
            
            <Select
              label="Minimum Bathrooms"
              value={localFilters.bathrooms || ""}
              onChange={(e) => handleFilterChange("bathrooms", e.target.value ? parseFloat(e.target.value) : null)}
            >
              <option value="">Any</option>
              {bathroomOptions.map((num) => (
                <option key={num} value={num}>
                  {num}+ bathroom{num !== 1 ? "s" : ""}
                </option>
              ))}
            </Select>
          </div>
        </Card>

        {/* Sort By */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <ApperIcon name="ArrowUpDown" size={16} className="mr-2" />
            Sort By
          </h3>
          <Select
            value={localFilters.sortBy || "newest"}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          >
            <option value="newest">Newest Listings</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="sqft">Square Footage</option>
          </Select>
        </Card>

        {/* Clear Filters */}
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full"
          icon="RotateCcw"
        >
          Clear All Filters
        </Button>
      </motion.div>
    </div>
  );
};

export default FilterSidebar;