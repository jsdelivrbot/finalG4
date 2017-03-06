<?php
header('Content-Type: application/json; charset=UTF-8');


try{


require_once("connect.php");
$sql="insert into plaMsg (plaMsg_no,mem_no,pla_no,plaMsg_content,plaMsg_date) value (:plaMsg_no,:mem_no,:pla_no,:plaMsg_content,:plaMsg_date)";
$msg = $pdo ->prepare($sql);
$msg->bindValue(':plaMsg_no',null);
$msg->bindValue(':mem_no',$_POST['memNo']);
$msg->bindValue(':pla_no',$_POST['plaNo']);
$msg->bindValue(':plaMsg_content',nl2br($_POST['msgContent']));
$msg->bindValue(':plaMsg_date',date("Y-m-d h:i"));
$msg->execute();

$sql1="SELECT plaMsg.plaMsg_no,plaMsg.plaMsg_content content,plaMsg.plaMsg_date msgDate,mem.mem_name,mem.mem_img from pla,plaMsg,mem where pla.pla_no=plaMsg.pla_no and mem.mem_no = :mem_no and  plaMsg.plaMsg_content=:plaMsg_content order by plaMsg.plaMsg_date";
$msg1 = $pdo ->prepare($sql1);
$msg1->bindValue(':mem_no',$_POST['memNo']);
// $msg1->bindValue(':pla_no',$_POST['plaNo']);
$msg1->bindValue(':plaMsg_content',nl2br($_POST['msgContent']));
$msg1->execute();
$msgRow = $msg1 ->fetch(PDO::FETCH_ASSOC);


$sql2="UPDATE pla set pla_msg = pla_msg+1 where pla_no = :pla_no";
$msg2 = $pdo ->prepare($sql2);
$msg2->bindValue(':pla_no',$_POST['plaNo']);
$msg2->execute();


echo json_encode($msgRow );

}catch(PDOException $e){
    echo $e->getMessage();
}






 ?>
