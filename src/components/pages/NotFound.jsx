import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center px-4">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* 404 Illustration */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mb-8"
        >
          <div className="relative">
            <div className="text-8xl font-display font-bold text-primary/20 mb-4">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                <ApperIcon name="Home" size={32} className="text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="space-y-4 mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Page Not Found
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Sorry, we couldn't find the page you're looking for. 
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="primary" icon="Home" className="w-full sm:w-auto">
                Back to Home
              </Button>
            </Link>
            <Link to="/favorites">
              <Button variant="outline" icon="Heart" className="w-full sm:w-auto">
                View Favorites
              </Button>
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              Looking for something specific?
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link 
                to="/about" 
                className="text-sm text-primary hover:text-secondary transition-colors px-3 py-1 rounded-full hover:bg-primary/5"
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-sm text-primary hover:text-secondary transition-colors px-3 py-1 rounded-full hover:bg-primary/5"
              >
                Contact
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Background decoration */}
        <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;