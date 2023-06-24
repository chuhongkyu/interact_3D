export default function makeStage2($data, $player, $cb){
    $data ? document.body.classList.add('type1') : document.body.classList.remove('type1')
    let modal = document.querySelector('.modal')
    modal.innerHTML = `
                        <p>우리는 개발을 하면서도 과거를 돌아봐야 합니다.<br>
                           개발을 제대로 이해하고 한 것이 아니라<br>
                           그저 문제 해결만을 위해 한 것 이라면 언젠가 문제가 될 것입니다.<br>
                        </p>
                      `
    modal.classList.add('show')
    setTimeout(()=>{
        $player.actions[3].play();
    },1300)
  
    setTimeout(()=>{
        $player.actions[3].stop();
    },4000)
  
    setTimeout(()=>{
      document.body.classList.remove('type1')
      modal.classList.remove('show')
      $cb()
    },5000)
  }