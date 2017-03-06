<?php
header('Content-Type: application/json; charset=UTF-8');

try{

require_once("connect.php");


$sql = "SELECT act.*,actcla.actcla_name FROM act,actcla where  act.mem_no = :mem_no and actCla.actCla_no = act.actCla_no order by act.act_startDate";

$act= $pdo ->prepare($sql);
$act->bindValue(':mem_no',$_POST['memNo']);
$act->execute();
$actRow = $act->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($actRow);



}catch(PDOException $e){
    echo $e->getMessage();
}

