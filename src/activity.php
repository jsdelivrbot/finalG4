<?xml version="1.0" encoding="utf-8" standalone="no"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>ZeroGravity</title>
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link rel="stylesheet" type="text/css" href="css/googleMap.css">
	<!-- <script src="js/star.js"></script> -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

	<!-- maginic -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
     <link rel="stylesheet" type="text/css" href="css/magnific-popup.css">
     <script src="js/jquery.magnific-popup.js"></script>

   
     <script src="js/googleMap.js?<%=Timer%>"></script>
     

      <!-- fullpage -->
     <!-- <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script> -->
     <link rel="stylesheet" type="text/css" href="css/jquery.fullPage.css" />
     <script type="text/javascript" src="js/jquery.fullpage.min.js"></script>
     

  
    

	
	<!-- calendar -->
	<link rel="stylesheet" type="text/css" href="libs/pg-calendar/demo/css/semantic.ui.min.css">
	<link rel="stylesheet" type="text/css" href="libs/pg-calendar/demo/css/prism.css" />
	<link rel="stylesheet" type="text/css" href="libs/pg-calendar/demo/css/calendar-style.css" />
	<link rel="stylesheet" type="text/css" href="libs/pg-calendar/demo/css/style.css" />
	<link rel="stylesheet" type="text/css" href="libs/pg-calendar/src/css/pignose.calendar.css" />
	<link type="text/css" href="libs/pg-calendar/dist/pignose.calendar.min.css">

	
	<script type="text/javascript" src="libs/pg-calendar/demo/js/semantic.ui.min.js"></script>
	<script type="text/javascript" src="libs/pg-calendar/demo/js/prism.min.js"></script>
	<script type="text/javascript" src="libs/pg-calendar/vender/moment.min.js"></script>
	<script src="libs/pg-calendar/src/js/pignose.calendar.js"></script>
	<script src="js/jquery.mobile.custom.min.js"></script>
	<script type="text/javascript" src="js/nav2.js"></script>
	<script src="js/activity-1.js?<%=Timer%>""></script>

<style>
	*{
		/*outline: 1px solid red;*/

	}

	#section1{

		/*background-image: url(img/p_p_007.png);*/
		background: linear-gradient(to top, #585858 0%, #43536b 50%, #465565 85%, #000000 100%);
		-webkit-background-size: cover;
		background-size: cover;
	}
	
	
	
	#a1-star{
		stroke-dashoffset: 3000;
		stroke-dasharray: 3000;
		animation: circle 10s linear both;
		
	}

	@keyframes circle{
		100%{ stroke-dashoffset:0;}
	}
	#tit{
		opacity: 0;
		animation: fadeIn 5s both;
	}
	@keyframes fadeIn{
		100%{ opacity: 1;}
	}
	.a-btn{
		
		/*margin: auto;		*/
		z-index: 10;
	}
	nav{
		z-index: 10;
	}
	.myContent{
        height: 50vh;
      }
  .wrap {
  	width: 100%;
	  position: absolute;
	  bottom: -200px;
	  left: 0;
	}

		

/* Frame */

.frame {
  /*height: 250px;*/
  /*line-height: 250px;*/
  /*overflow: hidden;*/
}

.frame ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  font-size: 12px;
}

.frame ul li {
  float: left;
  width: 227px;
  height: 100%;
  margin: 0 10px 0 0;
  padding: 0;
  background: url(img/a_002.jpg);
  color: #ddd;
  text-align: center;
  cursor: pointer;

}

.frame ul li.active {
  color: #fff;
  background: #a03232;
}


/* Scrollbar */

.scrollbar {
  margin: 0 0 1em 0;
  height: 2px;
  background: #666;
  line-height: 0;
}

.scrollbar .handle {
  width: 100px;
  height: 100%;
  background: #f00;
  cursor: pointer;
}

.scrollbar .handle .mousearea {
  position: absolute;
  top: -9px;
  left: 0;
  width: 100%;
  height: 20px;
}


/* Pages */

.pages {
  list-style: none;
  margin: 20px 0;
  padding: 0;
  text-align: center;
}

.pages li {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin: 0 4px;
  text-indent: -999px;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  background: #fff;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .2);
}

