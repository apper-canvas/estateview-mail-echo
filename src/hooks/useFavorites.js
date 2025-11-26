import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import favoriteService from "@/services/api/favoriteService";
import { toast } from "react-toastify";
import propertyService from "@/services/api/propertyService";
export const useFavorites = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [favorites, setFavorites] = useState([]);
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadFavorites();
    } else {
      setFavorites([]);
      setFavoriteProperties([]);
    }
  }, [isAuthenticated, user]);
const loadFavorites = async () => {
    if (!user) return;
    
    try {
      const favoriteIds = await favoriteService.getFavoritePropertyIds(user.userId);
      setFavorites(favoriteIds);
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };
  const loadFavoriteProperties = async () => {
    if (favorites.length === 0) {
      setFavoriteProperties([]);
      return;
    }

    setLoading(true);
    try {
      const allProperties = await propertyService.getAll();
      const favoriteProps = allProperties.filter(p => favorites.includes(p.Id));
      setFavoriteProperties(favoriteProps);
    } catch (error) {
      toast.error("Failed to load favorite properties");
      console.error("Error loading favorite properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavoriteProperties();
}, [favorites]);

  const addToFavorites = async (propertyId) => {
    if (!isAuthenticated || !user) {
      toast.error("Please login to add favorites");
      return;
    }

    try {
      const success = await favoriteService.addToFavorites(propertyId, user.userId);
      if (success) {
        await loadFavorites();
        toast.success("Added to favorites");
      }
    } catch (error) {
      toast.error("Failed to add to favorites");
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFromFavorites = async (propertyId) => {
    if (!isAuthenticated || !user) {
      return;
    }

    try {
      const success = await favoriteService.removeFromFavorites(propertyId, user.userId);
      if (success) {
        await loadFavorites();
        toast.success("Removed from favorites");
      }
    } catch (error) {
      toast.error("Failed to remove from favorites");
      console.error("Error removing from favorites:", error);
    }
}
  };

  const toggleFavorite = async (propertyId) => {
    if (isFavorite) {
      await removeFromFavorites(propertyId);
    } else {
      await addToFavorites(propertyId);
    }
  };

  const isPropertyFavorite = (propertyId) => {
    return favorites.includes(parseInt(propertyId));
  };

  return {
    favorites,
    favoriteProperties,
    loading,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isPropertyFavorite,
    favoritesCount: favorites.length
};
};

export default useFavorites;