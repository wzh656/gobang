function Box(bg, windows, title, main, button, icon){
	this.title = title;
	this.windows = windows;
	this.button = button;
	this.main = main;
	this.icon = icon;
	this.bg = bg;
	this.state=false;
	this.init = function (){
		this.box = $("<box-all></box-all>")
			.append(
				this.bg & typeof(this.bg)!="object"?
					this.bg
				:
					$("<box-background></box-background>")
			)
		
		this.box
			.append(
				typeof(this.windows) == "string"?
					$("<box-window>"+this.windows+"</box-window>")
				:
					$("<box-window></box-window>")
						.append(
							this.title?
								typeof(this.title) != "string"?
									$("<box-title></box-title>")
										.attr("class","ThreeD")
								:
									$("<box-title>"+this.title+"</box-title>")
										.attr("class","ThreeD")
							:
								""
						)
						.append(
							this.main?
								typeof(this.main) != "string"?
									$("<box-main></box-main>")
								:
									$("<box-main>"+this.main+"</box-main>")
							:
								""
						)
						.append(
							this.button?
								typeof(this.button) == "object"?
									$("<box-button-div></box-button-div>")
								:
									$("<box-button-div>"+this.button+"</box-button-div>")
							:
								""
						)
			)
		;
		var button_width = 100;
		if (this.button.length == 1){
			button_width = 100/1;
		}else if (this.button.length == 2){
			button_width = 100/2-2;
		}else if (this.button.length == 3){
			button_width = 100/3-2;
		}else if (this.button.length == 4){
			button_width = 100/2-2;
		}else{
			button_width = 100/3-2;
		}
		for (var i in this.button){
			this.box.find("box-button-div")
				.append(
					typeof(this.button[i]) != "string"?
						$("<box-button></box-button>")
							.css("width", button_width+"%")
					:
						$("<box-button>"+this.button[i]+"</box-button>")
							.css("width", button_width+"%")
				)
		}
	}
	this.init();
	
	this.show = function(){
		$("body").append(this.box);
		
		$("body").css("overflow", "hidden");
		setTimeout(() => {
			$("body").css("overflow", "visible");
		},1000);
		this.box.find("box-background")
			.css("animation", "background_slow_in 1s")
			.css("-moz-animation", "background_slow_in 1s") //Firefox
			.css("-webkit-animation", "background_slow_in 1s") //Safari 和 Chrome
			.css("-o-animation", "background_slow_in 1s") //Opera
		;
		this.box.find("box-window")
			.css("animation", "window_slow_in 1s")
			.css("-moz-animation", "window_slow_in 1s") //Firefox
			.css("-webkit-animation", "window_slow_in 1s") //Safari 和 Chrome
			.css("-o-animation", "window_slow_in 1s") //Opera
		;
		$("box-background")[0].style.display;
		$("box-window")[0].style.display;
		
		if (typeof(this.bg) == "object"){
			for (var i in this.bg){
				eval(`this.box.find("box-background")[0].${i} = this.bg[i];`);
			}
		}
		if (typeof(this.windows) == "object"){
			for (var i in this.windows){
				eval(`this.box.find("box-window")[0].${i} = this.windows[i];`);
			}
		}
		if (typeof(this.title) == "object"){
			for (var i in this.title){
				eval(`this.box.find("box-title")[0].${i} = this.title[i];`);
			}
		}
		if (typeof(this.main) == "object"){
			for (var i in this.main){
				eval(`this.box.find("box-main")[0].${i} = this.main[i];`);
			}
		}
		for (var i in this.button){
			if (typeof(this.button[i]) == "object"){
				for (var j in this.button[i]){
					eval(`this.box.find("box-button")[${i}].${j} = this.button[i][j];`);
				}
			}
		}
		
		this.state = true;
		return this;
	};
	this.close = function (){
		$("body").css("overflow", "hidden");
		setTimeout(() => {
			$("body").css("overflow", "visible");
		},1000);
		this.box.find("box-background")
			.css("animation", "background_slow_out 1s")
			.css("-moz-animation", "background_slow_out 1s") //Firefox
			.css("-webkit-animation", "background_slow_out 1s") //Safari 和 Chrome
			.css("-o-animation", "background_slow_out 1s") //Opera
		;
		this.box.find("box-window")
			.css("animation", "window_slow_out 1s")
			.css("-moz-animation", "window_slow_out 1s") //Firefox
			.css("-webkit-animation", "window_slow_out 1s") //Safari 和 Chrome
			.css("-o-animation", "window_slow_out 1s") //Opera
		;
		$("box-background")[0].style.display;
		$("box-window")[0].style.display;
		
		setTimeout(() => {
			this.box.remove();
		},1000);
		this.state = false;
		return this;
	};
	this.setBg = function (value){
		this.bg = value;
		this.init();
		return this;
	}
	this.getBg = function (){
		return this.bg;
	}
	
	this.setWindows = function (value){
		this.windows = value;
		this.init();
		return this;
	}
	this.getWindows = function (){
		return this.windows;
	}
	
	this.setTitle = function (value){
		this.title = value;
		this.init();
		return this;
	}
	this.getTitle = function (){
		return this.title;
	}
	
	this.setMain = function (value){
		this.main = value;
		this.init();
		return this;
	}
	this.getMain = function (){
		return this.main;
	}
	
	this.setButton = function (value){
		this.button = value;
		this.init();
		return this;
	}
	this.getButton = function (){
		return this.button;
	}
}


function Notice(box, msg, time){
	this.msg = msg;
	this.time = time;
	
}