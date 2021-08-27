if (location.pathname.indexOf("index.html") != -1){ //仅主页
	const updateInfo = {
		13: {
			version: "v4.3.2",
			date: "2021.8.27",
			info: "优化了首页启动速度，增大了4D五子棋中W轴灵敏度"
		}
	};
	const updateFunc = function(){
		const latest = Math.max(Object.keys(updateInfo));
		if (plus.runtime.versionCode < latest){
			const text = "";
			for (const [code, value] of Object.entries(updateInfo))
				if (+code > plus.runtime.versionCode)
					text += `==================<br>v${value.version}(${code}) ${value.date}<br>${value.info}`;
			layer.confirm(`v${plus.runtime.version}(${plus.runtime.versionCode})->v${updateInfo[latest].version}(${latest})<br>${text}`, {
				title:"检测到新版本",
				btn: ["更新（密码wzh）","取消"]
			}, function(index){
				plus.runtime.openURL("https://wwr.lanzoui.com/b02ibn2yb");
				layer.close(index);
			});
		}
	}
	if (typeof plus != "undefined"){
		updateFunc();
	}else{
		document.addEventListener("plusready", function(){
			updateFunc();
		}, false);
	}
}
