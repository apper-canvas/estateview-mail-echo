import { useState, useEffect } from "react";
import propertyService from "@/services/api/propertyService";
import { toast } from "react-toastify";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load favorites from localStorage on mount
    const savedFavorites = propertyService.getFavorites();
    setFavorites(savedFavorites);
  }, []);

  const loadFavoriteProperties = async () => {
    if (favorites.length === 0) {
      setFavoriteProperties([]);
      return;
    }

    setLoading(true);
    try {
      const properties = await propertyService.getFavoriteProperties();
      setFavoriteProperties(properties);
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
    try {
      const updatedFavorites = await propertyService.addToFavorites(propertyId);
      setFavorites(updatedFavorites);
      toast.success("Added to favorites");
    } catch (error) {
      toast.error("Failed to add to favorites");
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFromFavorites = async (propertyId) => {
    try {
      const updatedFavorites = await propertyService.removeFromFavorites(propertyId);
      setFavorites(updatedFavorites);
      toast.success("Removed from favorites");
    } catch (error) {
      toast.error("Failed to remove from favorites");
      console.error("Error removing from favorites:", error);
    }
  };

  const toggleFavorite = async (propertyId) => {
    const isFavorite = isPropertyFavorite(propertyId);
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