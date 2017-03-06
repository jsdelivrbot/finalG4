<?php 
 header('Content-Type: application/json; charset=UTF-8');


try{
	require_once("connect.php");
	$sql ="select mem.mem_name, mem.mem_img,pla.pla_title,pla.pla_content
		from mem,pla
		where mem.mem_no=pla.mem_no
		order by pla_collect DESC LIMIT 9";

	$forum = $pdo ->prepare($sql);
	$forum->execute();
    $forum = $forum->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($forum);


}catch(PDOException $e){
	 echo $e->getMessage();
}


 ?>