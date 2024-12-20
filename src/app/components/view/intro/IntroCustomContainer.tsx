import { usePlayerStore } from "@/app/store/usePlayerStore"
import { backItem, handItem } from "@/app/utils/itemLIst";
import Item from "./Item";
import { useIntroStore } from "@/app/store/useIntroStore";

function IntroCustomContainer() {
    const { userData, setWeapon, setBack } = usePlayerStore();
    const { setTextOrder, setMode } = useIntroStore();

    const onReset = () => {
        setWeapon(null)
        setBack(null);
    }

    const onComplete = () => {
        setMode("INTRO")
        setTextOrder(3)
    }
    
    return (
        <div className="custom-container">
            <div className="custom-panel-wrapper">
                <div className="custom-list-group">
                    <h5>{userData?.career}년 차 개발자, 마리오</h5>
            
                    <div className="custom-list">
                        <h3>웨폰</h3>
                        <ul>
                            {handItem.map((hammer, i) => {
                                return <Item key={i + "HAMMER-KEY"} src={hammer.src} category={hammer.category} color={hammer.color}/>
                            })}
                        </ul>
                    </div>
                    <div className="custom-list">
                        <h3>백</h3>
                        <ul>
                            {backItem.map((hammer, i) => {
                                return <Item key={i + "HAMMER-KEY"} src={hammer.src} category={hammer.category} color={hammer.color}/>
                            })}
                        </ul>
                    </div>
                </div>        
                <div className="custom-btn-group">
                    <button onClick={onReset}>초기화</button>
                    <button onClick={onComplete}>완료</button>
                </div>
            </div>
        </div>
    )
}

export default IntroCustomContainer