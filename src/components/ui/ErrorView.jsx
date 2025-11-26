import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const ErrorView = ({ message = "Something went wrong", onRetry, className = "" }) => {
  return (
    <motion.div 
      className={`min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center p-4 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center space-y-6 max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg">
            <ApperIcon name="AlertTriangle" size={40} className="text-white" />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <h2 className="text-2xl font-display font-semibold text-gray-900">Oops! Something went wrong</h2>
          <p className="text-gray-600 leading-relaxed">{message}</p>
        </motion.div>

        {onRetry && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={onRetry}
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <ApperIcon name="RefreshCw" size={16} />
              Try Again
            </button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-gray-500">
            If the problem persists, please contact our support team.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ErrorView;