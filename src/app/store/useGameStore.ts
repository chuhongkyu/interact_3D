import { Vector3 } from "three";
import { create } from "zustand";

type PlayerState = "LOADING" | "DEFAULT" | "STAGE1" | "STAGE2" | "STAGE3"
type StageType = "STAGE1" | "STAGE2" | "STAGE3" | null;
type CheckPointType = "0" | "1" | "2" | "3" | "4"

interface StageClear {
    stage: StageType;
    active: boolean;
    clear: boolean;
}

interface GameStore {
    pointerPosition: Vector3;
    setPointerPosition: (pointer:Vector3) => void;
    playerState: PlayerState;
    setPlayerState: (state:PlayerState) => void;
    stageType: StageClear[];
    stage1Problem: number;
    stage2Count: number;
    setStage2Count: (number:number) => void;
    setStageTypeClear: (stage:StageType) => void;
    setStageTypeActive: (stage:StageType) => void;
    checkPoint: CheckPointType;
    setCheckPoint: (point:CheckPointType) => void;
    originalRef: any;
    setOriginalPlayerRef: (ref:any) => void;
    isFirstGame: boolean;
    setIsFirstGame: (value: boolean) => void;
    loadGameData: () => void;
    resetStageActive: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
    pointerPosition: new Vector3(0, 0.02, 0),
    setPointerPosition: (pointer) => set({ pointerPosition: pointer }),
    playerState: "LOADING",
    setPlayerState: (state) => set({ playerState: state }),
    stageType: [
        { stage: "STAGE1", active: false, clear: false },
        { stage: "STAGE2", active: false, clear: false },
        { stage: "STAGE3", active: false, clear: false },
    ],
    stage1Problem: 0,
    stage2Count: 0,
    setStage2Count: (number) => set({stage2Count: number}),
    setStageTypeClear: (stage) => {
        const updatedStageType = get().stageType.map((s) =>
            s.stage === stage ? { ...s, clear: true, active: false } : s
        );
        localStorage.setItem("stageType", JSON.stringify(updatedStageType));
        set({ stageType: updatedStageType });
    },
    setStageTypeActive: (stage) =>
        set((state) => {
            const randomProblem = Math.floor(Math.random() * 3);
            return {
                stage1Problem: randomProblem,
                stageType: state.stageType.map((s) =>
                    s.stage === stage ? { ...s, active: true } : s
                ),
            };
        }
    ),
    checkPoint: "0",
    setCheckPoint: (point) => set({checkPoint: point}),
    originalRef: null,
    setOriginalPlayerRef: (ref) => set({ originalRef: ref}),
    isFirstGame: true,
    setIsFirstGame: (value) => {
        localStorage.setItem("isFirstGame", JSON.stringify(value));
        set({ isFirstGame: value });
    },
    loadGameData: () => {
        const savedIsFirstGame = localStorage.getItem("isFirstGame");
        const savedStageType = localStorage.getItem("stageType");

        if (savedIsFirstGame) {
            set({ isFirstGame: JSON.parse(savedIsFirstGame) });
        }

        if (savedStageType) {
            set({ stageType: JSON.parse(savedStageType) });
        }
    },
    resetStageActive: () => {
        set((state) => {
            const resetStages = state.stageType.map((s) => ({ ...s, active: false }));
            localStorage.setItem("stageType", JSON.stringify(resetStages));
            return { stageType: resetStages };
        });
    },
}));
