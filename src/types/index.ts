export type MoodKey = 'happy' | 'excited' | 'scared' | 'annoyed' | ''
export type AppView = 'home' | 'chat'

export interface Mood {
  key: MoodKey
  label: string
  emoji: string
  tagline: string
  imgSrc: string
  bubble: string
  chatPrompt: string
  cardColor: string
  badgeColor: string
  chatGreeting: string
  chatPlaceholder: string
  chatResponses: string[]
}

export interface ChatMessage {
  id: string
  role: 'buddy' | 'user'
  text: string
}
