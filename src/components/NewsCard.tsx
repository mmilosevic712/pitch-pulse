import { SentimentBadge } from "./SentimentBadge";
import { formatTimeAgo } from "@/lib/timeFormat";
import type { NewsArticle } from "@/hooks/useFootballNews";

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

export function NewsCard({ article, index }: NewsCardProps) {
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group glass-card overflow-hidden flex flex-col transition-all duration-300 hover:border-primary/40 hover:neon-glow-green animate-slide-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={article.image_url ?? "/placeholder.svg"}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <SentimentBadge sentiment={article.sentiment} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <h3 className="font-display text-base md:text-lg font-semibold leading-snug text-foreground line-clamp-3 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <div className="mt-auto pt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-semibold uppercase tracking-wide text-secondary-foreground">
            {article.source_id}
          </span>
          <span>{formatTimeAgo(article.pubDate)}</span>
        </div>
      </div>
    </a>
  );
}
