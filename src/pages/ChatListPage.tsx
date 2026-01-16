import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

export const ChatListPage = () => {
  const navigate = useNavigate();
  const { matches } = useApp();
  const [searchQuery, setSearchQuery] = useState("");

  // Only show matches that have had conversations (have lastMessage)
  const conversations = matches.filter((m) => m.lastMessage || m.isFavorite);
  const filteredConversations = conversations.filter((m) =>
    m.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="safe-area-top px-4 pt-4 pb-4 sticky top-0 bg-background/95 backdrop-blur-lg z-40">
        <div>
          <h1 className="font-display text-2xl font-bold mb-4">Messages</h1>
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11"
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💬</span>
            </div>
            <h3 className="font-display font-bold text-lg mb-1">
              No messages yet
            </h3>
            <p className="text-muted-foreground text-sm">
              Start a conversation with your matches!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredConversations.map((match) => (
              <button
                key={match.id}
                onClick={() => navigate(`/chat/${match.id}`)}
                className="w-full flex items-center gap-3 py-4 hover:bg-accent/50 transition-colors rounded-xl px-2 -mx-2"
              >
                <div className="relative">
                  <img
                    src={match.user.avatar}
                    alt={match.user.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  {match.isNew && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background" />
                  )}
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold truncate">
                      {match.user.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {match.lastMessage ? "2h ago" : "New match!"}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "text-sm truncate",
                      match.lastMessage
                        ? "text-muted-foreground"
                        : "text-primary font-medium"
                    )}
                  >
                    {match.lastMessage || "Say hi! 👋"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};
