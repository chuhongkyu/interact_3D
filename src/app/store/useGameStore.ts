import { Vector3 } from "three";
import { create } from "zustand";

interface GameStore {
    pointerPosition: Vector3;
    setPointerPosition: (pointer:Vector3) => void;
}

export const useGameStore = create<GameStore>((set) => ({
    pointerPosition: new Vector3(0, 0.02, 0),
    setPointerPosition: (pointer) => set({ pointerPosition: pointer }),
}));
