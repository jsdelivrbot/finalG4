<?php
 header('Content-Type: application/json; charset=UTF-8');


if (isset($_REQUEST["act_str1"])) {
    choose();
}else{
	echo "查無資料";
}



function choose(){
	try{
		require_once("connect.php");
		for($i=0;$i<=)
		$str = '%'.$_REQUEST["act_str1"].'%';
		$sql = "select * from act where act_name like ";
		$member = $pdo->prepare($sql);
		$member -> bindValue(":mem_email",$_GET['memEmail']);
		$member -> bindValue(":mem_psw",$_GET["memPsw"]);
		$member -> execute();

				  if( $member->rowCount() == 0 ){
				    echo json_encode(array('msg' => 'fail'));
				  }else{
				    $memRow = $member->fetch(PDO::FETCH_ASSOC);
				    echo json_encode($memRow);
				  }
	}catch(PDOException $e){
	  echo $e->getMessage();
	}
}


?>
