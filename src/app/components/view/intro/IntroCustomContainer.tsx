import { usePlayerStore } from "@/app/store/usePlayerStore"
import { weaponHammer } from "@/app/utils/weapon";
import Item from "./Item";

function IntroCustomContainer() {
    const { userData } = usePlayerStore();
    
    return (
        <div className="custom-container">
            <div className="custom-panel-wrapper">
                <h5>{userData?.career}년 차 개발자, 마리오</h5>
                <div className="custom-list">
                    <h3>웨폰</h3>
                    <ul>
                        {weaponHammer.map((hammer, i) => {
                            return <Item key={i + "HAMMER-KEY"} category={hammer.category} color={hammer.color}/>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default IntroCustomContainer