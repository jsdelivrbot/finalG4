<?php
header('Content-Type: application/json; charset=UTF-8');


switch( $_FILES["YouFile"]["error"]){
	case 0:

		$from = $_FILES["YouFile"]["tmp_name"];

		if( file_exists("../upload")==false){ 
	        mkdir("../upload");
		}
      
        $fileName = $_FILES["YouFile"]["name"];

       
		$to = "../upload/". mb_convert_encoding($fileName,"UTF-8");
		
		if(copy( $from, $to) ){
			echo "上傳成功";
		}else{
			echo "error";
		}
		break;
	case 1:
	    echo "檔案不得超過", ini_get("upload_max_filesize");
		break;
	case 2:
		echo "檔案不得超過", $_REQUEST["MAX_FILE_SIZE"];
		break;
	case 3:
		echo "上傳檔案不完整";
		break;
	case 4:
	    echo "檔案没送<br>";
	     break;
	default : 
	    echo "錯誤代碼:" , $_FILES["YouFile"]["error"],"請通知系統人員<br>";
	     break;

}






try{

require_once("connect.php");
// $sql="insert into pho (pho_no,pho_name,mem_no,pho_info,pho_date,pho_path,pho_share,pho_collect,pho_report,pho_view,pho_loc,pho_tag) value
// (:pho_no,:pho_name,:mem_no,:pho_info,:pho_date,:pho_path,:pho_share,:pho_collect,:pho_report,:pho_view,:pho_loc,:pho_tag)";



$fileName = $_FILES["YouFile"]["name"];
$path = "upload/". mb_convert_encoding($fileName,"UTF-8");


// $sql = "insert into pho (pho_no,pho_name,mem_no,pho_info,pho_date,pho_path,pho_share,pho_collect,pho_report,pho_view,pho_loc,pho_tag) value (:pho_no,:pho_name,:mem_no,:pho_info,:pho_date,:pho_path,:pho_share,:pho_collect,:pho_report,:pho_view,:pho_loc,:pho_tag)";
$sql = "insert into pho (pho_no,pho_name,mem_no,pho_info,pho_date,pho_path,pho_share,pho_collect,pho_report,pho_view,pho_place,pho_tag) value (:pho_no,:pho_name,:mem_no,:pho_info,:pho_date,:pho_path,:pho_share,:pho_collect,:pho_report,:pho_view,:pho_place,:pho_tag)";


$pho = $pdo->prepare($sql);
$pho->bindValue(':pho_no',null);
$pho->bindValue(':pho_name',$_POST['photoName']);
$pho->bindValue(':mem_no',$_POST['memNo']);
$pho->bindValue(':pho_info',$_POST['content']);
$pho->bindValue(':pho_date',date("Y-m-d"));
$pho->bindValue(':pho_path',$path);
$pho->bindValue(':pho_share',0);
$pho->bindValue(':pho_collect',0);
$pho->bindValue(':pho_report',0);
$pho->bindValue(':pho_view',0);
$pho->bindValue(':pho_place',$_POST['photoLoc']);
$pho->bindValue(':pho_tag',$_POST['photoTag']);
$pho->execute();


// echo "ok";
echo json_encode(array('msg' => 'ok' ));
header ( 'Location:../photo.html');
exit;

}catch(PDOException $e){
    echo $e->getMessage()."行號".$e->getLine();
}






 ?>
