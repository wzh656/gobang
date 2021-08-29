if (sessionStorage.getItem("version_update_showed") != 1){ //未显示
	const updateInfo = {
		14: {
			version: "v4.4.0",
			date: "2021.8.29",
			info: "解决了很狗的特性：凉凉一直播放到下一局<br>增加了游戏结束字体显示和AI聊天功能<br><br>TapTap上可能暂未更新，因为员工周末休假去了不审核（竟然星期五下午就休假），要星期一才会回来，故想提前更新的可以去蓝奏云"
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
					text += `==================<br>v${value.version}(${code}) ${value.date}<br>${value.info}`;
			layer.confirm(`v${plus.runtime.version}(${plus.runtime.versionCode})->${updateInfo[latest].version}(${latest})<br>${text}`, {
				title:"检测到新版本",
				btn: ["更新（密码wzh）","取消"]
			}, function(index){
				plus.runtime.openURL("https://wwr.lanzoui.com/b02ibn2yb");
				layer.close(index);
			});
		}
		sessionStorage.setItem("version_update_showed", 1);
	}
	if (typeof plus != "undefined"){
		updateFunc();
	}else{
		document.addEventListener("plusready", function(){
			updateFunc();
		}, false);
	}
}