.pages li:hover {
  background: #aaa;
}

.pages li.active {
  background: #666;
}


/* Controls */

.controls {
  margin: 25px 0;
  text-align: center;
}


/* One Item Per Frame example*/

.oneperframe {
  height: 300px;
  line-height: 300px;
}

.oneperframe ul li {
  width: 1140px;
}

.oneperframe ul li.active {
  background: #333;
}


/* Crazy example */

.crazy ul li:nth-child(2n) {
  width: 100px;
  margin: 0 4px 0 20px;
}

.crazy ul li:nth-child(3n) {
  width: 300px;
  margin: 0 10px 0 5px;
}

.crazy ul li:nth-child(4n) {
  width: 400px;
  margin: 0 30px 0 2px;
}
.a-actItem{
	width: 100%;	
}
.a-actItem img{
	width: 100%;	
}
.scrollable-element{
            height: 100vh;
            width:100%;
            /*overflow-y: scroll;*/
            margin: 0 auto;
        }
#map-canvas {
  margin: 0;
  padding: 0;
  height: 400px;
  max-width: none;
}
#map-canvas img {
  max-width: none !important;
}
.gm-style-iw {
  cursor: pointer;
  height: 40px;
  width: 200px !important;
  top: 15px !important;
  left: 20px !important;
  background-color: #fff;
  box-shadow: 0 1px 6px rgba(178, 178, 178, 0.6);
  border: 2px 2px 0px 2px  solid rgba(72, 181, 233, 0.6);
  border-radius: 10px 10px 10px 10px;
}
#iw-container {
  margin-bottom: 10px;
}
#iw-container .iw-title {
  display: block;
  text-align: center;
  width:200px !important;
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 10px;
  background-color: #48b5e9;
  color: white;
  margin: 0;
  border-radius: 2px 2px 0 0;
}
#iw-container .iw-content {
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
  margin-right: 1px;
  padding: 15px 5px 20px 15px;
  max-height: 140px;
  overflow-y: auto;
  overflow-x: hidden;
}
.iw-content img {
  float: right;
  margin: 0 5px 5px 10px; 
}
.iw-subTitle {
  font-size: 16px;
  font-weight: 700;
  padding: 5px 0;
}
.iw-bottom-gradient {
  position: absolute;
  width: 326px;
  height: 25px;
  bottom: 10px;
  right: 18px;
  background-color: #fff;
  background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(66,255,255,1) 100%);
  background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(66,255,255,1) 100%);
  background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(66,255,255,1) 100%);
  background: -ms-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(66,255,255,1) 100%);
}       
</style>

</head>

<body id="a1-body">
<!-- <canvas id="a-canvas">
</canvas> -->
<!-- 導覽列 -->
   <nav id="nav">
        <div class="relative">
            <div class="row">
                <div id="ham">
                    <i class="fa fa-bars" aria-hidden="true"></i>
                </div>
                <div id="logo">
                    <a href="home.html"><img src="img/logo.png" alt="ZeroGravity"></a>
                </div>
                <ul class="mainMenu menu">
                    <li><a href="activity.php" class="onThisPage">觀星活動</a></li>
                    <li><a href="forum.html">星際論壇</a></li>
                    <li><a href="photo.html">照片牆</a></li>
                    <li><a href="article.html">星知識</a></li>
                    <li><a href="for_newer.html">觀星指南</a></li>
                </ul>
                <ul class="mainMenu signArea">
                    <ul class="subMenu">
                        <li><a href="member.html"><i class="fa fa-user-circle" aria-hidden="true"></i>會員專區</a></li>
                        <li><a href="#"><i class="fa fa-wpexplorer" aria-hidden="true"></i>我的活動</a></li>
                        <li>
                            <a href="#">
                                <i class="fa fa-grav" aria-hidden="true"></i>我的貼文</a>
                        </li>
                        <li><a href="#"><i class="fa fa-camera" aria-hidden="true"></i>
                        我的照片</a></li>
                        <li><a href="#"><i class="fa fa-star" aria-hidden="true"></i>我的收藏</a></li>
                        <li><a href="#" id="logOut">登出</a></li>
                    </ul>
                    <li id="navMemPhoto">
                        <img src="">
                    </li>
                    <li id="navMemInfo">
                        <span id="navMemberName"></span>
                    </li>
                    <li id="signLeft">
                        <span><a href="#" id="navSignup">註冊</a></span>
                    </li>
                    <li id="signRight">
                        <span><a href="#" id="navLogin"><i class="fa fa-user" aria-hidden="true"></i></a></span>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
