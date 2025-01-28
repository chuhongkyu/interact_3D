import { useGameStore } from "@/app/store/useGameStore";
import { Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import { ReactTyped, Typed } from "react-typed";
import { Vector3Tuple } from "three";

interface ITextProps{
    check: string;
    position: Vector3Tuple;
    textArray: string[];
    textArray2?: string[];
    textArray3?: string[];
    secondStart?: boolean;
    thirdStart?:boolean;
    onComplete: ()=> void;
    onComplete2?: ()=> void;
    onComplete3?: ()=> void;
}

function TextWrapper(
    {
        check, 
        position, 
        textArray, 
        textArray2,
        textArray3, 
        secondStart,
        thirdStart,
        onComplete, 
        onComplete2,
        onComplete3
    }:ITextProps) {
    const [typed, setTyped] = useState<Typed| undefined>();
    const [typed2, setTyped2] = useState<Typed| undefined>();
    const [typed3, setTyped3] = useState<Typed| undefined>();
    const checkPoint  = useGameStore((state) => state.checkPoint);
    const [complete, setComplete] = useState(false);
    const [complete2, setComplete2] = useState(false);
    const [complete3, setComplete3] = useState(false);

    const onCompleteEnd = () => {
        onComplete();
        setComplete(true);
    }

    const onCompleteEnd2 = () => {
        onComplete2 && onComplete2();
        setComplete2(true)
    }

    const onCompleteEnd3 = () => {
        onComplete3 && onComplete3();
        setComplete3(true)
    }

    useEffect(() => {
        if (checkPoint === check && typed) {
            typed.start();
        }
    }, [checkPoint, typed]);

    useEffect(()=>{
        if(complete && typed){
            typed.stop();
            typed.destroy();
        }
    },[complete, typed])

    return (
        <Html center position={[position[0] + 1, position[1] + 3, position[2]]}>
        {
            checkPoint === check && !complete &&
                <div className="text-container-npc">
                    <ReactTyped
                        stopped
                        typedRef={setTyped}
                        strings={textArray}
                        onComplete={onCompleteEnd}
                        typeSpeed={40}
                    />
                </div>
        }
        {
            textArray2 && secondStart && !complete2 && 
                <div className="text-container-npc big">
                    <ReactTyped
                        startWhenVisible
                        startDelay={0.5}
                        stopped
                        typedRef={setTyped2}
                        strings={textArray2}
                        onComplete={onCompleteEnd2}
                        typeSpeed={40}
                    />
                </div>
        }
        {
            textArray3 && thirdStart && !complete3 && 
                <div className="text-container-npc big">
                    <ReactTyped
                        startWhenVisible
                        startDelay={0.5}
                        stopped
                        typedRef={setTyped3}
                        strings={textArray3}
                        onComplete={onCompleteEnd3}
                        typeSpeed={40}
                    />
                </div>
        }
        </Html>
    )
}

export default TextWrapper