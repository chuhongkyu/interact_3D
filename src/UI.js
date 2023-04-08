export function makeUI(cb){
    const ui = document.getElementById("container_ui");
    ui.querySelector('.__jumping').addEventListener('click',()=>{
        cb();
    })
}


