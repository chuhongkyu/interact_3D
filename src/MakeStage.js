import gsap from "gsap/gsap-core"

export default function makeStage1($data, $player, $cb){
    $data ? document.body.classList.add('type1') : document.body.classList.remove('type1')
    let modal = document.querySelector('.modal')
    modal.innerHTML = `
                        <p>개발을 하다보면 기확자, 디자이너등 다양한 직군들과 소통해야 하죠.<br>
                           그들의 요구는 떄로는 우리를 너무 괴롭힙니다.😂<br>
                           또한 그것을 해결하는 것은 온전히 개발자 혼자의 일 일것입니다.<br>
                           하지만! 힘내세요~ <br>
                           😃 개발자 여러분 혼자가 아닙니다.
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