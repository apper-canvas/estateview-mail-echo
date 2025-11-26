import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

class FavoriteService {
  constructor() {
    this.tableName = 'favorite_c';
  }

  async getUserFavorites(userId) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const response = await apperClient.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "property_id_c"}},
          {"field": {"Name": "Owner"}}
        ],
        where: [
          {
            "FieldName": "Owner",
            "Operator": "EqualTo",
            "Values": [userId]
          }
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching user favorites:", error?.response?.data?.message || error);
      return [];
    }
  }

  async addToFavorites(propertyId, userId) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      // Check if already exists
      const existing = await this.getUserFavorites(userId);
      const alreadyFavorite = existing.some(fav => fav.property_id_c?.Id === parseInt(propertyId));
      
      if (alreadyFavorite) {
        return true;
      }

      const response = await apperClient.createRecord(this.tableName, {
        records: [
          {
            Name: `Favorite Property ${propertyId}`,
            property_id_c: parseInt(propertyId)
          }
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} favorite records:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error("Error adding to favorites:", error?.response?.data?.message || error);
      return false;
    }
  }

  async removeFromFavorites(propertyId, userId) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      // Find the favorite record to delete
      const favorites = await this.getUserFavorites(userId);
      const favoriteToDelete = favorites.find(fav => fav.property_id_c?.Id === parseInt(propertyId));
      
      if (!favoriteToDelete) {
        return true; // Already not a favorite
      }

      const response = await apperClient.deleteRecord(this.tableName, {
        RecordIds: [favoriteToDelete.Id]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} favorite records:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error("Error removing from favorites:", error?.response?.data?.message || error);
      return false;
    }
  }

  async getFavoritePropertyIds(userId) {
    try {
      const favorites = await this.getUserFavorites(userId);
      return favorites.map(fav => fav.property_id_c?.Id).filter(id => id);
    } catch (error) {
      console.error("Error getting favorite property IDs:", error);
      return [];
    }
  }

  async isPropertyFavorite(propertyId, userId) {
    try {
      const favoriteIds = await this.getFavoritePropertyIds(userId);
      return favoriteIds.includes(parseInt(propertyId));
    } catch (error) {
      console.error("Error checking if property is favorite:", error);
      return false;
    }
  }
}

const favoriteService = new FavoriteService();
export default favoriteService;