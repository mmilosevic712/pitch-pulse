import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getCachedNews, setCachedNews, clearCache } from "@/lib/newsCache";

export interface NewsArticle {
  article_id: string;
  title: string;
  link: string;
  source_id: string;
  source_name?: string;
  image_url: string | null;
  video_url: string | null;
  description: string | null;
  pubDate: string;
  sentiment: string | null;
}

export function useFootballNews() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async (bypassCache = false) => {
    setLoading(true);
    setError(null);

    if (!bypassCache) {
      const cached = getCachedNews();
      if (cached) {
        setArticles(cached);
        setLoading(false);
        return;
      }
    } else {
      clearCache();
    }

    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "football-news"
      );
      if (fnError) throw fnError;

      const results: NewsArticle[] = data?.results ?? [];
      setArticles(results);
      setCachedNews(results);
    } catch (err: any) {
      setError(err.message ?? "Failed to fetch news");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const refresh = () => fetchNews(true);

  return { articles, loading, error, refresh };
}
