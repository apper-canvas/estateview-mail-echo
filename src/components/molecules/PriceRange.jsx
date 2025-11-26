import { useState } from "react";
import { cn } from "@/utils/cn";

const PriceRange = ({ 
  min = 0, 
  max = 5000000, 
  value = [min, max], 
  onChange,
  step = 50000,
  className 
}) => {
  const [localValue, setLocalValue] = useState(value);

  const handleMinChange = (e) => {
    const newMin = parseInt(e.target.value);
    const newValue = [Math.min(newMin, localValue[1]), localValue[1]];
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  const handleMaxChange = (e) => {
    const newMax = parseInt(e.target.value);
    const newValue = [localValue[0], Math.max(newMax, localValue[0])];
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price}`;
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex justify-between text-sm font-medium text-gray-700">
        <span>{formatPrice(localValue[0])}</span>
        <span>{formatPrice(localValue[1])}</span>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[0]}
          onChange={handleMinChange}
          className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[1]}
          onChange={handleMaxChange}
          className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
        />
        <div className="relative h-2 bg-gray-200 rounded-lg">
          <div
            className="absolute h-2 bg-gradient-to-r from-primary to-secondary rounded-lg"
            style={{
              left: `${((localValue[0] - min) / (max - min)) * 100}%`,
              right: `${100 - ((localValue[1] - min) / (max - min)) * 100}%`
            }}
          />
        </div>
      </div>
      
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Min Price</label>
          <input
            type="number"
            min={min}
            max={localValue[1]}
            step={step}
            value={localValue[0]}
            onChange={handleMinChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Max Price</label>
          <input
            type="number"
            min={localValue[0]}
            max={max}
            step={step}
            value={localValue[1]}
            onChange={handleMaxChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRange;