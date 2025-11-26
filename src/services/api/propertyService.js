import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

class PropertyService {
  constructor() {
    this.tableName = 'property_c';
  }

  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const response = await apperClient.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "address_line1_c"}},
          {"field": {"Name": "city_c"}},
          {"field": {"Name": "state_c"}},
          {"field": {"Name": "zip_code_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "bedrooms_c"}},
          {"field": {"Name": "bathrooms_c"}},
          {"field": {"Name": "square_feet_c"}},
          {"field": {"Name": "lot_size_c"}},
          {"field": {"Name": "property_type_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "year_built_c"}},
          {"field": {"Name": "listing_date_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "features_c"}},
          {"field": {"Name": "latitude_c"}},
          {"field": {"Name": "longitude_c"}}
        ],
        orderBy: [{"fieldName": "listing_date_c", "sorttype": "DESC"}]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return this.transformProperties(response.data || []);
    } catch (error) {
      console.error("Error fetching properties:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const response = await apperClient.getRecordById(this.tableName, parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "address_line1_c"}},
          {"field": {"Name": "city_c"}},
          {"field": {"Name": "state_c"}},
          {"field": {"Name": "zip_code_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "bedrooms_c"}},
          {"field": {"Name": "bathrooms_c"}},
          {"field": {"Name": "square_feet_c"}},
          {"field": {"Name": "lot_size_c"}},
          {"field": {"Name": "property_type_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "year_built_c"}},
          {"field": {"Name": "listing_date_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "features_c"}},
          {"field": {"Name": "latitude_c"}},
          {"field": {"Name": "longitude_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data ? this.transformProperty(response.data) : null;
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  }

  async getByFilters(filters) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const whereConditions = [];

      // Price filters
      if (filters.priceMin !== null && filters.priceMin !== undefined) {
        whereConditions.push({
          "FieldName": "price_c",
          "Operator": "GreaterThanOrEqualTo",
          "Values": [filters.priceMin]
        });
      }
      if (filters.priceMax !== null && filters.priceMax !== undefined) {
        whereConditions.push({
          "FieldName": "price_c",
          "Operator": "LessThanOrEqualTo", 
          "Values": [filters.priceMax]
        });
      }

      // Property type filter
      if (filters.propertyTypes && filters.propertyTypes.length > 0) {
        whereConditions.push({
          "FieldName": "property_type_c",
          "Operator": "ExactMatch",
          "Values": filters.propertyTypes,
          "Include": true
        });
      }

      // Bedroom filter
      if (filters.bedrooms !== null && filters.bedrooms !== undefined) {
        whereConditions.push({
          "FieldName": "bedrooms_c",
          "Operator": "GreaterThanOrEqualTo",
          "Values": [filters.bedrooms]
        });
      }

      // Bathroom filter
      if (filters.bathrooms !== null && filters.bathrooms !== undefined) {
        whereConditions.push({
          "FieldName": "bathrooms_c",
          "Operator": "GreaterThanOrEqualTo",
          "Values": [filters.bathrooms]
        });
      }

      // Location filter
      if (filters.location) {
        whereConditions.push({
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {
                  "fieldName": "city_c",
                  "operator": "Contains",
                  "values": [filters.location]
                },
                {
                  "fieldName": "state_c",
                  "operator": "Contains",
                  "values": [filters.location]
                },
                {
                  "fieldName": "address_line1_c",
                  "operator": "Contains",
                  "values": [filters.location]
                }
              ],
              "operator": "OR"
            }
          ]
        });
      }

      // Determine sort order
      let orderBy = [{"fieldName": "listing_date_c", "sorttype": "DESC"}];
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case "price-low":
            orderBy = [{"fieldName": "price_c", "sorttype": "ASC"}];
            break;
          case "price-high":
            orderBy = [{"fieldName": "price_c", "sorttype": "DESC"}];
            break;
          case "newest":
            orderBy = [{"fieldName": "listing_date_c", "sorttype": "DESC"}];
            break;
          case "sqft":
            orderBy = [{"fieldName": "square_feet_c", "sorttype": "DESC"}];
            break;
        }
      }

      const response = await apperClient.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "address_line1_c"}},
          {"field": {"Name": "city_c"}},
          {"field": {"Name": "state_c"}},
          {"field": {"Name": "zip_code_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "bedrooms_c"}},
          {"field": {"Name": "bathrooms_c"}},
          {"field": {"Name": "square_feet_c"}},
          {"field": {"Name": "lot_size_c"}},
          {"field": {"Name": "property_type_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "year_built_c"}},
          {"field": {"Name": "listing_date_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "features_c"}},
          {"field": {"Name": "latitude_c"}},
          {"field": {"Name": "longitude_c"}}
        ],
        where: whereConditions,
        orderBy: orderBy
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return this.transformProperties(response.data || []);
    } catch (error) {
      console.error("Error filtering properties:", error?.response?.data?.message || error);
      return [];
    }
  }

  async search(query) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const response = await apperClient.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "address_line1_c"}},
          {"field": {"Name": "city_c"}},
          {"field": {"Name": "state_c"}},
          {"field": {"Name": "zip_code_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "bedrooms_c"}},
          {"field": {"Name": "bathrooms_c"}},
          {"field": {"Name": "square_feet_c"}},
          {"field": {"Name": "lot_size_c"}},
          {"field": {"Name": "property_type_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "year_built_c"}},
          {"field": {"Name": "listing_date_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "features_c"}},
          {"field": {"Name": "latitude_c"}},
          {"field": {"Name": "longitude_c"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {
                  "fieldName": "title_c",
                  "operator": "Contains",
                  "values": [query]
                },
                {
                  "fieldName": "address_line1_c",
                  "operator": "Contains",
                  "values": [query]
                },
                {
                  "fieldName": "city_c",
                  "operator": "Contains",
                  "values": [query]
                },
                {
                  "fieldName": "description_c",
                  "operator": "Contains",
                  "values": [query]
                }
              ],
              "operator": "OR"
            }
          ]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return this.transformProperties(response.data || []);
    } catch (error) {
      console.error("Error searching properties:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getFeatured() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const response = await apperClient.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "address_line1_c"}},
          {"field": {"Name": "city_c"}},
          {"field": {"Name": "state_c"}},
          {"field": {"Name": "zip_code_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "bedrooms_c"}},
          {"field": {"Name": "bathrooms_c"}},
          {"field": {"Name": "square_feet_c"}},
          {"field": {"Name": "lot_size_c"}},
          {"field": {"Name": "property_type_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "year_built_c"}},
          {"field": {"Name": "listing_date_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "features_c"}},
          {"field": {"Name": "latitude_c"}},
          {"field": {"Name": "longitude_c"}}
        ],
        where: [
          {
            "FieldName": "price_c",
            "Operator": "GreaterThan",
            "Values": [1000000]
          }
        ],
        orderBy: [{"fieldName": "price_c", "sorttype": "DESC"}],
        pagingInfo: {"limit": 6, "offset": 0}
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return this.transformProperties(response.data || []);
    } catch (error) {
      console.error("Error fetching featured properties:", error?.response?.data?.message || error);
      return [];
    }
  }

  transformProperty(property) {
    return {
      Id: property.Id,
      title: property.title_c || property.Name,
      address: property.address_line1_c || '',
      city: property.city_c || '',
      state: property.state_c || '',
      zipCode: property.zip_code_c || '',
      price: property.price_c || 0,
      bedrooms: property.bedrooms_c || 0,
      bathrooms: property.bathrooms_c || 0,
      squareFeet: property.square_feet_c || 0,
      lotSize: property.lot_size_c || 0,
      propertyType: property.property_type_c || '',
      status: property.status_c || '',
      yearBuilt: property.year_built_c || '',
      listingDate: property.listing_date_c || '',
      description: property.description_c || '',
      images: property.images_c ? property.images_c.split('\n').filter(img => img.trim()) : [],
      features: property.features_c ? property.features_c.split('\n').filter(f => f.trim()) : [],
      coordinates: {
        lat: property.latitude_c || 0,
        lng: property.longitude_c || 0
      }
    };
  }

  transformProperties(properties) {
    return properties.map(property => this.transformProperty(property));
  }
}

const propertyService = new PropertyService();
export default propertyService;