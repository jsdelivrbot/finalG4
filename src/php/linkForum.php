<?php
header('Content-Type: application/json; charset=UTF-8');


try{

require_once("connect.php");

$sql01 = "UPDATE pla set pla_view=pla_view +1 where pla_no = :pla_no";
$forum01 = $pdo ->prepare($sql01);
$forum01->bindValue(':pla_no',$_GET['pla_no']);
$forum01->execute();

$sql="SELECT * from pla,mem where :pla_no=pla_no and mem.mem_no=pla.mem_no";
$forum = $pdo ->prepare($sql);
$forum->bindValue(':pla_no',$_GET['pla_no']);
$forum->execute();
$forumRow = $forum ->fetch(PDO::FETCH_ASSOC);

echo json_encode($forumRow);






}catch(PDOException $e){
    echo $e->getMessage();
}






 ?>
