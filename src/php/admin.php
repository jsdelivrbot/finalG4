
<?php 
try {
  require_once("connect.php");
/*=====================================
            搜尋活動
    =======================================*/
if(isset($_REQUEST["act_class"])){
  $str = '%'.$_REQUEST["act_str"].'%';
  $sql = "select * from act join actCla using(actCla_no) where :act_class like '".$str."'";
  $act = $pdo->prepare($sql);
  
  $act->bindValue(":act_class",'"'.$_REQUEST["act_class"].'"');
  $act->execute();
  while($actRow = $act->fetch(PDO::FETCH_ASSOC)){
    $actArray[]=$actRow;
  }
  
    //送出json字串
  echo json_encode($actArray);  
}
/*=====================================
            修改專欄
    =======================================*/
if(isset($_REQUEST["spe-title"])){
  $sql = "update spe set spe_title='".$_REQUEST["spe-title"]."',spe_author='".$_REQUEST["spe_author"]."',spe_date='".$_REQUEST["spe_date"]."',spe_img='img/know/".$_FILES["spe_img"]["name"]."',spe_content='".$_REQUEST["spe_content"]."' where spe_no='".$_REQUEST["spe_no"]."'";
  switch ($_FILES["spe_img"]["error"]) {
  case 0:

  $from = $_FILES["spe_img"]["tmp_name"];
 
  //檢查資料夾或檔案是否存在
  if( file_exists("../img/know")==false){ //不存在
    //建立資料夾 make directory
        mkdir("know");
  }
  $fileName=$_FILES["spe_img"]["name"];//原始檔案

  $to = "../img/know/".mb_convert_encoding($fileName, "Big5","UTF-8");//轉檔utf-8轉big5

  if(copy( $from, $to) ){

  $spe = $pdo->prepare($sql);
  $spe -> execute();
  echo "成功";


  }else{
    echo "error<br>";
  }   
  break;

  case 1:
  echo "檔案不得超過",ini_get("upload_max_filesize"),"<br>";//抓php設定檔案
  break;

  case 2:
  echo "檔案不得超過", $_REQUEST["MAX_FILE_SIZE"] ,"<br>";
  //自己設定的 利用input type hidden
  break;

  case 3:
  echo "上傳不完整<br>";
  break;

  case 4:
  echo "沒送檔案<br>";
  break;
 
  default:
  echo "錯誤代碼:",$_FILES["img"]["error"],"請通知系統人員<br>";
    break;
}
header('location:../admin_spe.php'); 
}
/*=====================================
            修改專欄
    =======================================*/
if(isset($_REQUEST["spe_change"])){
  $sql = "select * from spe where spe_no=:spe_change";
  $spe = $pdo->prepare($sql);
  $spe->bindValue(":spe_change",$_REQUEST["spe_change"]);
  $spe->execute();
  $speRow = $spe->fetch(PDO::FETCH_ASSOC);
  $speArray=array($speRow);
    //送出json字串
  echo json_encode($speArray);  
}
/*=====================================
            照片取消檢舉狀態
    =======================================*/
if(isset($_REQUEST["pho_reportNo"])){
  $sql = "update pho set pho_report='".$_REQUEST["pho_reportNum"]."' where pho_no='".$_REQUEST["pho_reportNo"]."'";
  $pho = $pdo->prepare($sql);
  $pho -> execute();
  $phoArray = array("pho_report"=>$_REQUEST["pho_reportNum"],"pho_no"=>$_REQUEST["pho_reportNo"]);


  echo json_encode($phoArray);
}
/*=====================================
            編輯照片
    =======================================*/
if(isset($_REQUEST["pho_change"])){
  $sql = "select * from pho join mem using(mem_no) where pho_no=:pho_change";
  $pho = $pdo->prepare($sql);
  $pho->bindValue(":pho_change",$_REQUEST["pho_change"]);
  $pho->execute();
  $phoRow = $pho->fetch(PDO::FETCH_ASSOC);
  $phoArray=array($phoRow);
    //送出json字串
  echo json_encode($phoArray);  
}
/*=====================================
            新增專欄
    =======================================*/
if(isset($_REQUEST["spe_title"])){
  $sql = "insert into spe value(null,'".$_REQUEST["spe_title"]."','".$_REQUEST["spe_author"]."','".$_REQUEST["spe_content"]."',
'".date('Y-m-d H:i:s')."',0,0,0,'img/know/".$_FILES["spe_img"]["name"]."')";
  $spe = $pdo->prepare($sql);
  
 

  switch ($_FILES["spe_img"]["error"]) {
  case 0:

  $from = $_FILES["spe_img"]["tmp_name"];
 
  //檢查資料夾或檔案是否存在
  if( file_exists("../img/know")==false){ //不存在
    //建立資料夾 make directory
        mkdir("know");
  }
  $fileName=$_FILES["spe_img"]["name"];//原始檔案

  $to = "../img/know/".mb_convert_encoding($fileName, "Big5","UTF-8");//轉檔utf-8轉big5

  if(copy( $from, $to) ){

      $spe->execute();
      echo "新增成功";


  }else{
    echo "error<br>";
  }   
  break;

  case 1:
  echo "檔案不得超過",ini_get("upload_max_filesize"),"<br>";//抓php設定檔案
  break;

  case 2:
  echo "檔案不得超過", $_REQUEST["MAX_FILE_SIZE"] ,"<br>";
  //自己設定的 利用input type hidden
  break;

  case 3:
  echo "上傳不完整<br>";
  break;

  case 4:
  echo "沒送檔案<br>";
  break;
 
  default:
  echo "錯誤代碼:",$_FILES["img"]["error"],"請通知系統人員<br>";
    break;
}
  header('location:../admin_spe.php'); 
}



