<?php
header('Content-Type: application/json; charset=UTF-8');

try{

require_once("connect.php");

$sql="SELECT placol.placol_no,pla.pla_no,mem.mem_no,mem.mem_name,placol.mem_no,placla.plaCla_name,mem.mem_img,pla.pla_title,pla.pla_date FROM placol,pla,mem,placla where  pla.plaCla_no = placla.plaCla_no and placol.mem_no = :mem_no =mem.mem_no  and  pla.pla_no = plaCol.pla_no;";
$pla = $pdo ->prepare($sql);
$pla->bindValue(':mem_no',$_POST['memNo']);
$pla->execute();
$plaRow = $pla ->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($plaRow);



}catch(PDOException $e){
    echo $e->getMessage();
}


?>