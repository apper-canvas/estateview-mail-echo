import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = forwardRef(({
  className,
  label,
  error,
  helperText,
  children,
  ...props
}, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={cn(
            "w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white",
            "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
            "disabled:bg-gray-50 disabled:text-gray-500",
            "appearance-none cursor-pointer",
            error && "border-red-300 focus:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ApperIcon name="ChevronDown" className="text-gray-400" size={16} />
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;