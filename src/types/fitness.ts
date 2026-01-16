export type FitnessGoal = 
  | 'gym'
  | 'running'
  | 'swimming'
  | 'yoga'
  | 'hiking'
  | 'cycling'
  | 'dance'
  | 'pilates'
  | 'martial-arts'
  | 'tennis'
  | 'other';

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type MatchPreference = 'same' | 'one-higher' | 'two-higher' | 'any';

export interface TimeSlot {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  goals: FitnessGoal[];
  level: FitnessLevel;
  location: string;
  schedule: TimeSlot[];
  matchPreference: MatchPreference;
  createdAt: Date;
}

export interface Match {
  id: string;
  user: UserProfile;
  compatibility: number;
  commonGoals: FitnessGoal[];
  matchedAt: Date;
  isFavorite: boolean;
  lastMessage?: string;
  isNew: boolean;
}

export interface ActivityRequest {
  id: string;
  user: UserProfile;
  activity: string;
  description: string;
  location: string;
  dateTime: Date;
  spotsAvailable: number;
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  match: Match;
  messages: Message[];
  lastMessageAt: Date;
}

export const GOAL_LABELS: Record<FitnessGoal, string> = {
  gym: '🏋️ Gym',
  running: '🏃 Running',
  swimming: '🏊 Swimming',
  yoga: '🧘 Yoga',
  hiking: '🥾 Hiking',
  cycling: '🚴 Cycling',
  dance: '💃 Dance',
  pilates: '🤸 Pilates',
  'martial-arts': '🥊 Martial Arts',
  tennis: '🎾 Tennis',
  other: '✨ Other',
};

export const LEVEL_LABELS: Record<FitnessLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
};

export const DAY_LABELS = {
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
  sunday: 'Sun',
};
