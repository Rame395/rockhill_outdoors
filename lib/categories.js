import { Brain, MessageSquare, Compass, BarChart, Sparkles, Palette, Dribbble, Mountain, Plane, Trophy } from 'lucide-react'

export const learningCategories = [
  {
    slug: 'self-management',
    name: 'Self-management',
    description: 'Build resilience, emotional balance, and self-discipline for outdoor and everyday challenges.',
    icon: <Brain className="w-7 h-7 text-rockhill-sunset" />
  },
  {
    slug: 'communication',
    name: 'Communication',
    description: 'Strengthen how you listen, speak, and collaborate in groups and in the outdoors.',
    icon: <MessageSquare className="w-7 h-7 text-rockhill-sunset" />
  },
  {
    slug: 'leadership',
    name: 'Leadership',
    description: 'Develop the confidence to lead teams in nature and in life with clarity and empathy.',
    icon: <Compass className="w-7 h-7 text-rockhill-sunset" />
  },
  {
    slug: 'management',
    name: 'Management',
    description: 'Learn to plan, organize, and manage people, time, and resources in real-world situations.',
    icon: <BarChart className="w-7 h-7 text-rockhill-sunset" />
  },
  {
    slug: 'other-critical-skills',
    name: 'Other Critical Skills',
    description: 'Problem-solving, decision-making, and life skills that help you thrive in any environment.',
    icon: <Sparkles className="w-7 h-7 text-rockhill-sunset" />
  }
]

export const lifestyleCategories = [
  {
    slug: 'hobbies',
    name: 'Hobbies',
    description: 'Discover fulfilling outdoor and creative hobbies that fit your lifestyle.',
    icon: <Palette className="w-7 h-7 text-rockhill-sunset" />
  },
  {
    slug: 'sports',
    name: 'Sports',
    description: 'Stay active through team and individual sports rooted in the outdoors.',
    icon: <Dribbble className="w-7 h-7 text-rockhill-sunset" />
  },
  {
    slug: 'xtreme-sports',
    name: 'Xtreme Sports',
    description: 'High-adrenaline activities for those who love to push their limits safely.',
    icon: <Mountain className="w-7 h-7 text-rockhill-sunset" />
  },
  {
    slug: 'travel-with-us',
    name: 'Travel With Us',
    description: 'Join curated journeys and immersive travel experiences around the world.',
    icon: <Plane className="w-7 h-7 text-rockhill-sunset" />
  },
  {
    slug: 'challenges',
    name: 'Challenges',
    description: 'Structured challenges that stretch your comfort zone and grow your character.',
    icon: <Trophy className="w-7 h-7 text-rockhill-sunset" />
  }
]
