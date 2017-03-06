<?php 
		try{

		  require_once("connect.php");

  		$sql = "select mem.mem_name,mem.mem_img,phoMsg.* from pho,phoMsg,mem where mem.mem_no = phoMsg.mem_no and pho.pho_no=phoMsg.pho_no and phoMsg.pho_no=:pho_no";
  		$pho = $pdo->prepare($sql);
      $pho->bindValue(':pho_no',$_GET['phoNo']);
  		$pho -> execute();
  		$phoRow= $pho -> fetchAll();

      echo json_encode($phoRow);

		} catch(PDOException $ex){
			echo "資料庫操作失敗,原因：",$ex->getMessage(),"<br>";
			echo "行號：",$ex->getLine(),"<br>";

}

	 ?>