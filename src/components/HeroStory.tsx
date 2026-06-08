import { useState } from "react";
import { Play } from "lucide-react";
import { SentimentBadge } from "./SentimentBadge";
import { formatTimeAgo } from "@/lib/timeFormat";
import type { NewsArticle } from "@/hooks/useFootballNews";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop";

interface HeroStoryProps {
  article: NewsArticle;
}

export function HeroStory({ article }: HeroStoryProps) {
  const hasImage = !!article.image_url;
  const showVideoIcon = !hasImage && !!article.video_url;
  const [src, setSrc] = useState(hasImage ? article.image_url! : FALLBACK_IMAGE);

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
          src={src}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => setSrc(FALLBACK_IMAGE)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      {showVideoIcon && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="rounded-full bg-background/70 p-5 backdrop-blur-sm border border-border/40">
            <Play className="h-10 w-10 text-primary fill-primary" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-10 z-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center rounded-md bg-neon-red px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-foreground animate-pulse-neon font-display">
            Breaking
          </span>
          <SentimentBadge sentiment={article.sentiment} />
        </div>
        <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl text-foreground">
          {article.title}
        </h2>
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
