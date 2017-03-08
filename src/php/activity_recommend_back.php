<?php


if (isset($_REQUEST["act_str2"])) {
    choose();
}else if(isset($_REQUEST["act_Mstr2"])){
	choose2();
}else if(isset($_REQUEST["recM"])){
	choose3();
}
else{
	echo "查無資料";
}

function choose3(){
	try{
		require_once("connect.php");
		$sql = "select * from act where act_name='".$_REQUEST["recM"]."'";
		$rec = $pdo->prepare($sql);
		$rec->execute();
	  if( $rec->rowCount() == 0 ){
	    echo json_encode(array('choose' => 'fail'));
	  }else{
	  	while($recRow = $rec->fetch(PDO::FETCH_ASSOC)){
	  		$recArray[]=$recRow;
	  	}
	     echo json_encode($recArray); 
	  }
	}catch(PDOException $e){
	  echo $e->getMessage();
	}	
}
function choose2(){
	$str1 = '%'.$_REQUEST["act_Mstr1"].'%';
	$str2 = '%'.$_REQUEST["act_Mstr2"].'%';
	// $put = array("str1"=>$str1);
	// echo json_encode($put);

	try{
		require_once("connect.php");
		$sql = "select * from act join actCla using(actCla_no) 
		where act_info like '".$str1."' or act_info like '".$str2."' or act_name like '".$str1."' or act_name like '".$str2."' or actCla_name='".$_REQUEST["act_Mstr3"]."' order by act_collect desc limit 1";
		$rec = $pdo->prepare($sql);
		$rec->execute();
	  if( $rec->rowCount() == 0 ){
	    echo json_encode(array('choose' => 'fail'));
	  }else{
	  	while($recRow = $rec->fetch(PDO::FETCH_ASSOC)){
	  		$recArray[]=$recRow;
	  	}
	     echo json_encode($recArray); 
	  }
	}catch(PDOException $e){
	  echo $e->getMessage();
	}	
}
function choose(){
	// $msg1=explode(",",$_REQUEST["act_str1"]);
	// $msg2=explode(",",$_REQUEST["act_str2"]);
	// $msg3=explode(",",$_REQUEST["act_str3"]);
	// $str1="";
	// for($i=0;$i<count($msg1);$i++){
	// 	$str1.='(act_info like '."'%".$msg1[$i]."%')". ' or ';
	// }

	// $str1=substr($str1,0,-3);
	$str1 = '%'.$_REQUEST["act_str1"].'%';
	$str2 = '%'.$_REQUEST["act_str2"].'%';
	// $put = array("str1"=>$str1);
	// echo json_encode($put);

	try{
		require_once("connect.php");
		$sql = "select * from act join actCla using(actCla_no) 
		where act_info like '".$str1."' or act_info like '".$str2."' or act_name like '".$str1."' or act_name like '".$str2."' or actCla_name='".$_REQUEST["act_str3"]."' order by act_collect desc limit 4";
		$rec = $pdo->prepare($sql);
		$rec->execute();
	  if( $rec->rowCount() == 0 ){
	    echo json_encode(array('choose' => 'fail'));
	  }else{
	  	while($recRow = $rec->fetch(PDO::FETCH_ASSOC)){
	  		$recArray[]=$recRow;
	  	}
	     echo json_encode($recArray); 
	  }
	}catch(PDOException $e){
	  echo $e->getMessage();
	}
}


?>