<!-- 導覽列結束 -->

<div id="fullpage">
<div class="section" id="section0">
	<header id="aa-header" class="col-xs-12  col-sm-12 col-md-12  a-banner"> 
		<!-- <div class="container "> -->
		<div class="row">
			<!-- h1＋svg動畫開始 -->
			<svg id="a1-star">
				<g>
				  <title>Layer 1</title>
				  <polygon transform="rotate(0 279.40002441406256,210.50000000000003) " id="svg_3" fill-opacity="0.1" stroke-width="3" stroke="rgba(195, 213, 218, .7)" points="433.8207702636719,210.5 356.61041259765625,344.2323303222656 202.1896209716797,344.2323303222656 124.97923278808594,210.5 202.1896209716797,76.76766967773438 356.61041259765625,76.76766967773438 433.8207702636719,210.5 " strokeWidth="1" strokecolor="#000000" fill="#000000" edge="154.420782" orient="x" sides="6" shape="regularPoly" cy="210" cx="279.399994">
				  <animateTransform attributeType="xml"
				                    attributeName="transform"
				                    type="rotate"
				                    from="0 279.399994 210"
				                    to="360 279.399994 210"
				                    dur="40s"
				                    repeatCount="indefinite"/>
				 </polygon>
				  <polygon fill-opacity="0" stroke-width="3" stroke="rgba(13, 209, 215, .8)" points="433.820775457056,210 356.6103846767702,343.7323197037026 202.1896031161986,343.7323197037026 124.97921233591276,210.00000000000003 202.1896031161985,76.26768029629739 356.6103846767702,76.26768029629739 433.820775457056,210 " strokeWidth="1" strokecolor="#000000" fill="#000000" edge="154.420782" orient="x" sides="6" shape="regularPoly" id="svg_1" cy="210" cx="279.399994">
				  <animateTransform 
	                    attributeName="transform"
	                    type="rotate"
	                    from="0 279.399994 210"
	                    to="-360 279.399994 210"
	                    dur="40s"
	                    repeatCount="indefinite"/>
				  </polygon>
				  <text id=tit x="200" y="230" fill="#fff"  style="font:40px 微軟正黑體;font-weight: 800; text-shadow: 1px 10px 10px #000">觀星活動
					  
				  </text>
				  <!-- <text x="200" y="200" fill="none" stroke="red" style="font:70px 標楷體;writing-mode:tb;">你好!?</text> -->

				 </g>
			</svg>
		    <!-- h1的svg動畫結束 -->
			<p class="a-title">
				<i class="fa fa-quote-left" aria-hidden="true"></i>體驗觀星的感性與知性<i class="fa fa-quote-right" aria-hidden="true"></i>
			</p>
			<div class="a-btn">
				<div class="btn-lg btn-blue a1-btn">
					<a href="activity_recommend.html">推薦活動</a>
				</div>
				<div class="btn-lg btn-blue a1-btn">
					<a href="activity_addACT.html">新增活動</a>
				</div>
				<div class="a-down">
					<i class="fa fa-angle-double-down" aria-hidden="true"></i>
				</div>
			</div>
			<div class="clear"></div>
		</div>		
		<!-- </div> -->
	</header><!-- /header -->
</div>
   <!-- session0結束 -->


<div class="section" id="section1">
	<!-- <div class="container"> -->
  <main>
	<div class="a-map">

	<div class="container" style="width: 100%;">
		<div class="row">
