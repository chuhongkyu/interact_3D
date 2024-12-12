import React, { useEffect, useRef, useState } from 'react'
import { Hammer } from './Hammer'
import { usePlayerStore } from '@/app/store/usePlayerStore'
import { Group } from 'three';
import { Flower } from './Flower';

function Weapon() {
    const { modelBone, userData } = usePlayerStore();
    const weapon = useRef<any>(null)
    const rightWeapon = useRef<any>(null)

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

    useEffect(()=>{
        if(userData.weapon){
            if(rightWeapon && modelBone){
                modelBone?.traverse((obj) => {
                    if (obj.isObject3D && obj.name === "mixamorigRightHand_010") {
                        obj.add(rightWeapon?.current);
                    }
                });
            }
        }
    },[modelBone, rightWeapon, userData])

    if(userData.weapon?.category){
        return (
            <>
                <group ref={weapon}>
                    {userData.weapon?.category === "HAMMER" && <Hammer color={userData.weapon?.color}/>}
                    
                </group>
                <group ref={rightWeapon}>
                    {userData.weapon?.category === "FLOWER" && <Flower/>}
                </group>
            </>
        )
    }

    return <></>
}

export default Weapon