<?php
header('Content-Type: application/json; charset=UTF-8');


try{

require_once("connect.php");
$sql="SELECT plaMsg.plaMsg_no,plaMsg.plaMsg_content content,plaMsg.plaMsg_date msgDate,mem.mem_name,mem.mem_img from pla,plaMsg,mem where pla.pla_no=plaMsg.pla_no and mem.mem_no = plaMsg.mem_no and plaMsg.pla_no=:pla_no order by plaMsg.plaMsg_date";
$msg = $pdo ->prepare($sql);
$msg->bindValue(':pla_no',$_GET['pla_no']);
$msg->execute();
$msgRow = $msg ->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($msgRow);

}catch(PDOException $e){
    echo $e->getMessage();
}






 ?>
