import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserPreferences {
  issues: string[];
  impact: "close" | "track" | "infra" | undefined;
  strategy: "single" | "spread" | undefined;
}

interface AppState {
  preferences: UserPreferences;
  currentStep: number;
  selectedCandidates: string[];
  setIssues: (issues: string[]) => void;
  toggleIssue: (issue: string) => void;
  setImpact: (impact: "close" | "track" | "infra" | undefined) => void;
  setStrategy: (strategy: "single" | "spread" | undefined) => void;
  setCurrentStep: (step: number) => void;
  setSelectedCandidates: (candidates: string[]) => void;
  reset: () => void;
}

const defaultPreferences: UserPreferences = {
  issues: [],
  impact: undefined,
  strategy: undefined
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      preferences: defaultPreferences,
      currentStep: 0,
      selectedCandidates: [],
      setIssues: (issues) => set((state) => ({
        preferences: { ...state.preferences, issues }
      })),
      toggleIssue: (issue) => set((state) => ({
        preferences: {
          ...state.preferences,
          issues: state.preferences.issues.includes(issue)
            ? state.preferences.issues.filter(i => i !== issue)
            : [...state.preferences.issues, issue]
        }
      })),
      setImpact: (impact) => set((state) => ({
        preferences: { ...state.preferences, impact }
      })),
      setStrategy: (strategy) => set((state) => ({
        preferences: { ...state.preferences, strategy }
      })),
      setCurrentStep: (step) => set({ currentStep: step }),
      setSelectedCandidates: (candidates) => set({ selectedCandidates: candidates }),
      reset: () => {
        // Clear localStorage and reset to defaults
        localStorage.removeItem('donate-impact-store');
        set({
          preferences: defaultPreferences,
          currentStep: 0,
          selectedCandidates: []
        });
      }
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