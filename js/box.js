function Box(bg, windows, title, main, button, icon){
	this.title = title;
	this.windows = windows;
	this.button = button;
	this.main = main;
	this.icon = icon;
	this.bg = bg;
	this.state=false;
	this.init = function (){
		this.box = $("<div></div>")
			.append(
				this.bg & typeof(this.bg)!="object"?
					this.bg
				:
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
		
		this.box
			.append(
				typeof(this.windows) == "string"?
					$("<div>"+this.windows+"</div>")
						.css("position", "absolute")
						.css("width", "80%")
						.css("height", "auto")
						.css("top", "50%")
						.css("left", "50%")
						.css("border-radius", "10px")
						.css("overflow", "hidden")
						.css("background-color", "#FFF")
						.css("transform", "translateX(-50%) translateY(-50%)")
						.css("z-index", "2")
				:
					$("<div></div>")
						.css("position", "absolute")
						.css("width", "80%")
						.css("height", "auto")
						.css("top", "50%")
						.css("left", "50%")
						.css("border-radius", "10px")
						.css("overflow", "hidden")
						.css("background-color", "#FFF")
						.css("transform", "translateX(-50%) translateY(-50%)")
						.css("z-index", "2")
						.append(
							this.title?
								typeof(this.title) != "string"?
									$("<div>"+this.title.innerHTML+"</div>")
										.css("width", "100%")
										.css("height", "auto")
										.css("background-color", "#ddd")
								:
									$("<div>"+this.title+"</div>")
										.css("width", "100%")
										.css("height", "auto")
										.css("background-color", "#ddd")
							:
								""
						)
						.append(
							this.main?
								typeof(this.main) != "string"?
									$("<div>"+this.main.innerHTML+"</div>")
										.css("width", "100%")
										.css("height", "auto")
										.css("background-color", "#fff")
								:
									$("<div>"+this.main+"</div>")
										.css("width", "100%")
										.css("height", "auto")
										.css("background-color", "#fff")
							:
								""
						)
			)
		;
	}
	this.init();
	
	this.show = function(){
		this.box.hide();
		$("body").append(this.box);
		
		if (typeof(this.bg) == "object"){
			for (var i in this.bg){
				eval(`this.box.find("div:eq(0)")[0].${i} = this.bg[i];`);
			}
		}
		if (typeof(this.windows) == "object"){
			for (var i in this.windows){
				eval(`this.box.find("div:eq(1)")[0].${i} = this.windows[i];`);
			}
		}
		if (typeof(this.title) == "object"){
			for (var i in this.title){
				eval(`this.box.find("div:eq(1) div:eq(0)")[0].${i} = this.title[i];`);
			}
		}
		if (typeof(this.main) == "object"){
			for (var i in this.main){
				eval(`this.box.find("div:eq(1) div:eq(2)")[0].${i} = this.main[i];`);
			}
		}
		
		this.box.show("slow");
		this.state = true;
		return this;
	};
}