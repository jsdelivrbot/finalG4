<?php
header('Content-Type: application/json; charset=UTF-8');


switch( $_FILES["memImg"]["error"]){
	case 0:

		$from = $_FILES["memImg"]["tmp_name"];

		// if( file_exists("../upload")==false){ 
	 //        mkdir("../upload");
		// }
      
        $fileName = $_FILES["memImg"]["name"];

       
		$to = "../upload/".mb_convert_encoding($fileName,"UTF8");
		
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
	    echo "錯誤代碼:" , $_FILES["memImg"]["error"],"請通知系統人員<br>";
	     break;

}






try{

require_once("connect.php");
// $sql="insert into pho (pho_no,pho_name,mem_no,pho_info,pho_date,pho_path,pho_share,pho_collect,pho_report,pho_view,pho_loc,pho_tag) value
// (:pho_no,:pho_name,:mem_no,:pho_info,:pho_date,:pho_path,:pho_share,:pho_collect,:pho_report,:pho_view,:pho_loc,:pho_tag)";



$fileName = $_FILES["memImg"]["name"];
$path = "upload/". mb_convert_encoding($fileName,"UTF-8");


$sql = "update mem SET mem_name=:mem_name,mem_psw=:mem_psw,mem_img=:mem_img where mem_no=:mem_no";


$mem = $pdo->prepare($sql);

$mem->bindValue(':mem_no',$_POST['memNo']);

$mem->bindValue(':mem_name',$_POST['memName']);

$mem->bindValue(':mem_psw',$_POST['memPsw']);

$mem->bindValue(':mem_img',$path);

$mem->execute();


// echo "ok";
echo json_encode(array('msg' => 'ok' ));
// header ( 'Location:../index.html');
// exit;

}catch(PDOException $e){
    echo $e->getMessage()."行號".$e->getLine();
}






 ?>
