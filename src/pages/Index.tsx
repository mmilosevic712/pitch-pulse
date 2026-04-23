import { RefreshCw, Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFootballNews } from "@/hooks/useFootballNews";
import { HeroStory } from "@/components/HeroStory";
import { NewsCard } from "@/components/NewsCard";

const Index = () => {
  const { articles, loading, error, refresh } = useFootballNews();
  const hero = articles[0];
  const grid = articles.slice(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Zap className="text-primary" size={24} />
            <h2 className="font-display text-xl font-bold uppercase tracking-wider text-foreground">
              Hot <span className="text-primary">Topics</span>
            </h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refresh}
            disabled={loading}
            className="gap-2 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>
      </header>

      <main className="container py-6 md:py-10 space-y-8">
        {/* Loading state */}
        {loading && articles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="animate-spin text-primary" size={40} />
            <p className="text-muted-foreground font-body text-sm">
              Loading the latest football stories…
            </p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="glass-card p-6 text-center border-neon-red/30 neon-glow-red">
            <p className="text-neon-red font-semibold mb-2">
              Something went wrong
            </p>
            <p className="text-muted-foreground text-sm mb-4">
              We couldn't load the latest stories. Please try again in a moment.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={refresh}
              className="border-neon-red/30 text-neon-red hover:bg-neon-red/10"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Hero */}
        {hero && <HeroStory article={hero} />}

        {/* Grid */}
        {grid.length > 0 && (
          <section>
            <h2 className="font-display text-lg uppercase tracking-wider text-muted-foreground mb-5">
              More Stories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {grid.map((article, i) => (
                <NewsCard
                  key={article.article_id}
                  article={article}
                  index={i}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Index;
