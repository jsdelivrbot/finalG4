<?php
header('Content-Type: application/json; charset=UTF-8');

try{

require_once("connect.php");
$sql="SELECT pla.*,mem.mem_name name,mem.mem_img mem_img FROM pla,mem where mem.mem_no = pla.mem_no order by pla.pla_date DESC";
$forum = $pdo ->prepare($sql);
$forum->execute();
$forumRow = $forum ->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($forumRow);

}catch(PDOException $e){
    echo $e->getMessage();
}





 ?>
