const TWO_DIRS_OPP = [ //2D正方向 8/2=4
		[1, 0],
		[0, 1],
		
		[1, 1],
		[-1, 1]
	],
	TWO_DIRS = [ //2D方向 3²-1=8
		...TWO_DIRS_OPP,
		...TWO_DIRS_OPP.map(v => [-v[0], -v[1]]),
	],
	THREE_DIRS_OPP = [ //3D正方向 26/2=13
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1],
		
		[1, 1, 0],
		[1, 0, 1],
		[0, 1, 1],
		
		[1, 1, 1],
		
		[-1, 1, 0],
		[-1, 0, 1],
		[0, -1, 1],
		
		[-1, 1, 1],
		[1, -1, 1],
		[1, 1, -1]
	],
	THREE_DIRS = [ //3D方向 3³-1=26
		...THREE_DIRS_OPP,
		...THREE_DIRS_OPP.map(v => [-v[0], -v[1], -v[2]]),
	],
	FOUR_DIRS_OPP = [ //4D正方向 80/2=40
		[1, 0, 0, 0],
		[0, 1, 0, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 1],
		
		[1, 1, 0, 0],
		[1, 0, 1, 0],
		[1, 0, 0, 1],
		[0, 1, 1, 0],
		[0, 1, 0, 1],
		[0, 0, 1, 1],
		
		[1, 1, 1, 0],
		[1, 1, 0, 1],
		[1, 0, 1, 1],
		[0, 1, 1, 1],
		
		[1, 1, 1, 1],
		
		[-1, 1, 0, 0],
		[-1, 0, 1, 0],
		[-1, 0, 0, 1],
		[0, -1, 1, 0],
		[0, -1, 0, 1],
		[0, 0, -1, 1],
		
		[-1, 1, 1, 0],
		[1, -1, 1, 0],
		[1, 1, -1, 0],
		[-1, 1, 0, 1],
		[1, -1, 0, 1],
		[1, 1, 0, -1],
		[-1, 0, 1, 1],
		[1, 0, -1, 1],
		[1, 0, 1, -1],
		[0, -1, 1, 1],
		[0, 1, -1, 1],
		[0, 1, 1, -1],
		
		[-1, 1, 1, 1],
		[1, -1, 1, 1],
		[1, 1, -1, 1],
		[1, 1, 1, -1],
		[-1, -1, 1, 1],
		[-1, 1, -1, 1],
		[-1, 1, 1, -1]
	],
	FOUR_DIRS = [ //4D方向 3⁴-1=80
		...FOUR_DIRS_OPP,
		...FOUR_DIRS_OPP.map(v=>[-v[0], -v[1], -v[2], -v[3]])
	];

class PiecesSystem{
	constructor({columns, rows, depth, width, D, N}){
		this.columns = columns; //列数
		this.rows = rows; //行数
		this.depth = depth; //深度
		this.width = width; //4维厚度
		this.pieces = new Array(columns);
		switch (D){
			case 2:
				for (let i=0; i<columns;i++)
					this.pieces[i] = new Array(rows).fill(0); //0:空白 1:白 2:黑 undefined:超出范围
				break;
				
			case 3:
				for (let i=0; i<columns; i++){
					this.pieces[i] = [];
					for (let j=0; j<rows; j++)
						this.pieces[i][j] = new Array(depth).fill(0); //0:空白 1:白 2:黑 undefined:超出范围
				}
				break;
				
			case 4:
				for (let i=0; i<columns; i++){
					this.pieces[i] = [];
					for (let j=0; j<rows; j++){
						this.pieces[i][j] = [];
						for (let k=0; k<depth; k++)
							this.pieces[i][j][k] = new Array(width).fill(0); //0:空白 1:白 2:黑 undefined:超出范围
					}
				}
				break;
		}
		this.D = D;
		this.N = N;
		this.winner = false; //获胜者 1:黑, 0:白, null:平 false:未获胜
		this.steps = []; //步数
	}
	
