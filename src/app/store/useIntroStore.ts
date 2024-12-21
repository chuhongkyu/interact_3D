import { create } from "zustand";

type IntroModeType = "DEFAULT" | "INTRO" | "CUSTOM" | "END";

interface IntroStore {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  mode: IntroModeType;
  setMode: (mode: IntroModeType) => void;
  textOrder: number;
  setTextOrder: (value: number) => void;
  isDiceStart: boolean;
  setDiceStart: (start: boolean) => void;
  diceNumber: number;
  increaseDiceNumber: () => void;
  decreaseDiceNumber: () => void;
}

export const useIntroStore = create<IntroStore>((set) => ({
  isLoading: true,
  setLoading: (loading) => set({ isLoading: loading }),
  mode: "DEFAULT",
  setMode: (mode) => set({ mode: mode }),
  textOrder: 1,
  setTextOrder: (value) => set({ textOrder: value }),
  isDiceStart: false,
  setDiceStart: (start) => set({ isDiceStart: start }),
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
