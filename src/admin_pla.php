<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/admin.css">
    <script src="libs/jquery/dist/jquery.min.js"></script>
    <script src="js/admin.js"></script>
    <title>ZeroGravity後台管理</title>
</head>

<body id="admin">
    <div id="admin-wrapper">
        <!-- <div class="logOut">登出</div> -->
        <div class="ad-logo">
            <img src="img/logo.png" alt="">
            
        </div>

        <div class="main">
           <nav id="adminNav">
            <P>後台管理系統</P>
                <ul class="adminMenu">

                    <li><a href="admin_act.php">
                        <div class="pic">
                            <i class="fa fa-bullhorn" aria-hidden="true"></i>
                        </div>
                        活動管理</a>
                    </li>
                    <li><a href="admin_pla.php">
                      <div class="pic">
                          <i class="fa fa-commenting-o" aria-hidden="true"></i>
                      </div>
                        論壇管理</a>
                    </li>
                    <li><a href="admin_spe.php">
                      <div class="pic">
                          <i class="fa fa-book" aria-hidden="true"></i>
                      </div>
                        專欄管理</a>
                    </li>
                    <li><a href="admin_pho.php">
                      <div class="pic">
                          <i class="fa fa-camera" aria-hidden="true"></i>
                      </div>
                        照片管理</a>
                    </li>
                    <li><a href="admin_mem.php">
                      <div class="pic">
                          <i class="fa fa-users" aria-hidden="true"></i>
                      </div>
                        會員管理</a>
                    </li>
                    <li><a href="admin.php">
                      <div class="pic">
                        <i class="fa fa-user" aria-hidden="true"></i>
                      </div>
                        員工管理</a>
                    </li>
                </ul>
            </nav>
          <div class="view-wrapper">
                <div class="admin-title">
                    <p>論壇管理</p>
                </div>
            <div id="view">
              <table id="actTable">
               <tr>
                <th>活動編號</th>
                <th>活動類別</th>
                <th>名稱</th>
                <th>發起會員</th>
                <th>開始日期</th>
                <th>結束日期</th>
                <th>地點</th>
                <th>人數限制</th>
                <th>費用</th>
                <th>說明</th>
                <th>狀態</th>
                <th>動作</th>
              </tr>
              
              <?php 
                try {
                  require_once("php/connect.php");
                  $sql = "select * from act join mem on act.mem_no=mem.mem_no join actCla on act.actCla_no=actCla.actCla_no group by act_no";
                  $act = $pdo->prepare( $sql );  
                  $act->execute();

                  while($actRow = $act->fetch()){
                      $state="";$state1="";$state2="";
                      if($actRow["act_state"]==0){
                        $position = "<p>待審核</p>";
                        $state = "selected";
                      }elseif($actRow["act_state"]==1){
                        $position = "<p style='color:green'>合格</p>";
                        $state1 = "selected";
                      }else{
                        $position = "<p style='color:red'>不合格</p>";
                        $state2 = "selected";
                      }
                      echo '<tr>
                            <td>'.$actRow["act_no"].'</td>
                            <td>'.$actRow["actCla_name"].'</td>
                            <td>'.$actRow["act_name"].'</td>
                            <td>'.$actRow["mem_name"].'</td>
                            <td>'.$actRow["act_startDate"].'</td>
                            <td>'.$actRow["act_endDate"].'</td>
                            <td>'.$actRow["act_place"].'</td>
                            <td>'.$actRow["act_limit"].'</td>
                            <td>'.$actRow["act_price"].'</td>
                            <td>'.((mb_strlen($actRow["act_info"], "UTF8")>10) ? mb_substr($actRow["act_info"],0,15, "UTF8") : $actRow["act_info"]).' '.((mb_strlen($actRow["act_info"], "UTF8")>10) ? nl2br(' ...') : nl2br('')).'</td>
                            <td class="ad-act-stateFinal"><input type="hidden" name="" value="'.$actRow["act_state"].'">'.$position.'</td>
                            <td>
                              <i class="fa fa-pencil-square-o ad-act_change" aria-hidden="true"></i>
                              
                            </td>

                            </tr>';
                  }
               
                } catch (Exception $ex) {
                    echo "資料庫操作失敗,原因：",$ex->getMessage(),"<br>";
                    echo "行號：",$ex->getLine(),"<br>";
                }


               ?>
<!--                 <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  <td><input type="button" value="新增" class="ad-act_add"> </td>
                </tr> -->
              </table>

              <table id="forumTable">
               <tr>
                <th>論壇文章編號</th>
                <th>類別</th>
                <th>標題</th>
                <th>內容</th>
                <th>會員名稱</th>
                <th>發文日期</th>
                <th>被檢舉數</th>
