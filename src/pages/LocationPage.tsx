import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const POPULAR_LOCATIONS = [
  'Toronto',
  'Vancouver',
  'Montreal',
  'Calgary',
  'Ottawa',
  'Edmonton',
  'Mississauga',
  'Winnipeg',
  'Quebec City',
  'Hamilton',
];

export const LocationPage = () => {
  const navigate = useNavigate();
  const { currentUser, onboardingData, updateUserPreferences } = useApp();
  
  const currentLocation = currentUser?.location || onboardingData.location || '';
  const [location, setLocation] = useState(currentLocation);
  const [customLocation, setCustomLocation] = useState('');

  const handleSelectLocation = (loc: string) => {
    setLocation(loc);
    setCustomLocation('');
  };

  const handleSave = () => {
    updateUserPreferences({ location: customLocation || location });
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
          <h1 className="font-display text-2xl font-bold text-primary-foreground">Location</h1>
        </div>

        <p className="text-primary-foreground/80 text-sm">
          Set your location to find partners nearby
        </p>
      </header>

      {/* Content */}
      <main className="px-4 -mt-2 pb-24 space-y-4">
        {/* Search Input */}
        <div>
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for a city..."
                  value={customLocation}
                  onChange={(e) => {
                    setCustomLocation(e.target.value);
                    setLocation('');
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted border-2 border-transparent focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Locations */}
        <div>
          <h3 className="font-display font-bold text-lg mb-3">Popular Locations</h3>
          <Card>
            <CardContent className="p-4 space-y-2">
              {POPULAR_LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleSelectLocation(loc)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-xl transition-all",
                    location === loc && !customLocation
                      ? "bg-accent border-2 border-primary"
                      : "bg-muted border-2 border-transparent hover:border-primary/30"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    location === loc && !customLocation
                      ? "bg-primary"
                      : "bg-primary/10"
                  )}>
                    <MapPin size={20} className={cn(
                      location === loc && !customLocation
                        ? "text-primary-foreground"
                        : "text-primary"
                    )} />
                  </div>
                  <span className={cn(
                    "flex-1 text-left font-medium",
                    location === loc && !customLocation && "text-[#4d4b66]"
                  )}>
                    {loc}
                  </span>
                  {location === loc && !customLocation && (
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
            disabled={!location && !customLocation}
          >
            Save Location
          </Button>
        </div>
      </main>
    </div>
  );
};
