<?php
header('Content-Type: application/json; charset=UTF-8');


try{

require_once("connect.php");
  $sql = "select * from phoRep where mem_no = :mem_no and pho_no = :pho_no;";
  $phocheck = $pdo->prepare($sql);
  $phocheck -> bindValue(":mem_no",$_POST['memNo']);
  $phocheck -> bindValue(":pho_no",$_POST['phoNo']);
  $phocheck -> execute();

if($phocheck->rowCount() > 0){
  echo json_encode(array('msg' => 'fail'));
}else{
  // $sql="SELECT pla_report from pla where :pla_no=pla_no";
  // $forum = $pdo ->prepare($sql);
  // $forum->bindValue(':pla_no',$_POST['plaNo']);
  // $forum->execute();
  // $forumRow = $forum ->fetch(PDO::FETCH_ASSOC);
  

  $sql = "insert into phoRep (phoRep_no,mem_no,pho_no,phoRep_deal,phoRep_delete)
  value (:phoRep_no,:mem_no,:pho_no,:phoRep_deal,:phoRep_delete)";
  $repo = $pdo ->prepare($sql);
  $repo->bindValue(':phoRep_no',null);
  $repo->bindValue(':mem_no',$_POST['memNo']);
  $repo->bindValue(':pho_no',$_POST['phoNo']);
  $repo->bindValue(':phoRep_deal',0);
  $repo->bindValue(':phoRep_delete',0);
  $repo->execute();


 
  $sql = "UPDATE pho set pho_report=  pho_report+1 where pho_no = :pho_no";
  $phoRepo = $pdo ->prepare($sql);
  $phoRepo->bindValue(':pho_no',$_POST['phoNo']);
  $phoRepo->execute();
  echo json_encode(array('msg' => 'ok'));
}


}catch(PDOException $e){
    echo $e->getMessage();
}






 ?>