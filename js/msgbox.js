function Msgbox(title,message,button,icon){
	this.title=title;
	this.message=message;
	this.button=button;
	this.icon=icon;
	this.init=function(){
		this.box=$("<div></div>")
			.append(
				$("<div></div>")
					.css("position","absolute")
					.css("left","0px")
					.css("top","0px")
					.css("height","100%")
					.css("width","100%")
					.css("background-color","#000")
					.css("opacity","0.5")
					.css("z-index","1")
			)
			.append(
				$("<div></div>")
					.css("position","absolute")
					.css("width","80%")
					.css("height","auto")
					.css("top","50%")
					.css("left","50%")
					.css("border-radius","30px")
					.css("background-color","#FFF")
					.css("transform","translateX(-50%) translateY(-50%)")
					.css("z-index","2")
					.append(
						(this.icon == "error")?
							$("<img/>")
								.attr("src","./image/icon/error.jpg")
								.css("position","absolute")
								.css("left","8%")
								.css("top","8%")
								.css("width","46px")
								.css("height","46px")
						:(this.icon == "warning")?
							$("<img/>")
								.attr("src","./image/icon/warning.jpg")
								.css("position","absolute")
								.css("left","8%")
								.css("top","8%")
								.css("width","46px")
								.css("height","46px")
						:(this.icon == "info")?
							$("<img/>")
								.attr("src","./image/icon/info.jpg")
								.css("position","absolute")
								.css("left","8%")
								.css("top","8%")
								.css("width","46px")
								.css("height","46px")
						:(this.icon == "info")?
							$("<img/>")
								.attr("src","./image/icon/info.jpg")
								.css("position","absolute")
								.css("left","8%")
								.css("top","8%")
								.css("width","46px")
								.css("height","46px")
						:(this.icon == "loading")?
							$("<img/>")
								.attr("src","./image/icon/loading.gif")
								.css("position","absolute")
								.css("left","8%")
								.css("top","8%")
								.css("width","85.333px")
								.css("height","48px")
						:(this.icon == "icon")?
							$("<img/>")
								.attr("src","./image/icon/icon.png")
								.css("position","absolute")
								.css("left","8%")
								.css("top","8%")
								.css("width","46px")
								.css("height","46px")
						:
							""
					)
					.append(
						$("<h2>"+this.title.name+"</h2>")
							.css("background-image",
								this.title.color == undefined?
									""
								:
									"none"
							)
							.css("background-color",this.title.color)
							.css("font-size",this.title.font_size)
					)
					.append(
						$("<p>"+this.message.name+"</p>")
							.css("text-align","center")
							.css("color",this.message.color)
							.css("font-size",this.message.font_size)
					)
			.append(
				$("<div></div>")
					.css("width","80%")
					.css("margin","0 auto")
			)
		);
		for (var i in this.button){
			this.box.find("div:eq(2)").append(
				$("<button>"+this.button[i].name+"</button>")
					.click(this.button[i].onclick)
					.css("color",this.button[i].color)
					.css("background-color",this.button[i].background_color)
					.css("float",this.button[i]["float"])
					.css("margin",this.button[i].margin)
					.css("font-size",
						this.button[i].font_size == undefined?
							"20px"
						:
							this.button[i].font_size
					)
					.css("height",
						this.button[i].height == undefined?
							"50px"
						:
							this.button[i].height
					)
					.css("width",
						this.button[i].width == undefined?
							"100px"
						:
							this.button[i].width
					)
			);
		}
	}
	this.init();
	this._title=function (value){
		if (value == undefined){
			return this.title;
		}else{
			this.title=value;
			this.init();
			return this;
		}
	};
	this._message=function (value){
		if (value == undefined){
			return this.message;
		}else{
			this.message=value;
			this.init();
			return this;
		}
	};
	this._button=function (value){
		if (value == undefined){
			return this.button;
		}else{
			this.button=value;
			this.init();
			return this;
		}
	};
	this._random=function (){
		var randomNumber=function(){
			return 0.5-Math.random();
		};
		this.button.sort(randomNumber);
		this.init();
		return this;
	};
	this._box=function (value){
		if (value == undefined){
			return this.box;
		}else{
			this.box=value;
			this.init();
			return this;
		}
	};
	this.show=function (){
		this.box.hide();
		$("body").append(this.box);
		this.box.show("slow");
		return this;
	};
	this.close=function (){
		var box=this.box; //防止无法在函数内使用this
		this.box.hide("slow",function(){
			box.remove();
		});
		return this;
	};
}
