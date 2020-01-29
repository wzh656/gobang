<?php
header("Content-Type: text/html; charset=UTF-8");
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>文件控制</title>
<script>
function qdq_info(name){
	location.href="file.php?add="+name+"&type=qdq_info";
}
function home(){
	location.href="file.php";
}
function open_dir(add){
	location.href="file.php?add="+add+"&type=open_dir";
}
function read_f(add){
	location.href="file.php?add="+add+"&type=read_f";
}
</script>
</head>
<body>
<h1>文件控制</h1>
<button onclick="home()">返回</button><br>
<?php
$add=$_GET["add"];
$type=$_GET["type"];
if ($add == ""){
	echo "<table border=1>";
	echo "<tr><th>驱动器</th><th>操作</th></tr>";
	echo "<tr><td>C:</td> <td><button onclick='open_dir(\"C:\");'>打开</button><br><button onclick='qdq_info(\"C:\");'>信息</button></td></tr>";
	echo "<tr><td>D:</td> <td><button onclick='open_dir(\"D:\");'>打开</button><br><button onclick='qdq_info(\"D:\");'>信息</button></td></tr>";
	echo "<tr><td>E:</td> <td><button onclick='open_dir(\"E:\");'>打开</button><br><button onclick='qdq_info(\"E:\");'>信息</button></td></tr>";
	echo "<tr><td>F:</td> <td><button onclick='open_dir(\"F:\");'>打开</button><br><button onclick='qdq_info(\"F:\");'>信息</button></td></tr>";
	echo "</table>";
}else if ($type == "qdq_info" & add != ""){
	echo "驱动器",$add,"<br>";
	echo "总容量：",disk_total_space($add),"B=",disk_total_space($add)/1024,"KB=",disk_total_space($add)/1024/1024,"MB=",disk_total_space($add)/1024/1024/1024,"GB","<br>";
	echo "空闲：",disk_free_space($add),"B=",disk_free_space($add)/1024,"KB=",disk_free_space($add)/1024/1024,"MB=",disk_free_space($add)/1024/1024/1024,"GB";
}else if ($type == "open_dir" & add != ""){
	echo "<table border=1>";
	echo "<tr><th>名称</th><th>类型</th><th>操作</th></tr>";
	//首先先读取文件夹
	$temp=scandir($add);
	//遍历文件夹
	foreach($temp as $v){
		$a=$add.'/'.$v;
		if(is_dir($a)){ //如果是文件夹则执行
			if($v=='.' || $v=='..'){ //判断是否为系统隐藏的文件.和..  如果是则跳过否则就继续往下走，防止无限循环再这里。
				continue;
			}
			echo "<tr><td>$v</td> <td>文件夹</td> <td><button onclick='open_dir(\"$a\");'>打开</button></td></tr>";
		}else{
			echo "<tr><td>$v</td> <td>文件</td> <td><button onclick='read_f(\"$a\");'>读取</button></td></tr>";
		}
	}
	echo "</table>";
}else if ($type == "read_f" & add != ""){
	$file = fopen($add,"r") or exit("<h1>无法打开文件！</h1>");
	echo "<hr/>";
	while(!feof($file)){
		echo fgets($file);
	}
	fclose($file);
}
?>
</body>
</html>