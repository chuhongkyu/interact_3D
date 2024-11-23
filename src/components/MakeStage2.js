import gsap from "gsap/gsap-core"

export default function makeStage2($data, $player, $cb){
    $data ? document.body.classList.add('type1') : document.body.classList.remove('type1')
    let modal = document.querySelector('.modal')
    modal.innerHTML = `
                        <p>
                          개발을 하다 보면 기획자, 디자이너 등 다양한 직군들과 소통해야 합니다.<br>
                          그들의 요구는 때로는 우리를 너무 힘들게 하죠.😂<br>
                          게다가 그것을 해결하는 건 온전히 개발자의 몫이 될 때가 많습니다.<br>
                          하지만! 걱정하지 마세요~ <br>
                          😃 개발자 여러분은 혼자가 아닙니다! 선배 개발자 분들에게 질문해보세요! 커뮤니티를 통해 도움을 받을 수 있습니다.
                        </p>
                      `
    modal.classList.add('show')
    gsap.to($player.modelMesh.position, {
      delay: 1.6,
      duration: 0.3,
      y: 1.8,
    })
    setTimeout(()=>{
        $player.actions[2].play();
        gsap.to($player.modelMesh.position, {
          delay: 0.4,
          y: 0,
        })
    },1500)
  
    setTimeout(()=>{
        $player.actions[2].stop();
        
    },3200)
  
    setTimeout(()=>{
      document.body.classList.remove('type1')
      modal.classList.remove('show')
      $cb()
    },5000)
  }