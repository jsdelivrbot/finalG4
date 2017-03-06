<?php
header('Content-Type: application/json; charset=UTF-8');

try{

require_once("connect.php");
$sql="SELECT pho.* from pho,mem where pho.mem_no = mem.mem_no and mem.mem_no = :mem_no order by pho_no DESC ,pho_date DESC";
$pho = $pdo ->prepare($sql);
$pho->bindValue(':mem_no',$_POST['memNo']);
$pho->execute();
$phoRow = $pho ->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($phoRow);



}catch(PDOException $e){
    echo $e->getMessage();
}


?>