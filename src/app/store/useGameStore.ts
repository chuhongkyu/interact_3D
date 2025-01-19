import { Vector3 } from "three";
import { create } from "zustand";

type PlayerState = "LOADING" | "DEFAULT" | "STAGE1" | "STAGE2" | "STAGE3"
type StageType = "STAGE1" | "STAGE2" | "STAGE3" | null;
type CheckPointType = "0" | "1" | "2" | "3" | "4"

interface StageClear {
    stage: StageType;
    clear: boolean;
}

interface GameStore {
    pointerPosition: Vector3;
    setPointerPosition: (pointer:Vector3) => void;
    playerState: PlayerState;
    setPlayerState: (state:PlayerState) => void;
    stageType: StageClear[];
    setStageType: (stage:StageType) => void;
    checkPoint: CheckPointType;
    setCheckPoint: (point:CheckPointType) => void
}

export const useGameStore = create<GameStore>((set, get) => ({
    pointerPosition: new Vector3(0, 0.02, 0),
    setPointerPosition: (pointer) => set({ pointerPosition: pointer }),
    playerState: "LOADING",
    setPlayerState: (state) => set({ playerState: state }),
    stageType: [
        { stage: "STAGE1", clear: false },
        { stage: "STAGE2", clear: false },
        { stage: "STAGE3", clear: false },
    ],
    setStageType: (stage) =>
        set((state) => ({
            stageType: state.stageType.map((s) =>
                s.stage === stage ? { ...s, clear: true } : s
            ),
        }
    )),
    checkPoint: "0",
    setCheckPoint: (point) => set({checkPoint: point})
}));
