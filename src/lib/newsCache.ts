const CACHE_KEY = "cached_football_news";
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

interface CacheEntry {
  data: any;
  timestamp: number;
}

export function getCachedNews(): any | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

export function setCachedNews(data: any) {
  const entry: CacheEntry = { data, timestamp: Date.now() };
  localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
}

export function clearCache() {
  localStorage.removeItem(CACHE_KEY);
}
