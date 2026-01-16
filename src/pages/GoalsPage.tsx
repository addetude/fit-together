import { useNavigate } from "react-router-dom";
import { ArrowLeft, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { FitnessGoal, GOAL_LABELS } from "@/types/fitness";
import { cn } from "@/lib/utils";
import { useState } from "react";

const GOALS: FitnessGoal[] = [
  "gym",
  "running",
  "yoga",
  "cycling",
  "swimming",
  "hiking",
  "dance",
  "pilates",
  "martial-arts",
  "tennis",
];

export const GoalsPage = () => {
  const navigate = useNavigate();
  const { currentUser, onboardingData, updateUserPreferences } = useApp();

  const currentGoals = currentUser?.goals || onboardingData.goals || [];
  const [selectedGoals, setSelectedGoals] =
    useState<FitnessGoal[]>(currentGoals);

  const toggleGoal = (goal: FitnessGoal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleSave = () => {
    updateUserPreferences({ goals: selectedGoals });
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
            Fitness Goals
          </h1>
        </div>

        <p className="text-primary-foreground/80 text-sm">
          Select all activities you're interested in
        </p>
      </header>

      {/* Content */}
      <main className="px-4 -mt-2 pb-24">
        <div>
          <Card>
            <CardContent className="p-4 space-y-3">
              {GOALS.map((goal) => (
                <button
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 rounded-xl transition-all",
                    selectedGoals.includes(goal)
                      ? "bg-accent border-2 border-primary"
                      : "bg-muted border-2 border-transparent"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      selectedGoals.includes(goal)
                        ? "bg-primary"
                        : "bg-primary/10"
                    )}
                  >
                    <Target
                      size={20}
                      className={cn(
                        selectedGoals.includes(goal)
                          ? "text-primary-foreground"
                          : "text-primary"
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "flex-1 text-left font-medium",
                      selectedGoals.includes(goal) && "text-[#4d4b66]"
                    )}
                  >
                    {GOAL_LABELS[goal]}
                  </span>
                  {selectedGoals.includes(goal) && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
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
          <Button
            size="lg"
            className="w-full"
            onClick={handleSave}
            disabled={selectedGoals.length === 0}
          >
            Save Goals
          </Button>
        </div>
      </main>
    </div>
  );
};
