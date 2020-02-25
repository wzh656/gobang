const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require("fs");

var usocket = new Array;
console.log(__dirname);

app.get('/', function(req, res){
	res.sendFile(__dirname + './index.html');
});

io.on('connection', function(socket){
	console.log('连接成功');
	
	socket.on("disconnect",function(){
		console.log("连接中断");
	});
	
	socket.on("sign_in",function(name,password){ //登录
		var user=fs.readFileSync('./data/user.txt', 'UTF-8').split('\n');
		for (var i in user){
			if (user[i].split(' ')[0] == name & user[i].split(' ')[0] == password){
				io.emit('sign_in',true);
				return;
			}
		}
		io.emit('sign',false);
	});
	socket.on("sign_up",function(name,password){ //注册
		var user=fs.readFileSync('./data/user.txt', 'UTF-8').split('\n');
		for (var i in user){
			if (user[i].split(' ')[0] == name){
				io.emit('sign_up',false);
				return;
			}
		}
		user.push(name+' '+password);
		fs.writeFileSync('./data/user.txt', user.join('\n'), (err) => {
			io.emit('sign_up',err);
		});
		io.emit('sign_up',true);
	});
});

http.listen(6060, "192.168.31.89", function() {
	console.log('listening on 192.168.31.89:6060');
});
