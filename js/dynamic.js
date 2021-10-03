if (location.href.indexOf("index.html") != -1 && +new Date() >= +new Date(2021,9,1) && +new Date() <= +new Date(2021,9,7)){
	$("body").css("background-image", "url('https://img2.baidu.com/it/u=771782317,2119761893&fm=26&fmt=auto')");
	$("body > h1").append($("<small>国庆节快乐！</small>").css("font-size", "0.3em"));
	if (localStorage.getItem("国庆节礼包弹窗-2021-10-01") != 1){
		layer.alert("热烈庆祝我伟大的祖国72岁生日快乐！顺便祝我自己、同学游文庆15岁生日快乐！再预祝同学邱王顺6号生日快乐！（貌似这活动消息晚发了一天，不管了，就当是10月1日发的吧）<br>非常感谢大家对游戏的支持与鼓励，我本以为这游戏凉了的，感谢大家用好评重新刷起热度，这是我收到过最好的生日礼物。<br>过节当然得发礼包，就搞一个图片和一个动画当国庆节礼包吧（别说寒酸，真没啥好当礼包的了）<img src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0420%2F989aaf58j00qrueh8000mc000dw00b7g.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635754172&t=51f92e9f7712d7e9294a4ec2363abe7f' style='width: 100%;' /><br/><iframe src='https://wzh656.github.io/others/some/gift/index.html' style='width: 100%;' ></iframe>", {title: "国庆节快乐！"});
		localStorage.setItem("国庆节礼包弹窗-2021-10-01", 1);
	}
}
if (sessionStorage.getItem("update_info_showed") != 1){
	const updateInfo = {
		14: {
			version: "v4.3.2",
			date: "2021.8.29",
			info: "解决了很狗的特性：凉凉一直播放到下一局<br>增加了游戏结束文字和AI聊天功能"
		},
		13: {
			version: "v4.3.2",
			date: "2021.8.27",
			info: "优化了首页启动速度，增大了4D五子棋中W轴灵敏度"
		}
	};
	const updateFunc = function(){
		const latest = Math.max(Object.keys(updateInfo));
		if (plus.runtime.versionCode < latest){
			let text = "";
			for (const [code, value] of Object.entries(updateInfo))
				if (+code > plus.runtime.versionCode)
					text += `==================<br>${value.version}(${code}) ${value.date}<br>${value.info}`;
			layer.confirm(`v${plus.runtime.version}(${plus.runtime.versionCode})->${updateInfo[latest].version}(${latest})<br>${text}`, {
				title:"检测到新版本",
				btn: ["更新（密码wzh）","取消"]
			}, function(index){
				plus.runtime.openURL("https://wwr.lanzoui.com/b02ibn2yb");
				layer.close(index);
			});
		}
		sessionStorage.setItem("update_info_showed", 1);
	}
	if (typeof plus != "undefined"){
		updateFunc();
	}else{
		document.addEventListener("plusready", function(){
			updateFunc();
		}, false);
	}
}