<!-- right 活動區塊 -->
			<div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 a-mR">
				<div class="a-panel">
					<div class="a-controls">
					<!-- 上方選單 -->
						<div class="a-panel-top">

							<!-- <div class="aa-location">
								<div class="a-searchInput">
									<i class="fa fa-search a-phone-icon" aria-hidden="true" ></i>
									<input id="pac-input" class="controls" type="text" placeholder="找活動搜尋一下！">
								</div>
							</div> -->
							<!-- 說明 -->
							<div class="aa-desc col-sm-12 col-md-12 col-lg-12">
								<h3><i class="fa fa-hand-o-right" aria-hidden="true"></i>找尋你喜歡的觀星活動，可以這樣做！</h3>
								<ul>
									<li>方法1：直接在<span>地圖</span>上進行搜尋</li>
									<li>方法2：使用下方<span>篩選條件</span>進行搜尋</li>
								</ul>
								
							</div>


							<!-- date -->
							<div class="aa-search-area  col-sm-12 col-md-12 col-lg-12">
							    <div class="a-panel-item aa-date col-sm-4 col-md-4 col-lg-4">
							    <div class="aa-test aa-test1">
									<p class="a-text aa-date"><i class="fa fa-calendar-o" aria-hidden="true"></i>選擇活動日期</p>
									<div class="a-panel-date">
										<div id="wrapper">
											<input type="text" id="a-date-control" placeholder="選擇可參加活動期間"/>
											<div id="multiple">
									            <div class="calendar-dark"></div>
											</div>			
										</div>
									</div>
								</div>
								</div>
								<!-- date end -->
								<!-- type -->
								<div class="a-panel-item col-sm-4 col-md-4 col-lg-4">
								 <div class="aa-test">
									<p class="a-text"><i class="fa fa-tags" aria-hidden="true"></i>選擇活動類型</p>
									<ul>
										<a href="#" class="a-all"><input type="hidden" name="all" value="all" placeholder="" id="a-all"><li>全部</li></a>
										<a href="#" class="a-getDate"><input type="hidden" name="" value="1" placeholder=""><li>天文攝影</li></a>
										<a href="#" class="a-getDate"><input type="hidden" name="" value="2" placeholder=""><li>天文觀測</li></a>
										<a href="#" class="a-getDate"><input type="hidden" name="" value="3" placeholder=""><li>親子觀星</li></a>
										<a href="#" class="a-getDate"><input type="hidden" name="" value="4" placeholder=""><li>休閒聯誼</li></a>
									</ul>
								</div>
								</div>
								<!-- type end -->

								<!-- location -->
								<div class="a-panel-item col-sm-4 col-md-4 col-lg-4">
								 <div class="aa-test">
									<p class="a-text"><i class="fa fa-map-marker" aria-hidden="true"></i>選擇活動地點</p>
									<ul>
										<a class="a-all" href="#"><li>全部</li></a>
										<a href="#" class="a-getLatLng" id="a-north"><input type="hidden" name="" value="25.0000000" placeholder=""><li>北部地區</li></a>
										<a href="#" class="a-getLatLng" id="a-center"><input type="hidden" name="" value="22.0000000" placeholder=""><li>中部地區</li></a>
										<a href="#" class="a-getLatLng" id="a-south"><input type="hidden" name="" value="20.0000000" placeholder=""><li>南部地區</li></a>
										<a href="#" class="a-getLatLng" id="a-east"><input type="hidden" name="" value="24.0000000" placeholder=""><li>東部地區</li></a>
									</ul>
								</div>
								</div>
								<!-- location end -->
							</div>
						</div>
							
					<!-- oldslider -->
					<!-- <div id="a-oldSlider" class="element2"> -->
						<a class="a-phone-control" href="activity_phone_map.html">
							<div class="a-phone-btn btn-lg btn-blue" id="a-phone-mapBtn">
								地圖搜尋
							</div>
						</a>
						<div class="row scrollable-element" id="">
							<!-- <div class="col-xs-12 col-sm-12 col-md-12">
								<div class="a-tab">
									<div><p>最近時間</p></div>
									<div><p>最高瀏覽</p></div>
									<div><p>最多收藏</p></div>
								</div>	
							</div> -->
					<!-- 手機search bar -->
						<div class="col-xs-12 col-md-12 col-lg-12 a-phone-search">
							<i class="fa fa-search a-phone-icon" aria-hidden="true" ></i>
							<input id="a-phone-input_1" type="text" name="" value="" placeholder="搜尋日期、類型、地點">
								<i class="fa fa-chevron-up" aria-hidden="true"></i>
								<i  class="a-phone-input fa fa-clock-o a-phone-icon-2" aria-hidden="true"></i>
								<input type="text" class="a-phone-input" placeholder="依日期">
								<i  class="a-phone-input fa fa-star-o a-phone-icon-2" aria-hidden="true"></i>
								<input type="text" class="a-phone-input" placeholder="依類型">
								<i  class="a-phone-input fa fa-globe a-phone-icon-2" aria-hidden="true"></i>
								<input type="text" class="a-phone-input" placeholder="依地點">
						</div>
					<!-- 手機search bar結束 -->
					<!-- 下方活動區塊 -->
						<div class="a-scrollArea" id="aa-activities">
							<div class="col-xs-12 col-sm-12 col-md-12 a-pReset" id="a-add">
				<!-- 活動產出區 -->
				<?php 
					try {
						require_once("php/connect.php");

						$sql = "select * from act join actCla using(actCla_no) where act_state=1";
						$act = $pdo->prepare($sql);
						$act->execute();
					    while($actRow = $act->fetch()){

					    	$str = '<div class="col-xs-12 col-sm-6 col-md-6 a-remove">
									<div class="aa-box a-actLink">
										<div class="box-img">
											<img src="'.$actRow["act_img"].'" alt="" >
										</div>
										<div class="box-text">
											<h4>'.$actRow["act_name"].'</h4>
											
											<p class="aa-date">'.$actRow["act_startDate"].'~'.$actRow["act_endDate"].'</p>
											<p class="aa-desc">
												'.((mb_strlen($actRow["act_info"], "UTF8")>10) ? mb_substr($actRow["act_info"],0,10, "UTF8") : $actRow["act_info"])
														.' '.((mb_strlen($actRow["act_info"], "UTF8")>10) ? nl2br(' ...') : nl2br('')).'
											</p>
											<div class="aa-btn-area">
												<div class="social-icon">
													<i class="fa fa-star-o" aria-hidden="true"></i><span>20人收藏</span>
												</div>
												<div class="aa-btn btn-blue btn-lg">
													<a href="" class="ff_lightbox_link">熱烈報名中</a>
													<input type="hidden" name="" value="'.$actRow["act_no"].'" class="a-act_no">
												</div>
												<div class="clear"></div>
											</div>
										</div>
										<div class="aa-tag">
											<span>'.$actRow["actCla_name"].'</span>
										</div>	
									</div>
								</div>';
					    	echo $str;
					    }
					} catch (Exception $e) {
						
					}

				?><!-- 單則活動結束 -->
								
				</div><!-- a-add end -->
							<!-- <div id="aa-more">
								<a href="#">載入更多</a>
							</div> -->
						</div>
					    <!-- 活動區結束 scrollArea -->	
					</div>
					<!-- a-controls結束 -->
				</div>
				<!-- a-panel結束 -->
			</div>
		</div>
