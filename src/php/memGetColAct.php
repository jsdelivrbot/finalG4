<?php
header('Content-Type: application/json; charset=UTF-8');

try{

require_once("connect.php");



$sql="select  act.*,actcol.*,actcla.actCla_name,mem.mem_name from actcla,act,actcol,mem where actcol.mem_no = :mem_no and act.act_no = actcol.act_no and actcla.actcla_no = act.actCla_no and mem.mem_no=act.mem_no";

$mem = $pdo ->prepare($sql);
$mem->bindValue(':mem_no',$_POST['memNo']);
$mem->execute();
$memRow = $mem ->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($memRow);



}catch(PDOException $e){
    echo $e->getMessage();
}


?>