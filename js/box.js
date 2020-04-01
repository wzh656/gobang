function Box(bg, box, title, main, button, icon){
	this.title = title;
	this.main = main;
	this.button = button;
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
				$("<div></div>")
					.css("position", "absolute")
					.css("height", "auto")
					.css("top", "50%")
					.css("left", "50%")
					.css("border-radius", "30px")
					.css("transform", "translateX(-50%) translateY(-50%)")
					.css("z-index", "2")
					.append(
						this.title?
							typeof(this.bg) == "object"?
								$("<div></div>")
									.css("position", "absolute")
									.css("width", "100%")
									.css("height", "auto")
									.css("top", "50%")
									.css("left", "50%")
									.css("border-left-top-radius", "30px")
									.css("border-right-top-radius", "30px")
									.css("background-color", "#CCC")
							:
								$("<div>"+title+"</div>")
									.css("position", "absolute")
									.css("width", "100%")
									.css("height", "auto")
									.css("top", "50%")
									.css("left", "50%")
									.css("border-left-top-radius", "30px")
									.css("border-right-top-radius", "30px")
									.css("background-color", "#CCC")
						:
							""
					)
			)
		
	}
	this.init();
	
	this.show = function(){
		this.box.hide();
		$("body").append(this.box);
		
		if (typeof(this.bg) == "object"){
			for (var i in bg){
				this.box.find("div:eq(0)")
					.attr(i, bg[i])
			}
		}
		if (typeof(this.box) == "object"){
			for (var i in box){
				this.box.find("div:eq(1)")
					.attr(i, box[i])
			}
		}
		
		this.box.show("slow");
		this.state = true;
		return this;
	};
}