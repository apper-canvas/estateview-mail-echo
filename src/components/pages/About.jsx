import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const About = () => {
  const features = [
    {
      icon: "Search",
      title: "Advanced Search",
      description: "Find properties using our powerful filtering system with price ranges, property types, and location-based search."
    },
    {
      icon: "Heart",
      title: "Save Favorites",
      description: "Keep track of properties you love with our favorites system. Your saved properties are always available."
    },
    {
      icon: "Camera",
      title: "High-Quality Photos",
      description: "Browse through professional property photos with our interactive image carousel and fullscreen viewing."
    },
    {
      icon: "MapPin",
      title: "Location Details",
      description: "Get detailed location information including addresses, neighborhoods, and proximity to amenities."
    },
    {
      icon: "TrendingUp",
      title: "Market Insights",
      description: "Access comprehensive property details including price history, square footage, and property specifications."
    },
    {
      icon: "Shield",
      title: "Trusted Platform",
      description: "We work with verified agents and provide accurate, up-to-date listing information you can rely on."
    }
  ];

  const stats = [
    { label: "Active Listings", value: "10,000+", icon: "Home" },
    { label: "Cities Covered", value: "500+", icon: "MapPin" },
    { label: "Happy Customers", value: "50,000+", icon: "Users" },
    { label: "Years of Experience", value: "15+", icon: "Calendar" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Badge variant="primary" className="mb-4">About EstateView</Badge>
          </motion.div>
          
          <h1 className="text-5xl font-display font-bold text-gray-900 mb-6">
            Your Trusted Real Estate Partner
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            EstateView is a modern real estate platform designed to make property discovery intuitive, 
            comprehensive, and enjoyable. We connect home buyers and renters with their perfect properties 
            through cutting-edge technology and exceptional user experience.
          </p>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name={stat.icon} size={24} className="text-white" />
              </div>
              <div className="text-3xl font-display font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </Card>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Why Choose EstateView?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've built a comprehensive platform that puts everything you need 
              for property discovery at your fingertips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <ApperIcon name={feature.icon} size={24} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 p-12 text-center">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8">
              We believe that finding the perfect property should be an exciting and stress-free experience. 
              Our mission is to revolutionize real estate discovery by combining beautiful design, 
              powerful search capabilities, and comprehensive property information in one seamless platform. 
              Whether you're a first-time buyer, seasoned investor, or looking for the perfect rental, 
              EstateView provides the tools and insights you need to make informed decisions with confidence.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <ApperIcon name="CheckCircle" size={16} className="text-green-500 mr-2" />
                <span>Verified Listings</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="CheckCircle" size={16} className="text-green-500 mr-2" />
                <span>Real-Time Updates</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="CheckCircle" size={16} className="text-green-500 mr-2" />
                <span>Expert Support</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;