<?php
header('Content-Type: application/json; charset=UTF-8');

try{

require_once("connect.php");

$sql="DELETE FROM pla WHERE pla_no=:pla_no";
$pla = $pdo ->prepare($sql);
$pla->bindValue(':pla_no',$_POST['pla_no']);
$pla->execute();
// $plaRow = $pla ->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($pla);



}catch(PDOException $e){
    echo $e->getMessage();
}


?>