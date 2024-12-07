import { create } from "zustand";

interface QueryDataStore {
    career: string;
    setCareer: (career:string) => void;
}

export const useQueryDataStore = create<QueryDataStore>((set) => ({
    career: "0",
    setCareer: (career) => set({ career: career }),
}));
