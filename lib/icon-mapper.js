import { 
  Brain, MessageSquare, Compass, BarChart, Sparkles, 
  Palette, Dribbble, Mountain, Plane, Trophy, 
  HelpCircle, Star, Heart, Map, Activity 
} from 'lucide-react'

// Map of string names to actual Lucide React components
export const iconMap = {
  Brain,
  MessageSquare,
  Compass,
  BarChart,
  Sparkles,
  Palette,
  Dribbble,
  Mountain,
  Plane,
  Trophy,
  HelpCircle,
  Star,
  Heart,
  Map,
  Activity
}

// Helper component that safely renders an icon by name
export function DynamicIcon({ name, className = "" }) {
  const IconComponent = iconMap[name] || HelpCircle
  return <IconComponent className={className} />
}
