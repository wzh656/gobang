const DIRS = [ //方向
		[1, 0],
		[0, 1],
		[1, 1],
		[-1, 1],
		[-1, 0],
		[0, -1],
		[-1, -1],
		[1, -1]
	],
	OPP_DIR = [ //正方向
		[1, 0],
		[0, 1],
		[1, 1],
		[-1, 1]
	];

class PiecesSystem{
	constructor(columns, rows, N){
		this.columns = columns;
		this.rows = rows;
		this.pieces = new Array(columns);
		for (let i=0; i<columns;i++)
			this.pieces[i] = new Array(rows).fill(0); //0:空白 1:白 2:黑 undefined:超出范围
		this.N = N;
		this.winner = false; //获胜者 1:黑, 0:白, null:平 false:未获胜
		this.steps = []; //步数
	}
	
	//获取棋子
	get(i, j){
		return this.pieces[i] && this.pieces[i][j];
	}
	
	//设置棋子
	set(i, j, v){
		if ((this.pieces[i] && this.pieces[i][j]) !== undefined)
			this.pieces[i][j] = v;
		return this;
	}
	
	//下一步
	addStep(i, j, v){
		this.steps.push({i, j, v});
		this.set(i, j, v);
		return this;
	}
	
	//是否获胜
	isWon(winCallback=()=>{}){
		const lines = [];
		for (const [x, col] of Object.entries(this.pieces))
			for (const [y, pic] of Object.entries(col))
				if (pic !== 0) //非空
					for (const [dx, dy] of DIRS){ //各个方向
						let won = true,
							i;
						for (i=1; i<=this.N-1; i++) //包括自己 往下N-1
							if (this.get(+x + i*dx, +y + i*dy) !== pic){ //该方向不同
								won = false;
								break;
							}
						if (won){
							if (!this.winner) //第一次
								winCallback(pic, this.steps.length);
							this.winner = pic-1;
							lines.push({
								start: [+x, +y],
								end: [+x+(i-1)*dx, +y+(i-1)*dy]
							});
						}
					}
		return lines;
	}
	
	//是否下满
	isFull(){
		for (const i of this.pieces)
			for (const j of i)
				if (!j) return false;
		this.winner = null;
		return true;
	}
	
	//分析分数
	score(){
		const scores = [0, 0], //1:黑, 0:白
			lines = [], //连线
			passed = []; //经过的
				
		for (const [x, col] of Object.entries(this.pieces))
			for (const [y, pic] of Object.entries(col)){
				if (pic === 0) continue; //无棋子 跳过
				/*if ( passed.some((v)=>v[0]==x && v[1]==y) )
					continue; //相同 跳过*/
				
				for (const [dx, dy] of DIRS){ //各个方向
					let num = 0, //连子数
						width = 1,
						px, py;
					
					if (this.get(x-dx, y-dy) == 3-pic || //被对方堵住
						this.get(x-dx, y-dy) == undefined //墙
					) num--;
					
					if ( passed.some((v)=>v[0]==x && v[1]==y) ){ //有相同
						px = +x + dx,
						py = +y + dy;
						while (this.get(px, py) == pic){ //己方
							width++;
							
							px += +dx, py += +dy; //循环
						}
						
					}else{
						px = +x + dx,
						py = +y + dy;
						while (this.get(px, py) == pic){ //己方
							num++;
							width++;
							passed.push([px, py]); //已经历
							
							px += +dx, py += +dy; //循环
						}
					}
					
					if (this.get(px, py) == 3-pic || //被对方堵住
						this.get(px, py) == undefined //墙
					) num--;
					
					scores[pic-1] += 10**num;
					
					if (width > 1)
						lines.push({
							start: [x, y],
							end: [px-dx, py-dy],
							width,
							color: pic==2? "#fff": "#000"
						});
				}
			}
		
		return {scores, lines};
	}
	
