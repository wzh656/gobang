function Box(bg, windows, title, main, button, icon){
	this.title = title;
	this.windows = windows;
	this.button = button;
	this.main = main;
	this.icon = icon;
	this.bg = bg;
	this.state=false;
	this.init = function (){
		this.box = $("<box-background></box-background>")
			.append(
				this.bg & typeof(this.bg)!="object"?
					this.bg
				:
					$("<box-background></box-background>")
						.css("position", "absolute")
						.css("left", "0px")
						.css("top", "0px")
						.css("height", "100%")
						.css("width", "100%")
						.css("background-color", "#000")
						.css("opacity", "0.5")
						.css("z-index", "1")
			)
		
		this.box
			.append(
				typeof(this.windows) == "string"?
					$("<box-window>"+this.windows+"</box-window>")
						.css("position", "absolute")
						.css("width", "80%")
						.css("height", "auto")
						.css("top", "50%")
						.css("left", "50%")
						.css("border", "3px outset #aaa")
						.css("border-radius", "10px")
						.css("overflow", "hidden")
						.css("background-color", "#FFF")
						.css("transform", "translateX(-50%) translateY(-50%)")
						.css("z-index", "2")
				:
					$("<box-window></box-window>")
						.css("position", "absolute")
						.css("width", "80%")
						.css("height", "auto")
						.css("top", "50%")
						.css("left", "50%")
						.css("border", "3px outset #aaa")
						.css("border-radius", "10px")
						.css("overflow", "hidden")
						.css("background-color", "#FFF")
						.css("transform", "translateX(-50%) translateY(-50%)")
						.css("z-index", "2")
						.append(
							this.title?
								typeof(this.title) != "string"?
									$("<box-div></box-div>")
										.css("width", "100%")
										.css("height", "auto")
										.css("background-color", "#ddd")
										.css("font-size", "30px")
										.attr("class","ThreeD")
								:
									$("<box-div>"+this.title+"</box-div>")
										.css("width", "100%")
										.css("height", "auto")
										.css("background-color", "#ddd")
										.css("font-size", "30px")
										.attr("class","ThreeD")
							:
								""
						)
						.append(
							this.main?
								typeof(this.main) != "string"?
									$("<box-div></box-div>")
										.css("width", "100%")
										.css("height", "auto")
										.css("background-color", "#fff")
								:
									$("<box-div>"+this.main+"</box-div>")
										.css("width", "100%")
										.css("height", "auto")
										.css("background-color", "#fff")
							:
								""
						)
						.append(
							this.button?
								typeof(this.button) == "object"?
									$("<box-div></box-div>")
								:
									$("<box-div>"+this.button+"</box-div>")
							:
								""
						)
			)
		;
		var button_width = 100;
		if (this.button.length == 1){
			button_width = 100/1;
		}else if (this.button.length == 2){
			button_width = 100/2;
		}else if (this.button.length == 3){
			button_width = 100/3;
		}else if (this.button.length == 4){
			button_width = 100/2;
		}else{
			button_width = 100/3;
		}
		for (var i in this.button){
			this.box.find("box-div:eq(1) box-div:eq(2)")
				.append(
					typeof(this.button[i]) != "string"?
						$("<box-button></box-button>")
							.css("width", button_width+"%")
							.css("background-color", "#eee")
							.css("color", "#334")
					:
						$("<box-button>"+this.button[i]+"</box-button>")
							.css("width", button_width+"%")
							.css("background-color", "#eee")
							.css("color", "#334")
				)
		}
	}
	this.init();
	
	this.show = function(){
		$("body").append(this.box);
		/* $("body")
			.css("overflow", "hidden")
		;
		this.box.find("box-div:eq(0)")
			.css("position", "absolute")
			.css("top", "100%")
			.css("opacity", "0")
		;
		this.box.find("box-div:eq(1)")
			.css("position", "absolute")
			.css("top", "100%")
			.css("opacity", "0")
		this.box.find("box-div:eq(1) *")
			.css("position", "static")
		; */
		
		if (typeof(this.bg) == "object"){
			for (var i in this.bg){
				eval(`this.box.find("box-div:eq(0)")[0].${i} = this.bg[i];`);
			}
		}
		if (typeof(this.windows) == "object"){
			for (var i in this.windows){
				eval(`this.box.find("box-div:eq(1)")[0].${i} = this.windows[i];`);
			}
		}
		if (typeof(this.title) == "object"){
			for (var i in this.title){
				eval(`this.box.find("box-div:eq(1) box-div:eq(0)")[0].${i} = this.title[i];`);
			}
		}
		if (typeof(this.main) == "object"){
			for (var i in this.main){
				eval(`this.box.find("box-div:eq(1) box-div:eq(1)")[0].${i} = this.main[i];`);
			}
		}
		for (var i in this.button){
			if (typeof(this.button[i]) == "object"){
				for (var j in this.button[i]){
					eval(`this.box.find("box-div:eq(1) box-div:eq(2) box-button")[${i}].${j} = this.button[i][j];`);
				}
			}
		}
		
		/* this.box.find("box-div:eq(0)").animate({
			opacity: "0.5"
		});
		this.box.find("box-div:eq(1)").animate({
			opacity: "1"
		});
		this.box.find("box-div:eq(0)").animate({
			top: "0%"
		});
		this.box.find("box-div:eq(1)").animate({
			top: "50%"
		}, () => {
			$("body")
				.css("overflow", "");
		}); */
		
		this.state = true;
		return this;
	};
	this.close = function (){
		this.box.find("box-div:eq(0)").animate({
			top: "-100%"
		});
		this.box.find("box-div:eq(1)").animate({
			top: "-100%"
		}, () => {
			$("body")
				.css("overflow", "");
		});
		var _box = this.box; //防止无法在函数内使用this
		this.box.hide("slow", () => {
			_box.remove();
		}, "slow");
		this.state = false;
		return this;
	};
}