const MUSICS = {};
MUSICS.piano = `
	/*
	* 《纯音乐BGM钢琴曲》
	* 作曲：deskgood
	* 演奏：wzh&代码
	*/
	拍速 72
	B6 0.5
	C7 0.5
	D7 1
	E7 1
	C7 0.5
	D7 0.5
	G7 2
	
	B6 0.5
	C7 0.5
	D7 1
	E7 1
	E7 1
	A6 1
	G6 2
	循环
`.trim().split("\n").map(v => v.trim()).join("\n");
MUSICS.stars = `
	/*
	* 《小星星钢琴曲》
	* 演奏：wzh&代码
	*/
	拍速 60
	C4 0.5
	C4 0.5
	G4 0.5
	G4 0.5
	A4 0.5
	A4 0.5
	G4 1
	
	F4 0.5
	F4 0.5
	E4 0.5
	E4 0.5
	D4 0.5
	D4 0.5
	C4 1
	
	G4 0.5
	G4 0.5
	F4 0.5
	F4 0.5
	E4 0.5
	E4 0.5
	D4 1
	
	G4 0.5
	G4 0.5
	F4 0.5
	F4 0.5
	E4 0.5
	E4 0.5
	D4 1
	
	C4 0.5
	C4 0.5
	G4 0.5
	G4 0.5
	A4 0.5
	A4 0.5
	G4 1
	
	F4 0.5
	F4 0.5
	E4 0.5
	E4 0.5
	D4 0.5
	D4 0.5
	C4 2
	循环
`.trim().split("\n").map(v => v.trim()).join("\n");
let {bgm, playEffect} = (function(){
	const setting_music = JSON.parse(localStorage.getItem("五子棋_音乐设置") || "{}");
	let bgm;
	if (setting_music.bgm == "piano"){ //deskgood作曲钢琴曲
		bgm = new Music(MUSICS.piano, 6, 72).play();
	}else if (setting_music.bgm != "none"){ //自定义
		bgm = new Music(setting_music.bgm, 6, 72).play();
	}
	
	const effect = new PianoMusic(2, 60);
	let playEffect; //播放音效
	if (setting_music.effect == "stars"){
		playEffect = function(){
			const music = new Music(MUSICS.stars),
				sounds = music.getSounds(), //所有音符
				speed = music.speed, //速度
				index = Math.modRange(setting_music.effectIndex||0, 0, sounds.length, 1);
			
			effect.setSpeed(speed)
				.play(...sounds[index]);
			
			//保存
			setting_music.effectIndex = index+1;
			localStorage.setItem("五子棋_音乐设置", JSON.stringify(setting_music));
		};
	}else if (setting_music.effect != "none"){ //自定义
		playEffect = function(){
			const music = new Music(setting_music.effect),
				sounds = music.getSounds(), //所有音符
				speed = music.speed, //速度
				index = Math.modRange(setting_music.effectIndex||0, 0, sounds.length, 1);
			
			effect.setSpeed(speed)
				.play(...sounds[index]);
			
			//保存
			setting_music.effectIndex = index+1;
			localStorage.setItem("五子棋_音乐设置", JSON.stringify(setting_music));
		};
	}
	return {bgm, playEffect};
})();