<!-- left googleMap -->
			<div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 googleMap a-mL a-main-map">

				<div id="zero"></div>
			      <div id="map">
			      	
			      </div>
				<!-- <img src="img/a_014.jpg" alt="" class="rwd-img"> -->
			</div>
		</div>
	</div>
	</div>
			
   </main>
</div><!-- fullpage	 -->

<!-- 單則活動內容 -->







<div id="ff_lightbox"  style="transform: scale(0);" class="a-activity-lightbox element2">
<section id="a_1activity_wrapper" >
   <div id="close-btn">
		<div id="closeIt">CLOSE</div>
		 <!-- <svg class="closeIco" xmlns="img/close.svg" version="1.1"></svg> -->
		<img class="closeIco" src="img/close.svg" alt="close icon">
	</div>
	<div class="container">
	<div class="aa_content">
		<div class="aa_banner">
			<div class="aa_info">
				<h3 id="a-lb-act_name"></h3>
				<p id="a-lb-act_info"></p>
				<span class="Organiser"><i class="fa fa-user-o" aria-hidden="true"></i>主辦人：<div class="a-lb-content">Leo S</div></span>
				<span><i class="fa fa-calendar-o" aria-hidden="true"></i><div class="a-lb-content"  id="a-lb-act_date"></div></span>
				<span class="type"><i class="fa fa-tags" aria-hidden="true"></i>類型：<div id="a-lb-actCla_name" class="a-lb-content"></div></span>
				<span class="location"><i class="fa fa-map-marker" aria-hidden="true"></i>地點：<div id="a-lb-act_place" class="a-lb-content"></div></span>
				<span class="cost"><i class="fa fa-money" aria-hidden="true"></i>費用：<div id="a-lb-act_price" class="a-lb-content"></div>元</span>
				<div class="btn-lg btn-blue"><a href="">我要報名</a></div>
			</div>
		</div>
		<div class="aa_comments">
			<div class="container">
				<div class="row" id="a-comm">
					<h4>主辦人-評價Comment</h4>

