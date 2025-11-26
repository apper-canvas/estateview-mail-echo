import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No properties found", 
  message = "Try adjusting your search criteria to find more properties.",
  actionLabel = "Browse All Properties",
  actionPath = "/",
  icon = "Home",
  className = ""
}) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (actionPath) {
      navigate(actionPath);
    }
  };

  return (
    <motion.div 
      className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="mb-6"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-sm">
          <ApperIcon name={icon} size={48} className="text-gray-400" />
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center space-y-3 max-w-md"
      >
        <h3 className="text-xl font-display font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{message}</p>
      </motion.div>

      {actionLabel && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <button
            onClick={handleAction}
            className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center gap-2"
          >
            <ApperIcon name="Search" size={16} />
            {actionLabel}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Empty;