import { usePlayerStore } from '@/app/store/usePlayerStore';
import { Category } from '@/app/types/userData';
import React from 'react'

function Item({category = "HAMMER", color = "0"}:{category?:Category, color?: string}) {
    const { setWeapon } = usePlayerStore();
    
    return (
        <li onClick={()=> setWeapon(category, color)}>
                            
        </li>
    )
}

export default Item