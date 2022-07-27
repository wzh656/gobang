const MUSICS = {};
MUSICS.piano = `
	/*
	* 《纯音乐BGM钢琴曲》
	* 作曲：deskgood
	* 演奏：wzh&代码
	*/
	拍速 72
	MUSICS._piano = MUSICS._piano || {};
	MUSICS._piano.volume = MUSICS._piano.volume || 0;
	MUSICS._piano.volumeDir = MUSICS._piano.volumeDir || +0.4;
	MUSICS._piano.volume += MUSICS._piano.volumeDir;
	if (MUSICS._piano.volume >= 1){
		MUSICS._piano.volumeDir = -0.2;
	}else if (MUSICS._piano.volume <= 0.4){
		MUSICS._piano.volumeDir = +0.2;
	}
	const volume = MUSICS._piano.volume;
	B6 0.5 volume
	C7 0.5 volume
	D7 1 volume
	E7 1 volume
	C7 0.5 volume
	D7 0.5 volume
	G7 2 volume
	
	B6 0.5 volume
	C7 0.5 volume
	D7 1 volume
	E7 1 volume
	E7 1 volume
	A6 1 volume
	F6 2 volume
	循环
`.trim().split("\n").map(v => v.trim()).join("\n");
MUSICS.piano2 = `
	拍速 72
	A3 0.5
	C4 0.5
	D4 0.5
	E4 0.5
	D4 1
	0 0.5
	E4 0.5
	G4 1
	D4 0.5
	C4 0.5
	A3 1
	E4 0.5
	D4 0.5
	A3 1
	E4 0.5
	D4 1
	E4 0.5
	G4 0.5
	E4 1
	E4 0.5
	G4 0.5
	E4 1
	0 0.5
	A4 1
	G4 0.5
	E4 0.5
	D4 1
	D4 0.5
	E4 0.5
	G4 1
	D4 0.5
	C4 0.5
	A3 1
	E4 0.5
	D4 0.5
	A3 1
	E4 0.5
	D4 1
	E4 0.5
	A3 1
	0 1
	C4 0.5
	A3 0.5
	C4 0.5
	D4 0.5
	E4 0.5
	D4 1
	0 0.5
	E4 0.5
	G4 1
	D4 0.5
	C4 0.5
	A3 1
	E4 0.5
	D4 0.5
	A3 1
	E4 0.5
	D4 1
	E4 0.5
	G4 0.5
	E4 1
	E4 0.5
	G4 0.5
	E4 1
	0 0.5
	A4 1
	G4 0.5
	E4 0.5
	D4 1
	D4 0.5
	E4 0.5
	G4 1
	D4 0.5
	C4 0.5
	A3 1
	E4 0.5
	D4 0.5
	A3 1
	E4 0.5
	D4 1
	E4 0.5
	A4 1
	0 1
	E4 0.5
	E4 0.5
	G4 0.5
	A4 0.5
	A4 0.5
	G4 0.5
	A4 0.5
	B4 1
	0 0.5
	G4 1
	E4 0.5
	D4 0.5
	C4 0.5
	A3 1
	E4 0.5
	D4 0.5
	A3 1
	E4 0.5
	D4 1
	E4 0.5
	G4 0.5
	E4 1
	E4 0.5
	G4 0.5
	E4 1
	0 0.5
	A4 1
	G4 0.5
	E4 0.5
	D4 1
	D4 0.5
	E4 0.5
	G4 1
	D4 0.5
	C4 0.5
	A3 1
	E4 0.5
	D4 0.5
	A3 1
	E4 0.5
	D4 1
	E4 0.5
	A4 1
	0 1
	E4 0.5
	E4 0.5
	G4 0.5
	A4 0.5
	A4 0.5
	G4 0.5
	A4 0.5
	B4 1
	0 0.5
	G4 1
	E4 0.5
	D4 0.5
	C4 0.5
	A3 1
	E4 0.5
	D4 0.5
	A3 1
	E4 0.5
	D4 1
	E4 0.5
	G4 0.5
	E4 1
	E4 0.5
	G4 0.5
	E4 1
	0 0.5
	A4 1
	G4 0.5
	E4 0.5
	D4 1
	D4 0.5
	E4 0.5
	G4 1
	D4 0.5
	C4 0.5
	E4 1
	0 0.5
	A4 0.5
	G4 0.5
	E4 0.5
	G4 0.5
	E4 1
	D4 0.5
	E4 1
	0 1
	A3 0.5
	C4 0.5
	D4 0.5
	E4 0.5
	D4 1
	0 0.5
	E4 0.5
	G4 1
	D4 0.5
	C4 0.5
	E4 1
	0 0.5
	A4 0.5
	G4 0.5
	E4 0.5
	G4 0.5
	E4 1
	0 0.25
	D4 0.5
	E4 1
	0 0.5
	E4 0.5
	E4 0.5
	G4 0.5
	A4 0.5
	A4 0.5
	G4 0.5
	A4 0.5
	B4 1
	0 0.5
	G4 1
	E4 0.5
	D4 0.5
	C4 0.5
	A3 1
	E4 0.5
	D4 0.5
	A3 1
	E4 0.5
	D4 1
	E4 0.5
	G4 0.5
	E4 1
	E4 0.5
	G4 0.5
	E4 1
	0 0.5
	D4 0.5
	E4 0.5
	G4 0.5
	E4 0.5
	E4 0.5
	C4 0.5
	D4 1
	0 0.5
	E4 0.5
	G4 1
	D4 0.5
	C4 0.5
	A3 1
	E4 0.5
	D4 0.5
	A3 1
	E4 0.5
	D4 1
	E4 0.5
	A4 1
	0 0.5
	E4 0.5
	G4 0.5
	A4 0.5
	A4 0.5
	G4 0.5
	A4 0.5
	B4 1
	0 0.5
	G4 1
	E4 0.5
	D4 0.5
	C4 0.5
	A3 1
	E4 0.5
	D4 0.5
	A3 1
	E4 0.5
	D4 1
	E4 0.5
	A4 1
	0 1
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
MUSICS.LonelyWarrior = `
	/*
	* 《孤勇者》
	* 作词：唐恬
	* 作曲：钱雷
	* 演奏：wzh&代码
	*/
	拍速 65
	D4 0.5
	B3 0.5
	C4 0.5
	A3 0.5
	D4 0.5
	B3 0.5
	C4 0.5
	A3 0.5
	
	D4 0.5
	B3 0.5
	C4 0.5
	A3 0.5
	D4 0.5
	B3 0.5
	C4 0.5
	A3 0.5
	
	D4 0.5
	B3 0.5
	C4 0.5
	A3 0.5
	D4 0.5
	B3 0.5
	C4 0.5
	A3 0.5
	
	D4 0.5
	B3 0.5
	C4 0.5
	A3 0.5
	D4 0.5
	B3 0.5
	C4 0.5
	A3 0.5
	
	D4 0.5
	B3 0.5
	C4 0.5
	A3 0.5
	D4 0.5
	B3 0.5
	C4 0.5
	A3 0.5
	
	E4 2
	0 1
	0 0.25
	C4 0.25
	D4 0.25
	C4 0.25
	
	E4 2
	0 0.75
	C4 0.25
	D4 0.25
	C4 0.25
	D4 0.25
	E4 0.25
	
	A3 0.75
	C4 0.25
	A3 0.75
	C4 0.25
	A3 0.75
	C4 0.25
	D4 0.5
	C4 0.5
	
	B3 2
	0 1
	0 1
	
	E4 2
	0 1
	0 0.25
	C4 0.25
	D4 0.25
	C4 0.25
	
	E4 2
	0 0.75
	C4 0.25
	D4 0.25
	C4 0.25
	D4 0.25
	E4 0.25
	
	A3 0.75
	C4 0.25
	A3 0.75
	C4 0.25
	A3 0.75
	C4 0.25
	D4 0.5
	C4 0.5
	
	B3 2
	0 1
	0 1
	
	A3 0.25
	C4 0.25
	A4 0.75
	A4 0.25
	A4 0.25
	G4 0.25
	A4 0.5
	A4 0.25
	G4 0.25
	A4 0.25
	G4 0.25
	A4 0.25
	G4 0.25
	
	E4 0.25
	E4 1.75
	0 1
	0 0.5
	A3 0.25
	C4 0.25
	
	A4 0.75
	A4 0.25
	A4 0.25
	G4 0.25
	A4 0.25
	G4 0.25
	B4 0.75
	B4 0.25
	B4 0.25
	A4 0.25
	B4 0.75
	
	A4 0.25
	E4 2.25
	0 0.25
	E4 0.25
	G4 0.25
	E4 0.25
	
	D4 0.75
	E4 0.25
	D4 0.75
	E4 0.25
	D4 0.75
	E4 0.25
	G4 0.25
	E4 0.25
	G4 0.25
	E4 0.25
	
	D4 0.75
	E4 0.25
	D4 0.75
	E4 0.25
	D4 1
	0 0.5
	C4 0.25
	D4 0.25
	
	E4 0.5
	A3 0.5
	C4 0.5
	E4 0.5
	D4 0.75
	E4 0.25
	D4 0.25
	C4 0.25
	C4 0.5
	
	A3 2
	0 1
	0 0.5
	A4 0.25
	B4 0.25
	
	/* 循环始 (1) */
	C5 0.25
	D5 0.25
	B4 0.25
	C5 0.25
	C5 0.5
	C5 0.25
	B4 0.25
	C5 0.25
	D5 0.25
	B4 0.25
	C5 0.25
	C5 0.5
	C5 0.25
	D5 0.25
	
	E5 0.25
	D5 0.25
	E5 0.25
	D5 0.25
	E5 0.5
	E5 0.25
	D5 0.25
	E5 0.5
	G5 0.5
	E5 0.5
	A4 0.25
	B4 0.25
	
	C5 0.25
	D5 0.25
	B4 0.25
	C5 0.25
	C5 0.5
	C5 0.25
	B4 0.25
	C5 0.25
	D5 0.25
	B4 0.25
	C5 0.25
	C5 0.5
	C5 0.25
	D5 0.25
	
	E5 0.25
	D5 0.25
	E5 0.25
	D5 0.25
	E5 0.5
	E5 0.25
	D5 0.25
	E5 0.5
	G5 0.5
	E5 0.5
	G5 0.5
	
	E5 0.75
	G5 0.25
	E5 0.75
	G5 0.25
	E5 0.25
	G5 0.25
	A5 0.25
	E5 0.25
	G5 0.5
	G5 0.5
	
	E5 0.75
	G5 0.25
	E5 0.75
	G5 0.25
	E5 0.25
	G5 0.25
	A5 0.25
	E5 0.25
	G5 0.5
	G5 0.25
	G5 0.25
	
	E5 0.25
	D5 0.25
	D5 0.5
	D5 0.5
	C5 0.25
	E5 0.5
	D5 0.25
	D5 0.5
	D5 0.5
	C5 0.25
	C5 0.25
	
	A4 2
	0 1
	0 0.5
	G5 0.25
	G5 0.25
	E5 0.25
	D5 0.25
	D5 0.5
	D5 0.5
	C5 0.25
	E5 0.5
	D5 0.25
	D5 0.5
	D5 0.5
	C5 0.25
	C5 0.25
	
	/* 循环尾 (1) */
	A4 2
	0 1
	0 1
	
	0 4
	
	0 4
	
	0 3
	0 0.5
	A4 0.25
	G4 0.25
	
	A4 0.75
	G4 0.25
	A4 0.25
	G4 0.55
	A4 0.25
	G4 0.25
	A4 0.5
	A4 0.25
	G4 0.25
	A4 0.25
	G4 0.25
	A4 0.25
	G4 0.25
	
	E4 0.25
	E4 1.75
	0 1
	0 0.5
	A4 0.25
	G4 0.25
	
	A4 0.75
	G4 0.25
	A4 0.25
	G4 0.25
	A4 0.25
	G4 0.25
	B4 0.75
	B4 0.25
	B4 0.25
	A4 0.25
	B4 0.25
	A4 0.25
	
	E4 0.25
	E4 1.75
	0 1
	0 0.25
	E4 0.25
	G4 0.25
	E4 0.25
	
	D4 0.75
	E4 0.25
	D4 0.75
	E4 0.25
	D4 0.75
	E4 0.25
	G4 0.25
	E4 0.25
	G4 0.25
	E4 0.25
	
	D4 0.75
	E4 0.25
	D4 0.75
	E4 0.25
	D4 1
	0 0.5
	C4 0.25
	D4 0.25
	
	E4 0.5
	A4 0.5
	C5 0.5
	E5 0.5
	D5 0.75
	E5 0.25
	D5 0.25
	C5 0.25
	C5 0.5
	
	A4 3
	0 0.5
	A4 0.25
	B4 0.25
	
	/* 循环 (2) */
	C5 0.25
	D5 0.25
	B4 0.25
	C5 0.25
	C5 0.5
	C5 0.25
	B4 0.25
	C5 0.25
	D5 0.25
	B4 0.25
	C5 0.25
	C5 0.5
	C5 0.25
	D5 0.25
	
	E5 0.25
	D5 0.25
	E5 0.25
	D5 0.25
	E5 0.5
	E5 0.25
	D5 0.25
	E5 0.5
	G5 0.5
	E5 0.5
	A4 0.25
	B4 0.25
	
	C5 0.25
	D5 0.25
	B4 0.25
	C5 0.25
	C5 0.5
	C5 0.25
	B4 0.25
	C5 0.25
	D5 0.25
	B4 0.25
	C5 0.25
	C5 0.5
	C5 0.25
	D5 0.25
	
	E5 0.25
	D5 0.25
	E5 0.25
	D5 0.25
	E5 0.5
	E5 0.25
	D5 0.25
	E5 0.5
	G5 0.5
	E5 0.5
	G5 0.5
	
	E5 0.75
	G5 0.25
	E5 0.75
	G5 0.25
	E5 0.25
	G5 0.25
	A5 0.25
	E5 0.25
	G5 0.5
	G5 0.5
	
	E5 0.75
	G5 0.25
	E5 0.75
	G5 0.25
	E5 0.25
	G5 0.25
	A5 0.25
	E5 0.25
	G5 0.5
	G5 0.25
	G5 0.25
	
	E5 0.25
	D5 0.25
	D5 0.5
	D5 0.5
	C5 0.25
	E5 0.5
	D5 0.25
	D5 0.5
	D5 0.5
	C5 0.25
	C5 0.25
	
	A4 2
	0 1
	0 0.5
	G5 0.25
	G5 0.25
	E5 0.25
	D5 0.25
	D5 0.5
	D5 0.5
	C5 0.25
	E5 0.5
	D5 0.25
	D5 0.5
	D5 0.5
	C5 0.25
	C5 0.25
	
	/* 循环尾 (2) */
	A4 0.5
	A3 0.5
	C4 0.5
	E4 0.5
	B4 1
	B4 0.5
	B4 0.25
	B4 0.25
	
	A4 0.25
	A4 3.75
	
	0 0.5
	A3 0.5
	C4 0.5
	E4 0.5
	B4 1
	B4 0.5
	B4 0.25
	B4 0.25
	
	A4 0.25
	A4 2.75
	0 0.5
	A4 0.25
	B4 0.25
	
	/* 循环 (2) */
	C5 0.25
	D5 0.25
	B4 0.25
	C5 0.25
	C5 0.5
	C5 0.25
	B4 0.25
	C5 0.25
	D5 0.25
	B4 0.25
	C5 0.25
	C5 0.5
	C5 0.25
	D5 0.25
	
	E5 0.25
	D5 0.25
	E5 0.25
	D5 0.25
	E5 0.5
	E5 0.25
	D5 0.25
	E5 0.5
	G5 0.5
	E5 0.5
	A4 0.25
	B4 0.25
	
	C5 0.25
	D5 0.25
	B4 0.25
	C5 0.25
	C5 0.5
	C5 0.25
	B4 0.25
	C5 0.25
	D5 0.25
	B4 0.25
	C5 0.25
	C5 0.5
	C5 0.25
	D5 0.25
	
	E5 0.25
	D5 0.25
	E5 0.25
	D5 0.25
	E5 0.5
	E5 0.25
	D5 0.25
	E5 0.5
	G5 0.5
	E5 0.5
	G5 0.5
	
	E5 0.75
	G5 0.25
	E5 0.75
	G5 0.25
	E5 0.25
	G5 0.25
	A5 0.25
	E5 0.25
	G5 0.5
	G5 0.5
	
	E5 0.75
	G5 0.25
	E5 0.75
	G5 0.25
	E5 0.25
	G5 0.25
	A5 0.25
	E5 0.25
	G5 0.5
	G5 0.25
	G5 0.25
	
	E5 0.25
	D5 0.25
	D5 0.5
	D5 0.5
	C5 0.25
	E5 0.5
	D5 0.25
	D5 0.5
	D5 0.5
	C5 0.25
	C5 0.25
	
	A4 2
	0 1
	0 0.5
	G5 0.25
	G5 0.25
	E5 0.25
	D5 0.25
	D5 0.5
	D5 0.5
	C5 0.25
	E5 0.5
	D5 0.25
	D5 0.5
	D5 0.5
	C5 0.25
	C5 0.25
	
	/* 循环尾 (3) */
	A4 2
	0 1
	0 1
	
	0 12
	循环
