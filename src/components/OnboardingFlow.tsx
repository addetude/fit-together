import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import {
  FitnessGoal,
  FitnessLevel,
  MatchPreference,
  GOAL_LABELS,
  LEVEL_LABELS,
  TimeSlot,
  DAY_LABELS,
} from "@/types/fitness";
import { cn } from "@/lib/utils";

const TOTAL_STEPS = 5;

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export const OnboardingFlow = () => {
  const { onboardingData, updateOnboardingData, completeOnboarding } = useApp();
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleGoal = (goal: FitnessGoal) => {
    const currentGoals = onboardingData.goals || [];
    const newGoals = currentGoals.includes(goal)
      ? currentGoals.filter((g) => g !== goal)
      : [...currentGoals, goal];
    updateOnboardingData({ goals: newGoals });
  };

  const toggleScheduleSlot = (
    day: TimeSlot["day"],
    slot: "morning" | "afternoon" | "evening"
  ) => {
    const currentSchedule = onboardingData.schedule || [];
    const daySchedule = currentSchedule.find((s) => s.day === day);

    if (daySchedule) {
      const updatedSchedule = currentSchedule.map((s) =>
        s.day === day ? { ...s, [slot]: !s[slot] } : s
      );
      updateOnboardingData({ schedule: updatedSchedule });
    } else {
      const newSlot: TimeSlot = {
        day,
        morning: slot === "morning",
        afternoon: slot === "afternoon",
        evening: slot === "evening",
      };
      updateOnboardingData({ schedule: [...currentSchedule, newSlot] });
    }
  };

  const getScheduleSlot = (
    day: TimeSlot["day"],
    slot: "morning" | "afternoon" | "evening"
  ): boolean => {
    const daySchedule = (onboardingData.schedule || []).find(
      (s) => s.day === day
    );
    return daySchedule ? daySchedule[slot] : false;
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress Bar */}
      <div className="safe-area-top px-4 pt-4">
        <div className="flex items-center gap-2 mb-6">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          <div className="flex-1 flex gap-1.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded-full flex-1 transition-colors duration-300",
                  i < step ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-32 overflow-hidden">
        <AnimatePresence mode="wait" custom={1}>
          <motion.div
            key={step}
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {step === 1 && (
              <div className="animate-fade-in">
                <h1 className="font-display text-3xl font-bold mb-2">
                  Tell us about you
                </h1>
                <p className="text-muted-foreground mb-8">
                  Let&apos;s set up your profile
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your name
                    </label>
                    <Input
                      placeholder="Enter your name"
                      value={onboardingData.name || ""}
                      onChange={(e) =>
                        updateOnboardingData({ name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={onboardingData.email || ""}
                      onChange={(e) =>
                        updateOnboardingData({ email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Password
                    </label>
                    <Input
                      type="password"
                      placeholder="Create a password"
                      value={onboardingData.password || ""}
                      onChange={(e) =>
                        updateOnboardingData({ password: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in">
                <h1 className="font-display text-3xl font-bold mb-2">
                  What are your goals?
                </h1>
                <p className="text-muted-foreground mb-8">
                  Select all activities you&apos;re interested in
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {(Object.entries(GOAL_LABELS) as [FitnessGoal, string][]).map(
                    ([goal, label]) => (
                      <button
                        key={goal}
                        onClick={() => toggleGoal(goal)}
                        className={cn(
                          "p-4 rounded-2xl border-2 text-left transition-all duration-200",
                          (onboardingData.goals || []).includes(goal)
                            ? "border-primary bg-accent shadow-soft"
                            : "border-border hover:border-primary/30"
                        )}
                      >
                        <span className="text-2xl block mb-1">
                          {label.split(" ")[0]}
                        </span>
                        <span className="text-sm font-medium">
                          {label.split(" ").slice(1).join(" ")}
                        </span>
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in">
                <h1 className="font-display text-3xl font-bold mb-2">
                  Your fitness level
                </h1>
                <p className="text-muted-foreground mb-8">
                  This helps us find the right matches for you
                </p>

                <div className="space-y-3">
                  {(
                    Object.entries(LEVEL_LABELS) as [FitnessLevel, string][]
                  ).map(([level, label]) => (
                    <button
                      key={level}
                      onClick={() => updateOnboardingData({ level })}
                      className={cn(
                        "w-full p-4 rounded-2xl border-2 text-left transition-all duration-200",
                        onboardingData.level === level
                          ? "border-primary bg-accent shadow-soft"
                          : "border-border hover:border-primary/30"
                      )}
                    >
                      <span className="font-semibold block">{label}</span>
                      <span className="text-sm text-muted-foreground">
                        {level === "beginner" &&
                          "New to fitness or trying something new"}
                        {level === "intermediate" &&
                          "Regular activity, comfortable with basics"}
                        {level === "advanced" &&
                          "Consistent training, seeking challenges"}
                        {level === "expert" && "High-level athlete or coach"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-fade-in">
                <h1 className="font-display text-3xl font-bold mb-2">
                  Your availability
                </h1>
                <p className="text-muted-foreground mb-6">
                  When are you free to work out?
                </p>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Your location
                  </label>
                  <Input
                    placeholder="e.g. Downtown Toronto"
                    value={onboardingData.location || ""}
                    onChange={(e) =>
                      updateOnboardingData({ location: e.target.value })
                    }
                  />
                </div>

                <div className="overflow-x-auto -mx-2 px-2">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="pb-3"></th>
                        <th className="pb-3 px-2 text-center font-medium text-muted-foreground">
                          6AM - 9AM
                        </th>
                        <th className="pb-3 px-2 text-center font-medium text-muted-foreground">
                          9AM - 12PM
                        </th>
                        <th className="pb-3 px-2 text-center font-medium text-muted-foreground">
                          12PM - 5PM
                        </th>
                        <th className="pb-3 px-2 text-center font-medium text-muted-foreground">
                          5PM - 11PM
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {days.map((day) => (
                        <tr key={day}>
                          <td className="py-1.5 pr-3 font-medium">
                            {DAY_LABELS[day]}
                          </td>
                          {(["6AM", "9AM", "12PM", "5PM"] as const).map(
                            (slot) => (
                              <td
                                key={slot}
                                className="py-1.5 px-2 text-center"
                              >
                                <button
                                  onClick={() => toggleScheduleSlot(day, slot as "morning" | "afternoon" | "evening")}
                                  className={cn(
                                    "w-8 h-8 rounded-lg transition-all duration-200",
                                    getScheduleSlot(day, slot as "morning" | "afternoon" | "evening")
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-muted hover:bg-accent"
                                  )}
                                >
                                  {getScheduleSlot(day, slot as "morning" | "afternoon" | "evening") && "✓"}
                                </button>
                              </td>
                            )
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="animate-fade-in">
                <h1 className="font-display text-3xl font-bold mb-2">
                  Match preferences
                </h1>
                <p className="text-muted-foreground mb-8">
                  Who do you want to train with?
                </p>

                <div className="space-y-3">
                  {[
                    {
                      value: "same",
                      label: "Same level",
                      desc: "Train with someone at my experience level",
                    },
                    {
                      value: "one-higher",
                      label: "One level up",
                      desc: "Learn from someone slightly more experienced",
                    },
                    {
                      value: "two-higher",
                      label: "Mentor me",
                      desc: "Get guidance from a more advanced partner",
                    },
                    {
                      value: "any",
                      label: "Open to all",
                      desc: "Match me with anyone who shares my goals",
                    },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() =>
                        updateOnboardingData({
                          matchPreference: option.value as MatchPreference,
                        })
                      }
                      className={cn(
                        "w-full p-4 rounded-2xl border-2 text-left transition-all duration-200",
                        onboardingData.matchPreference === option.value
                          ? "border-primary bg-accent shadow-soft"
                          : "border-border hover:border-primary/30"
                      )}
                    >
                      <span className="font-semibold block">
                        {option.label}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {option.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-8 safe-area-bottom">
        <div className="max-w-md mx-auto">
          <Button
            variant="warm"
            size="lg"
            className="w-full"
            onClick={nextStep}
          >
            {step === TOTAL_STEPS ? "Find My Matches" : "Continue"}
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};