<!-- 	try {
		require_once("php/connect.php");
		$sql = "select * from actMsg,act where act.act_no=";
		$actMsg = $pdo->prepare($sql);
		$actMsg->execute();

		while($actMsgRow = $actMsg->fetch()){
			echo '<div class="comment ct1">
				<div class="user">
					<div class="user-pic">
						<img src="img/i-member2.png">
					</div>
					<div class="user-info">
						<span><a href="">Kattie918</a></span>
					</div>
				</div>
				<div class="ct-content">
					<p>參加活動：'.$actMsgRow["act_name"].'<span class="ct-stars"><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></span></p>
					<p>'.$actMsgRow["actMsg_content"].'</p>
					<p>2015-06-01 11:00</p>
				</div>
				<div class="clear"></div>
			</div>';
		}
	} catch (Exception $e) {
		
	}
 -->
 
<!-- 
			<div class="comment ct1">
				<div class="user">
					<div class="user-pic">
						<img src="img/i-member2.png">
					</div>
					<div class="user-info">
						<span><a href="">Kattie918</a></span>
					</div>
				</div>
				<div class="ct-content">
					<p>參加活動：2015年墾丁南十字觀星攝影<span class="ct-stars"><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></span></p>
					<p>主辦很細心，活動安排很讚。很推薦大家參加他的活動唷！</p>
					<p>2015-06-01 11:00</p>
				</div>
				<div class="clear"></div>
			</div> -->
<!-- 			<div class="comment ct2">
				<div class="user">
					<div class="user-pic">
						<img src="img/i-member2.png">
					</div>
					<div class="user-info">
						<span><a href="">Kattie918</a></span>
					</div>
				</div>
				<div class="ct-content">
					<p>參加活動：2015年墾丁南十字觀星攝影<span class="ct-stars"><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></span></p>
					<p>主辦很細心，活動安排很讚。很推薦大家參加他的活動唷！</p>
					<p>2015-06-01 11:00</p>
				</div>
				<div class="clear"></div>
			</div>
			<div class="comment ct3">
				<div class="user">
					<div class="user-pic">
						<img src="img/i-member2.png">
					</div>
					<div class="user-info">
						<span><a href="">Kattie918</a></span>
					</div>
				</div>
				<div class="ct-content">
					<p>參加活動：2015年墾丁南十字觀星攝影<span class="ct-stars"><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></span></p>
					<p>主辦很細心，活動安排很讚。很推薦大家參加他的活動唷！</p>
					<p>2015-06-01 11:00</p>
				</div>
				<div class="clear"></div>
			</div>
			<div class="comment ct4">
				<div class="user">
					<div class="user-pic">
						<img src="img/i-member2.png">
					</div>
					<div class="user-info">
						<span><a href="">Kattie918</a></span>
					</div>
				</div>
				<div class="ct-content">
					<p>參加活動：2015年墾丁南十字觀星攝影<span class="ct-stars"><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></span></p>
					<p>主辦很細心，活動安排很讚。很推薦大家參加他的活動唷！</p>
					<p>2015-06-01 11:00</p>
				</div>
				<div class="clear"></div>
			</div> -->
			</div>
			</div>
		</div>
	</div>	
</section>
</div>
<!-- 單則活動內容完 -->



