<?php
header('Content-Type: application/json; charset=UTF-8');

try{

require_once("connect.php");

$sql="SELECT * from mem where mem_no = :mem_no";
$mem = $pdo ->prepare($sql);
$mem->bindValue(':mem_no',$_POST['memNo']);
$mem->execute();
$memRow = $mem ->fetch(PDO::FETCH_ASSOC);


echo json_encode($memRow);



}catch(PDOException $e){
    echo $e->getMessage();
}


?>