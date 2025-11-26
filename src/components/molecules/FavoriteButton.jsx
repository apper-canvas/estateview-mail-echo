import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const FavoriteButton = ({ 
  isFavorite, 
  onToggle, 
  className = "",
  size = "md",
  variant = "default"
}) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-12 h-12"
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  const variants = {
    default: "bg-white/80 hover:bg-white text-gray-600 hover:text-accent",
    floating: "bg-white shadow-md hover:shadow-lg text-gray-600 hover:text-accent"
  };

  return (
    <motion.button
      onClick={onToggle}
      className={cn(
        "flex items-center justify-center rounded-full transition-all duration-200 backdrop-blur-sm",
        sizes[size],
        variants[variant],
        isFavorite && "text-accent",
        className
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 1 }}
      animate={{ scale: isFavorite ? [1, 1.2, 1] : 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: isFavorite ? [1, 1.3, 1] : 1 }}
        transition={{ duration: 0.2 }}
      >
        <ApperIcon 
          name={isFavorite ? "Heart" : "Heart"} 
          size={iconSizes[size]}
          className={cn(
            "transition-colors duration-200",
            isFavorite ? "fill-current text-accent" : "stroke-current"
          )}
        />
      </motion.div>
    </motion.button>
  );
};

export default FavoriteButton;