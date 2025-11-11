import { useState, useEffect } from "react";

const FAVORITES_KEY = "favorite_facilities";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  }, []);

  const toggleFavorite = (facilityId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(facilityId)
        ? prev.filter((id) => id !== facilityId)
        : [...prev, facilityId];

      // Save to localStorage
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      } catch (error) {
        console.error("Error saving favorites:", error);
      }

      return newFavorites;
    });
  };

  const isFavorite = (facilityId: string): boolean => {
    return favorites.includes(facilityId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
};
