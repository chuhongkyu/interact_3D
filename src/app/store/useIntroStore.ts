import { create } from "zustand";

interface IntroStore {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  introStart: boolean;
  setIntroStart: (start: boolean) => void;
  textOrder: number;
  setTextOrder: (value: number) => void;
  diceNumber: number;
  increaseDiceNumber: () => void;
  decreaseDiceNumber: () => void;
}

export const useIntroStore = create<IntroStore>((set) => ({
  isLoading: true,
  setLoading: (loading) => set({ isLoading: loading }),
  introStart: false,
  setIntroStart: (start) => set({ introStart: start }),
  textOrder: 0,
  setTextOrder: (value) => set({ textOrder: value }),
  diceNumber: 1,
  increaseDiceNumber: () =>
    set((state) => ({
      diceNumber: state.diceNumber === 6 ? 1 : state.diceNumber + 1,
    })),
  decreaseDiceNumber: () =>
    set((state) => ({
      diceNumber: state.diceNumber === 1 ? 6 : state.diceNumber - 1,
    })),
}));
