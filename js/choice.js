function Choice(items, background_onclick){
	this.items=items;
	this.background_onclick=background_onclick;
	this.state=false;
	this.init=function(){
		this.box=
			$("<div></div>")
				.append(
					$("<div></div>")
						.css("position", "absolute")
						.css("left", "0px")
						.css("top", "0px")
						.css("height", "100%")
						.css("width", "100%")
						.css("background-color", "#000")
						.css("opacity", "0.5")
						.css("z-index", "1")
				)
				.append(
					$("<div></div>")
						.css("position", "absolute")
						.css("left", "0px")
						.css("width", "100%")
						.css("bottom", "0px")
						.css("z-index", "2")
				)
		;
		for (var i in this.items){
			this.box.find("div:eq(1)").append(
				$("<div>"+this.items[i].name+"</div>")
					.css("width", "100%")
					.css("text-align", "center")
					.css("font-family", "hwxk")
					.css("color", 
						((this.items[i].color == undefined)?
							"#000"
						:
							this.items[i].color
						)
					)
					.css("background-color", 
						((this.items[i].background_color == undefined)?
							"#FFF"
						:
							this.items[i].background_color
						)
					)
					.css("font-size", 
						((this.items[i].font_size == undefined)?
							"30px"
						:
							this.items[i].font_size
						)
					)
					.css("height", 
						((this.items[i].height == undefined)?
							"50px"
						:
							this.items[i].height
						)
					)
					.css("line-height", 
						((this.items[i].height == undefined)?
							"50px"
						:
							this.items[i].height
						)
					)
					.css("border-top", 
						((this.items[i].b_size == undefined)?
							"2px"
						:
							this.items[i].size
						)+
						" solid "+
						((this.items[i].b_color == undefined)?
							"#AAA"
						:
							this.items[i].b_color
						)
					)
					.click(this.items[i].onclick)
			);
		}
	}
	this.init();
	this._items=function(value){
		if (value == undefined){
			return this.itmes;
		}else{
			this.items=value;
			this.init();
			return this;
		}
	};
	this._box=function(value){
		if (value == undefined){
			return this.box;
		}else{
			this.box=value;
			this.init();
			return this;
		}
	};
	this._random=function (){
		var randomNumber=function(){
			return 0.5-Math.random();
		};
		this.items.sort(randomNumber);
		this.init();
		return this;
	};
	this.show=function(){
		this.box.hide();
		$("body").append(this.box);
		this.box.show("fast");
		this.box.find("div:eq(0)").click(background_onclick);
		state=true;
		return this;
	};
	this.close=function(){
		var box=this.box; //防止无法在函数内使用this
		this.box.hide("fast", function(){
			box.remove();
		});
		state=false;
		return this;
	};
}
