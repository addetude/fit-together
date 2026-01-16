import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Clock, Sparkles } from "lucide-react";
import { MatchCard } from "@/components/MatchCard";
import { BottomNav } from "@/components/BottomNav";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

type Tab = "matches" | "favorites" | "history";

export const HomePage = () => {
  const navigate = useNavigate();
  const { matches, toggleFavorite } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>("matches");

  const filteredMatches = matches.filter((match) => {
    if (activeTab === "favorites") return match.isFavorite;
    if (activeTab === "history") return !match.isNew;
    return true;
  });

  const tabs = [
    {
      id: "matches" as Tab,
      label: "Matches",
      icon: Sparkles,
      count: matches.filter((m) => m.isNew).length,
    },
    {
      id: "favorites" as Tab,
      label: "Favorites",
      icon: Heart,
      count: matches.filter((m) => m.isFavorite).length,
    },
    { id: "history" as Tab, label: "History", icon: Clock },
  ];

  const handleMessage = (matchId: string) => {
    navigate(`/chat/${matchId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="safe-area-top px-4 pt-4 pb-2 sticky top-0 bg-background/95 backdrop-blur-lg z-40">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-display text-2xl font-bold">Your Matches</h1>
            <p className="text-muted-foreground text-sm">
              {matches.length} potential matches this week
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl gradient-warm flex items-center justify-center shadow-glow">
            <span className="text-2xl">💪</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition-all duration-200",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              )}
            >
              <tab.icon size={16} />
              <span className="font-medium text-sm">{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span
                  className={cn(
                    "w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold",
                    activeTab === tab.id
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-primary/10 text-primary"
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-4 space-y-4">
        {filteredMatches.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              {activeTab === "favorites" ? (
                <Heart size={28} className="text-muted-foreground" />
              ) : (
                <Clock size={28} className="text-muted-foreground" />
              )}
            </div>
            <h3 className="font-display font-bold text-lg mb-1">
              {activeTab === "favorites"
                ? "No favorites yet"
                : "No history yet"}
            </h3>
            <p className="text-muted-foreground text-sm">
              {activeTab === "favorites"
                ? "Heart your favorite matches to see them here"
                : "Your past connections will appear here"}
            </p>
          </div>
        ) : (
          filteredMatches.map((match) => (
            <div key={match.id}>
              <MatchCard
                match={match}
                onFavorite={toggleFavorite}
                onMessage={handleMessage}
              />
            </div>
          ))
        )}
      </main>

      <BottomNav />
    </div>
  );
};
