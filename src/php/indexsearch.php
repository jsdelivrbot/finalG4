<?php
header('Content-Type: application/json; charset=UTF-8');

try{

require_once("connect.php");
$sql="SELECT DISTINCT SUBSTRING(act_place, 1, 5) place FROM act order by act_collect DESC limit 4";
$act = $pdo ->prepare($sql);
$act->execute();
$actRow = $act ->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($actRow);

}catch(PDOException $e){
    echo $e->getMessage();
}



?>
