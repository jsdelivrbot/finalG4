<?php 
 header('Content-Type: application/json; charset=UTF-8');


try{
	require_once("connect.php");
	$sql = "SELECT mem.mem_no,mem.mem_name,pho.pho_name,mem.mem_img,pho_collect,pho.pho_path from mem,pho where mem.mem_no=pho.mem_no order by pho_collect DESC LIMIT 8";

	$photo = $pdo ->prepare($sql);
	$photo->execute();
    $photo = $photo->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($photo);


}catch(PDOException $e){
	 echo $e->getMessage();
}


 ?>