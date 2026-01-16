import { Match, UserProfile, ActivityRequest, FitnessLevel } from '@/types/fitness';

export const mockUsers: UserProfile[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
    bio: 'Looking for a running buddy to train for my first 5K! 🏃‍♀️',
    goals: ['running', 'yoga'],
    level: 'beginner',
    location: 'Downtown Toronto',
    schedule: [
      { day: 'monday', morning: true, afternoon: false, evening: true },
      { day: 'wednesday', morning: true, afternoon: false, evening: true },
      { day: 'saturday', morning: true, afternoon: true, evening: false },
    ],
    matchPreference: 'same',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Emma Rodriguez',
    email: 'emma@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    bio: 'Gym enthusiast looking for a weightlifting partner 💪',
    goals: ['gym', 'swimming'],
    level: 'intermediate',
    location: 'Midtown Toronto',
    schedule: [
      { day: 'tuesday', morning: false, afternoon: false, evening: true },
      { day: 'thursday', morning: false, afternoon: false, evening: true },
      { day: 'sunday', morning: true, afternoon: true, evening: false },
    ],
    matchPreference: 'one-higher',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    name: 'Mia Thompson',
    email: 'mia@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    bio: 'Want to try yoga but nervous to go alone. Join me? 🧘‍♀️',
    goals: ['yoga', 'pilates'],
    level: 'beginner',
    location: 'North York',
    schedule: [
      { day: 'monday', morning: true, afternoon: false, evening: false },
      { day: 'friday', morning: true, afternoon: false, evening: true },
    ],
    matchPreference: 'any',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '4',
    name: 'Jessica Park',
    email: 'jessica@example.com',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face',
    bio: 'Training for a triathlon - need swimming and cycling buddies!',
    goals: ['swimming', 'cycling', 'running'],
    level: 'advanced',
    location: 'Etobicoke',
    schedule: [
      { day: 'monday', morning: true, afternoon: false, evening: false },
      { day: 'wednesday', morning: true, afternoon: false, evening: false },
      { day: 'friday', morning: true, afternoon: false, evening: false },
      { day: 'saturday', morning: true, afternoon: true, evening: false },
    ],
    matchPreference: 'same',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '5',
    name: 'Olivia Williams',
    email: 'olivia@example.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face',
    bio: 'Dance fitness newbie! Looking for someone to take Zumba classes with 💃',
    goals: ['dance', 'gym'],
    level: 'beginner',
    location: 'Scarborough',
    schedule: [
      { day: 'tuesday', morning: false, afternoon: false, evening: true },
      { day: 'saturday', morning: false, afternoon: true, evening: true },
    ],
    matchPreference: 'same',
    createdAt: new Date('2024-02-05'),
  },
];

export const mockMatches: Match[] = [
  {
    id: 'm1',
    user: mockUsers[0],
    compatibility: 92,
    commonGoals: ['running'],
    matchedAt: new Date(),
    isFavorite: false,
    isNew: true,
  },
  {
    id: 'm2',
    user: mockUsers[1],
    compatibility: 85,
    commonGoals: ['gym'],
    matchedAt: new Date(Date.now() - 86400000),
    isFavorite: true,
    lastMessage: 'See you at the gym tomorrow!',
    isNew: false,
  },
  {
    id: 'm3',
    user: mockUsers[2],
    compatibility: 78,
    commonGoals: ['yoga'],
    matchedAt: new Date(Date.now() - 172800000),
    isFavorite: false,
    isNew: true,
  },
  {
    id: 'm4',
    user: mockUsers[3],
    compatibility: 88,
    commonGoals: ['swimming', 'cycling'],
    matchedAt: new Date(Date.now() - 259200000),
    isFavorite: true,
    lastMessage: 'Great swim session yesterday!',
    isNew: false,
  },
  {
    id: 'm5',
    user: mockUsers[4],
    compatibility: 75,
    commonGoals: ['dance'],
    matchedAt: new Date(Date.now() - 345600000),
    isFavorite: false,
    isNew: false,
  },
];

export const mockActivityRequests: ActivityRequest[] = [
  {
    id: 'a1',
    user: mockUsers[0],
    activity: 'Sunrise Run at High Park',
    description: 'Looking for someone to join me for an early morning 5K run. All paces welcome!',
    location: 'High Park, Toronto',
    dateTime: new Date(Date.now() + 172800000),
    spotsAvailable: 2,
    createdAt: new Date(),
  },
  {
    id: 'a2',
    user: mockUsers[2],
    activity: 'First-Timer Yoga Class',
    description: 'Nervous to try yoga alone! Looking for someone to take a beginner class with me.',
    location: 'YogaSpace Studio, Yonge St',
    dateTime: new Date(Date.now() + 259200000),
    spotsAvailable: 1,
    createdAt: new Date(Date.now() - 43200000),
  },
  {
    id: 'a3',
    user: mockUsers[4],
    activity: 'Zumba Dance Night',
    description: 'Anyone want to try Zumba? I heard it\'s super fun but I don\'t want to go solo!',
    location: 'GoodLife Fitness, Scarborough',
    dateTime: new Date(Date.now() + 432000000),
    spotsAvailable: 3,
    createdAt: new Date(Date.now() - 86400000),
  },
];

export const getLevelColor = (level: FitnessLevel): string => {
  switch (level) {
    case 'beginner':
      return 'level-badge-beginner';
    case 'intermediate':
      return 'level-badge-intermediate';
    case 'advanced':
      return 'level-badge-advanced';
    case 'expert':
      return 'level-badge-expert';
    default:
      return 'level-badge-beginner';
  }
};