<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDtYAguCIykzC-F3lBBYbxLEbQAPqUhFvo&libraries=places&callback=initMap"></script>

<!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCoawYvLTgMObeyY-Ng0r4-f-vLhWoZZxQ&libraries=places&callback=initAutocomplete"
         async defer></script> -->
<div class="loginPopup">
        <div class="i-lightboxBg"></div>
        <div class="login">
            <h4>會員登入</h4>
            <!-- <form action="php/login.php" method="post"> -->
            <input id="loginAccount" type="Email" value="guest" name="memEmail">
            <input id="loginPsw" type="password" value="guest" name="memPsw" maxlength="12" minlength="4">
            <input id="loginConfirmPsw" type="password" placeholder="*確認密碼" maxlength="12" minlength="4">
            <input id="loginMemName" type="text" placeholder="*暱稱(2~12個字元)" name="memName" maxlength="12" minlength="2">
            <input type="submit" class="searchBar-btn" id="i-loginBtn" value="登入">
            <!-- <div class="searchBar-btn" id="i-loginBtn">
                    <a href="#">登入</a>
                </div> -->
            <!-- </form> -->
            <div class="logOn">
                按此註冊會員
            </div>
        </div>
    </div>
</body>

</html>
<!-- <script type="text/javascript">
	$(".a-getDate").click(function(e){
console.log("input",$(this).children("input").val());
})
</script> -->


