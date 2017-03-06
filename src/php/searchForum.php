<?php
header('Content-Type: application/json; charset=UTF-8');

try{

require_once("connect.php");

$sql="SELECT pla.*,mem.mem_name name,mem.mem_img mem_img FROM pla,mem where mem.mem_no = pla.mem_no and (pla.pla_title like :keyword or pla.pla_content like :keyword) order by pla.pla_date DESC";


$keyword = "%".$_POST["keyword"]."%";
$forum = $pdo ->prepare($sql);
$forum->bindValue(":keyword",$keyword);
$forum->execute();
$forumRow = $forum ->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($forumRow);

}catch(PDOException $e){
    echo $e->getMessage();
}





 ?>
