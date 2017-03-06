<?php
header('Content-Type: application/json; charset=UTF-8');

try{

require_once("connect.php");
$sql="SELECT pho.*,mem.mem_name,mem.mem_img from pho,mem where pho.mem_no = mem.mem_no order by pho_no DESC,pho_date DESC";
$pho = $pdo ->prepare($sql);
$pho->execute();
$phoRow = $pho ->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($phoRow);



}catch(PDOException $e){
    echo $e->getMessage();
}


?>

