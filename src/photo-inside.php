<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>相片內頁</title>
	<link rel="stylesheet" type="text/css" href="css/main.css">
	
	<link rel="stylesheet" type="text/css" href="css/animate.css">
	<link rel="stylesheet" type="text/css" href="css/p-normalize.css" />
	<link rel="stylesheet" type="text/css" href="css/p-demo.css" />
	<link rel="stylesheet" type="text/css" href="css/p-component.css" />
	 <script src="https://code.jquery.com/jquery-2.2.4.js" integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI=" crossorigin="anonymous"></script>
	 <script src="js/photoInside.js"></script>
	 <script src="js/p-wow.min.js"></script>
     <script> new WOW().init();</script>
     <script>
     $(function(){
		$(window).load(function(){
		$(window).bind('scroll resize', function(){
			var $this = $(this);
			var $this_bottom=$this.scrollTop();
			
			//當高度小於100時，關閉區塊	
			if($this_bottom < 10){
				$('.p-go-top').stop().animate({bottom:"-80px"});
				}
			if($this_bottom > 10){
				$('.p-go-top').stop().animate({bottom:"50px"});
						
				}
			}).scroll();
		});
	});
    
     </script>

</head>
<body>

	<?php 
		try{

		require_once("php/connect.php");
		$sql = "select pho.*,substring(pho_date,1,10) date,mem.mem_name,mem.mem_img from pho,mem where pho_no = :pho_no and pho.mem_no= mem.mem_no";
  		$pho = $pdo->prepare($sql);
  		$pho -> bindValue(":pho_no",$_GET['pho_no']);
  		$pho -> execute();
  		$phoRow= $pho -> fetch(PDO::FETCH_ASSOC);

  		
		$sql2 = "select pho_path,pho_no from pho order by pho_view DESC limit 4";
  		$pho2 = $pdo->prepare($sql2);
  		$pho2 -> execute();
  		$phoRow2= $pho2 -> fetchAll();

  		$sql3 = "UPDATE pho set pho_view = pho_view+1 where pho_no = :pho_no";
  		$pho3 = $pdo->prepare($sql3);
  		$pho3 -> bindValue(":pho_no",$_GET['pho_no']);
  		$pho3 -> execute();


		} catch(PDOException $ex){
			echo "資料庫操作失敗,原因：",$ex->getMessage(),"<br>";
			echo "行號：",$ex->getLine(),"<br>";

}

	 ?>
	<!-- 相片內頁 -->
	<input type="hidden" value="<?php echo $phoRow["pho_no"] ?>" id="phoNumber">
	<div class="p-in-content col-xs-12 col-sm-12 col-md-12">
		
		<div class="row">
			<div class="p-in-pic" style="background-image:url(<?php echo $phoRow["pho_path"] ?>)">
				<div class="p-in-pic-back"><a href="photo.html"><i class="fa fa-times" aria-hidden="true"></i></a></div>
				<div class="p-in-icon ">
					<div class="a"><i class="fa fa-heart" aria-hidden="true"></i><h5><?php echo $phoRow["pho_collect"] ?></h5></div>
					<div class="b" id="b"><i class="fa fa-share" id="b" aria-hidden="true"></i></div>
					<div class="c"><i class="fa fa-ban" aria-hidden="true"></i></div>
				</div>
				<div class="p-n-share "  id="divShow" style="opacity: 0">
						<p><i class="fa fa-times" aria-hidden="true" ></i></p>
						<h5 class="share-txt">分享一張相片至:</h5>
						<div class="share-share">
							<i class="fa fa-facebook-square" aria-hidden="true"></i>
							<i class="fa fa-instagram" aria-hidden="true"></i>
							<i class="fa fa-twitter-square" aria-hidden="true"></i>
						</div>
				</div>
			</div>
		</div>
		<div class="p-go-top"><i id="goTop" class="fa fa-chevron-circle-up" aria-hidden="true"></i></div>
		
		<!-- 照片 -->
		
		<!-- 內文 -->
		<div class="p-in-content col-xs-12 col-sm-12 col-md-12">
			
			<div class="container">
				<div class="row">
				<div class="left col-xs-12 col-sm-12 col-md-12">
					<div class="mid">
					<div class="user wow fadeInDown" data-wow-delay="0.2s">
						<img src="<?php echo $phoRow["mem_img"] ?>">
						<h5><?php echo $phoRow["mem_name"] ?></h5>
					</div>
					<div class="content ">
						<h3><?php echo $phoRow["pho_name"]?></h3>
						<p><?php echo $phoRow["pho_info"]?></p>
					</div>

					</div>
				</div>

				<div class="right col-xs-12 col-sm-12 col-md-12">
					<div class="messagebox col-xs-12 col-sm-12 col-md-12">
						<div class="message col-xs-12 col-sm-12 col-md-12" id="messageInside">
							<!-- <div class="ms-box">
								<div class="ms-user">
									<img src="img/p_people2.jpg">
								
								</div>
								<div class="ms-content">
									<h5>supermanatee </h5>
									<h6>一個月</h6>
									<p>Beautiful gallery</p>
								</div>
							</div> -->
						</div>
						<!-- <div class="message col-xs-12 col-sm-12 col-md-12">
							<div class="ms-box">
								<div class="ms-user">
									<img src="img/p_people3.jpg">
							
								</div>
								<div class="ms-content">
									<h5>Anthony Thomas </h5>
									<h6>一個月</h6>
									<p>Wow great capture, very nice picture!</p>
								</div>
							</div>
						</div> -->
						<!-- <div class="message col-xs-12 col-sm-12 col-md-12">
							<div class="ms-box">
								<div class="ms-user">
									<img src="img/p_people4.jpg">
							
								</div>
								<div class="ms-content">
									<h5>yupicard</h5>
									<h6>一個月</h6>
									<p>Wonderful image!</p>
								</div>
							</div>
						</div> -->
						<div class="message col-xs-12 col-sm-12 col-md-12">
							<div class="ms-box">
								<div class="ms-user">
									<img src="img/p_people.jpg" id="memImg">
							
								</div>
								<textarea name="massage" id="photoMsg"></textarea>
							</div>
						</div>
					</div>
					<div class="r-left col-xs-12 col-sm-12 col-md-12">
						<div class="adress wow fadeInDown col-xs-12 col-sm-12 col-md-3 " data-wow-delay="0.25s" >
							<i class="fa fa-map-marker" aria-hidden="true"></i><h2>Location</h2>
							
							<h5><?php echo $phoRow["pho_place"]?></h5>
							<h4><?php echo $phoRow["date"]?></h4>
						</div>
						<div class="tag  wow fadeInDown col-xs-12 col-sm-12 col-md-3 " data-wow-delay="0.5s">
							<i class="fa fa-tags" aria-hidden="true"></i><h2>Tag</h2>
							<p><!-- <a href="#">#武嶺觀星團</a><a href="#">#南十字</a><a href="#">#白雪</a><a href="#">#今天初雪<a href="#">#武嶺觀星團</a></a> -->
							<?php 

								$tag = explode('#',$phoRow["pho_tag"]);
								 foreach($tag as $i=>$data){
								 	echo '<a href="#">#'.$data.'</a>';
								 }
							 ?>


							</p>
							
						</div>
						<div class="icon  wow fadeInDown col-xs-12 col-sm-12 col-md-3" data-wow-delay="0.75s">
							<i class="fa fa-heart" aria-hidden="true"></i><h2>Like</h2>
							<h5><?php echo $phoRow["pho_collect"]?></h5>
						</div>
						<div class="number  wow fadeInDown col-xs-12 col-sm-12 col-md-3" data-wow-delay="1s">
							<i class="fa fa-eye" aria-hidden="true"></i><h2>Views</h2>
							<h5><?php echo $phoRow["pho_view"]?></h5>
						</div>
					</div>
					
					<div class="recommend col-xs-12 col-sm-12 col-md-12">
						<h2>Recommend</h2>
						<div class="itembox">
						<?php foreach($phoRow2 as $i=>$phoRows){
						 echo '<div class="item"><a href="photo-inside.php?pho_no='.$phoRows["pho_no"].'"><img src="'.$phoRows["pho_path"].'"></a></div>';}?>
						</div>
					</div>
					<div class="back col-xs-12 col-sm-12 col-md-12">
						<a href="photo.html"><h5>GO BACK</h5></a>
					</div>
				</div>
			</div>
		</div>
		<div class="clear"></div>
		</div>	
	</div>
	</div>
