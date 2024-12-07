import { create } from "zustand";
import { IUserData } from "../types/userData";
import { AnimationAction } from "three";

interface PlayerStore {
    userData: IUserData;
    setUserData: (data: IUserData) => void;
    actions: {
        [x: string]: AnimationAction | null;
    } 
    setActions: (actions: {[x: string]: AnimationAction | null;})=> void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
    userData: {
        career: null,
        capColor: null,
    },
    setUserData: (data) => set({ userData : data }),
    actions: {},
    setActions: (actions)=> set({ actions: actions }),
}));
