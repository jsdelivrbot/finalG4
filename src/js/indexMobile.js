
$(function(){
    $(window).resize(function(){
         wdth=$(window).width();
         if(wdth < 768){
            goSmall();
         }else{
             goBig();
         }
    })
})
    function goSmall(){
        window.location.href = "mobile.html";
    }
    function goBig(){
        window.location.href = "index.html";
    }


 $(document).ready(
     function() {
         nowpage = 0;
         stay = 1;
         _sideBarPosY = 175;
         $("#i-wrapper").swipe({
             swipe: function(event, direction, distance, duration, fingerCount) {
              console.log(nowpage);//事件，方向，距離（px），時間，手指數量
                 if (direction == "up") {
                    if(nowpage==1){
                        if(stay<3){
                            stay++;
                            $('.act0'+stay).prev().fadeOut(1000).css({'display':'none'});
                            $('.act0'+stay).css({'display':'block'}).addClass('flyin');
                        }else{
                          stay=0;
                          $('.act03').css({'display':'none'});
                          nowpage = nowpage + 1;
                        }
                    }else{
                     nowpage = nowpage + 1;
                    }
                    
                 } else if (direction == "down") {
                    if(nowpage==1){
                        if(stay<3){
                            stay++;
                            $('.act0'+stay).prev().fadeOut(1000).css({'display':'none'});;
                            $('.act0'+stay).css({'display':'block'}).addClass('flyin');
                        }else{
                          stay=0;
                          $('.act03').css({'display':'none'});
                          nowpage = nowpage - 1;
                        }
                    }else{
                      nowpage = nowpage - 1;  
                    }   
                 }

                 if (nowpage > 5) {
                     nowpage = 5;
                 }

                 if (nowpage < 0) {
                     nowpage = 0;
                 }
                    moveBody();
                 
             }
         });
     }
 ); //ready

function fly(){
     $('.act0'+stay).css({'display':'block'}).addClass('flyin');
}

function moveBody(){
     $("#i-wrapper").animate({ "top": nowpage * 100 + "%" }, 400);
        clearCanvas();
        _sideBarPosY = 175 - nowpage * 30;
        doFirst();
        if(nowpage==1){
            fly();
        }
}

$(function(){

    $('#sideBar1').click(function(){
        nowpage = 0;
        moveBody();
    });
    $('#sideBar2').click(function(){
        nowpage = 1;
        moveBody();
    });
    $('#sideBar3').click(function(){
        nowpage = 2;
        moveBody();
    });
    $('#sideBar4').click(function(){
        nowpage = 3;
        moveBody();
    });
    $('#sideBar5').click(function(){
        nowpage = 4;
        moveBody();
    });
    $('#sideBar6').click(function(){
        nowpage = 5;
        moveBody();
    });
})


 $(function() {
     var gallery = $(".gallery"),
         _currdeg = 0,
         _currPos = 0;

     for (var i = 0; i < $('.photoBar img').length; i++) {
         var picBig = $('.gallery .photo:eq(' + i + ')').attr('src');
         var pic = $('.photoBar img:eq(' + i + ')');
         pic.attr('src', picBig);
     }

     //mobile
     $('.photoBar img').click(function() {
         var _movePos = $(this).index();
         var _moveDist = _movePos - _currPos;
         _currdeg = _currdeg - _moveDist * 45;
         _currPos = _movePos;
         gallery.css({
             "transform": "rotateY(" + _currdeg + "deg)"
         });
         $(this).siblings().removeClass('shadow');
         $(this).addClass('shadow');

     })
     $(".gallery .pic").click(function() {
         var _movePos = $(this).index();
         var _moveDist = _movePos - _currPos;
         _currdeg = _currdeg - _moveDist * 45;
         _currPos = _movePos;
         gallery.css({
             "transform": "rotateY(" + _currdeg + "deg)"
         });

         $(this).siblings().children('.picContainer').removeClass('shadow');
         $(this).children('.picContainer').addClass('shadow');
         $(this).siblings().children('.picContainer').children('a').css('display', 'none');
         $(this).children('.picContainer').children('a').css('display', 'block');
     })

     $(".gallery .pic").swipe({
             swipe: function(event, direction, distance, duration, fingerCount) { //事件，方向，距离（像素为单位），时间，手指数量
                 if(direction=="left"){
                     _currdeg += 45;
                    gallery.css({
                        "transform": "rotateY(" + _currdeg + "deg)"
                     });
                    console.log('++');
                      if(_currPos>7){
                            _currPos = 0;
                        }else{
                            _currPos++;
                        }
                 }else if(direction=="right"){
                    _currdeg -= 45;
                    gallery.css({
                        "transform": "rotateY(" + _currdeg + "deg)"
                     });
                    console.log('--');
                      if(_currPos<0){
                            _currPos = 7;
                        }else{
                            _currPos--;
                        }
                 }
             }
            });

        $(".photoBar").swipe({
             swipe: function(event, direction, distance, duration, fingerCount) { //事件，方向，距离（像素为单位），时间，手指数量
                 if(direction=="left"){
                    $('.photoBar .photoBarHidden').animate({
                        'left': '-172px'
                    },400);
                 }else if(direction=="right"){
                    $('.photoBar .photoBarHidden').animate({
                        'left': '0px'
                    },400);
                 }
             }
         });
 })



