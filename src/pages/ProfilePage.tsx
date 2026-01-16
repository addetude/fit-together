import { useNavigate } from "react-router-dom";
import {
  Settings,
  ChevronRight,
  MapPin,
  Target,
  TrendingUp,
  Clock,
  Users,
  LogOut,
  Bell,
  Shield,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import { useApp } from "@/context/AppContext";
import { GOAL_LABELS, LEVEL_LABELS } from "@/types/fitness";
import { getLevelColor } from "@/data/mockData";
import { cn } from "@/lib/utils";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser, onboardingData, logout } = useApp();

  // Use onboarding data if no current user (for demo)
  const user = currentUser || {
    name: onboardingData.name || "Demo User",
    email: onboardingData.email || "demo@example.com",
    goals: onboardingData.goals || ["gym", "running"],
    level: onboardingData.level || "beginner",
    location: onboardingData.location || "Toronto",
    matchPreference: onboardingData.matchPreference || "same",
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: Shield, label: "Privacy & Safety", path: "/privacy" },
    { icon: HelpCircle, label: "Help & Support", path: "/help" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="safe-area-top px-4 pt-4 pb-6 gradient-warm">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold text-primary-foreground">
            Profile
          </h1>
          <button className="p-2 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
            <Settings size={22} className="text-primary-foreground" />
          </button>
        </div>

        {/* Profile Card */}
        <div>
          <Card variant="elevated" className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-4xl">
                  👩
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-xl font-bold">
                    {user.name}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-2">
                    {user.email}
                  </p>
                  <span
                    className={cn(
                      "inline-block px-2.5 py-1 rounded-lg text-xs font-semibold",
                      getLevelColor(user.level)
                    )}
                  >
                    {LEVEL_LABELS[user.level]}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 -mt-2 space-y-4">
        {/* Quick Stats */}
        <div>
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#4d4b66]">5</div>
                  <div className="text-xs text-muted-foreground">Matches</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#4d4b66]">2</div>
                  <div className="text-xs text-muted-foreground">Favorites</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#4d4b66]">3</div>
                  <div className="text-xs text-muted-foreground">
                    Activities
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preferences */}
        <div>
          <h3 className="font-display font-bold text-lg mb-3">
            My Preferences
          </h3>
          <Card>
            <CardContent className="p-0 divide-y divide-border">
              <button
                onClick={() => navigate("/goals")}
                className="flex items-center gap-3 p-4 w-full hover:bg-accent/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                  <Target size={20} className="text-accent-foreground" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-medium text-sm">Goals</h4>
                  <p className="text-xs text-muted-foreground">
                    {user.goals.map((g) => GOAL_LABELS[g]).join(", ")}
                  </p>
                </div>
                <ChevronRight size={20} className="text-muted-foreground" />
              </button>

              <button
                onClick={() => navigate("/level")}
                className="flex items-center gap-3 p-4 w-full hover:bg-accent/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                  <TrendingUp size={20} className="text-accent-foreground" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-medium text-sm">Level</h4>
                  <p className="text-xs text-muted-foreground">
                    {LEVEL_LABELS[user.level]}
                  </p>
                </div>
                <ChevronRight size={20} className="text-muted-foreground" />
              </button>

              <button
                onClick={() => navigate("/location")}
                className="flex items-center gap-3 p-4 w-full hover:bg-accent/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                  <MapPin size={20} className="text-accent-foreground" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-medium text-sm">Location</h4>
                  <p className="text-xs text-muted-foreground">
                    {user.location}
                  </p>
                </div>
                <ChevronRight size={20} className="text-muted-foreground" />
              </button>

              <button
                onClick={() => navigate("/match-preference")}
                className="flex items-center gap-3 p-4 w-full hover:bg-accent/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                  <Users size={20} className="text-accent-foreground" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-medium text-sm">Match Preference</h4>
                  <p className="text-xs text-muted-foreground">
                    {user.matchPreference === "same" && "Same level"}
                    {user.matchPreference === "one-higher" &&
                      "One level higher"}
                    {user.matchPreference === "two-higher" &&
                      "Two levels higher"}
                    {user.matchPreference === "any" && "Open to all"}
                  </p>
                </div>
                <ChevronRight size={20} className="text-muted-foreground" />
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Settings Menu */}
        <div>
          <h3 className="font-display font-bold text-lg mb-3">Settings</h3>
          <Card>
            <CardContent className="p-0 divide-y divide-border">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  className="flex items-center gap-3 p-4 w-full hover:bg-accent/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <item.icon size={20} className="text-muted-foreground" />
                  </div>
                  <span className="flex-1 text-left font-medium text-sm">
                    {item.label}
                  </span>
                  <ChevronRight size={20} className="text-muted-foreground" />
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Logout */}
        <div>
          <Button
            variant="outline"
            size="lg"
            className="w-full text-destructive border-destructive/20 hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            Sign Out
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
