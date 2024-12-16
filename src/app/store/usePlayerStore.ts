import { create } from "zustand";
import { WCategory, IUserData, Weapon, BCategory } from "../types/userData";
import { AnimationAction, Bone, Group, Object3D } from "three";

interface PlayerStore {
    userData: IUserData;
    setUserData: (data: IUserData) => void;
    actions: {
        [x: string]: AnimationAction | null;
    } 
    setActions: (actions: {[x: string]: AnimationAction | null;})=> void;
    modelBone: Bone | null;
    setModelBone: (bone:Bone)=> void;
    setWeapon: (category: WCategory, color?: string) => void;
    setBack: (category: BCategory, color?: string) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
    userData: {
        career: null,
        capColor: null,
        weapon: null,
        back:null,
    },
    setUserData: (data) => set({ userData : data }),
    actions: {},
    setActions: (actions) => set({ actions: actions }),
    modelBone: null,
    setModelBone: (bone)=> set({ modelBone: bone }),
    setWeapon: (category, color) =>
        set((state) => ({
            userData: {
                ...state.userData,
                weapon: {
                    category,
                    color,
                },
            },
        })
    ),
    setBack: (category, color) =>
        set((state) => ({
            userData: {
                ...state.userData,
                back: {
                    category,
                    color,
                },
            },
        })
    ),
}));
