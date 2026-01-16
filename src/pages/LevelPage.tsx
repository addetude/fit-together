import { useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { FitnessLevel, LEVEL_LABELS } from "@/types/fitness";
import { cn } from "@/lib/utils";
import { useState } from "react";

const LEVELS: { value: FitnessLevel; description: string }[] = [
  {
    value: "beginner",
    description: "New to fitness or trying something new",
  },
  {
    value: "intermediate",
    description: "Regular activity, comfortable with basics",
  },
  {
    value: "advanced",
    description: "Consistent training, seeking challenges",
  },
  {
    value: "expert",
    description: "High-level athlete or coach",
  },
];

export const LevelPage = () => {
  const navigate = useNavigate();
  const { currentUser, onboardingData, updateUserPreferences } = useApp();

  const currentLevel = currentUser?.level || onboardingData.level || "beginner";
  const [selectedLevel, setSelectedLevel] =
    useState<FitnessLevel>(currentLevel);

  const handleSave = () => {
    updateUserPreferences({ level: selectedLevel });
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
            Fitness Level
          </h1>
        </div>

        <p className="text-primary-foreground/80 text-sm">
          Choose your current fitness level
        </p>
      </header>

      {/* Content */}
      <main className="px-4 -mt-2 pb-24">
        <div>
          <Card>
            <CardContent className="p-4 space-y-3">
              {LEVELS.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setSelectedLevel(level.value)}
                  className={cn(
                    "w-full flex items-start gap-3 p-4 rounded-xl transition-all",
                    selectedLevel === level.value
                      ? "bg-accent border-2 border-primary"
                      : "bg-muted border-2 border-transparent hover:border-primary/30"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                      selectedLevel === level.value
                        ? "bg-primary"
                        : "bg-primary/10"
                    )}
                  >
                    <TrendingUp
                      size={20}
                      className={cn(
                        selectedLevel === level.value
                          ? "text-primary-foreground"
                          : "text-primary"
                      )}
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <h4
                      className={cn(
                        "font-semibold mb-1",
                        selectedLevel === level.value && "text-[#4d4b66]"
                      )}
                    >
                      {LEVEL_LABELS[level.value]}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {level.description}
                    </p>
                  </div>
                  {selectedLevel === level.value && (
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
            Save Level
          </Button>
        </div>
      </main>
    </div>
  );
};