<!--                 <th>動作</th>
                
                <th>刪除</th> -->
                <th>動作</th>
              </tr>
            <?php 
                try {
                  require_once("php/connect.php");
                  //共幾筆
                  $sql = "select count(*) totalRecords from pla";
                  $prodCount = $pdo->query($sql);
                  //獲取欄位
                  $prodCountRow = $prodCount->fetch();
                  //獲取欄位值"7"
                  $totalRecords = $prodCountRow["totalRecords"];

                  //每頁印幾筆
                  $pageRecords = 7;
                //$pageRecords

                  //共幾頁，ceil是無條件進位
                  $pages = ceil($totalRecords/$pageRecords);  

                  //顯示目前這一筆
                  $pageNo = isset($_REQUEST["pageNo"]) == false ? 1 : $_REQUEST["pageNo"];
                  $start = ($pageNo - 1) * $pageRecords;
                  $sql = "select * from pla join mem on pla.mem_no=mem.mem_no join plaCla on pla.plaCla_no=plaCla.plaCla_no group by pla_no order by pla_report desc limit $start, $pageRecords";
                  $pla = $pdo->query( $sql);
                  while($plaRow = $pla->fetch()){
                      echo '<tr>
                            <td>'.$plaRow["pla_no"].'</td>
                            <td>'.$plaRow["plaCla_name"].'</td>
                            <td>'.$plaRow["pla_title"].'</td>
                            <td>'.((mb_strlen($plaRow["pla_content"], "UTF8")>10) ? mb_substr($plaRow["pla_content"],0,15, "UTF8") : $plaRow["pla_content"]).' '.((mb_strlen($plaRow["pla_content"], "UTF8")>10) ? nl2br(' ...') : nl2br('')).'</td>
                            <td>'.$plaRow["mem_name"].'</td>
                           
                            <td>'.$plaRow["pla_date"].'</td>

                            <td>'.$plaRow["pla_report"].'</td>
                            <td><i class="fa fa-pencil-square-o ad-pla_change" aria-hidden="true"></i></td>
                            </tr>';
                  } //while
                  //顯示頁數超連結  
                  echo "<tr class='adm-page'><td colspan=12>";
                  for( $i=1; $i<=$pages; $i++){
                    echo "<a href='admin_pla.php?pageNo=$i'> $i</a> &nbsp;&nbsp;&nbsp;";
                  }
                  echo "</td></tr></table>";
                    
                } catch (PDOException $ex) {
                  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
                  echo "行號 : " , $ex->getLine() , "<br>"; 
                }



                ?>  

              </table>
              <table id="knowTable">
               <tr>
                <th>專欄文章編號</th>
                <th>標題</th>
                <th>作者</th>
                <th>內容</th>
                <th>發文日期</th>
                <th>觀看數</th>
                <!-- <th>會員照片</th> -->
                <th>照片</th>
                <th>動作</th>
              </tr>
              
              <?php 
                try {
                  require_once("php/connect.php");
                  $sql = "select * from spe";
                  $spe = $pdo->prepare( $sql );  
                  $spe->execute();

                  while($speRow = $spe->fetch()){
                      echo '<tr>
                            <td>'.$speRow["spe_no"].'</td>
                            <td>'.$speRow["spe_title"].'</td>
                            <td>'.$speRow["spe_author"].'</td>
                            <td>'.$speRow["spe_content"].'</td>
                            <td>'.$speRow["spe_date"].'</td>
                            <td>'.$speRow["spe_view"].'</td>
                            <td>'.$speRow["spe_img"].'</td>
                            <td><i class="fa fa-pencil-square-o ad-spe_add" aria-hidden="true"></i></td>
                            </tr>';
                  }
               
                } catch (Exception $ex) {
                    echo "資料庫操作失敗,原因：",$ex->getMessage(),"<br>";
                    echo "行號：",$ex->getLine(),"<br>";
                }


               ?>

              </table>
              <table id="photoTable">
                 <tr>
                  <th>照片編號</th>
                  <th>照片名稱</th>
                  <th>會員名稱</th>
                  <th>照片簡介</th>
                  <th>照片日期</th>
                  <th>照片路徑</th>

                  <th>分享數</th>
                  <th>檢舉數</th>
                  <th>動作</th>
                </tr>
              <?php 
                try {
                  require_once("php/connect.php");
                  $sql = "select * from pho join mem using(mem_no)";
                  $pho = $pdo->prepare( $sql );  
                  $pho->execute();


                  while($phoRow = $pho->fetch()){
                      echo '<tr>
                            <td>'.$phoRow["pho_no"].'</td>
                            <td>'.$phoRow["pho_name"].'</td>
                            <td>'.$phoRow["mem_name"].'</td>
                            <td>'.$phoRow["pho_info"].'</td>
                            <td>'.$phoRow["pho_date"].'</td>
                           
                            <td>'.$phoRow["pho_path"].'</td>

                            <td>'.$phoRow["pho_share"].'</td>
                            <td>'.$phoRow["pho_report"].'</td>
                            <td>
                              <i class="fa fa-pencil-square-o ad-pho_change" aria-hidden="true"></i>
                              
                            </td>
                            </tr>';
                  }
                   // <td>'.$memRow["mem_img"].'</td>
                   // <td>'.$memRow["mem_art"].'</td>
                   // <td>'.$memRow["mem_pho"].'</td>
                   // <td>'.$memRow["mem_msg"].'</td>
                   // <td>'.$memRow["mem_join"].'</td>
                   // <td>'.$memRow["mem_hold"].'</td>                  
                } catch (Exception $ex) {
                    echo "資料庫操作失敗,原因：",$ex->getMessage(),"<br>";
                    echo "行號：",$ex->getLine(),"<br>";
                }


               ?>


         </table>
          <table id="memberTable">
              <tr>
                <th>會員編號</th>
                <th>會員類別</th>
                <th>會員email</th>
                <th>會員密碼</th>
                <th>會員名稱</th>
                <!-- <th>會員照片</th> -->
                <th>會員加入日期</th>
