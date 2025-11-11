export interface CachedData<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATION = 60 * 1000; // 1 minute in milliseconds

export const cacheUtils = {
  set: <T>(key: string, data: T): void => {
    try {
      const cachedData: CachedData<T> = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(cachedData));
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  },

  get: <T>(key: string): T | null => {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const cachedData: CachedData<T> = JSON.parse(cached);
      const now = Date.now();

      // Check if cache is still valid (less than 1 minute old)
      if (now - cachedData.timestamp < CACHE_DURATION) {
        return cachedData.data;
      }

      // Cache is expired, remove it
      localStorage.removeItem(key);
      return null;
    } catch (error) {
      console.error('Error reading from cache:', error);
      return null;
    }
  },

  clear: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  },

  clearAll: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing all cache:', error);
    }
  },
};
