import mockProperties from "@/services/mockData/properties.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PropertyService {
  constructor() {
    this.properties = [...mockProperties];
  }

  async getAll() {
    await delay(300);
    return this.properties.map(property => ({ ...property }));
  }

  async getById(id) {
    await delay(200);
    const property = this.properties.find(p => p.Id === parseInt(id));
    return property ? { ...property } : null;
  }

  async getByFilters(filters) {
    await delay(400);
    let filteredProperties = [...this.properties];

    // Filter by price range
    if (filters.priceMin !== null && filters.priceMin !== undefined) {
      filteredProperties = filteredProperties.filter(p => p.price >= filters.priceMin);
    }
    if (filters.priceMax !== null && filters.priceMax !== undefined) {
      filteredProperties = filteredProperties.filter(p => p.price <= filters.priceMax);
    }

    // Filter by property types
    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      filteredProperties = filteredProperties.filter(p => 
        filters.propertyTypes.includes(p.propertyType)
      );
    }

    // Filter by bedrooms
    if (filters.bedrooms !== null && filters.bedrooms !== undefined) {
      filteredProperties = filteredProperties.filter(p => p.bedrooms >= filters.bedrooms);
    }

    // Filter by bathrooms
    if (filters.bathrooms !== null && filters.bathrooms !== undefined) {
      filteredProperties = filteredProperties.filter(p => p.bathrooms >= filters.bathrooms);
    }

    // Filter by location
    if (filters.location) {
      const searchTerm = filters.location.toLowerCase();
      filteredProperties = filteredProperties.filter(p => 
        p.city.toLowerCase().includes(searchTerm) ||
        p.state.toLowerCase().includes(searchTerm) ||
        p.address.toLowerCase().includes(searchTerm)
      );
    }

    // Sort results
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price-low":
          filteredProperties.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filteredProperties.sort((a, b) => b.price - a.price);
          break;
        case "newest":
          filteredProperties.sort((a, b) => new Date(b.listingDate) - new Date(a.listingDate));
          break;
        case "sqft":
          filteredProperties.sort((a, b) => b.squareFeet - a.squareFeet);
          break;
        default:
          // No sorting
          break;
      }
    }

    return filteredProperties.map(property => ({ ...property }));
  }

  async search(query) {
    await delay(300);
    const searchTerm = query.toLowerCase();
    const results = this.properties.filter(p => 
      p.title.toLowerCase().includes(searchTerm) ||
      p.address.toLowerCase().includes(searchTerm) ||
      p.city.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    );
    return results.map(property => ({ ...property }));
  }

  async getFeatured() {
    await delay(250);
    // Return properties with higher prices or special features
    const featured = this.properties
      .filter(p => p.price > 1000000 || p.features.includes("Ocean Views") || p.features.includes("Mountain Views"))
      .slice(0, 6);
    return featured.map(property => ({ ...property }));
  }

  // Favorites management (would typically be on backend with user accounts)
  getFavorites() {
    const favorites = JSON.parse(localStorage.getItem("estateview-favorites") || "[]");
    return favorites;
  }

  async addToFavorites(propertyId) {
    await delay(100);
    const favorites = this.getFavorites();
    const id = parseInt(propertyId);
    if (!favorites.includes(id)) {
      favorites.push(id);
      localStorage.setItem("estateview-favorites", JSON.stringify(favorites));
    }
    return favorites;
  }

  async removeFromFavorites(propertyId) {
    await delay(100);
    const favorites = this.getFavorites();
    const id = parseInt(propertyId);
    const updatedFavorites = favorites.filter(fav => fav !== id);
    localStorage.setItem("estateview-favorites", JSON.stringify(updatedFavorites));
    return updatedFavorites;
  }

  async getFavoriteProperties() {
    await delay(200);
    const favoriteIds = this.getFavorites();
    const favoriteProperties = this.properties.filter(p => favoriteIds.includes(p.Id));
    return favoriteProperties.map(property => ({ ...property }));
  }

  isPropertyFavorite(propertyId) {
    const favorites = this.getFavorites();
    return favorites.includes(parseInt(propertyId));
  }
}

export default new PropertyService();