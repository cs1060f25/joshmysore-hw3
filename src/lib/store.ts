import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserPreferences {
  issues: string[];
  impact: string[];
  strategy: "single" | "spread";
}

interface AppState {
  preferences: UserPreferences;
  currentStep: number;
  selectedCandidates: string[];
  setPreferences: (preferences: Partial<UserPreferences>) => void;
  setCurrentStep: (step: number) => void;
  setSelectedCandidates: (candidates: string[]) => void;
  reset: () => void;
}

const defaultPreferences: UserPreferences = {
  issues: [],
  impact: [],
  strategy: "single"
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      preferences: defaultPreferences,
      currentStep: 0,
      selectedCandidates: [],
      setPreferences: (newPreferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences }
        })),
      setCurrentStep: (step) => set({ currentStep: step }),
      setSelectedCandidates: (candidates) => set({ selectedCandidates: candidates }),
      reset: () => set({
        preferences: defaultPreferences,
        currentStep: 0,
        selectedCandidates: []
      })
    }),
    {
      name: 'donate-impact-store',
      partialize: (state) => ({
        preferences: state.preferences,
        currentStep: state.currentStep
      })
    }
  )
);