<!--                 <th>會員文章數</th>
                <th>會員照片數</th>
                <th>會員留言數</th>
                <th>參加活動數</th>
                <th>舉辦活動數</th> -->
                <th>停權狀態</th>
                <th>更改權限</th>
              </tr>
              
              <?php 
                try {
                  require_once("php/connect.php");
                  $sql = "select * from mem";
                  $mem = $pdo->prepare( $sql );  
                  $mem->execute();

                  while($memRow = $mem->fetch()){
                      echo '<tr>
                            <td>'.$memRow["mem_no"].'</td>
                            <td>'.$memRow["mem_class"].'</td>
                            <td>'.$memRow["mem_email"].'</td>
                            <td>'.$memRow["mem_psw"].'</td>
                            <td>'.$memRow["mem_name"].'</td>
                           
                            <td>'.$memRow["mem_date"].'</td>

                            <td>'.$memRow["mem_close"].'</td>
                            <td><input type="button" value="變更權限" class="ad-changePower"></td> 
                            </tr>';
                  }
                   // <td>'.$memRow["mem_img"].'</td>
                   // <td>'.$memRow["mem_art"].'</td>
                   // <td>'.$memRow["mem_pho"].'</td>
                   // <td>'.$memRow["mem_msg"].'</td>
                   // <td>'.$memRow["mem_join"].'</td>
                   // <td>'.$memRow["mem_hold"].'</td>                  
                } catch (Exception $ex) {
                    echo "資料庫操作失敗,原因：",$ex->getMessage(),"<br>";
                    echo "行號：",$ex->getLine(),"<br>";
                }


               ?>
              </table>
      <table id="admTable">
              <tr>
                <th>管理員編號</th>
                <th>名稱</th>
                <th>帳號</th>
                <th>密碼</th>
                <th>修改</th>
                <th>刪除</th>
              </tr>
              <?php 
                try {
                  require_once("php/connect.php");
                  $sql = "select * from adm";
                  $adm = $pdo->prepare( $sql );  
                  $adm->execute();

                  while($admRow = $adm->fetch()){
                      echo '<tr>
                            <td>'.$admRow["adm_no"].'</td>
                            <td><input type="text" value='.$admRow["adm_name"].'></td>
                            <td><input type="text" value='.$admRow["adm_acc"].'></td>
                            <td><input type="text" value='.$admRow["adm_psw"].'></td>
                            <td><i class="fa fa-pencil-square-o ad-adm_change" aria-hidden="true"></i></td> 
                            <td><i class="fa fa-times ad-adm_delete" aria-hidden="true"></i></td> 
                            </tr>';
                  }
                } catch (Exception $ex) {
                    echo "資料庫操作失敗,原因：",$ex->getMessage(),"<br>";
                    echo "行號：",$ex->getLine(),"<br>";
                }


               ?>
                <tr id="ad-before">
                
                    <td id="adm_no">
                       <?php 
                        try {
                          require_once("php/connect.php");
                          $sql = "select adm_no from adm order by adm_no desc limit 1";
                          $adm = $pdo->prepare( $sql );  
                          $adm->execute();

                          while($admRow = $adm->fetch()){
                              echo $admRow["adm_no"]+1;
                          }
                        } catch (Exception $ex) {
                            echo "資料庫操作失敗,原因：",$ex->getMessage(),"<br>";
                            echo "行號：",$ex->getLine(),"<br>";
                        }


                       ?>                     
                    </td>
                    <td><input type="text" id="adm_name"></td>
                    <td><input type="text" id="adm_acc"></td>
                    <td><input type="text" id="adm_psw"></td>
                    <td colspan="2"><input type="button" value="新增" class="ad-admAdd"></td>
                    
                  
                </tr>

          </table>
