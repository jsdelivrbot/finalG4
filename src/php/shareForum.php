<?php 
header('Content-Type: application/json; charset=UTF-8');

try{
	require_once("connect.php");


  $sql = "UPDATE pla set pla_share = pla_share+1 where pla_no = :pla_no";
  $forum = $pdo ->prepare($sql);
  $forum->bindValue(':pla_no',$_POST['plaNo']);
  $forum->execute();


	echo json_encode(array('msg' =>'ok'));

}catch(PDOException $e){
  echo $e->getMessage();
}

 ?>