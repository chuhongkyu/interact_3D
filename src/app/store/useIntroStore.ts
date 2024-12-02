import { create } from "zustand";

interface IntroStore {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useIntroStore = create<IntroStore>((set) => ({
  isLoading: true,
  setLoading: (loading) => set({ isLoading: loading }),
}));
