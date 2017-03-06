<?php
header('Content-Type: application/json; charset=UTF-8');


try{

require_once("connect.php");
  $sql = "select * from plaRep where mem_no = :mem_no and pla_no = :pla_no;";
  $memCheck = $pdo->prepare($sql);
  $memCheck -> bindValue(":mem_no",$_POST['memNo']);
  $memCheck -> bindValue(":pla_no",$_POST['plaNo']);
  $memCheck -> execute();

if($memCheck->rowCount() > 0){
  echo json_encode(array('msg' => 'fail'));
}else{
  // $sql="SELECT pla_report from pla where :pla_no=pla_no";
  // $forum = $pdo ->prepare($sql);
  // $forum->bindValue(':pla_no',$_POST['plaNo']);
  // $forum->execute();
  // $forumRow = $forum ->fetch(PDO::FETCH_ASSOC);
  

  $sql = "UPDATE pla set pla_report = pla_report+1 where pla_no = :pla_no";
  $forum2 = $pdo ->prepare($sql);
  $forum2->bindValue(':pla_no',$_POST['plaNo']);
  $forum2->execute();


  $sql = "insert into plaRep (plaRep_no,mem_no,pla_no,plaRep_deal,plaRep_delete)
  values (:plaRep_no,:mem_no,:pla_no,:plaRep_deal,:plaRep_delete)";
  $repo = $pdo ->prepare($sql);
  $repo->bindValue(':plaRep_no',null);
  $repo->bindValue(':mem_no',$_POST['memNo']);
  $repo->bindValue(':pla_no',$_POST['plaNo']);
  $repo->bindValue(':plaRep_deal',0);
  $repo->bindValue(':plaRep_delete',0);
  $repo->execute();

  echo json_encode('ok');
}


}catch(PDOException $e){
    echo $e->getMessage();
}






 ?>
