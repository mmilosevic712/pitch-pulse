import { SentimentBadge } from "./SentimentBadge";
import { formatTimeAgo } from "@/lib/timeFormat";
import type { NewsArticle } from "@/hooks/useFootballNews";

interface HeroStoryProps {
  article: NewsArticle;
}

export function HeroStory({ article }: HeroStoryProps) {
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full overflow-hidden rounded-2xl border border-border/30 aspect-[16/9] md:aspect-[21/9]"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={article.image_url ?? "/placeholder.svg"}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center rounded-md bg-neon-red px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-foreground animate-pulse-neon font-display">
            Breaking
          </span>
          <SentimentBadge sentiment={article.sentiment} />
        </div>
        <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl text-foreground">
          {article.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="font-semibold text-primary uppercase tracking-wide text-xs">
            {article.source_id}
          </span>
          <span className="text-border">•</span>
          <span>{formatTimeAgo(article.pubDate)}</span>
        </div>
      </div>
    </a>
  );
}
