<?php 
 header('Content-Type: application/json; charset=UTF-8');


try{
	require_once("connect.php");
	$sql = "SELECT act.act_name,act.act_img,year(act.act_startDate) startY,MONTH(act.act_startDate) startM,DAY(act.act_startDate) startD,year(act.act_endDate) endY,MONTH(act.act_endDate) endM,DAY(act.act_endDate) endD,actCla.actCla_name,act.act_place,act.act_info FROM actCla,act order by act_collect DESC limit 5";

	$activity = $pdo ->prepare($sql);
	$activity->execute();
    $activity = $activity->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($activity);


}catch(PDOException $e){
	 echo $e->getMessage();
}


 ?>