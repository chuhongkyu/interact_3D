import { useGameStore } from "@/app/store/useGameStore";
import { Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import { ReactTyped, Typed } from "react-typed";
import { Vector3Tuple } from "three";

interface ITextProps{
    position: Vector3Tuple;
    textArray: string[];
    onComplete: ()=> void;
}

function StageTextWrapper({position, onComplete, textArray}:ITextProps) {
    const [typed, setTyped] = useState<Typed| undefined>();
    const stageType = useGameStore((state) => state.stageType);
    const [isStart, setStart] = useState(false);

    const onCompleteEnd = () => {
        onComplete();
        setStart(false);
    }

    useEffect(() => {
        if (isStart && typed) {
            typed.start();
        }
    }, [typed, isStart]);

    useEffect(()=>{
        const isActiveStage = stageType.some(stage => stage.stage === "STAGE1" && stage.active);
        if (isActiveStage) {
            setStart(true);
        }
    },[stageType])

    return (
        <Html center position={[position[0] + 1, position[1] + 3, position[2]]}>
            {
                isStart &&
                <div className="text-container-npc big">
                    <ReactTyped
                        stopped
                        typedRef={setTyped}
                        strings={textArray}
                        onComplete={onCompleteEnd}
                        typeSpeed={60}
                    />
                </div>
            }
        </Html>
    )
}

export default StageTextWrapper