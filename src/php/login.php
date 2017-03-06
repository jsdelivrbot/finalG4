<?php
 header('Content-Type: application/json; charset=UTF-8');


if ($_SERVER['REQUEST_METHOD'] == "GET") {
    search();
} else if ($_SERVER['REQUEST_METHOD'] == "POST") {
    create();
}



function search(){
	try{
		require_once("connect.php");
		$sql = "select * from mem where mem_email = :mem_email and mem_psw = :mem_psw;";
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


function create(){
	try{
		require_once("connect.php");
		$sql01 = "select * from mem where mem_email = :mem_email or mem_name = :mem_name;";
		$memCheck = $pdo->prepare($sql01);
		$memCheck -> bindValue(":mem_email",$_POST['memEmail']);
		$memCheck -> bindValue(":mem_name",$_POST['memName']);
		$memCheck -> execute();

		 if(!isset($_POST['memEmail']) ||
		 	empty($_POST['memEmail']) ||
            empty($_POST['memPsw']) ||
        	!isset($_POST['memName']) ||
        	empty($_POST['memName'])||
        	$memCheck->rowCount() > 0) {
        echo json_encode(array('msg' => 'fail'));
        return;

    	}else{

    		$sql02="insert into mem (mem_no,mem_class,mem_email,mem_psw,mem_name,mem_img,mem_date,mem_art,mem_pho,mem_msg,mem_join,mem_hold,mem_close)
        	value(:mem_no,:mem_class,:mem_email,:mem_psw,:mem_name,:mem_img,:mem_date,:mem_art,:mem_pho,:mem_msg,:mem_join,:mem_hold,:mem_close);";
			$member = $pdo->prepare($sql02);
    		$member->bindValue(":mem_no",null);
    		$member->bindValue(":mem_class","一般會員");
			$member->bindValue(":mem_email",$_POST['memEmail']);
			$member->bindValue(":mem_psw",$_POST['memPsw']);
			$member->bindValue(":mem_name",$_POST['memName']);
			$member->bindValue(":mem_img","img/memDefault.png");
			$member->bindValue(":mem_date",date("Y-m-d"));
			$member->bindValue(":mem_art",0);
			$member->bindValue(":mem_pho",0);
			$member->bindValue(":mem_msg",0);
			$member->bindValue(":mem_join",0);
			$member->bindValue(":mem_hold",0);
			$member->bindValue(":mem_close",0);
			$member->execute();

      $sql03 = "select * from mem where mem_email = :mem_email and mem_psw = :mem_psw;";
  		$member2 = $pdo->prepare($sql03);
      $member2->bindValue(":mem_email",$_POST['memEmail']);
			$member2->bindValue(":mem_psw",$_POST['memPsw']);
  		$member2 -> execute();
      $memRow = $member2->fetch(PDO::FETCH_ASSOC);
			echo json_encode($memRow);


    	}
	}catch(PDOException $e){
	  echo $e->getMessage();
	}
}

?>
