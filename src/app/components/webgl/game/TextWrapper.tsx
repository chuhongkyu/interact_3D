import { useGameStore } from "@/app/store/useGameStore";
import { Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import { ReactTyped, Typed } from "react-typed";
import { Vector3Tuple } from "three";

interface ITextProps{
    check: string;
    position: Vector3Tuple;
    textArray: string[];
    onComplete: ()=> void;
}

function TextWrapper({check, position, onComplete, textArray}:ITextProps) {
    const [typed, setTyped] = useState<Typed| undefined>();
    const checkPoint  = useGameStore((state) => state.checkPoint);

    useEffect(() => {
        if (checkPoint === check && typed) {
            typed.start();
        }
    }, [checkPoint, typed]);

    return (
        <Html center position={[position[0] + 1, position[1] + 3, position[2]]}>
            {
                checkPoint === check &&
                <div className="text-container-npc">
                    <ReactTyped
                        stopped
                        typedRef={setTyped}
                        strings={textArray}
                        onComplete={onComplete}
                        typeSpeed={40}
                    />
                </div>
            }
        </Html>
    )
}

export default TextWrapper