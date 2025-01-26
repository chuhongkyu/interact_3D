export interface IUserData {
    career: number | null;
    capColor?: string | null;
    weapon?: Weapon | null;
    back?: Back | null;
}

export interface Weapon {
    category?: WCategory;
    color?: string;
    src?:string;
}

export interface Back {
    category?: BCategory;
    color?: string;
    src?:string;
}

export type WCategory = "HAMMER" | "MUSHROOM" | "STAR" | "FLOWER" | null
export type BCategory = "TURTLE" | "STAR" | null