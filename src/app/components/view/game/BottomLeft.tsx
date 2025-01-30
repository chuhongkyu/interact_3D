"use client"

function BottomLeft() {
    return (
        <div id="container_ui_bottom">
            <span className="__info">
                <img src="assets/images/info.png" alt="icon"/>
                <div className="__info-container">
                    {/* <!-- <span class="__inner"><img src="./images/info.png" alt="icon"/></span> --> */}
                    <span>
                        <p><b>조작 법 :</b> 터치 또는 마우스 클릭으로 마리오를 움직이세요.</p>
                        <p><b>버섯 획득 :</b> 이벤트 칸을 클리어 하면 버섯을 획득 할 수 있어요.</p>
                        <p><b>이벤트 칸 :</b> 이벤트 칸이라고 해서 전부 버섯을 주지는 않아요~😝</p>
                    </span>
                </div>
            </span>
        </div>
    )
}

export default BottomLeft