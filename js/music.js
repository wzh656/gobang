//url播放
class Player{
	constructor(url, loop=true, volume=1){
		const audio = $("<audio></audio>")[0];
		audio.src = url;
		if (loop) audio.loop = "loop";
		audio.volume = volume;
		
		$("body").append( audio );
		this.audio = audio;
		
		//切换后台
		document.addEventListener("pause", function(){
			audio.pause();
		});
		//切换前台
		document.addEventListener("resume", function(){
			audio.play();
		});
	}
	
	play(time=0){
		console.log("play", this.audio.src.substr(0,100), this.audio.volume)
		this.audio.currentTime = time;
		let played = false;
		this.audio.play().then(()=>{
			played = true;
		}).catch(err => {
			console.error(err)
			const play = ()=>{
				if (this.audio.paused)
					this.audio.play();
			};
			document.addEventListener("plusready", function plusready(){
				if (!played) play();
				console.log("plusready -> play")
				document.removeEventListener("plusready", plusready);
			});
			document.addEventListener("click", function click(){
				if (!played) play();
				console.log("click -> play")
				document.removeEventListener("click", click);
			});
			document.addEventListener("touchstart", function touchstart(){
				if (!played) play();
				console.log("touchstart -> play")
				document.removeEventListener("touchstart", touchstart);
			});
		});
		return this;
	}
	
	stop(){
		this.audio.pause();
		return this;
	}
}


//钢琴音符播放
class PianoMusic{
	constructor(audioNum=2, speed=60){
		this.audios = [];
		for (let i=audioNum; i>0; i--)
			this.audios.push( $("<audio></audio>")[0] );
		this.index = 0;
		this.speed = speed; //拍/min
		this.stop = false;
	}
	
	play(sound, time=1, volume=1){
		return new Promise((resolve, reject)=>{
			if (sound && sound != "0"){
				const audio = this.audios[this.index];
				audio.volume = volume;
				audio.src = MIDI.Soundfont.acoustic_grand_piano[sound];
				audio.play();
				if (++this.index >= this.audios.length)
					this.index = 0;
			}
			
			if (!this.stop)
				setTimeout(resolve, time/this.speed*60*1000 );
		});
	}
	
	setSpeed(speed){
		this.speed = speed;
		return this;
	}
	
	setStop(stop=true){
		this.stop = stop;
		return this;
	}
}


//钢琴曲播放
class Music{
	constructor(score, audioNum=2, speed=60, gVolume=1){
		this.audioNum = audioNum; //声道数量
		this.speed = speed; //速度
		this.sounds = []; //真正的谱子（音符）
		this.js = `const p=new PianoMusic(${audioNum},${speed});function s(){`; //谱子 编译为 js
		
		let first = true;
		for (const line of score.trim().split("\n")){
			const [sound, time, volume=1, ...others] = line.trim().split(" ");
			if ( others.length == 0 &&
				!isNaN(+time) &&
				//!isNaN(+volume) &&
				( sound == "0" ||
					( sound.length == 2 &&
						"CDEFGAB".indexOf( sound[0] ) != -1 &&
						"123456789".indexOf( sound[1] ) != -1 ) ||
					( sound.length == 3 &&
						"CDEFGAB".indexOf( sound[0] ) != -1 &&
						sound[1] == "b" &&
						"123456789".indexOf( sound[2] ) != -1 )
				)
			){
				this.sounds.push([sound, time, volume]);
				if (first){
					this.js += `p.play("${sound}",${time},${gVolume}*${volume})`;
					first = false;
				}else{
					this.js += `.then(()=>p.play("${sound}",${time},${gVolume}*${volume}))`;
				}
			}else if (sound == "拍速" && !isNaN(+time)){
				this.speed = time;
				this.js += `p.setSpeed(${time});`;
			}else if (line.trim() == "循环"){
				this.js += ".then(s)";
			}else{
				this.js += line.trim();
			}
		}
		this.js += "}s();p";
	}
	
	play(){
		this.pianoMusic = eval(this.js);
		return this;
	}
	
	setStop(stop=true){
		this.pianoMusic.setStop(stop);
		return this;
	}
	
	getSounds(){
		return this.sounds;
	}
}
