<?php 
 header('Content-Type: application/json; charset=UTF-8');


try{
	require_once("connect.php");
	$sql = "select spe_title title,spe_content content,spe_autohr author,spe_autohrImg authorImg,spe_img from spe order by spe_date DESC limit 5";

	$know = $pdo ->prepare($sql);
	$know->execute();
    $know = $know->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($know);


	}catch(PDOException $e){
		 echo $e->getMessage();
	}


 ?>