	//电脑下棋
	play(side){
		const max = {
			pos: new Array(2),
			value: -Infinity
		};
		
		for (const [x, col] of Object.entries(this.pieces))
			for (const [y, pic] of Object.entries(col)){
				if (pic !== 0) continue; //有棋子 跳过
				
				let score = 1/(
					(x - (pieces.columns-1)/2) **2 +
					(y - (pieces.rows-1)/2) **2 +
					Math.random() + 1
				);
				
				for (const [dx, dy] of OPP_DIR){ //正方向
					let num = [0, 0],
						len = [1, 1], //连子数
						px, py;
					
					px = +x + dx,
					py = +y + dy;
					while (this.get(px, py) == side){ //己方 攻击
						num[0]++;
						len[0]++;
						px += +dx, py += +dy; //循环
					}
					if (this.get(px, py) == 3-side || //被对方堵住
						this.get(px, py) == undefined //墙
					) num[0]--;
					
					px = +x + dx,
					py = +y + dy;
					while (this.get(px, py) == 3-side){ //对方 防御
						num[1]++;
						len[1]++;
						px += +dx, py += +dy; //循环
					}
					if (this.get(px, py) == 3-side || //被对方堵住
						this.get(px, py) == undefined //墙
					) num[1]--;
					
					px = +x - dx,
					py = +y - dy;
					while (this.get(px, py) == side){ //己方 攻击
						num[0]++;
						len[0]++;
						px -= +dx, py -= +dy; //循环
					}
					if (this.get(px, py) == 3-side || //被对方堵住
						this.get(px, py) == undefined //墙
					) num[0]--;
					
					px = +x - dx,
					py = +y - dy;
					while (this.get(px, py) == 3-side){ //对方 防御
						num[1]++;
						len[1]++;
						px -= +dx, py -= +dy; //循环
					}
					if (this.get(px, py) == 3-side || //被对方堵住
						this.get(px, py) == undefined //墙
					) num[1]--;
					
					if (len[0] >= this.N){
						score += 10 ** (len[0] - 1);
					}else{
						score += 10 ** num[0];
					}
					if (len[1] >= this.N-1){
						score += 10 ** (len[1] - 1) * 0.6;
					}else{
						score += 10 ** num[1] * 0.6;
					}
				}
				
				/*self.postMessage({type:"log", x,y,score,init:1/(
					(x - (pieces.rows-1)/2) **2 +
					(y - (pieces.columns-1)/2) **2 +
					Math.random()
				)})*/
				
				if (score > max.value){
					max.pos[0] = x,
					max.pos[1] = y;
					max.value = score;
				}
			}
		
		return max;
	}
}



let pieces, //棋子系统
	mistake, //防误触
	turn = 1, //下棋方 1:黑, 0:白
	first = {i: null, j: null}; //第一次点击位置
self.addEventListener("message", function(e){
	//console.log("worker: ", e.data.type, e.data)
	switch (e.data.type){
		// 初始化
		case "init":
			const {cols, rows, N, mis} = e.data;
			
			pieces = new PiecesSystem(cols, rows, N);
			mistake = mis;
			
			break;
			
			
		// 下棋
		case "play":
			const {i, j, direct=false} = e.data;
			
			if (pieces.winner !== false) //已结束
				return self.postMessage({type: "play"});
			if (pieces.get(i, j) !== 0) //非空位
				return self.postMessage({type: "play"});
			
			//下棋
			const play = () => {
				if (turn){ //黑
					pieces.addStep(i, j, 2);
					self.postMessage({
						type: "play",
						action: 2 //下黑棋
					});
				}else{ //白
					pieces.addStep(i, j, 1);
					self.postMessage({
						type: "play",
						action: 1 //下白棋
					});
				}
				turn = 1-turn;
				
				//判断获胜
				const lines = pieces.isWon((winner, steps)=>{
					pieces.winner = winner;
					self.postMessage({
						type: "won", //获胜
						winner,
						steps
					});
				});
				if (lines.length > 0)
					self.postMessage({
						type: "lines", //连线
						lines
					});
				
				//判断下满 （在为跑获胜的条件下）
				if (lines.length == 0 && pieces.isFull())
					self.postMessage({
						type: "gameOver" //和棋
					});
				
				//计算分数
				const res = pieces.score();
				self.postMessage({
					type: "scores", //分数
					scores: res.scores,
					lines: res.lines
				});
			};
			
			
			if (mistake && !direct){ //防误触
				if (first.i !== null && first.j !== null){ //第二次
					self.postMessage({
						type: "play",
						action: -1 //删除标记
					});
					if (first.i == i && first.j == j){ //同一位置
						first.i = first.j = null;
						play();
					}else{ //不同位置
						first.i = i,
						first.j = j;
						self.postMessage({
							type: "play",
							action: -2 //新的位置添加标记
						});
					}
					
				}else{ //第一次
					first.i = i,
					first.j = j;
					self.postMessage({
						type: "play",
						action: -2 //添加标记
					});
				}
				
			}else{ //直接下
				play();
			}
			
			break;
		
		
		//电脑下棋
		case "computer":
			const {side} = e.data;
			
			if (pieces.winner) //已结束
				return;
			
			const max = pieces.play(side);
			self.postMessage({
				type: "computer",
				pos: max.pos,
				value: max.value
			});
			pieces.addStep(max.pos[0], max.pos[1], side);
			turn = 1-turn;
			
			//判断获胜
			const lines = pieces.isWon((winner, steps)=>{
				pieces.winner = winner;
				self.postMessage({
					type: "won", //获胜
					winner,
					steps
				});
			});
			if (lines.length > 0)
				self.postMessage({
					type: "lines", //连线
					lines
				});
			
			//判断下满 （在为跑获胜的条件下）
			if (lines.length == 0 && pieces.isFull())
				self.postMessage({
					type: "gameOver" //和棋
				});
			
			//计算分数
			const res = pieces.score();
			self.postMessage({
				type: "scores", //分数
				scores: res.scores,
				lines: res.lines
			});
			
			break;
		
		
		// 重放
		case "review":
			self.postMessage({
				type: "review",
				steps: pieces.steps
			});
			break;
	}
}, false);
