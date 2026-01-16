import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Send, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  content: string;
  isOwn: boolean;
  timestamp: Date;
}

export const ChatPage = () => {
  const navigate = useNavigate();
  const { matchId } = useParams();
  const { matches } = useApp();
  const match = matches.find((m) => m.id === matchId);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content:
        "Hey! I saw we matched on running. I'm training for my first 5K!",
      isOwn: false,
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      content:
        "That's awesome! I'm doing the same thing. What's your pace like?",
      isOwn: true,
      timestamp: new Date(Date.now() - 3000000),
    },
    {
      id: "3",
      content:
        "I'm still pretty slow - around 8 min/km. Working on building stamina!",
      isOwn: false,
      timestamp: new Date(Date.now() - 2400000),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;

    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        content: newMessage,
        isOwn: true,
        timestamp: new Date(),
      },
    ]);
    setNewMessage("");
  };

  if (!match) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Conversation not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="safe-area-top px-4 py-3 border-b border-border bg-card/95 backdrop-blur-lg sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/chat")}
            className="p-2 -ml-2 hover:bg-accent rounded-xl transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          <img
            src={match.user.avatar}
            alt={match.user.name}
            className="w-10 h-10 rounded-xl object-cover"
          />

          <div className="flex-1 min-w-0">
            <h2 className="font-display font-bold truncate">
              {match.user.name}
            </h2>
            <p className="text-xs text-muted-foreground">
              {match.user.location}
            </p>
          </div>

          <button className="p-2 hover:bg-accent rounded-xl transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.isOwn ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] px-4 py-3 rounded-2xl",
                  message.isOwn
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                )}
              >
                <p className="text-sm">{message.content}</p>
                <p
                  className={cn(
                    "text-xs mt-1",
                    message.isOwn
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  )}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Input */}
      <div className="p-4 border-t border-border bg-card safe-area-bottom">
        <div className="flex gap-3">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button
            variant="warm"
            size="icon"
            onClick={handleSend}
            disabled={!newMessage.trim()}
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};
