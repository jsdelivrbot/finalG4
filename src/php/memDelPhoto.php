<?php
header('Content-Type: application/json; charset=UTF-8');

try{

require_once("connect.php");

$sql="DELETE FROM pho WHERE pho_no=:pho_no";
$pho = $pdo ->prepare($sql);
$pho->bindValue(':pho_no',$_POST['pho_no']);
$pho->execute();
// $phoRow = $pho ->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($pho);



}catch(PDOException $e){
    echo $e->getMessage();
}


?>