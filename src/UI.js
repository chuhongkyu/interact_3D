export function makeInventory() {
    const xbtn = document.querySelector('#container_ui_right .btn-container img')
    xbtn.addEventListener('click',()=>{
        document.querySelector('#container_ui_right').classList.remove('active')
    })
    // 드래그 앤 드랍 이벤트 처리
    function handleDragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.id);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text/plain");
        const draggableElement = document.getElementById(data);
        const dropzone = event.target.closest("#container_ui_right .__grid");

        if (dropzone && draggableElement) {
            // 드롭 위치에 따라 순서 변경
            const targetElement = event.target.closest(".item");
            if (targetElement) {
                dropzone.insertBefore(draggableElement, targetElement);
            } else {
                dropzone.appendChild(draggableElement);
            }
        }
    }

    // 드래그 앤 드랍 이벤트 핸들러 등록
    const draggableItems = document.querySelectorAll("#container_ui_right .__grid .item");
    draggableItems.forEach((item) => {
        item.addEventListener("dragstart", handleDragStart);
        item.addEventListener("dragover", handleDragOver);
        item.addEventListener("drop", handleDrop);
    });

}
  