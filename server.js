const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require("fs");

var user = new Array;
var user_num = 0;

var player = [null, null];
console.log(__dirname);

app.get('*', function (req, res){
	if (req.url == '/'){
		res.sendFile(__dirname + '\\index.html');
	}else{
		res.sendFile(__dirname + '\\' + req.url.split('?')[0]);
	}
});

io.on('connection', function (socket){
	console.log('+连接成功+', socket.id);
	
	user_num++;
	if (io.sockets.connected[socket.id]){
		io.sockets.connected[socket.id].emit('id',socket.id); //发送用户ID
		
		add(socket.id); //添加用户
		console.log("用户列表：", user);
		console.log("玩家：", player);
	}
	
	socket.on('disconnect', function (socket){
		console.log('-连接中断-', socket);
		
		if (user_num == 0){
			user = new Array;
			player = [null, null];
		}else{
			user_num--;
		}
	});
	
	socket.on('exit', function (id){ //用户退出
		console.log('用户退出', id);
		
		exit(id); //删除用户
		console.log("用户列表：", user);
		console.log("玩家：", player);
	});

	socket.on('rename', function (id, name){
		console.log("重命名", id, name);
		
		if (user.indexOf(id) != -1){
			user[user.indexOf(id)] = name;
		}
		if (player[0] == id){
			player[0] = name;
		}else if (player[1] == id){
			player[1] = name;
		}
		
		setTimeout(function(){
			io.emit('player', player);
		},200);
		
		console.log("用户列表：", user);
		console.log("玩家：", player);
	});
	
});

setInterval(function (){
	if (user_num == 0){ //校正用户数量
		user = new Array;
		player = [null, null];
	}
},1000);

function add(id){
	user.push(id);
	
	if (player[0] == null & player[1] == null){
		player[(Math.random()<0.5?0:1)] = id;
	}else if (player[0] == null){
		player[0] = id;
	}else if (player[1] == null){
		player[1] = id;
	}
	
	setTimeout(function(){
		io.emit('player', player);
	},200);
}
function exit(id){
	if (user.indexOf(id) != -1){
		user.splice(user.indexOf(id), 1);
	}
	if (player[0] == id){
		player[0] = null;
	}else if (player[1] == id){
		player[1] = null;
	} 
	
	setTimeout(function(){
		io.emit('player', player);
	},200);
}

http.listen(60, "192.168.31.89", function() {
	console.log('服务器搭建成功，端口:60');
});
