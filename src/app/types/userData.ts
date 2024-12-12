export interface IUserData {
    career: number | null;
    capColor?: string | null;
    weapon?: Weapon | null;
}

export interface Weapon {
    category?: Category;
    color?: string;
}

export type Category = "HAMMER" | "MUSHROOM" | "STAR" | "FLOWER" | null