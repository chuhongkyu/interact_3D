import React, { useEffect, useRef, useState } from 'react'
import { Hammer } from './Hammer'
import { usePlayerStore } from '@/app/store/usePlayerStore'
import { Group } from 'three';

function Weapon() {
    const { modelBone, userData } = usePlayerStore();
    const weapon = useRef<any>(null)

    useEffect(()=>{
        if(userData.weapon){
            if(weapon && modelBone){
                modelBone?.traverse((obj) => {
                    if (obj.isObject3D && obj.name === "mixamorigLeftHand_010") {
                        obj.add(weapon?.current);
                    }
                });
            }
        }
    },[modelBone, weapon, userData])

    if(userData.weapon?.category === "HAMMER"){
        return (
            <group ref={weapon}>
                <Hammer color={userData.weapon?.color}/>
            </group>
        )
    }

    return <></>
}

export default Weapon