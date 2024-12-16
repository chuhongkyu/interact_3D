import { usePlayerStore } from '@/app/store/usePlayerStore';
import { BCategory, WCategory } from '@/app/types/userData';
import React from 'react'

function Item({category = "HAMMER", src, color = "0"}:{category?:WCategory | BCategory, src?:string, color?: string}) {
    const { setWeapon, setBack } = usePlayerStore();

    const onClick = () => {
        if(category === "TURTLE"){
            setBack(category, color)
        }else if(category === "FLOWER" || category === "HAMMER"){
            setWeapon(category, color)
        }
    }
    
    return (
        <li onClick={onClick}>
            <img src={src} alt="color"/>      
        </li>
    )
}

export default Item