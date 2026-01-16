import { useState } from "react";
import { Plus, MapPin, Calendar, X } from "lucide-react";
import { ActivityCard } from "@/components/ActivityCard";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

export const DiscoverPage = () => {
  const { activityRequests, addActivityRequest } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newActivity, setNewActivity] = useState({
    activity: "",
    description: "",
    location: "",
    dateTime: "",
    spotsAvailable: 1,
  });

  const handleJoin = (activityId: string) => {
    toast.success("Request sent!", {
      description: "You'll be notified when they respond",
    });
  };

  const handleCreate = () => {
    if (
      newActivity.activity &&
      newActivity.description &&
      newActivity.location
    ) {
      addActivityRequest({
        activity: newActivity.activity,
        description: newActivity.description,
        location: newActivity.location,
        dateTime: new Date(newActivity.dateTime || Date.now() + 86400000),
        spotsAvailable: newActivity.spotsAvailable,
      });
      setShowCreateModal(false);
      setNewActivity({
        activity: "",
        description: "",
        location: "",
        dateTime: "",
        spotsAvailable: 1,
      });
      toast.success("Activity created!", {
        description: "Others can now see and join your activity",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="safe-area-top px-4 pt-4 pb-4 sticky top-0 bg-background/95 backdrop-blur-lg z-40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold">Discover</h1>
            <p className="text-muted-foreground text-sm">
              Find activities near you
            </p>
          </div>
          <Button
            variant="warm"
            size="sm"
            onClick={() => setShowCreateModal(true)}
            className="gap-1.5"
          >
            <Plus size={18} />
            Post Activity
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 space-y-4">
        {activityRequests.map((activity) => (
          <div key={activity.id}>
            <ActivityCard activity={activity} onJoin={handleJoin} />
          </div>
        ))}
      </main>

      {/* Create Activity Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-end"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-card rounded-t-3xl safe-area-bottom"
          >
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-display font-bold text-xl">
                Create Activity
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Activity name
                </label>
                <Input
                  placeholder="e.g. Morning Run at High Park"
                  value={newActivity.activity}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, activity: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Tell others what to expect..."
                  value={newActivity.description}
                  onChange={(e) =>
                    setNewActivity({
                      ...newActivity,
                      description: e.target.value,
                    })
                  }
                  className="flex w-full rounded-xl border-2 border-input bg-background px-4 py-3 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary/30 transition-colors min-h-[100px] resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />
                  <Input
                    placeholder="Where will this take place?"
                    value={newActivity.location}
                    onChange={(e) =>
                      setNewActivity({
                        ...newActivity,
                        location: e.target.value,
                      })
                    }
                    className="pl-11"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Date & Time
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />
                  <Input
                    type="datetime-local"
                    value={newActivity.dateTime}
                    onChange={(e) =>
                      setNewActivity({
                        ...newActivity,
                        dateTime: e.target.value,
                      })
                    }
                    className="pl-11"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Spots available
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() =>
                        setNewActivity({ ...newActivity, spotsAvailable: num })
                      }
                      className={`w-12 h-12 rounded-xl font-semibold transition-all duration-200 ${
                        newActivity.spotsAvailable === num
                          ? "bg-primary text-primary-foreground shadow-soft"
                          : "bg-muted hover:bg-accent"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 pb-24 border-t border-border">
              <Button
                variant="warm"
                size="lg"
                className="w-full"
                onClick={handleCreate}
                disabled={
                  !newActivity.activity ||
                  !newActivity.description ||
                  !newActivity.location
                }
              >
                Post Activity
              </Button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};