</body>

</html>
<script type="text/javascript">
  $(function(){
  	       $('.p-in-icon .b').click(function(){
  	       		$('#divShow').css({'z-index':'999'}).animate({'opacity':'1'},300);
  	       })
            // $("#dwivShow").hide();
            
            $('body').click(function(evt) {
                if($(evt.target).parents("#divShow").length==0 && 
                    evt.target.id != "b" && evt.target.id != "divShow") {
                    $('#divShow').css({'z-index':'-1'}).animate({'opacity':'0'},300);
                }
            });
            $('.p-n-share .fa-times').click(function(){
            	$('#divShow').css({'z-index':'-1'}).animate({'opacity':'0'},300);
            })
        });

</script>
<!--  <div class="p-in-icon ">
					
					<div class="b" id="b"><i class="fa fa-share" id="b" aria-hidden="true"></i></div>
					
				</div>
				<div class="p-n-share "  id="divShow" style="opacity: 0">
						<p><i class="fa fa-times" aria-hidden="true" ></i></p>
						<h5 class="share-txt">分享一張相片至:</h5>
						<div class="share-share">
							<i class="fa fa-facebook-square" aria-hidden="true"></i>
							<i class="fa fa-instagram" aria-hidden="true"></i>
							<i class="fa fa-twitter-square" aria-hidden="true"></i>
						</div>
				</div> -->