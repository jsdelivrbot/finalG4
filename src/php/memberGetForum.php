<?php
header('Content-Type: application/json; charset=UTF-8');

try{

require_once("connect.php");
$sql="SELECT pla.*,mem.*,plaCla_name from plaCla,pla,mem where pla.mem_no = mem.mem_no and mem.mem_no = :mem_no and plaCla.plaCla_no=pla.plaCla_no order by pla_no DESC,pla_date DESC;";
$pla = $pdo ->prepare($sql);
$pla->bindValue(':mem_no',$_POST['memNo']);
$pla->execute();
$plaRow = $pla ->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($plaRow);



}catch(PDOException $e){
    echo $e->getMessage();
}


?>