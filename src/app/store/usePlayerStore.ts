import { create } from "zustand";
import { Category, IUserData, Weapon } from "../types/userData";
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
    setWeapon: (category: Category, color: string) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
    userData: {
        career: null,
        capColor: null,
        weapon: null,
    },
    setUserData: (data) => set({ userData : data }),
    actions: {},
    setActions: (actions) => set({ actions: actions }),
    modelBone: null,
    setModelBone: (bone)=> set({ modelBone: bone }),
    setWeapon: (category:Category, color: string) =>
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
}));
