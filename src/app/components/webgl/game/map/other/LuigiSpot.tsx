import React from 'react'
import { Lgiul } from '../../npc/Lgiul'
import Spot from './Spot'
import mapData from '@/app/utils/MapData'
import Badge from '../../common/Badge'
import TextWrapper from '../../TextWrapper'

function LuigiSpot() {
    return (
        <>
            <Lgiul rotation={[0,Math.PI,0]} position={[mapData[1].position[0],-0.05, mapData[1].position[2]]}/>
            <Badge position={mapData[1].position} color="rgb(0, 255, 34)" text="개발자 지망생 | 루이지" delay={2}/>
            <Spot position={mapData[1].position}/>
            <TextWrapper
                check="2"
                textArray={mapData[1].text}
                textSize={"big"}
                position={mapData[1].position}
                onComplete={()=> {}}
            />
        </>
    )
}

export default LuigiSpot