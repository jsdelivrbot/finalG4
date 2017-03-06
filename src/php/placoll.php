<?php 
header('Content-Type: application/json; charset=UTF-8');

try{
	require_once("connect.php");

  $sql = "select * from plaCol where mem_no = :mem_no and :pla_no=pla_no";
  $check=$pdo->prepare($sql);
  $check->bindValue(':mem_no',$_POST['memNo']);
  $check->bindValue(':pla_no',$_POST['plaNo']);
  $check->execute();

  if($check->rowCount() > 0){
  echo json_encode(array('msg' => 'fail'));
}else{

  $sql = "UPDATE pla set pla_collect = pla_collect+1 where pla_no = :pla_no";
  $forum = $pdo ->prepare($sql);
  $forum->bindValue(':pla_no',$_POST['plaNo']);
  $forum->execute();

  $sql = "insert into plaCol (plaCol_no,mem_no,pla_no) value (null,:mem_no,:pla_no)";
  $coll = $pdo->prepare($sql);
  $coll->bindValue(':mem_no',$_POST['memNo']);
  $coll->bindValue(':pla_no',$_POST['plaNo']);
  $coll->execute();

	echo json_encode(array('msg' =>'ok'));
  }
}catch(PDOException $e){
  echo $e->getMessage();
}

 ?>