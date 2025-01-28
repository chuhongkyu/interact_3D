import { useGameStore } from '@/app/store/useGameStore';
import { stage1 } from '@/app/utils/gameData'
import React from 'react'

function BoxExample() {
    const number = useGameStore((state) => state.stage1Problem);
    return (
        <div className="ui-stage-1">
            <div className="box-example-wrapper">
                <div className="box-example-grid">
                    {stage1.problem[number].map((el,i)=>{
                        return(
                            <div 
                                key={`${i}-BOX-EXAMPLE-KEY`}  
                                className={`${el.active ? "active": ""} box-example`}
                                // style={{order: stage1.problem[number].length - i}}
                            ></div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default BoxExample