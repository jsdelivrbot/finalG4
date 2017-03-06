<?php
header('Content-Type: application/json; charset=UTF-8');


try{


require_once("connect.php");
$sql="insert into phoMsg (phoMsg_no,mem_no,pho_no,phoMsg_content,phoMsg_Date) value (:phoMsg_no,:mem_no,:pho_no,:phoMsg_content,:phoMsgDate)";
$msg = $pdo ->prepare($sql);
$msg->bindValue(':phoMsg_no',null);
$msg->bindValue(':mem_no',$_POST['memNo']);
$msg->bindValue(':pho_no',$_POST['phoNo']);
$msg->bindValue(':phoMsg_content',$_POST['content']);
$msg->bindValue(':phoMsgDate',date("Y-m-d"));
$msg->execute();


echo json_encode(array('msg' =>'ok'));

}catch(PDOException $e){
    echo $e->getMessage();
}






 ?>
