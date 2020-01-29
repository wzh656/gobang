<!DOCTYPE html>
<%@ LANGUAGE ="VBScript" CodePage="65001"%>
<%
Session.CodePage="65001"
Response.Charset="UTF-8"
%>
<html>
<head>
<meta charset="UTF-8">
<title>文件控制</title>
</head>
<body>
<h1>文件控制</h1>
<p id="address"></p>
<table border="1">
<%
dim address,mode,name,fs,d,fo,x,i,free,all,data,ps
address=Request.QueryString("address")
mode=Request.QueryString("mode")
name=Request.QueryString("name")
if address="" then '初始化
	Response.Write("<tr><th>驱动器 </th><th>操作</th></tr>")
	Response.Write("<tr><td>C:</td><td><button onclick='open_c();'>打开</button><br/><button onclick='message_c();'>信息</button></td></tr>")
	Response.Write("<tr><td>D:</td><td><button onclick='open_d();'>打开</button><br/><button onclick='message_d();'>信息</button></td></tr>")
	Response.Write("<tr><td>E:</td><td><button onclick='open_e();'>打开</button><br/><button onclick='message_e();'>信息</button></td></tr>")
	Response.Write("<tr><td>F:</td><td><button onclick='open_f();'>打开</button><br/><button onclick='message_f();'>信息</button></td></tr>")
else
	if mode="message_drive" then '驱动器信息
		set fs=Server.CreateObject("Scripting.FileSystemObject")
		set d=fs.GetDrive(address)
		free = d.FreeSpace
		all = d.TotalSize
		set d=nothing
		set fs=nothing
		Response.Write("<button onclick='back();'>返回</button>")
		Response.Write("<h1>" & address & "</h1>")
		Response.Write("<br/>余剩空间:" & free & "B=" & free/1024 & "KB=" & free/1024/1024 & "MB=" & free/1024/1024/1024 & "GB")
		Response.Write("<br/>总空间:" & all & "B=" & all/1024 & "KB=" & all/1024/1024 & "MB=" & all/1024/1024/1024 & "GB")
		Response.Write("<br/>空闲:" & free/all*100 & "%")
	elseif mode="dir" then '文件夹
		if name="" then '已处理
			Response.Write("<button onclick='back();'>退出</button>")
			Response.Write("<tr><th>名称</th><th>类型</th><th>操作</th></tr>")
			set fs=Server.CreateObject("Scripting.FileSystemObject")
			set fo=fs.GetFolder(address)
			
			i=0
			for each x in fo.SubFolders
				Response.Write("<tr><td>" & x.Name & "</td><td>文件夹</td><td><button onclick='open_dir(" & i & ");'>打开</button></td></tr>")
				i=i+1
			next
			
			i=0
			for each x in fo.files
				Response.Write("<tr><td>" & x.Name & "</td><td>文件</td><td><button onclick='open_txt(" & i & ");'>以文本<br/>格式打开</button><br/><button onclick='open_html(" & i & ");'>以网页<br/>格式打开</button></td></tr>")
				i=i+1
			next
			
			set fo=nothing
			set fs=nothing
		else '未处理
			set fs=Server.CreateObject("Scripting.FileSystemObject")
			set fo=fs.GetFolder(address)
			
			i=0
			for each x in fo.SubFolders
				if i=CInt(name) then
					address=x & "\"
					Response.Redirect("file.asp?address=" & address & "&mode=dir")
					exit for
				end if
				i=i+1
			next
			
			set fs=nothing
			set fo=nothing
		end if
	elseif mode="open_txt" then '打开文本文件
		if name="" then '已处理
			Response.Write("<button onclick='back();'>退出</button>")
			Response.Write("<h1>文件内容:</h1>")
			Response.Write("<textarea rows=30 cols=60>")
			set fs=Server.CreateObject("Scripting.FileSystemObject")
			set f=fs.OpenTextFile(address, 1 ,true)
			x=f.ReadAll
			Response.Write(x)
			
			f.Close
			set f=nothing
			set fs=nothing
			Response.Write("</textarea>")
		else '未处理
			set fs=Server.CreateObject("Scripting.FileSystemObject")
			set fo=fs.GetFolder(address)
			
			i=0
			for each x in fo.files
				if i=CInt(name) then
					address=x
					Response.Redirect("file.asp?address=" & address & "&mode=open_txt")
					exit for
				end if
				i=i+1
			next
			
			set fs=nothing
			set fo=nothing
		end if
	elseif mode="open_html" then
		if name="" then '已处理
			Response.Write("<button onclick='back();'>退出</button>")
			Response.Write("<h1>文件内容:</h1>")
			Response.Write("<div style='border:2px solid black;'>")
			set fs=Server.CreateObject("Scripting.FileSystemObject")
			set f=fs.OpenTextFile(address, 1)
			
			do while f.AtEndOfStream = false
				Response.Write(f.ReadLine)
			loop
			
			f.Close
			set f=nothing
			set fs=nothing
			Response.Write("</div>")
		else '未处理
			set fs=Server.CreateObject("Scripting.FileSystemObject")
			set fo=fs.GetFolder(address)
			
			i=0
			for each x in fo.files
				if i=CInt(name) then
					address=x
					Response.Redirect("file.asp?address=" & address & "&mode=open_html")
					exit for
				end if
				i=i+1
			next
			
			set fs=nothing
			set fo=nothing
		end if
	end if
end if
%>
</table>

<script>
{
	var message="hello";
	var i=0;
	var j=1;
	var fx="1"; //方向
	setInterval(function(){
		document.title=String(message).substring(0,i)+"_";
		if (i < 0){
			if (j == 1){
				message="welcome";
				j++;
			}else if (j == 2){
				message="to 192.168.31.89电脑";
				j++;
			}else if (j == 3){
				message="这标题炫吧";
				j++;
			}else if (j == 4){
				j=1;
				message="hello";
			}
			fx*=(-1);
			i=Number(i)+Number(fx);
		}else if (i < message.length){
			i=Number(i)+Number(fx);
		}else{
			fx*=(-1);
			i=Number(i)+Number(fx);
		}
	},300); 
}

function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

function open_c(){
	location.href="file.asp?address=c:\\&mode=dir";
}
function message_c(){
	location.href="file.asp?address=c:\&mode=message_drive";
}

function open_d(){
	location.href="file.asp?address=d:\\&mode=dir";
}
function message_d(){
	location.href="file.asp?address=d:\&mode=message_drive";
}

function open_e(){
	location.href="file.asp?address=e:\\&mode=dir";
}
function message_e(){
	location.href="file.asp?address=e:\&mode=message_drive";
}

function open_f(){
	location.href="file.asp?address=f:\\&mode=dir";
}
function message_f(){
	location.href="file.asp?address=f:\&mode=message_drive";
}

function back(){
	location.href="file.asp";
}

function open_txt(name){ //以文本格式打开文件
	location.href="file.asp?address="+GetQueryString("address")+"&name="+name+"&mode=open_txt";
}

function open_html(name){ //以网页格式打开文件
	location.href="file.asp?address="+GetQueryString("address")+"&name="+name+"&mode=open_html";
}

function open_dir(name){ //打开文件夹
	location.href="file.asp?address="+GetQueryString("address")+"&name="+name+"&mode=dir";
}

document.getElementById("address").innerHTML=GetQueryString("address");
</script>
</body>
</html>