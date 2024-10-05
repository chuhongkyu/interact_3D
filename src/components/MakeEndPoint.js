export default function makeEnd($one, $data, $cb, $cb2){
    let point = $one;
    if($data){
        document.body.classList.add('type1')
        let particle = document.getElementById('particle');
        let modal = document.querySelector('.modal')
        modal.innerHTML = `
                            <p>축하해! 👊</p>
                            <p>너는 이제 진정한 개발자야!</p>
                        `
        modal.classList.add('show')
        particle.classList.add('active')
        $cb2()
    }else{
        point ? make(): null

        function make(){
            document.body.classList.add('type1')
            let modal = document.querySelector('.modal')
            modal.innerHTML = `
                                <p>아직 개발자로서 너는 부족해.<br><br>
                                지름길을 찾지 말고 어서 돌아가!<br>
                                <br>
                                🍄 버섯을 모아오세요~
                                <br>
                                </p>
                            `
            modal.classList.add('show')

            setTimeout(()=>{
                document.body.classList.remove('type1')
                modal.classList.remove('show')
                $cb()
            },3000)
        }
    }
}