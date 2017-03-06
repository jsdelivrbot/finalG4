
<?php 
try {
  require_once("connect.php");
if(isset($_FILES["add_img"])){
    switch( $_FILES["add_img"]["error"]){
      case 0:

        $from = $_FILES["add_img"]["tmp_name"];
        //檢查資料夾或檔案是否存在
        if( file_exists("../img/act")==false){ //不存在
          //建立資料夾 make directory
              mkdir("act");
        }
            //原始檔名(utf-8)
            $fileName = $_FILES["add_img"]["name"];

            //設定好資料夾,並轉碼為big5
        $to = "../img/act/". mb_convert_encoding($fileName, "Big5","UTF-8");
        
        if(copy( $from, $to) ){
          echo "上傳成功<br>";
        }else{
          echo "error<br>";
        }
        break;
      case 1:
          echo "檔案不得超過", ini_get("upload_max_filesize") ,"<br>";
        break;
      case 2:
        echo "檔案不得超過", $_REQUEST["MAX_FILE_SIZE"] ,"<br>";
        break;
      case 3:
        echo "上傳檔案不完整<br>";
        break;
      case 4:
          echo "檔案没送<br>";
           break;
      default : 
          echo "錯誤代碼:" , $_FILES["add_img"]["error"],"請通知系統人員<br>";
           break;

    }  
}

  if(isset($_REQUEST["actCla_no"])){
  $sql = "insert into act (
          act_no, 
          actCla_no,
          mem_no, 
          act_name,
          act_startDate, 
          act_endDate,
          act_place,
          act_lat,
          act_lng,          
          act_limit,
          act_price,
          act_img,
          act_info,
          act_state,
          act_collect) 

          value(null,
          :actCla_no,
          :mem_no,
          :act_name,
          :act_startDate,
          :act_endDate,
          :act_place,
          :act_lat,
          :act_lng,
          :act_limit,
          :act_price,
          :act_img,
          :act_info,
          :act_state,
          :act_collect)";

  $act = $pdo->prepare( $sql ); 
  $act->bindValue(":actCla_no" ,$_REQUEST["actCla_no"]);
  $act->bindValue(":mem_no" , $_REQUEST["mem_no"]);
  $act->bindValue(":act_name" , $_REQUEST["act_name"]);
  $act->bindValue(":act_startDate" ,$_REQUEST["act_startDate"]);
  $act->bindValue(":act_endDate" ,$_REQUEST["act_endDate"]);
  $act->bindValue(":act_place" ,$_REQUEST["act_place"]);
  $act->bindValue(":act_lat" ,"23");
  $act->bindValue(":act_lng" ,"121");
  $act->bindValue(":act_limit" ,$_REQUEST["act_limit"]);
  $act->bindValue(":act_price" ,$_REQUEST["act_price"]);
  $act->bindValue(":act_img" ,"img/act/".$_REQUEST["act_img"]);
  $act->bindValue(":act_info" ,$_REQUEST["act_info"]);
  $act->bindValue(":act_state" ,0);
  $act->bindValue(":act_collect" ,0);
  // $act->bindValue(":mem_email" ,"amy168@gmail.com");

  $act->execute();
  echo "活動新增成功<br>";
  }

} catch (PDOException $ex) {
	echo "資料庫操作失敗,原因：",$ex->getMessage(),"<br>";
	echo "行號：",$ex->getLine(),"<br>";
	
}
?>
