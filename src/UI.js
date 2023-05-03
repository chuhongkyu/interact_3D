export function makeUI(cb){
    const ui = document.getElementById("container_ui_bottom");
    ui.querySelector('.__jumping').addEventListener('click',()=>{
        cb();
    })
}


