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
			console.log(sound, time, volume)
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



class Music{
	constructor(score, audioNum=2, speed=60){
		this.audioNum = audioNum; //声道数量
		this.speed = speed; //速度
		this.sounds = []; //真正的谱子（音符）
		this.score = `const p=new PianoMusic(${audioNum},${speed});function s(){`; //谱子 编译为 js
		
		let first = true;
		for (const line of score.trim().split("\n")){
			const [sound, time, volume=1, ...others] = line.trim().split(" ");
			if ( others.length == 0 &&
				!isNaN(+time) &&
				!isNaN(+volume) &&
				( sound == "0" ||
					( sound.length == 2 &&
						"CDEFGAB".indexOf( sound[0] ) != -1 &&
						"123456789".indexOf( sound[1] ) != -1 )
				)
			){
				this.sounds.push([sound, time, volume]);
				if (first){
					this.score += `p.play("${sound}",${time},${volume})`;
					first = false;
				}else{
					this.score += `.then(()=>p.play("${sound}",${time},${volume}))`;
				}
			}else if (sound == "拍速" && !isNaN(+time)){
				this.speed = time;
				this.score += `p.setSpeed(${time});`;
			}else if (line.trim() == "循环"){
				this.score += ".then(s)";
			}else{
				this.score += line.trim();
			}
		}
		this.score += "}s();p";
	}
	
	play(){
		this.pianoMusic = eval(this.score);
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