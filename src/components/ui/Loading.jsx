import { motion } from "framer-motion";

const PropertyCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm p-0 overflow-hidden">
    <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
    <div className="p-4 space-y-3">
      <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-3/4"></div>
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-1/3"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-1/4"></div>
      </div>
    </div>
  </div>
);

const FilterSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
    <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-1/2"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-3/4"></div>
      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-1/2"></div>
    </div>
  </div>
);

const Loading = ({ type = "properties" }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {type === "properties" ? (
          <div className="flex gap-6">
            <div className="w-1/4 space-y-6">
              <FilterSkeleton />
              <FilterSkeleton />
              <FilterSkeleton />
            </div>
            <div className="flex-1">
              <div className="mb-6 flex justify-between items-center">
                <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-48"></div>
                <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-32"></div>
              </div>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {Array.from({ length: 9 }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <PropertyCardSkeleton />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-1/3 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-5/6"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Loading;