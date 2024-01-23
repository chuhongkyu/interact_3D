function setHost(dice){
	if(location.hostname === 'chuhongkyu.github.io'){
		location.href = `/interact_3D/game.html?data=${dice}`
	}else if(location.hostname === 'localhost'){
		location.href = `/game.html?data=${dice}`
	}
}

export function goGame(textBox, number){
	textBox.classList.add("end")
	setTimeout(()=>{
		setHost(number);
	}, 1000)
}