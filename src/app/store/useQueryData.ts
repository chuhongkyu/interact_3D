import { create } from "zustand";
import { IUserData } from "../types/userData";

interface QueryDataStore {
    career: string;
    setCareer: (career:string) => void;
}

export const useQueryDataStore = create<QueryDataStore>((set) => ({
    career: "0",
    setCareer: (career) => set({ career: career }),
}));
