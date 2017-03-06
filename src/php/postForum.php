<?php
 header('Content-Type: application/json; charset=UTF-8');
try{
	require_once("connect.php");
  $sql="insert into pla (pla_no,plaCla_no,pla_title,pla_content,mem_no,pla_date,pla_share,pla_collect,pla_report,pla_view,pla_msg) value (:pla_no,:plaCla_no,:pla_title,:pla_content,:mem_no,:pla_date,:pla_share,:pla_collect,:pla_report,:pla_view,:pla_msg)";

	$forum = $pdo->prepare($sql);
	$forum -> bindValue(":pla_no",null);
	$forum -> bindValue(":plaCla_no",$_POST["forumType"]);
  $forum -> bindValue(":pla_title",$_POST['forumTitle']);
	$forum -> bindValue(":pla_content",$_POST["forumContent"]);
  $forum -> bindValue(":mem_no",$_POST["memNo"]);
	$forum -> bindValue(":pla_date",date("Y-m-d"));
  $forum -> bindValue(":pla_share",0);
	$forum -> bindValue(":pla_collect",0);
  $forum -> bindValue(":pla_report",0);
	$forum -> bindValue(":pla_view",0);
  $forum -> bindValue(":pla_msg",0);
	$forum -> execute();


    $sql02 = "select * from pla where :pla_title = pla_title and :pla_content = pla_content";
    $forum2 = $pdo->prepare($sql02);
    $forum2 -> bindValue(":pla_title",$_POST['forumTitle']);
  	$forum2 -> bindValue(":pla_content",$_POST["forumContent"]);
    $forum2 -> execute();
    $forumRow = $forum2 ->fetch(PDO::FETCH_ASSOC);

    echo json_encode($forumRow);

}catch(PDOException $e){
  echo $e->getMessage();
}

 ?>
