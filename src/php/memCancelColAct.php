<?php
header('Content-Type: application/json; charset=UTF-8');

try{

require_once("connect.php");

$sql="DELETE FROM actcol WHERE act_no=:act_no and mem_no = :mem_no";
$act = $pdo ->prepare($sql);
$act->bindValue(':act_no',$_POST['actNo']);
$act->bindValue(':mem_no',$_POST['memNo']);
$act->execute();
// $actRow = $act ->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($act);



}catch(PDOException $e){
    echo $e->getMessage();
}