	//获取棋子
	get(i, j, k, l){
		switch (this.D){
			case 2:
				return this.pieces[i] && this.pieces[i][j];
				break;
			case 3:
				return this.pieces[i] && this.pieces[i][j] && this.pieces[i][j][k];
				break;
			case 4:
				return this.pieces[i] && this.pieces[i][j] && this.pieces[i][j][k] && this.pieces[i][j][k][l];
				break;
		}
	}
	
	//设置棋子
	set(i, j, k, l, v){
		switch (this.D){
			case 2:
				if (!this.pieces[i])
					this.pieces[i] = [];
				this.pieces[i][j] = k;
				break;
			case 3:
				if (!this.pieces[i])
					this.pieces[i] = [];
				if (!this.pieces[i][j])
					this.pieces[i][j] = [];
				this.pieces[i][j][k] = l;
				break;
			case 4:
				if (!this.pieces[i])
					this.pieces[i] = [];
				if (!this.pieces[i][j])
					this.pieces[i][j] = [];
				if (!this.pieces[i][j][k])
					this.pieces[i][j][k] = [];
				this.pieces[i][j][k][l] = v;
				break;
		}
		return this;
	}
	
	//下一步
	addStep(i, j, k, l, v){
		switch (this.D){
			case 2:
				this.steps.push({i, j, v:k});
				this.set(i, j, k);
				break;
			case 3:
				this.steps.push({i, j, k, v:l});
				this.set(i, j, k, l);
				break;
			case 4:
				this.steps.push({i, j, k, l, v});
				this.set(i, j, k, l, v);
				break;
		}
		return this;
	}
	
