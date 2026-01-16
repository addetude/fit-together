import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { MatchPreference } from "@/types/fitness";
import { cn } from "@/lib/utils";
import { useState } from "react";

const MATCH_PREFERENCES: {
  value: MatchPreference;
  label: string;
  description: string;
}[] = [
  {
    value: "same",
    label: "Same Level",
    description: "Match with partners at my fitness level",
  },
  {
    value: "one-higher",
    label: "One Level Higher",
    description: "Challenge myself with slightly advanced partners",
  },
  {
    value: "two-higher",
    label: "Two Levels Higher",
    description: "Train with more experienced partners",
  },
  {
    value: "any",
    label: "Open to All",
    description: "Match with partners at any fitness level",
  },
];

export const MatchPreferencePage = () => {
  const navigate = useNavigate();
  const { currentUser, onboardingData, updateUserPreferences } = useApp();

  const currentPreference =
    currentUser?.matchPreference || onboardingData.matchPreference || "same";
  const [selectedPreference, setSelectedPreference] =
    useState<MatchPreference>(currentPreference);

  const handleSave = () => {
    updateUserPreferences({ matchPreference: selectedPreference });
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="safe-area-top px-4 pt-4 pb-6 gradient-warm">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
          >
            <ArrowLeft size={22} className="text-primary-foreground" />
          </button>
          <h1 className="font-display text-2xl font-bold text-primary-foreground">
            Match Preference
          </h1>
        </div>

        <p className="text-primary-foreground/80 text-sm">
          Choose your preferred partner fitness level
        </p>
      </header>

      {/* Content */}
      <main className="px-4 -mt-2 pb-24">
        <div>
          <Card>
            <CardContent className="p-4 space-y-3">
              {MATCH_PREFERENCES.map((pref) => (
                <button
                  key={pref.value}
                  onClick={() => setSelectedPreference(pref.value)}
                  className={cn(
                    "w-full flex items-start gap-3 p-4 rounded-xl transition-all",
                    selectedPreference === pref.value
                      ? "bg-accent border-2 border-primary"
                      : "bg-muted border-2 border-transparent hover:border-primary/30"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                      selectedPreference === pref.value
                        ? "bg-primary"
                        : "bg-primary/10"
                    )}
                  >
                    <Users
                      size={20}
                      className={cn(
                        selectedPreference === pref.value
                          ? "text-primary-foreground"
                          : "text-primary"
                      )}
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <h4
                      className={cn(
                        "font-semibold mb-1",
                        selectedPreference === pref.value && "text-[#4d4b66]"
                      )}
                    >
                      {pref.label}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {pref.description}
                    </p>
                  </div>
                  {selectedPreference === pref.value && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground text-xs">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <Button size="lg" className="w-full" onClick={handleSave}>
            Save Preference
          </Button>
        </div>
      </main>
    </div>
  );
};