<!-- <script type="text/javascript">
$(function(){
  $('#navButton').click(function(){
    if($('.mainMenu.menu').hasClass('open')){
       $('#nav').animate({'background-color':'rgba(0,0,0,0.6)'},500);
      $('body').css('overflow','visible');
      $('#navButton').children('i').attr('class', 'fa fa-bars');
      $('.mainMenu.menu').stop().animate({'left':'-100%'},400).removeClass('open');
    }else{
      $('#nav').animate({'background-color':'#020202'},500);
      $('.mainMenu.menu').stop().animate({'left':'0'},400).addClass('open');
      $('body').css('overflow','hidden');
      $('#navButton').children('i').attr('class','fa fa-times');
    }
  })

var mem = JSON.parse(localStorage.getItem('mem'));


    //判定會員登入==================================
    if (localStorage.mem) {
        $('.mainMenu.signArea').children('li').css('display', 'none');
        $('#navMemPhoto').css('display', 'inline-block').find('img').attr('src', mem.mem_img);
        $('#navMemInfo').css('display', 'inline-block').find('#navMemberName').text(mem.mem_name);
    }
    //會員登入=====end==========


    $('#logOut').click(function() {
        localStorage.clear('mem');
        $('.subMenu').removeClass('show');
        $('#navMemPhoto').css('display', 'none').siblings('#navMemInfo').css('display', 'none')
            .siblings('#signLeft').css('display', 'inline-block')
            .siblings('#signRight').css('display', 'inline-block');
    })

    var lightBoxBg = $('.i-lightboxBg');

    $('#navLogin').click(function(e) {
        e.preventDefault();
        onLogin();
        loginSwitch();
        lightBoxBg.css('background-color', 'rgba(0,0,0,0.7)');
    });


    $('#navSignup').click(function(e) {
        e.preventDefault();
        onLogin();
        signUpSwitch();
        lightBoxBg.css('background-color', 'rgba(0,0,0,0.7)');
    })


    lightBoxBg.click(offLogin);

    $('.logOn').click(function() {
        if ($(this).text() == '我要登入') {
            loginSwitch();
        } else {
            signUpSwitch();
        }
    })


    //切換登入註冊
    function signUpSwitch() {
        $('.logOn').text('我要登入')
            .siblings('h4').text('會員註冊')
            .siblings('#i-loginBtn').val('註冊')
            .siblings('#loginConfirmPsw').stop().fadeIn(400)
            .siblings('#loginMemName').stop().fadeIn(400)
            .siblings('#loginAccount').attr('placeholder', '*帳號(Email)').val('')
            .siblings('#loginPsw').attr('placeholder', '*密碼(4~12個字元)').val('');
    }
    //切換登入註冊
    function loginSwitch() {
        $('#i-loginBtn').val('登入')
            .siblings('h4').text('會員登入')
            .siblings('#loginConfirmPsw').stop().slideUp(400)
            .siblings('#loginMemName').stop().slideUp(400)
            .siblings('#loginAccount').attr('placeholder', '*帳號(Email)')
            .siblings('#loginPsw').attr('placeholder', '*密碼(4~12個字元)')
            .siblings('.logOn').text('我要註冊');
    }


    function offLogin() {
        $('.loginPopup').css({
            'display': 'none'
        });
        $('.login').css({
            'display': 'none'
        });
        $('#nav').stop().fadeIn(600);
        $('body').css({
            'overflow': 'visible'
        });
    }

    function onLogin() {
        $('.loginPopup').css({
            'display': 'block'
        });
        $('.login').css({
            'display': 'block'
        });
        $('#nav').stop().slideUp(600);
        $('body').css({
            'overflow': 'hidden'
        });
        $('#loginAccount').val('guest');
        $('#loginPsw').val('guest');
    }

    $('#navMemPhoto').click(function() {
        $('.subMenu').toggleClass('show');
    })


    $('#i-loginBtn').click(function(e) {
        e.preventDefault();
        if ($('#i-loginBtn').val() == '登入') {
            $.ajax({ //會員登入============
                    type: 'GET',
                    url: 'php/login.php',
                    data: {
                        memEmail: $('#loginAccount').val(),
                        memPsw: $('#loginPsw').val()
                    },
                    dataType: 'json',
                    success: function(res) {
                        if (res.msg) {
                            loginFail();
                        } else {
                            var memInfo = {
                                'mem_no': res.mem_no,
                                'mem_name': res.mem_name,
                                'mem_img': res.mem_img
                            }
                            localStorage.setItem("mem", JSON.stringify(memInfo));
                            $('.mainMenu.signArea').children('li').css('display', 'none');
                            $('#navMemPhoto').css('display', 'inline-block').find('img').attr('src', res.mem_img);
                            $('#navMemInfo').css('display', 'inline-block').find('#navMemberName').text(res.mem_name);
                            offLogin();
                        }
                    }

                }) //會員登入============end========
        } else {
            if ($('#loginPsw').val() == $('#loginConfirmPsw').val()) {
                $.ajax({ //會員註冊==============
                    type: 'POST',
                    url: 'php/login.php',
                    data: {
                        memEmail: $('#loginAccount').val(),
                        memPsw: $('#loginPsw').val(),
                        memName: $('#loginMemName').val()
                    },
                    dataType: 'json',
                    success: function(res) {
                        if (res.msg == "fail") {
                            regisFail();
                        } else {
                            var memInfo = {
                                'mem_no': res.mem_no,
                                'mem_name': res.mem_name,
                                'mem_img': res.mem_img
                            }
                            localStorage.setItem("mem", JSON.stringify(memInfo));
                            window.location.href = "member.html";
                        }
                    }
                })
            } else {
                wrongPsw();
            }
        } //會員註冊======end========
    })
    $('.login').children('input').on('focus', function() {
        $(this).siblings('p').remove();
    })

    function loginFail() {
        var temp = '<p style="color:red">請確認您的帳號密碼</p>';
        $('#loginAccount').val('').attr('placeholder', '*帳號(Email)')
            .siblings('#loginPsw').val('').attr('placeholder', '*密碼(4~12個字元)')
            .siblings('#i-loginBtn').siblings('p').remove().end().before(temp);
    }


    function regisFail() {
        var temp = '<p style="color:red">帳號已被註冊或空白</p>';
        $('#loginAccount').val('').attr('placeholder', '*帳號(Email)')
            .siblings('#loginPsw').val('').attr('placeholder', '*密碼(4~12個字元)')
            .siblings('#loginMemName').val('').attr('*暱稱(2~12個字元)')
            .siblings('#i-loginBtn').siblings('p').remove().end().before(temp);
    }

    function wrongPsw() {
        var temp = '<p style="color:red">請確認密碼</p>';
        $('#loginPsw').val('').attr('placeholder', '*密碼(4~12個字元)')
            .siblings('#i-loginBtn').siblings('p').remove().end().before(temp);
    }




  
})	
</script>
 -->



