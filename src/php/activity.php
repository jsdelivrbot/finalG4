<?php
      // $lat = $_REQUEST["act_lat"];
      // $point = '20.876571';
      // echo round($lat,5),"<br>",round($point,5),"<br>";

      // if( $lat>$point){
      //   echo "HAAHAH";
      // }else{
        // echo "no";
      // }

try{
  require_once("connect.php");


/*=====================================
            選類型
    =======================================*/
  if(isset($_REQUEST["actCla_no"])){
      $sql = "select * from act join actCla using(actCla_no) join mem using(mem_no) where actCla_no=:actCla_no";
      $act = $pdo->prepare( $sql );
      $act->bindValue(":actCla_no", $_REQUEST["actCla_no"]);
      $act->execute();//執行
      if( $act->rowCount() == 0 ){ //找不到
        //傳回空的JSON字串
        echo "{}";
      }else{ //找得到
        $actArray =array();
        while($actRow = $act->fetch(PDO::FETCH_ASSOC)){
          $actArray[] = $actRow; 
        }
        //送出json字串
        echo json_encode($actArray);
      }          
  }

/*=====================================
               選日期
    =======================================*/

  if(isset($_REQUEST["act_startDate"]) || isset($_REQUEST["act_endDate"])){

    $sql = "select * from act join actCla using(actCla_no) where act_endDate between '".$_REQUEST["act_startDate"]."' and '".$_REQUEST["act_endDate"]."'";
    $act = $pdo->prepare( $sql );
    $act->execute();//執行
    if( $act->rowCount() == 0 ){ //找不到
      //傳回空的JSON字串
      echo "{}";
    }else{ //找得到
      $actArray =array();
      while($actRow = $act->fetch(PDO::FETCH_ASSOC)){
        $actArray[] = $actRow; 
        
      }
      //送出json字串
      echo json_encode($actArray);
    }        
  }
/*=====================================
            選地點
    =======================================*/
  if(isset($_REQUEST["act_lat"])){
      $lat = $_REQUEST["act_lat"];
      $point = '23.876571';
      if( $lat>=$point){
        $sql = "select * from act join actCla using(actCla_no) where act_lat>=$lat";

        $act = $pdo->prepare( $sql );
        $act->bindValue($lat,$_REQUEST["act_lat"]);
        $act->execute();//執行
        if( $act->rowCount() == 0 ){ //找不到
          //傳回空的JSON字串
          echo "{}";
        }else{ //找得到
          $actArray =array();
          while($actRow = $act->fetch(PDO::FETCH_ASSOC)){
            $actArray[] = $actRow; 
            
          }
          //送出json字串
          echo json_encode($actArray);
        }           
      }
      
  }//lanLng end

/*=====================================
            輸入地點搜尋
    =======================================*/
  if(isset($_REQUEST["act_name"])){
      $str = '%'.$_REQUEST["act_name"].'%';
        $sql = "select * from act join actCla using(actCla_no) where act_name like '".$str."'";
        $act = $pdo->prepare( $sql );
        $act->execute();//執行
        if( $act->rowCount() == 0 ){ //找不到
          //傳回空的JSON字串
          echo "{}";
        }else{ //找得到
          $actArray =array();
          while($actRow = $act->fetch(PDO::FETCH_ASSOC)){
            $actArray[] = $actRow; 
            
          }
          //送出json字串
          echo json_encode($actArray);
        }          
  }//searchStr end

/*=====================================
              選擇全部
      =======================================*/  
  if(isset($_REQUEST["all"])){
     
        $sql = "select * from act join actCla using(actCla_no)";
        $act = $pdo->prepare( $sql );
         $act->execute();//執行
        if( $act->rowCount() == 0 ){ //找不到
          //傳回空的JSON字串
          echo "{}";
        }else{ //找得到
          $actArray =array();
          while($actRow = $act->fetch(PDO::FETCH_ASSOC)){
            $actArray[] = $actRow; 
            
          }
          //送出json字串
          echo json_encode($actArray);
        }         
  }//
/*=====================================
            選擇種類
    =======================================*/
  if(isset($_REQUEST["act_no"])){
       
        $sql = "select * from act join actCla using(actCla_no) where act.act_no=:act_no";
        $act = $pdo->prepare( $sql );
        $act->bindValue(":act_no",$_REQUEST["act_no"]);
        $act->execute();//執行
        if( $act->rowCount() == 0 ){ //找不到
          //傳回空的JSON字串
          echo "{}";
        }else{ //找得到
          $actArray1 =array();

          while($actRow = $act->fetch(PDO::FETCH_ASSOC)){
            $actArray1[] = $actRow; 
            
          }
          //送出json字串
          
        }    

        $sql2 = "select * from act join actCla using(actCla_no) join mem using(mem_no) join actMsg using(act_no) where act.act_no=:act_no";
        $act2 = $pdo->prepare( $sql2 );
        $act2->bindValue(":act_no",$_REQUEST["act_no"]);
        $act2->execute();//執行
        $actArray2 =array();
        if( $act2->rowCount() == 0 ){ //找不到
          //傳回空的JSON字串
          $actArray2[]="0";
        }else{ //找得到
          
          while($actRow2 = $act2->fetch(PDO::FETCH_ASSOC)){
            $actArray2[] = $actRow2; 
            
          }
          //送出json字串
          
        } 
        $actArray=array($actArray1,$actArray2);
        echo json_encode($actArray);
      
  }//


  if(isset($_REQUEST["actCom_no"])){

        $sql = "select * from actMsg,act where act.act_no=:act_no and actMsg.act_no=:act_no";
        $act = $pdo->prepare( $sql );
        $act->bindValue(":act_no",$_REQUEST["actCom_no"]);
        $act->execute();//執行
        if( $act->rowCount() == 0 ){ //找不到
          //傳回空的JSON字串
          echo "{}";
        }else{ //找得到
          $actArray =array();
          while($actRow = $act->fetch(PDO::FETCH_ASSOC)){
            $actArray[] = $actRow; 
            
          }
          //送出json字串
          echo json_encode($actArray);
        }     
  }//






}catch(PDOException $e){
  echo $e->getMessage();
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>