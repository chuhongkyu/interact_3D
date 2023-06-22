export function makeUI(cb){
    const ui = document.getElementById("container_ui_bottom");
    ui.querySelector('.__motion').addEventListener('click',()=>{
        cb();
    })
}

export function makeWalking(cb){
    const ui = document.getElementById("container_ui_bottom");
    ui.querySelector('.__walking').addEventListener('click',()=>{
        cb();
    })
}