`.trim().split("\n").map(v => v.trim()).join("\n");
let bgm,
	playEffect = ()=>{}; //播放音效;
(function(){
	let setting_music = JSON.parse(localStorage.getItem("五子棋_音乐设置") || "{}");
	setting_music.bgm = setting_music.bgm || "piano";
	setting_music.bgmVolume = setting_music.bgmVolume || 100;
	setting_music.effect = setting_music.effect || "stars";
	
	if (setting_music.bgm == "piano"){ //deskgood作曲钢琴曲
		bgm = new Music(MUSICS.piano, 10, 72, setting_music.bgmVolume/100).play();
	}else if (setting_music.bgm == "piano2"){ //钢琴曲2
		bgm = new Music(MUSICS.piano2, 10, 72, setting_music.bgmVolume/100).play();
	}else if (setting_music.bgm == "youth"){ //lyz
		bgm = new Player("./music/piano.mp3", true, setting_music.bgmVolume/100).play();
	}else if (setting_music.bgm == "LonelyWarrior"){ //孤勇者
		bgm = new Music(MUSICS.LonelyWarrior, 10, 72, setting_music.bgmVolume/100).play();
	}else if (setting_music.bgm == "random"){ //网易云随机音乐
		bgm = new Player("https://api.vvhan.com/api/rand.music?sort=热歌榜", true, setting_music.bgmVolume/100).play();
	}else if (setting_music.bgm == "local"){ //本地音频
		if (typeof plus != "undefined"){
			bgm = new Player( plus.storage.getItem("本地音频"), true, setting_music.bgmVolume/100 ).play();
		}else{
			document.addEventListener("plusready", function(){
				bgm = new Player( plus.storage.getItem("本地音频"), true, setting_music.bgmVolume/100 ).play();
			}, false);
		}
	}else if (setting_music.bgm != "none"){ //自定义
		bgm = new Music(setting_music.bgm, 10, 60, setting_music.bgmVolume/100).play();
	}
	
	//音效
	if (setting_music.effect == "voice"){
		const effect = new Player("./music/effect.m4a", false, setting_music.effectVolume/100);
		playEffect = function(){
			effect.play();
		};
		
	}else if (setting_music.effect == "stars"){
		const effect = new PianoMusic(2, 60);
		playEffect = function(){
			setting_music = JSON.parse(localStorage.getItem("五子棋_音乐设置") || "{}"); //更新设置
			setting_music.effect = setting_music.effect || "stars";
			setting_music.effectVolume = setting_music.effectVolume || 100;
			const music = new Music(MUSICS.stars),
				sounds = music.getSounds(), //所有音符
				speed = music.speed, //速度
				index = Math.modRange(setting_music.effectIndex||0, 0, sounds.length, 1);
			
			effect.setSpeed(speed)
				.play(...sounds[index], setting_music.effectVolume/100);
			
			//保存
			setting_music.effectIndex = index+1;
			localStorage.setItem("五子棋_音乐设置", JSON.stringify(setting_music));
		};
		
	}else if (setting_music.effect == "piano"){
		const effect = new PianoMusic(2, 60);
		playEffect = function(){
			setting_music = JSON.parse(localStorage.getItem("五子棋_音乐设置") || "{}"); //更新设置
			setting_music.effect = setting_music.effect || "stars";
			setting_music.effectVolume = setting_music.effectVolume || 100;
			const music = new Music(MUSICS.piano),
				sounds = music.getSounds(), //所有音符
				speed = music.speed, //速度
				index = Math.modRange(setting_music.effectIndex||0, 0, sounds.length, 1);
			
			effect.setSpeed(speed)
				.play(...sounds[index], setting_music.effectVolume/100);
			
			//保存
			setting_music.effectIndex = index+1;
			localStorage.setItem("五子棋_音乐设置", JSON.stringify(setting_music));
		};
		
	}else if (setting_music.effect == "piano2"){
		const effect = new PianoMusic(2, 60);
		playEffect = function(){
			setting_music = JSON.parse(localStorage.getItem("五子棋_音乐设置") || "{}"); //更新设置
			setting_music.effect = setting_music.effect || "stars";
			setting_music.effectVolume = setting_music.effectVolume || 100;
			const music = new Music(MUSICS.piano2),
				sounds = music.getSounds(), //所有音符
				speed = music.speed, //速度
				index = Math.modRange(setting_music.effectIndex||0, 0, sounds.length, 1);
			
			effect.setSpeed(speed)
				.play(...sounds[index], setting_music.effectVolume/100);
			
			//保存
			setting_music.effectIndex = index+1;
			localStorage.setItem("五子棋_音乐设置", JSON.stringify(setting_music));
		};
		
	}else if (setting_music.effect == "LonelyWarrior"){
		const effect = new PianoMusic(2, 60);
		playEffect = function(){
			setting_music = JSON.parse(localStorage.getItem("五子棋_音乐设置") || "{}"); //更新设置
			setting_music.effect = setting_music.effect || "stars";
			setting_music.effectVolume = setting_music.effectVolume || 100;
			const music = new Music(MUSICS.LonelyWarrior),
				sounds = music.getSounds(), //所有音符
				speed = music.speed, //速度
				index = Math.modRange(setting_music.effectIndex||0, 0, sounds.length, 1);
			
			effect.setSpeed(speed)
				.play(...sounds[index], setting_music.effectVolume/100);
			
			//保存
			setting_music.effectIndex = index+1;
			localStorage.setItem("五子棋_音乐设置", JSON.stringify(setting_music));
		};
		
	}else if (setting_music.effect != "none"){ //自定义
		const effect = new PianoMusic(2, 60);
		playEffect = function(){
			setting_music = JSON.parse(localStorage.getItem("五子棋_音乐设置") || "{}"); //更新设置
			setting_music.effect = setting_music.effect || "stars";
			setting_music.effectVolume = setting_music.effectVolume || 100;
			const music = new Music(setting_music.effect),
				sounds = music.getSounds(), //所有音符
				speed = music.speed, //速度
				index = Math.modRange(setting_music.effectIndex||0, 0, sounds.length, 1);
			
			effect.setSpeed(speed)
				.play(...sounds[index], setting_music.effectVolume/100);
			
			//保存
			setting_music.effectIndex = index+1;
			localStorage.setItem("五子棋_音乐设置", JSON.stringify(setting_music));
		};
	}
})();
