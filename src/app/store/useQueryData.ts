import { create } from "zustand";
import { IUserData } from "../types/userData";

interface QueryDataStore {
    career: string;
    setCareer: (career:string) => void;
    userData: IUserData;
    setUserData: (data: IUserData) => void;
}

export const useQueryDataStore = create<QueryDataStore>((set) => ({
    career: "0",
    setCareer: (career) => set({ career: career }),
    userData: {
        career: null,
        capColor: null,
    },
    setUserData: (data) => set({ userData : data }),
}));