/*=====================================
            審核活動
    =======================================*/
if(isset($_REQUEST["act_stateNo"])){
  $sql = "update act set act_state='".$_REQUEST["act_stateNum"]."' where act_no='".$_REQUEST["act_stateNo"]."'";
  $act = $pdo->prepare($sql);
  $act -> execute();
  $actArray = array("act_state"=>$_REQUEST["act_stateNum"],"act_no"=>$_REQUEST["act_stateNo"]);


  echo json_encode($actArray);
}
/*=====================================
            編輯文章
    =======================================*/
if(isset($_REQUEST["pla_change"])){
  $sql = "select * from pla join plaCla using(plaCla_no) join mem using(mem_no) where pla_no=:pla_change";
  $pla = $pdo->prepare($sql);
  $pla->bindValue(":pla_change",$_REQUEST["pla_change"]);
  $pla->execute();
  $plaRow = $pla->fetch(PDO::FETCH_ASSOC);
  $plaArray=array($plaRow);
    //送出json字串
  echo json_encode($plaArray);  
}
/*=====================================
            取消檢舉狀態
    =======================================*/
if(isset($_REQUEST["pla_reportNo"])){
  $sql = "update pla set pla_report='".$_REQUEST["pla_reportNum"]."' where pla_no='".$_REQUEST["pla_reportNo"]."'";
  $pla = $pdo->prepare($sql);
  $pla -> execute();
  $plaArray = array("pla_report"=>$_REQUEST["pla_reportNum"],"pla_no"=>$_REQUEST["pla_reportNo"]);


  echo json_encode($plaArray);
}
/*=====================================
            審核活動
    =======================================*/
if(isset($_REQUEST["act_state"])){
  $sql = "update act set act_state='".$_REQUEST["act_state"]."' where act_no='".$_REQUEST["act_state_no"]."'";
  $act = $pdo->prepare($sql);
  $act -> execute();
  $actArray = array("act_state"=>$_REQUEST["act_state"],"act_no"=>$_REQUEST["act_state_no"]);


  echo json_encode($actArray);
}
/*=====================================
            刪除活動
    =======================================*/
