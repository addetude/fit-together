import { Heart, MessageCircle, MapPin, Star } from "lucide-react";
import { Match, GOAL_LABELS } from "@/types/fitness";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MatchCardProps {
  match: Match;
  onFavorite: (matchId: string) => void;
  onMessage: (matchId: string) => void;
}

export const MatchCard = ({ match, onFavorite, onMessage }: MatchCardProps) => {
  return (
    <Card variant="match" className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex gap-4 p-4">
          {/* Avatar */}
          <div className="relative">
            <img
              src={match.user.avatar}
              alt={match.user.name}
              className="w-20 h-20 rounded-2xl object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-display font-bold text-lg truncate">
                {match.user.name}
              </h3>
            </div>

            <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
              <MapPin size={14} />
              <span className="truncate">{match.user.location}</span>
            </div>

            <div className="flex flex-wrap gap-1">
              {match.commonGoals.map((goal) => (
                <span
                  key={goal}
                  className="px-2 py-1 bg-accent text-accent-foreground rounded-lg text-xs font-medium"
                >
                  {GOAL_LABELS[goal]}
                </span>
              ))}
            </div>
          </div>

          {/* Match Score */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full gradient-warm flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                {match.compatibility}%
              </span>
            </div>
            <span className="text-xs text-muted-foreground mt-1">Match</span>
          </div>
        </div>

        {/* Bio */}
        {match.user.bio && (
          <div className="px-4 pb-3">
            <p className="text-sm text-muted-foreground italic">
              &ldquo;{match.user.bio}&rdquo;
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex border-t border-border">
          <button
            onClick={() => onFavorite(match.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 transition-colors",
              match.isFavorite
                ? "text-[#4d4b66] bg-accent"
                : "text-muted-foreground hover:text-[#4d4b66] hover:bg-accent/50"
            )}
          >
            <Heart
              size={18}
              fill={match.isFavorite ? "currentColor" : "none"}
            />
            <span className="text-sm font-medium">
              {match.isFavorite ? "Favorited" : "Favorite"}
            </span>
          </button>
          <div className="w-px bg-border" />
          <button
            onClick={() => onMessage(match.id)}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-muted-foreground hover:text-primary hover:bg-accent/50 transition-colors"
          >
            <MessageCircle size={18} />
            <span className="text-sm font-medium">Message</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
