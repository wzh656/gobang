const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require("fs");

var usocket = new Array;
console.log(__dirname);

app.get('*', function(req, res){
	if (req.url == '/'){
		res.sendFile(__dirname + '\\index.html');
	}else{
		res.sendFile(__dirname + '\\' + req.url);
	}
});

io.on('connection', function(socket){
	//console.log('连接成功');
	
	socket.on("disconnect",function(){
		//console.log("连接中断");
	});
	
	socket.on("test",function(id){
		console.log('test:'+id);
		io.emit("test",id);
	});
});

http.listen(6060, "192.168.31.89", function() {
	console.log('listening on 192.168.31.89:6060');
});