	//是否获胜
	isWon(winCallback=()=>{}){
		const lines = [];
		switch (this.D){
			case 2:
				for (const [x, col] of Object.entries(this.pieces))
					for (const [y, pic] of Object.entries(col))
						if (pic !== 0) //非空
							for (const [dx, dy] of TWO_DIRS){ //各个方向
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
				break;
				
			case 3:
				for (const [x, face] of Object.entries(this.pieces))
					for (const [y, col] of Object.entries(face))
						for (const [z, pic] of Object.entries(col))
							if (pic !== 0) //非空
								for (const [dx, dy, dz] of THREE_DIRS){ //各个方向
									let won = true,
										i;
									for (i=1; i<=this.N-1; i++) //包括自己 往下N-1
										if (this.get(+x+i*dx, +y+i*dy, +z+i*dz) !== pic){ //该方向不同
											won = false;
											break;
										}
									if (won){
										if (!this.winner) //第一次
											winCallback(pic, this.steps.length);
										this.winner = pic-1;
										lines.push({
											start: [+x, +y, +z],
											end: [+x+(i-1)*dx, +y+(i-1)*dy, +z+(i-1)*dz]
										});
									}
								}
				break;
				
			case 4:
				for (const [x, cube] of Object.entries(this.pieces))
					for (const [y, face] of Object.entries(cube))
						for (const [z, col] of Object.entries(face))
							for (const [w, pic] of Object.entries(col))
								if (pic !== 0) //非空
									for (const [dx, dy, dz, dw] of FOUR_DIRS){ //各个方向
										let won = true,
											i;
										for (i=1; i<=this.N-1; i++) //包括自己 往下N-1
											if (this.get(+x+i*dx, +y+i*dy, +z+i*dz, +w+i*dw) !== pic){ //该方向不同
												won = false;
												break;
											}
										if (won){
											if (!this.winner) //第一次
												winCallback(pic, this.steps.length);
											this.winner = pic-1;
											lines.push({
												start: [+x, +y, +z, +w],
												end: [+x+(i-1)*dx, +y+(i-1)*dy, +z+(i-1)*dz, +w+(i-1)*dw]
											});
										}
									}
				break;
		}
		return lines;
	}
	
	//是否下满
	isFull(){
		switch (this.D){
			case 2:
				for (const i of this.pieces)
					for (const j of i)
						if (!j) return false;
				break;
			
			case 3:
				for (const i of this.pieces)
					for (const j of i)
						for (const k of j)
							if (!k) return false;
				break;
				
			case 4:
				for (const i of this.pieces)
					for (const j of i)
						for (const k of j)
							for (const l of k)
								if (!l) return false;
				break;
		}
		this.winner = null;
		return true;
	}
	
	//分析分数
	score(){
		const scores = new Array(2).fill(0), //1:黑, 0:白
			lines = [], //连线
			passed = []; //经过的
		
		switch (this.D){
			case 2:
				for (const [x, col] of Object.entries(this.pieces))
					for (const [y, pic] of Object.entries(col)){
						if (pic === 0) continue; //无棋子 跳过
						/*if ( passed.some((v)=>v[0]==x && v[1]==y) )
							continue; //相同 跳过*/
						
						for (const [dx, dy] of TWO_DIRS){ //各个方向
							let num = 0, //连子数
								width = 1,
								px, py;
							
							if ( this.get(x-dx, y-dy) == 3-pic || //被对方堵住
								this.get(x-dx, y-dy) == undefined //墙
							) num--;
							
							if ( passed.some(v => v[0]==x && v[1]==y) ){ //有相同
								px = +x + dx,
								py = +y + dy;
								while (this.get(px, py) == pic){ //己方
									width++;
									
									px += +dx,
									py += +dy; //循环
								}
								
							}else{
								px = +x + dx,
								py = +y + dy;
								while (this.get(px, py) == pic){ //己方
									num++;
									width++;
									passed.push([px, py]); //已经历
									
									px += +dx,
									py += +dy; //循环
								}
							}
							
							if ( this.get(px, py) == 3-pic || //被对方堵住
								this.get(px, py) == undefined //墙
							) num--;
							
							scores[pic-1] += 10**num;
							
							if (width > 1)
								lines.push({
									start: [x, y],
									end: [px-dx, py-dy],
									width,
									pic
								});
						}
					}
				break;
			
			case 3:
				for (const [x, face] of Object.entries(this.pieces))
					for (const [y, col] of Object.entries(face))
						for (const [z, pic] of Object.entries(col)){
							if (pic === 0) continue; //无棋子 跳过
							/*if ( passed.some(v => v[0]==x && v[1]==y && v[2]==z) )
								continue; //相同 跳过*/
							
							for (const [dx, dy, dz] of THREE_DIRS){ //各个方向
								let num = 0, //连子数
									width = 1,
									px, py, pz;
								
								if ( this.get(x-dx, y-dy, z-dz) == 3-pic || //被对方堵住
									this.get(x-dx, y-dy, z-dz) == undefined //墙
								) num--;
								
								if ( passed.some(v => v[0]==x && v[1]==y && v[2]==z) ){ //有相同
									px = +x + dx,
									py = +y + dy,
									pz = +z + dz;
									while (this.get(px, py, pz) == pic){ //己方
										width++;
										
										px += +dx,
										py += +dy,
										pz += +dz; //循环
									}
									
								}else{
									px = +x + dx,
									py = +y + dy,
									pz = +z + dz;
									while (this.get(px, py, pz) == pic){ //己方
										num++;
										width++;
										passed.push([px, py, pz]); //已经历
										
										px += +dx,
										py += +dy,
										pz += +dz; //循环
									}
								}
								
								if ( this.get(px, py, pz) == 3-pic || //被对方堵住
									this.get(px, py, pz) == undefined //墙
								) num--;
								
								scores[pic-1] += 10**num;
								
								if (width > 1)
									lines.push({
										start: [x, y, z],
										end: [px-dx, py-dy, pz-dz],
										width,
										pic
									});
							}
						}
				break;
				
			case 4:
				for (const [x, cube] of Object.entries(this.pieces))
					for (const [y, face] of Object.entries(cube))
						for (const [z, col] of Object.entries(face))
							for (const [w, pic] of Object.entries(col)){
								if (pic === 0) continue; //无棋子 跳过
								/*if ( passed.some((v)=>v[0]==x && v[1]==y) )
									continue; //相同 跳过*/
								
								for (const [dx, dy, dz, dw] of FOUR_DIRS){ //各个方向
									let num = 0, //连子数
										width = 1,
										px, py, pz, pw;
									
									if ( this.get(x-dx, y-dy, z-dz, w-dw) == 3-pic || //被对方堵住
										this.get(x-dx, y-dy, z-dz, w-dw) == undefined //墙
									) num--;
									
									if ( passed.some(v => v[0]==x && v[1]==y && v[2]==z && v[3]==w) ){ //有相同
										px = +x + dx,
										py = +y + dy,
										pz = +z + dz,
										pw = +w + dw;
										while (this.get(px, py, pz, pw) == pic){ //己方
											width++;
											
											px += +dx,
											py += +dy,
											pz += +dz,
											pw += +dw; //循环
										}
										
									}else{
										px = +x + dx,
										py = +y + dy,
										pz = +z + dz,
										pw = +w + dw;
										while (this.get(px, py, pz, pw) == pic){ //己方
											num++;
											width++;
											passed.push([px, py, pz, pw]); //已经历
											
											px += +dx,
											py += +dy,
											pz += +dz,
											pw += +dw; //循环
										}
									}
									
									if ( this.get(px, py, pz, pw) == 3-pic || //被对方堵住
										this.get(px, py, pz, pw) == undefined //墙
									) num--;
									
									scores[pic-1] += 10**num;
									
									if (width > 1)
										lines.push({
											start: [x, y, z, w],
											end: [px-dx, py-dy, pz-dz, pw-dw],
											width,
											pic
										});
								}
							}
				break;
		}
		
		return {scores, lines};
	}
	
	//电脑下棋
	play(side){
		const max = {
			pos: new Array(this.D),
			value: -Infinity
		};
		
		switch (this.D){
			case 2:
				for (const [x, col] of Object.entries(this.pieces))
					for (const [y, pic] of Object.entries(col)){
						if (pic !== 0) continue; //有棋子 跳过
						
						let score = 1/(
							(x - (pieces.columns-1)/2) **2 +
							(y - (pieces.rows-1)/2) **2 +
							Math.random() + 1
						);
						
						for (const [dx, dy] of TWO_DIRS_OPP){ //正方向
							let num = [0, 0],
								len = [0, 0], //连子数（不包括自己）
								px, py;
							
							px = +x + dx,
							py = +y + dy;
							while (this.get(px, py) == side){ //己方 攻击
								num[0]++;
								len[0]++;
								
								px += +dx,
								py += +dy; //循环
							}
							if ( this.get(px, py) == 3-side || //被对方堵住
								this.get(px, py) == undefined //墙
							) num[0]--;
							
							px = +x + dx,
							py = +y + dy;
							while (this.get(px, py) == 3-side){ //对方 防御
								num[1]++;
								len[1]++;
								
								px += +dx,
								py += +dy; //循环
							}
							if ( this.get(px, py) == 3-side || //被对方堵住
								this.get(px, py) == undefined //墙
							) num[1]--;
							
							px = +x - dx,
							py = +y - dy;
							while (this.get(px, py) == side){ //己方 攻击
								num[0]++;
								len[0]++;
								
								px -= +dx,
								py -= +dy; //循环
							}
							if ( this.get(px, py) == 3-side || //被对方堵住
								this.get(px, py) == undefined //墙
							) num[0]--;
							
							px = +x - dx,
							py = +y - dy;
							while (this.get(px, py) == 3-side){ //对方 防御
								num[1]++;
								len[1]++;
								
								px -= +dx,
								py -= +dy; //循环
							}
							if ( this.get(px, py) == 3-side || //被对方堵住
								this.get(px, py) == undefined //墙
							) num[1]--;
							
							if (len[0] >= this.N){ //可直接获胜
								score += 10 ** len[0];
							}else{
								score += 10 ** num[0];
							}
							
							if (len[1] >= this.N-1){ //可防御对方直接获胜
								score += 10 ** len[1] * 0.6;
							}else{
								score += 10 ** num[1] * 0.6;
							}
						}
						
						if (score > max.value){
							max.pos[0] = +x,
							max.pos[1] = +y;
							max.value = score;
						}
					}
				break;
				
			case 3:
				for (const [x, face] of Object.entries(this.pieces))
					for (const [y, col] of Object.entries(face))
						for (const [z, pic] of Object.entries(col)){
							if (pic !== 0) continue; //有棋子 跳过
							
							let score = 1/(
								(x - (pieces.columns-1)/2) **2 +
								(y - (pieces.rows-1)/2) **2 +
								(z - (pieces.depth-1)/2) **2 +
								Math.random() + 1
							);
							
							for (const [dx, dy, dz] of THREE_DIRS_OPP){ //正方向
								let num = [0, 0],
									len = [0, 0], //连子数（不包括自己）
									px, py, pz;
								
								px = +x + dx,
								py = +y + dy,
								pz = +z + dz;
								while (this.get(px, py, pz) == side){ //己方 攻击
									num[0]++;
									len[0]++;
									
									px += +dx,
									py += +dy,
									pz += +dz; //循环
								}
								if ( this.get(px, py, pz) == 3-side || //被对方堵住
									this.get(px, py, pz) == undefined //墙
								) num[0]--;
								
								px = +x + dx,
								py = +y + dy,
								pz = +z + dz;
								while (this.get(px, py, pz) == 3-side){ //对方 防御
									num[1]++;
									len[1]++;
									
									px += +dx,
									py += +dy,
									pz += +dz; //循环
								}
								if ( this.get(px, py, pz) == 3-side || //被对方堵住
									this.get(px, py, pz) == undefined //墙
								) num[1]--;
								
								px = +x - dx,
								py = +y - dy,
								pz = +z - dz;
								while (this.get(px, py, pz) == side){ //己方 攻击
									num[0]++;
									len[0]++;
									
									px -= +dx,
									py -= +dy,
									pz -= +dz; //循环
								}
								if ( this.get(px, py, pz) == 3-side || //被对方堵住
									this.get(px, py, pz) == undefined //墙
								) num[0]--;
								
								px = +x - dx,
								py = +y - dy,
								pz = +z - dz;
								while (this.get(px, py, pz) == 3-side){ //对方 防御
									num[1]++;
									len[1]++;
									
									px -= +dx,
									py -= +dy,
									pz -= +dz; //循环
								}
								if ( this.get(px, py, pz) == 3-side || //被对方堵住
									this.get(px, py, pz) == undefined //墙
								) num[1]--;
								
								if (len[0] >= this.N){ //可直接获胜
									score += 10 ** len[0];
								}else{
									score += 10 ** num[0];
								}
								
								if (len[1] >= this.N-1){ //可防御对方直接获胜
									score += 10 ** len[1] * 0.6;
								}else{
									score += 10 ** num[1] * 0.6;
								}
							}
							
							if (score > max.value){
								max.pos[0] = +x,
								max.pos[1] = +y,
								max.pos[2] = +z;
								max.value = score;
							}
						}
				break;
				
			case 4:
				for (const [x, cube] of Object.entries(this.pieces))
					for (const [y, face] of Object.entries(cube))
						for (const [z, col] of Object.entries(face))
							for (const [w, pic] of Object.entries(col)){
								if (pic !== 0) continue; //有棋子 跳过
								
								let score = 1/(
									(x - (pieces.columns-1)/2) **2 +
									(y - (pieces.rows-1)/2) **2 +
									(z - (pieces.depth-1)/2) **2 +
									(w - (pieces.width-1)/2) **2 +
									Math.random() + 1
								);
								
								for (const [dx, dy, dz, dw] of THREE_DIRS_OPP){ //正方向
									let num = [0, 0],
										len = [0, 0], //连子数（不包括自己）
										px, py, pz, pw;
									
									px = +x + dx,
									py = +y + dy,
									pz = +z + dz,
									pw = +w + dw;
									while (this.get(px, py, pz, pw) == side){ //己方 攻击
										num[0]++;
										len[0]++;
										
										px += +dx,
										py += +dy,
										pz += +dz,
										pw += +dw; //循环
									}
									if ( this.get(px, py, pz, pw) == 3-side || //被对方堵住
										this.get(px, py, pz, pw) == undefined //墙
									) num[0]--;
									
									px = +x + dx,
									py = +y + dy,
									pz = +z + dz,
									pw = +w + dw;
									while (this.get(px, py, pz, pw) == 3-side){ //对方 防御
										num[1]++;
										len[1]++;
										
										px += +dx,
										py += +dy,
										pz += +dz,
										pw += +dw; //循环
									}
									if ( this.get(px, py, pz, pw) == 3-side || //被对方堵住
										this.get(px, py, pz, pw) == undefined //墙
									) num[1]--;
									
									px = +x - dx,
									py = +y - dy,
									pz = +z - dz,
									pw = +w - dw;
									while (this.get(px, py, pz, pw) == side){ //己方 攻击
										num[0]++;
										len[0]++;
										
										px -= +dx,
										py -= +dy,
										pz -= +dz,
										pw -= +dw; //循环
									}
									if ( this.get(px, py, pz, pw) == 3-side || //被对方堵住
										this.get(px, py, pz, pw) == undefined //墙
									) num[0]--;
									
									px = +x - dx,
									py = +y - dy,
									pz = +z - dz,
									pw = +w - dw;
									while (this.get(px, py, pz, pw) == 3-side){ //对方 防御
										num[1]++;
										len[1]++;
										
										px -= +dx,
										py -= +dy,
										pz -= +dz,
										pw -= +dw; //循环
									}
									if ( this.get(px, py, pz, pw) == 3-side || //被对方堵住
										this.get(px, py, pz, pw) == undefined //墙
									) num[1]--;
									
									if (len[0] >= this.N){ //可直接获胜
										score += 10 ** len[0];
									}else{
										score += 10 ** num[0];
									}
									
									if (len[1] >= this.N-1){ //可防御对方直接获胜
										score += 10 ** len[1] * 0.6;
									}else{
										score += 10 ** num[1] * 0.6;
									}
								}
								
								if (score > max.value){
									max.pos[0] = +x,
									max.pos[1] = +y,
									max.pos[2] = +z,
									max.pos[3] = +w;
									max.value = score;
								}
							}
				break;
		}
		
		return max;
	}
}



let pieces, //棋子系统
	mistake, //防误触
	turn = 1, //下棋方 1:黑, 0:白
	first = []; //第一次点击位置
self.addEventListener("message", function(e){
	//console.log("worker: ", e.data.type, e.data)
	switch (e.data.type){
		// 初始化
		case "init":
			const {cols, rows, depth, width, D, N, mis} = e.data;
			
			pieces = new PiecesSystem({columns:cols, rows, depth, width, D, N});
			mistake = mis;
			
			break;
			
			
		// 下棋
		case "play":
			const {i, j, k, l, direct=false} = e.data;
			
			const pos = [];
			switch (pieces.D){
				case 2:
					pos.push(i, j);
					break;
				case 3:
					pos.push(i, j, k);
					break;
				case 4:
					pos.push(i, j, k, l);
					break;
			}
			
			if (pieces.winner !== false) //已结束
				return self.postMessage({type: "play"});
			if (pieces.get(...pos) !== 0) //非空位
				return self.postMessage({type: "play"});
			
			//下棋
			const play = () => {
				if (turn){ //黑
					pieces.addStep(...pos, 2);
					self.postMessage({
						type: "play",
						action: 2 //下黑棋
					});
				}else{ //白
					pieces.addStep(...pos, 1);
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
				if ( first.length > 0 ){ //第二次
					self.postMessage({
						type: "play",
						action: -1 //删除标记
					});
					if ( first.every((v,i) => v==pos[i]) ){ //同一位置
						first = [];
						play();
					}else{ //不同位置
						first = pos;
						self.postMessage({
							type: "play",
							action: -2 //新的位置添加标记
						});
					}
					
				}else{ //第一次
					first = pos;
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
			pieces.addStep(...max.pos, side);
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
		
		
		//所有棋子
		case "pieces":
			self.postMessage({
				type: "pieces",
				pieces: pieces.pieces
			});
			break;
		
		
		// 重放
		case "review":
			self.postMessage({
				type: "review",
				steps: pieces.steps,
				pieces: pieces.pieces
			});
			break;
	}
}, false);
