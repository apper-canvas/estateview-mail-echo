import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    setLoading(false);
  };

  const contactInfo = [
    {
      icon: "Phone",
      title: "Call Us",
      value: "(555) 123-4567",
      description: "Mon-Fri 9AM-6PM PST"
    },
    {
      icon: "Mail",
      title: "Email Us",
      value: "hello@estateview.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: "MapPin",
      title: "Visit Us",
      value: "123 Real Estate Blvd",
      description: "San Francisco, CA 94105"
    },
    {
      icon: "Clock",
      title: "Business Hours",
      value: "Mon-Fri: 9AM-6PM",
      description: "Weekend: By appointment"
    }
  ];

  const supportTopics = [
    { value: "general", label: "General Inquiry" },
    { value: "property", label: "Property Question" },
    { value: "technical", label: "Technical Support" },
    { value: "partnership", label: "Partnership" },
    { value: "feedback", label: "Feedback" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about properties or need assistance? We're here to help. 
            Reach out to our expert team for personalized support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-2xl font-display font-semibold text-gray-900 mb-6">
              Contact Information
            </h2>
            
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <ApperIcon name={info.icon} size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {info.title}
                    </h3>
                    <p className="font-medium text-primary mb-1">
                      {info.value}
                    </p>
                    <p className="text-sm text-gray-600">
                      {info.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}

            {/* Social Media / Additional Info */}
            <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
              <h3 className="font-semibold text-gray-900 mb-3">
                Follow Us
              </h3>
              <p className="text-gray-600 mb-4">
                Stay updated with the latest properties and real estate insights.
              </p>
              <div className="flex space-x-3">
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                  <ApperIcon name="Facebook" size={16} className="text-primary" />
                </button>
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                  <ApperIcon name="Twitter" size={16} className="text-primary" />
                </button>
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                  <ApperIcon name="Instagram" size={16} className="text-primary" />
                </button>
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                  <ApperIcon name="Linkedin" size={16} className="text-primary" />
                </button>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-display font-semibold text-gray-900 mb-6">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                  
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                  />
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent appearance-none cursor-pointer"
                    >
                      <option value="">Select a topic</option>
                      {supportTopics.map((topic) => (
                        <option key={topic.value} value={topic.value}>
                          {topic.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-vertical"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  className="w-full md:w-auto"
                  icon="Send"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card className="p-8">
            <h2 className="text-2xl font-display font-semibold text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    How do I schedule a property tour?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Click on any property to view details, then use the "Schedule Tour" button to book a viewing with our agents.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Are all listings up to date?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Yes, our listings are updated in real-time to ensure you see the most current available properties.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Can I save properties for later?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Absolutely! Use the heart icon on any property to add it to your favorites for easy access later.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    How do I contact a listing agent?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Each property detail page includes a "Contact Agent" button to connect directly with the listing agent.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;