<!--           <div id="ad-actAdd">
                <form action="php/admin.php" method="post">
                <table id="actChangeTable">
                  <tr>
                    <th>活動名稱</th>
                    <td><input type="text" name="add_name" value="" placeholder=""></td>
                  </tr>
                   <tr>
                    <th>活動類型</th>
                    <td><input type="text" name="add_class" value="" placeholder=""></td>
                  </tr>                 

                  <tr>
                    <th>會員編號</th>
                    <td><input type="text" name="mem_no" value="" placeholder=""></td>
                  </tr>                  
                  <tr>
                    <th>活動開始日期</th>
                    <td><input type="date" name="add_startDate" value="" placeholder="">到<input type="time" name="" value="" placeholder=""></td>
                  </tr>
                  <tr>
                    <th>活動結束日期</th>
                    <td><input type="date" name="add_endDate" value="" placeholder="">到<input type="time" name="" value="" placeholder=""></td>
                  </tr>
                  <tr>
                    <th>活動地點</th>
                    <td><input type="text" name="add_place" value="" placeholder=""></td>
                  </tr>
                  <tr>
                    <th>活動緯度</th>
                    <td><input type="text" name="add_lat" value="" placeholder=""></td>
                  </tr>
                  <tr>
                    <th>活動經度</th>
                    <td><input type="text" name="add_lng" value="" placeholder=""></td>
                  </tr>
                  <tr>
                    <th>活動人數</th>
                    <td><input type="text" name="add_limit" value="" placeholder=""></td>
                  </tr>                                                                
                  <tr>
                    <th>活動費用</th>
                    <td><input type="text" name="add_price" value="" placeholder=""></td>
                  </tr>
                  <tr>
                    <th>活動圖檔</th>
                    <td><input type="text" name="add_img" value="" placeholder=""></td>
                  </tr>
                  <tr>
                    <th>活動介紹</th>
                    <td><textarea name="add_info"></textarea></td>
                  </tr>

                  <tr>
                    <th>確認送出</th>
                    <td><input type="submit" name="" value="確定送出" class="btn-lg btn-blue"></td>
                  </tr>

                </table>
                </form>
              </div> -->
<!--               <div id="ad-actChange">
                <form action="php/admin.php" method="post">
                <table id="actChangeTable">
                  <tr>
                    <th>活動名稱</th>
                    <td><input type="text" name="act_name" value="" placeholder=""></td>
                  </tr>
                   <tr>
                    <th>活動類型</th>
                    <td><input type="text" name="act_class" value="" placeholder=""></td>
                  </tr>                 

                  <tr>
                    <th>會員編號</th>
                    <td><input type="text" name="mem_no" value="" placeholder=""></td>
                  </tr>                  
                  <tr>
                    <th>活動開始日期</th>
                    <td><input type="date" name="act_startDate" value="" placeholder="">到<input type="time" name="" value="" placeholder=""></td>
                  </tr>
                  <tr>
                    <th>活動結束日期</th>
                    <td><input type="date" name="act_endDate" value="" placeholder="">到<input type="time" name="" value="" placeholder=""></td>
                  </tr>
                  <tr>
                    <th>活動地點</th>
                    <td><input type="text" name="act_place" value="" placeholder=""></td>
                  </tr>
                  <tr>
                    <th>活動緯度</th>
                    <td><input type="text" name="act_lat" value="" placeholder=""></td>
                  </tr>
                  <tr>
                    <th>活動經度</th>
                    <td><input type="text" name="act_lng" value="" placeholder=""></td>
                  </tr>
                  <tr>
                    <th>活動人數</th>
                    <td><input type="text" name="act_limit" value="" placeholder=""></td>
                  </tr>                                                                
                  <tr>
                    <th>活動費用</th>
                    <td><input type="text" name="act_price" value="" placeholder=""></td>
                  </tr>
                  <tr>
                    <th>活動圖檔</th>
                    <td><input type="text" name="act_img" value="" placeholder=""></td>
                  </tr>
                  <tr>
                    <th>活動介紹</th>
                    <td><textarea name="act_info"></textarea></td>
                  </tr>

                  <tr>
                    <th>確認修改</th>
                    <td><input type="submit" name="" value="確定修改" class="btn-lg btn-blue"></td>
                  </tr>

                </table>
                </form>
              </div> -->
    </div><!-- view結束 -->
</div><!-- view-wrapper end -->
</body>

</html>
<script>
$(function(){
  $('.adminMenu li:nth-child(2)').addClass('show');
  $('#forumTable').show().css({'width':'95%'});
})
  
</script>