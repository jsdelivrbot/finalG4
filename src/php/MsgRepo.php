<?php
header('Content-Type: application/json; charset=UTF-8');


try{

require_once("connect.php");
  $sql = "select * from plaMsgRep where mem_no = :mem_no and plaMsg_no = :plaMsg_no;";
  $memCheck = $pdo->prepare($sql);
  $memCheck -> bindValue(":mem_no",$_POST['memNo']);
  $memCheck -> bindValue(":plaMsg_no",$_POST['plaMsgNo']);
  $memCheck -> execute();

if($memCheck->rowCount() > 0){
  echo json_encode(array('msg' => 'fail'));
}else{
  // $sql="SELECT pla_report from pla where :pla_no=pla_no";
  // $forum = $pdo ->prepare($sql);
  // $forum->bindValue(':pla_no',$_POST['plaNo']);
  // $forum->execute();
  // $forumRow = $forum ->fetch(PDO::FETCH_ASSOC);
  

   $sql = "insert into plaMsgRep (plaMsgRep_no,mem_no,plaMsg_no,plaMsgRep_deal,plaMsgRep_delete,plaMsg_repo)
  values (:plaMsgRep_no,:mem_no,:plaMsg_no,:plaMsgRep_deal,:plaMsgRep_delete,:plaMsg_repo)";
  $repo = $pdo ->prepare($sql);
  $repo->bindValue(':plaMsgRep_no',null);
  $repo->bindValue(':mem_no',$_POST['memNo']);
  $repo->bindValue(':plaMsg_no',$_POST['plaMsgNo']);
  $repo->bindValue(':plaMsg_repo',0);
  $repo->bindValue(':plaMsgRep_deal',0);
  $repo->bindValue(':plaMsgRep_delete',0);
  $repo->execute();


 
  $sql = "UPDATE plaMsgRep set plaMsg_repo= plaMsg_repo+1 where plaMsg_no = :plaMsg_no";
  $msgRepo = $pdo ->prepare($sql);
  $msgRepo->bindValue(':plaMsg_no',$_POST['plaMsgNo']);
  $msgRepo->execute();
  echo json_encode('ok');
}


}catch(PDOException $e){
    echo $e->getMessage();
}






 ?>
