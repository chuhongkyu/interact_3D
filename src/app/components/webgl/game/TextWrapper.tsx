import { useGameStore } from "@/app/store/useGameStore";
import { Center, Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import { ReactTyped, Typed } from "react-typed";
import { Vector3, Vector3Tuple } from "three";

interface ITextProps{
    check: string;
    position: Vector3Tuple;
    textArray: string[]
}

function TextWrapper({check, position, textArray}:ITextProps) {
    const [typed, setTyped] = useState<Typed| undefined>();
    const checkPoint  = useGameStore((state) => state.checkPoint);

    useEffect(() => {
        if (checkPoint === check && typed) {
            typed.start();
        }
    }, [checkPoint, typed]);

    return (
        <Html center position={[position[0], position[1] + 1, position[2] + 2]}>
            {
                checkPoint === check &&
                <div className="text-container-npc">
                    <ReactTyped
                        stopped
                        typedRef={setTyped}
                        strings={textArray}
                        typeSpeed={40}
                    />
                </div>
            }
        </Html>
    )
}

export default TextWrapper