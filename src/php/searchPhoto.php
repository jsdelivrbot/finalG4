<?php
header('Content-Type: application/json; charset=UTF-8');

try{

require_once("connect.php");

$sql="SELECT pho.*,mem.mem_name,mem.mem_img FROM pho,mem where mem.mem_no = pho.mem_no and (pho.pho_name like :keyword or pho.pho_info like :keyword or pho.pho_tag like :keyword or pho.pho_place like :keyword) order by pho.pho_date DESC";


$keyword = "%".$_POST["keyword"]."%";
$photo = $pdo ->prepare($sql);
$photo->bindValue(":keyword",$keyword);
$photo->execute();
$photoRow = $photo ->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($photoRow);

}catch(PDOException $e){
    echo $e->getMessage();
}





 ?>