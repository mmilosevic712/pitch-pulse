// A pool of high-quality football-related images used when an article has no
// usable photo (e.g. video-only articles). A stable image is chosen per
// article so the same story always shows the same picture, but different
// articles get different pictures.
export const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517747614396-d21a78b850e8?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486286701208-1d58e9338013?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?q=80&w=1000&auto=format&fit=crop",
];

// Deterministically pick a fallback image from a string seed (article id/title).
export function getFallbackImage(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  const index = Math.abs(hash) % FALLBACK_IMAGES.length;
  return FALLBACK_IMAGES[index];
}
