import { create } from "zustand";

export const useManuPilotStore = create((set, get) => ({
  conversation: [], // Stores the chat messages
  selectedProject: null, // Stores selected project if user chooses one
  setConversation: (newConversation) => set({ conversation: newConversation }),
  addMessage: (message) =>
    set((state) => ({ conversation: [...state.conversation, message] })),
  resetConversation: () => set({ conversation: [] }),
  setSelectedProject: (project) => set({ selectedProject: project }),
  clearSelectedProject: () => set({ selectedProject: null }),
}));
