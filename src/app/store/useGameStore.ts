import { Vector3 } from "three";
import { create } from "zustand";

type StageType = "LOADING" | "DEFAULT" | "STAGE1" | "STAGE2" | "STAGE3"
type CheckPointType = "0" | "1" | "2" | "3" | "4"

interface GameStore {
    pointerPosition: Vector3;
    setPointerPosition: (pointer:Vector3) => void;
    stageType: StageType;
    setStageType: (type:StageType) => void;
    checkPoint: CheckPointType;
    setCheckPoint: (point:CheckPointType) => void
}

export const useGameStore = create<GameStore>((set) => ({
    pointerPosition: new Vector3(0, 0.02, 0),
    setPointerPosition: (pointer) => set({ pointerPosition: pointer }),
    stageType: "LOADING",
    setStageType: (type) => set({stageType: type}),
    checkPoint: "0",
    setCheckPoint: (point) => set({checkPoint: point})
}));
