import React, { useEffect, useRef, useState } from 'react'
import { usePlayerStore } from '@/app/store/usePlayerStore'
import { Turtle } from './Turtle';

function Back() {
    const { modelBone, userData } = usePlayerStore();
    const back = useRef<any>(null)

    useEffect(()=>{
        if(userData.back){
            if(back && modelBone){
                modelBone?.traverse((obj) => {
                    if (obj.isObject3D && obj.name === "mixamorigSpine1_02") {
                        obj.add(back?.current);
                    }
                });
            }
        }
    },[modelBone, back, userData])


    if(userData.back?.category){
        return (
            <>
                <group ref={back}>
                    {userData.back?.category === "TURTLE" && <Turtle color={userData.back?.color}/>}
                </group>
            </>
        )
    }

    return <></>
}

export default Back