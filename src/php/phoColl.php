	<?php 
	header('Content-Type: application/json; charset=UTF-8');
		try{

		require_once("connect.php");

		$sql = "select * from phocol where mem_no = :mem_no and pho_no = :pho_no;";
  		$phocheck = $pdo->prepare($sql);
  		$phocheck->bindValue(':mem_no',$_POST['memNo']);
		$phocheck->bindValue(':pho_no',$_POST['phoNo']);
  		$phocheck -> execute();
		
		if($phocheck->rowCount() > 0){

 	 	echo json_encode(array('msg' => 'fail'));

	}else{

		$sql = "insert into phoCol (phocol_no,mem_no,pho_no) value (null,:mem_no,:pho_no)";
		$phocoll =  $pdo ->prepare($sql);
		$phocoll->bindValue(':mem_no',$_POST['memNo']);
		$phocoll->bindValue(':pho_no',$_POST['phoNo']);
		$phocoll->execute();

  		$sql = "UPDATE pho set pho_collect = pho_collect+1 where pho_no = :pho_no";
  		$pho = $pdo ->prepare($sql);
  		$pho->bindValue(':pho_no',$_POST['phoNo']);
  		$pho->execute();
  		echo json_encode(array('msg' => 'ok'));
	}




		} catch(PDOException $ex){
			echo "資料庫操作失敗,原因：",$ex->getMessage(),"<br>";
			echo "行號：",$ex->getLine(),"<br>";

}

	 ?>