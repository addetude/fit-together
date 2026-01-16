import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile, Match, ActivityRequest, FitnessGoal, FitnessLevel, MatchPreference, TimeSlot } from '@/types/fitness';
import { mockMatches, mockActivityRequests } from '@/data/mockData';

interface OnboardingData {
  name: string;
  email: string;
  password: string;
  goals: FitnessGoal[];
  level: FitnessLevel;
  location: string;
  schedule: TimeSlot[];
  matchPreference: MatchPreference;
}

interface AppContextType {
  isLoggedIn: boolean;
  isOnboarding: boolean;
  currentUser: UserProfile | null;
  matches: Match[];
  activityRequests: ActivityRequest[];
  onboardingData: Partial<OnboardingData>;
  login: (email: string, password: string) => void;
  logout: () => void;
  startOnboarding: () => void;
  updateOnboardingData: (data: Partial<OnboardingData>) => void;
  completeOnboarding: () => void;
  toggleFavorite: (matchId: string) => void;
  addActivityRequest: (request: Omit<ActivityRequest, 'id' | 'user' | 'createdAt'>) => void;
  updateUserPreferences: (data: Partial<OnboardingData>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [matches, setMatches] = useState<Match[]>(mockMatches);
  const [activityRequests, setActivityRequests] = useState<ActivityRequest[]>(mockActivityRequests);
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({});

  const login = (email: string, password: string) => {
    // Mock login - in real app would validate credentials
    if (email && password) {
      setIsLoggedIn(true);
      setIsOnboarding(false);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setOnboardingData({});
  };

  const startOnboarding = () => {
    setIsOnboarding(true);
  };

  const updateOnboardingData = (data: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  const completeOnboarding = () => {
    const newUser: UserProfile = {
      id: 'current-user',
      name: onboardingData.name || 'New User',
      email: onboardingData.email || '',
      goals: onboardingData.goals || [],
      level: onboardingData.level || 'beginner',
      location: onboardingData.location || '',
      schedule: onboardingData.schedule || [],
      matchPreference: onboardingData.matchPreference || 'same',
      createdAt: new Date(),
    };
    setCurrentUser(newUser);
    setIsOnboarding(false);
    setIsLoggedIn(true);
  };

  const toggleFavorite = (matchId: string) => {
    setMatches(prev => 
      prev.map(match => 
        match.id === matchId 
          ? { ...match, isFavorite: !match.isFavorite }
          : match
      )
    );
  };

  const addActivityRequest = (request: Omit<ActivityRequest, 'id' | 'user' | 'createdAt'>) => {
    if (!currentUser) return;
    const newRequest: ActivityRequest = {
      ...request,
      id: `a${Date.now()}`,
      user: currentUser,
      createdAt: new Date(),
    };
    setActivityRequests(prev => [newRequest, ...prev]);
  };

  const updateUserPreferences = (data: Partial<OnboardingData>) => {
    // Update onboarding data
    setOnboardingData(prev => ({ ...prev, ...data }));
    
    // If user is logged in, update current user
    if (currentUser) {
      setCurrentUser(prev => prev ? { ...prev, ...data } : null);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        isOnboarding,
        currentUser,
        matches,
        activityRequests,
        onboardingData,
        login,
        logout,
        startOnboarding,
        updateOnboardingData,
        completeOnboarding,
        toggleFavorite,
        addActivityRequest,
        updateUserPreferences,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
