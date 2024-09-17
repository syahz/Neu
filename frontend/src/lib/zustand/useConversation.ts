import { create } from 'zustand'

type ConversationRequest = {
  userId: string
  fullName: string
  profilePic: string
}

type ConversationState = {
  selectedConversation: ConversationRequest | null
  setSelectedConversation: (conversation: ConversationRequest | null) => void
  messages: any[]
  setMessages: (messages: any[]) => void
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation: ConversationRequest | null) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages: any[]) => set({ messages })
}))

export default useConversation
