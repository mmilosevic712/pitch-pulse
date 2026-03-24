import { Flame, AlertTriangle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SentimentBadgeProps {
  sentiment: string | null;
}

export function SentimentBadge({ sentiment }: SentimentBadgeProps) {
  const s = sentiment?.toLowerCase();

  if (s === "positive") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-neon-green/15 px-3 py-1 text-xs font-semibold text-neon-green">
        <Flame size={14} /> Heating Up
      </span>
    );
  }

  if (s === "negative") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-neon-red/15 px-3 py-1 text-xs font-semibold text-neon-red">
        <AlertTriangle size={14} /> High Drama
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-neon-blue/15 px-3 py-1 text-xs font-semibold text-neon-blue">
      <Sparkles size={14} /> Developing
    </span>
  );
}
