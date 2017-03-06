<?php
try{
  require_once("connect.php");
  $sql = "select * from member where memId=:memId";
  $member = $pdo->prepare( $sql );
  $member->bindValue(":memId", $_REQUEST["memId"]);
  $member->execute();
  
  if( $member->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "{}";
  }else{ //找得到
    //取回一筆資料
    $memRow = $member->fetch(PDO::FETCH_ASSOC);
    //送出json字串
    echo json_encode($memRow);

  }	
}catch(PDOException $e){
  echo $e->getMessage();
}
?>