$(function(){
            $('#searchBarMobile').focus(function() {
            $('.searchDetail').stop().slideDown(400);
            $('#nav').fadeOut(400);
        });
        $('.searchDetail .fa-times').click(function() {
            $('.searchDetail').stop().slideUp(400);
            $('#nav').slideDown(600);
        })
})



$(function shoot(){
    function shootingStar() {
        var srDrop = 5;
        for (i = 1; i < srDrop; i++) {
            var dropLeft = rand(0, 300);
            var dropTop = rand(-200, 800);

            $('.shootingStar').append('<div class="shoot" id="shoot' + i + '"></div>');
            $('#shoot' + i).css({
                'left': dropLeft,
                'top': dropTop,
                'animation': 'fall ' + rand(2, 30) + 's linear infinite'
            });
        }
    }
    shootingStar();
})

$(function(){
    $('#nav #ham').click(function() {
        if ($('.mainMenu.menu').hasClass('open')) {
            $('body').css('overflow', 'visible');
            $('#ham').children('.fa.fa-times').addClass('fa-bars').removeClass('fa-times');
            $('.mainMenu.menu').removeClass('open');
        } else {
            $('.mainMenu.menu').addClass('open');
            $('body').css('overflow', 'hidden');
            $('#ham').children('.fa.fa-bars').addClass('fa-times').removeClass('fa-bars');
        }

    })

    //導覽列 + 體驗帳號彈窗
    $('#navLogin').click(function(e){
        onLogin();
        e.preventDefault();
        $('.activity').fadeOut();
        $('#accordion').fadeOut();
        $('#accordion').fadeOut();
        $('.title').fadeOut();
        $('.forumGroup').fadeOut();
        $('.gallery').css('display','none');
    });
      $('.i-lightboxBg').click(function(){
        $('.activity').fadeIn(500);
        $('#accordion').fadeIn(500);
        $('#accordion').fadeIn(500);
        $('.title').fadeIn(500);
        $('.forumGroup').fadeIn(500);
        $('.gallery').css('display','block');
      })

    $('.join .button-square').click(onLogin);

    
    function onLogin() {
        $('.loginPopup').css({
            'display': 'block'
        });
        $('.join').fadeOut(100);
        $('.login').css({
            'display': 'block'
        });
        $('#nav').stop().slideUp(600);
        $('#icanvas').stop().slideUp(600);
        $('body').css({
            'overflow': 'hidden'
        });
        $('#loginAccount').val('guest');
        $('#loginPsw').val('guest');
        $('.join').css({'animationDelay':'0s'});
    }



    $('.i-lightboxBg').click(function() {
        $('.loginPopup').css({
            'display': 'none'
        });
        $('.join').stop().fadeIn();
        $('.login').css({
            'display': 'none'
        });
        $('#nav').stop().fadeIn(600);
        $('#icanvas').stop().slideDown(600);
        $('body').css({
            'overflow': 'visible'
        });
    })

    $('.logOn').click(function () {
        if ($(this).text() == '我要登入') {
            $(this).text('按此註冊會員');
            $('.login h4').text('會員登入');
            $('#i-loginBtn').val('登入');
            $('#loginConfirmPsw').stop().slideUp(400);
            $('#loginMemName').stop().slideUp(400);
             $('#loginAccount').attr('placeholder','*帳號(Email)');
              $('#loginPsw').attr('placeholder','*密碼(4~8個字元)');
        } else {
            $(this).text('我要登入');
            $('.login h4').text('會員註冊');
            $('#i-loginBtn').val('註冊');
            $('#loginConfirmPsw').stop().fadeIn(400);
            $('#loginMemName').stop().fadeIn(400);
            $('#loginAccount').attr('placeholder','*帳號(Email)').val('');
            $('#loginPsw').attr('placeholder','*密碼(4~8個字元)').val('');
        }
    })
})