if(isset($_REQUEST["act_delete"])){
  $sql = "delete from act where act_no=:act_delete";
  
  $act = $pdo->prepare($sql);
  $act->bindValue(":act_delete",$_REQUEST["act_delete"]);
  $act -> execute();
  $actArray = array("status"=>"刪除成功");


  echo json_encode($actArray);
}

/*=====================================
            修改活動
    =======================================*/
if(isset($_REQUEST["act_change"])){
  $sql = "select * from act join actCla using(actCla_no) join mem using(mem_no) where act_no=:act_change";
  $act = $pdo->prepare($sql);
  $act->bindValue(":act_change",$_REQUEST["act_change"]);
  $act->execute();
  $actRow = $act->fetch(PDO::FETCH_ASSOC);
  $actArray=array($actRow);
    //送出json字串
  echo json_encode($actArray);  
}


/*=====================================
            新增活動     
    =======================================*/
if(isset($_REQUEST["add_name"])){
  $sql = "insert into act value(null,'".$_REQUEST["add_class"]."','".$_REQUEST["add_name"]."','".$_REQUEST["mem_no"]."',
'2017-2-19 21:00','2017-2-20 21:00','".$_REQUEST["add_place"]."','".$_REQUEST["add_lat"]."','".$_REQUEST["add_lng"]."','".$_REQUEST["add_limit"]."','".$_REQUEST["add_price"]."','img/a_001.jpg',
'".$_REQUEST["add_info"]."')";
  $act = $pdo->prepare($sql);
  $act->execute();
  header('location:../admin.php');
}

/*================================
            mem權限開關
===================================*/
  if(isset($_REQUEST["mem_close"])){

    if($_REQUEST["mem_close"]==1){
      $sql = "update mem set mem_close=0 where mem_no = 1";
    }else{
      $sql = "update mem set mem_close=1 where mem_no = 1";
    }
    $mem = $pdo ->prepare( $sql );
    $mem -> execute();



    $sql2 = "select * from mem";
    $mem2 = $pdo->prepare( $sql2 ); 
    $mem2->execute();

    $memRow2= $mem2->fetch(PDO::FETCH_ASSOC);
    $memArray=array($memRow2);
    //送出json字串
    echo json_encode($memArray);
  }


/*================================
             新增管理員
===================================*/
  if(isset($_REQUEST["adm_name"])){
    $sql="insert into adm value(null,'".$_REQUEST["adm_name"]."','".$_REQUEST["adm_acc"]."','".$_REQUEST["adm_psw"]."')";
    $adm = $pdo->prepare($sql);
    $adm ->execute();

    $sql2="select * from adm order by adm_no desc limit 1";
    $adm2 = $pdo->prepare($sql2);
    $adm2 ->execute();
    $admRow2 = $adm2->fetch(PDO::FETCH_ASSOC);
    $admArray = array($admRow2);


    echo json_encode($admArray);
  }
/*================================
            刪除管理員
===================================*/
  if(isset($_REQUEST["adm_delete"])){
    $sql="delete from adm where adm_no ='".$_REQUEST["adm_delete"]."'";
    $adm = $pdo->prepare($sql);
    $adm ->execute();



    $admArray = array("adm_delete"=>$_REQUEST["adm_delete"]);


    echo json_encode($admArray);
  }  

/*================================
          修改管理員
===================================*/
if(isset($_REQUEST["adm_nameChange"]) || isset($_REQUEST["adm_accChange"]) || isset($_REQUEST["adm_pswChange"])){
  $sql = "update adm set  adm_name='".$_REQUEST["adm_nameChange"]."',adm_acc='".$_REQUEST["adm_accChange"]."',adm_psw='".$_REQUEST["adm_pswChange"]."' where adm_no='".$_REQUEST["adm_no"]."'";
  $adm = $pdo->prepare($sql);
  $adm ->execute();
  $admArray = array("status"=>"修改成功");


  echo json_encode($admArray);
}



} catch (PDOException $ex) {
	echo "資料庫操作失敗,原因：",$ex->getMessage(),"<br>";
	echo "行號：",$ex->getLine(),"<br>";
	
}
?>
