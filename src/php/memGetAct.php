<?php
header('Content-Type: application/json; charset=UTF-8');

try{

require_once("connect.php");



$sql="select * from mem,actJoin join act on actJoin.act_no=act.act_no where act.mem_no=any(select mem_no from mem where act.mem_no=mem.mem_no) group by actJoin.mem_no,act.act_no,mem.mem_no having actJoin.mem_no=:mem_no and actJoin.act_no=act.act_no and mem.mem_no=act.mem_no";

$mem = $pdo ->prepare($sql);
$mem->bindValue(':mem_no',$_POST['memNo']);
$mem->execute();
$memRow = $mem ->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($memRow);



}catch(PDOException $e){
    echo $e->getMessage();
}


?>