$(function(){
    $("#accordion > li").click(function() {
            var $this = $(this);
            var other = $(this).siblings('');
            other.addClass('fakeCover');
            $this.removeClass('fakeCover');
            other.stop().animate({
                'height': '80px'
            }, 300).css({
                'z-index': '0'
            });
            $this.stop().animate({
                'height': '250px'
            }, 300).css({
                'z-index': '2'
            });
            $('.heading', $this).stop(true, true).fadeOut();
            $('.knowDescription', $this).stop(true, true).slideDown(500);
            $('.pic', $this).stop(true, true).fadeIn(1200);
            $('.description', $this).stop(true, true).fadeIn(500);
            $('.memberId', $this).stop(true, true).fadeIn(1200);
            $('.heading', other).stop(true, true).fadeIn();
            $('.knowDescription', other).stop(true, true).fadeOut(500);
            $('.pic', other).stop(true, true).fadeOut();
            $('.description', other).stop(true, true).fadeOut(500);
            $('.memberId', other).stop(true, true).fadeOut(800);
        })
})

















function rand(min, max) {
    result = min + (Math.floor(Math.random() * (max - min + 1)));
    return result;
}
 _sideMoved01 = 60;
 _sideMoved02 = 60;
 _sideMoved03 = 60;
 _sideMoved04 = 60;
 _sideMoved05 = 60;
 _sideMoved06 = 60;
 _sideBarPosX = 60;


 function doFirst() {
     icanvas = document.getElementById('icanvas');
     icontext = icanvas.getContext('2d');
     icontext.lineWidth = .6;
     icontext.fillStyle = 'white';
     icontext.strokeStyle = '#cccccc';

     icontext.beginPath();
     icontext.arc(_sideMoved06, 25, 5, 0, 2 * Math.PI, false);
     icontext.fill();

     icontext.beginPath();
     icontext.moveTo(_sideMoved06, 25);
     icontext.lineTo(_sideMoved05, 55);
     icontext.stroke();

     icontext.beginPath();
     icontext.arc(_sideMoved05, 55, 5, 0, 2 * Math.PI, false);
     icontext.fill();

     icontext.beginPath();
     icontext.moveTo(_sideMoved05, 55);
     icontext.lineTo(_sideMoved04, 85);
     icontext.stroke();

     icontext.beginPath();
     icontext.arc(_sideMoved04, 85, 5, 0, 2 * Math.PI, false);
     icontext.fill();

     icontext.beginPath();
     icontext.moveTo(_sideMoved04, 85);
     icontext.lineTo(_sideMoved03, 115);
     icontext.stroke();

     icontext.beginPath();
     icontext.arc(_sideMoved03, 115, 5, 0, 2 * Math.PI, false);
     icontext.fill();

     icontext.beginPath();
     icontext.moveTo(_sideMoved03, 115);
     icontext.lineTo(_sideMoved02, 145);
     icontext.stroke();

     icontext.beginPath();
     icontext.arc(_sideMoved02, 145, 5, 0, 2 * Math.PI, false);
     icontext.fill();

     icontext.beginPath();
     icontext.moveTo(_sideMoved02, 145);
     icontext.lineTo(_sideMoved01, 175);
     icontext.stroke();

     icontext.beginPath();
     icontext.arc(_sideMoved01, 175, 5, 0, 2 * Math.PI, false);
     icontext.fill();

     icontext.beginPath();
     icontext.lineWidth = 2;
     icontext.strokeStyle = 'white';
     icontext.arc(_sideBarPosX, _sideBarPosY, 8, 0, 2 * Math.PI, false);
     icontext.stroke();
 }




 function clearCanvas() {
     icanvas = document.getElementById('icanvas');
     icontext = icanvas.getContext('2d');
     icontext.clearRect(0, 0, icanvas.width, icanvas.height);
     _sideMoved01 = 60;
     _sideMoved02 = 60;
     _sideMoved03 = 60;
     _sideMoved04 = 60;
     _sideMoved05 = 60;
     _sideMoved06 = 60;
 }



 window.addEventListener('load', doFirst, false);





    


$(function(){
    var tt = setInterval(autoForumRotate,1000);
    _forumCount = 1;
    function autoForumRotate(){
    var _forumBoxLength = $('.forumBox').length;
    $('.forumBox').removeClass('rotate');
    $('.forumBox'+_forumCount).addClass('rotate');
    if(_forumCount>5){
      _forumCount = 1;
    }else{
      _forumCount ++ ;  
    }
    
}
})
