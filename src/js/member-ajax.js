var mem = JSON.parse(localStorage.getItem('mem'));
$(function() {

    //判定會員登入==================================
    if (localStorage.mem) {
        $('.mainMenu.signArea').children('li').css('display', 'none');
        $('#navMemPhoto').css('display', 'inline-block').find('img').attr('src', mem.mem_img);
        $('#navMemInfo').css('display', 'inline-block').find('#navMemberName').text(mem.mem_name);
        $('.m_user_img').find('img').attr('src', mem.mem_img);
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

    //===========會員end=============================================================================================






    // $.ajax({
    // 	type:'GET',
    // 	url:'php/memberForum.php',
    // 	dataType:'json',
    // 	error:function(xhr) {
    // 		// alert(xhr.status);
    // 	},

    // 	success:function(res){
    // 		// alert(res);

    // 		for(var i=0; i<res.length;i++){
    // 			var temp = '<div class="m_post_box box1"><div class="m_post_info"><h3>';

    // 				temp += res[i].pla_title;
    // 				temp += '</h3><div class="aa"><p><img src="img/forum/f_004.png"><span><a href="">';
    // 				temp += res[i].mem_name;
    // 				temp += '</a></span></p><p>';
    // 				temp += res[i].pla_date;
    // 				temp +='發表</p></div><div class="f_btn"><button>編輯</button>';
    // 				temp +='<button>刪除</button></div><div class="m_type"><p>';
    // 				temp +='天文攝影';
    // 				temp +='</p></div></div></div>';

    // 		$('.m_tab_content1 li').append(temp);

    // 		}

    // 	}
    // })

    //=================論壇=================
    $.ajax({
        type: 'POST',
        url: 'php/memberGetForum.php',
        dataType: 'json',
        data: { memNo: mem.mem_no },
        error: function(responseText) {
            console.log(responseText);
        },
        success: function(res) {
            $('.m_info_forumpost .m_value').text('已發表' + res.length + '則貼文');
            for (var i = 0; i < res.length; i++) {
                var temp = '<div class="m_post_box box1"><div class="m_post_info"><h3>';
                temp += res[i].pla_title;
                temp += '</h3><div class="aa"><p><img src="' + res[i].mem_img + '"><span><a href="">';
                temp += res[i].mem_name;
                temp += '</a></span></p><p>';
                temp += res[i].pla_date;
                temp += '發表</p></div><div class="f_btn"><input type="hidden" value="' + res[i].pla_no + '"><button class="delForum">刪除</button>';
                temp += '<button class="checkPla">查看</button></div><div class="m_type"><p>';
                temp += res[i].plaCla_name;
                temp += '</p></div></div></div>';
                $('.m_activity_table1').append(temp);
            }
        }
    })

    $('body').on('click', '.delForum', function() {
        var $this = $(this);
        var plaNo = $(this).siblings('input').val();
        $.ajax({
            type: 'POST',
            url: 'php/memDelForum.php',
            dataType: 'json',
            data: {
                pla_no: plaNo
            },
            error: function(responseText) {
                console.log(responseText);
            },
            success: function(res) {
                $this.parents().parents().parents('.box1').fadeOut();
            }
        })
    })

    //=================論壇=================
    //==================照片====================

    $.ajax({
        type: 'POST',
        url: 'php/memGetPhoto.php',
        dataType: 'json',
        data: {
            memNo: mem.mem_no
        },
        error: function(responseText) {
            console.log(responseText);;
        },
        success: function(res) {
            $('.m_info_photo  .m_value').text('已分享' + res.length + '張照片');
            for (var i = 0; i < res.length; i++) {
                var temp = '';
                temp += '<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4"><div class="box">';
                temp += '<img src="' + res[i].pho_path + '"><div class="text"><h5 class="title">';
                temp += res[i].pho_name + '</h5><div class="social-icon"><span><i class="fa fa-eye" aria-hidden="true"></i>';
                temp += res[i].pho_view + '</span>span><i class="fa fa-star" aria-hidden="true"></i>';
                temp += res[i].pho_collect + '</span></div></div><div class="edit"><i class="fa fa-trash" aria-hidden="true"></i></div><input type="hidden" value="' + res[i].pho_no + '"></div></div>';
                $('.photo-gallery').append(temp);
            }
        }
    })

    $('body').on('click', '.edit', function() {
        var $this = $(this);
        var phoNo = $this.siblings('input').val();
        $.ajax({
            type: 'POST',
            url: 'php/memDelPhoto.php',
            dataType: 'json',
            data: {
                pho_no: phoNo
            },
            error: function(responseText) {
                console.log(responseText);
            },
            success: function(res) {
                $this.parents('.box').parents('.col-xs-12').fadeOut();
            }
        })
    })



    //==================照片====================
    //==================收藏論壇貼文====================

    $.ajax({
        type: 'POST',
        url: 'php/memGetColForum.php',
        dataType: 'json',
        data: {
            memNo: mem.mem_no
        },
        error: function(responseText) {
            console.log(responseText);
        },
        success: function(res) {
            $('.m_info_save .m_value').text('已收藏' + res.length + '則貼文');
            for (var i = 0; i < res.length; i++) {
                var temp = '';
                temp += '<div class="m_post_box box1"><div class="m_post_info">';
                temp += '<h3>主題：' + res[i].pla_title + '</h3>' + '<div class="aa">';
                temp += '<p><img src="' + res[i].mem_img + '"><span><a href="">';
                temp += res[i].mem_name + '</a></span></p><p>' + res[i].pla_date + '發表</p></div>';
                temp += '<div class="f_btn"><input type="hidden" value="' + res[i].pla_no + '"><button class="delColForum">刪除</button><button class="checkPla">查看</button></div><div class="m_type"><p>';
                temp += res[i].plaCla_name + '</p></div></div></div>';
                $('.post').append(temp);
            }
        }
    })




    $('body').on('click', '.delColForum', function() {
        var $this = $(this);
        var plaNo = $this.siblings('input').val();
        $.ajax({
            type: 'POST',
            url: 'php/memCancelForum.php',
            dataType: 'json',
            data: {
                plaNo: plaNo,
                memNo:mem.mem_no
            },
            error: function(responseText) {
                console.log(responseText);
            },
            success: function(res) {
                $this.parents().parents('.box1').fadeOut();
            }
        })
    })

    $('body').on('click', '.checkPla', function() {
        var $this = $(this);
        var plaNo=$this.siblings('input').val();
         localStorage.setItem("checkPla", JSON.stringify(plaNo));
    })


    //==================收藏論壇貼文====================

    //=================會員資料=================

    $.ajax({
        url: 'php/memGetInfo.php',
        type: 'POST',
        dataType: 'json',
        data: {
            memNo: mem.mem_no
        },
        error: function(responseText) {
            console.log(responseText);
        },
        success: function(res) {
            $('#m-memId').text(res.mem_email);
            $('#m-memPsw').val(res.mem_psw);
            $('#m-memName').val(res.mem_name);
            // $('#m-memImg').val(res.mem_img);
            $('#m-memNo').val(res.mem_no);
             var memInfo = {
                    'mem_no': res.mem_no,
                    'mem_name': res.mem_name,
                    'mem_img': res.mem_img
                }
            localStorage.setItem("mem", JSON.stringify(memInfo));
        }
    })
          

// $('#updateMemInfo').click(function(){
//         $.ajax({
//         url: 'php/updateMemInfo.php',
//         type: 'POST',
//         // data: new FormData($('#memInfoTable')[0]),
//         data:$('#memInfoTable').serialize(),
//         success:function(res){
//             alert(123);
//         },
//         error:function(responseText){
//             alert(responseText);
//         }
//     })
// })


$('#updateMemInfo').click(function(){
        $.ajax({
            url: 'php/updateMemInfo.php',
            type: 'POST',
            cache: false,
            data: new FormData($('#memInfoTable')[0]),
            processData: false,
            contentType: false,
            success:function(res){
                console.log(123);
        },
        error:function(res){    
            window.location.href = "member.html";     
        }
    })
        
 })



$.ajax({
        type: 'POST',
        url: 'php/memGetAct.php',
        dataType: 'json',
        data: {
            memNo: mem.mem_no
        },
        error: function(responseText) {
            console.log(responseText);
        },
        success: function(res) {
            console.log(res);
            var actCla = "";
            for (var i = 0; i < res.length; i++) {
                var actCla_no = res[i].actCla_no;
                if(actCla_no ==1){
                    actCla="天文攝影";
                }else if(actCla_no==2){
                    actCla="天文觀測";
                }else if(actCla_no==3){
                    actCla="親子觀星";
                }else{
                    actCla="休閒聯誼";
                }
                    
                var startDate = res[i].act_startDate.substr(0, 10);
                var endDate = res[i].act_endDate.substr(0, 10);
                var temp = '';
                temp += '<div class="m_act_box box1"><div class="m_act_photo"><img src="'+res[i].act_img+'"></div>';
                temp += '<div class="m_act_info"><h3>' + res[i].act_name + '</h3><p>日期：' + startDate + '至' + endDate + '</p><p>主辦人：';
                temp += res[i].mem_name + '<div class="f_btn"><input type="hidden" value="'+res[i].act_no+'"><button class="cancelActJoin">取消</button><button class="checkAct">查看</button></div><div class="m_type"><p>';
                temp += actCla+'</p></div></div><div class="clear"></div></div>';
                $('#joinAct').append(temp);
            }
        }
    })

 $('body').on('click', '.cancelActJoin', function() {
        var $this = $(this);
        var actNo = $this.siblings('input').val();
        $.ajax({
            type: 'POST',
            url: 'php/memCancelActJoin.php',
            dataType: 'json',
            data: {
                actNo: actNo,
                memNo:mem.mem_no
            },
            error: function(responseText) {
                console.log(responseText);
            },
            success: function(res) {
                $this.parents().parents().parents('.box1').fadeout();
            }
        })
    })





 $.ajax({
        type: 'POST',
        url: 'php/hostGetAct.php',
        dataType: 'json',
        data: {
            memNo: mem.mem_no
        }, 
        error: function(responseText) {
            console.log(responseText);
        },
        success: function(res) {
            // console.log(res);
            for (var i = 0; i < res.length; i++) {
                var startDate = res[i].act_startDate.substr(0, 10);
                var endDate = res[i].act_endDate.substr(0, 10);
                var temp = '';
                temp += '<div class="m_act_box box1"><div class="m_act_photo"><img src="'
                +res[i].act_img+'"></div>';
                temp += '<div class="m_act_info"><h3>' + res[i].act_name + '</h3><p>日期：' + startDate + '至' + endDate + '</p><p>主辦人：';
                temp += mem.mem_name + '<div class="f_btn"><input type="hidden" value="'+res[i].act_no+'"><button class="checkAct">查看</button></div><div class="m_type"> <p>';
                temp += res[i].actcla_name + '</p></div></div><div class="clear"></div></div>';
                $('#hostAct').append(temp);
            }
        }
    })



   

//===============收藏活動=======================
$.ajax({
        type: 'POST',
        url: 'php/memGetColAct.php',
        dataType: 'json',
        data: {
            memNo: mem.mem_no
        },
        error: function(responseText) {
            console.log(responseText);
        },
        success: function(res) {
            console.log(res);
            for (var i = 0; i < res.length; i++) {
                var startDate = res[i].act_startDate.substr(0, 10);
                var endDate = res[i].act_endDate.substr(0, 10);
                var temp = '';
                temp += '<div class="m_act_box box1"><div class="m_act_photo"><img src="'
                +res[i].act_img+'"></div>';
                temp += '<div class="m_act_info"><h3>' + res[i].act_name + '</h3><p>日期：' + startDate + '至' + endDate + '</p><p>主辦人：';
                temp += res[i].mem_name + '<div class="f_btn"><input type="hidden" value="'+res[i].act_no+'"><button class="cancelColAct">取消</button><button class="checkAct">查看</button></div><div class="m_type"><p>';
                temp += res[i].actCla_name +'</p></div></div><div class="clear"></div></div>';
                $('.act').append(temp);
            }
        }
    })

 

 $('body').on('click', '.cancelColAct', function() {
        var $this = $(this);
        var actNo = $this.siblings('input').val();
        $.ajax({
            type: 'POST',
            url: 'php/memCancelColAct.php',
            dataType: 'json',
            data: {
                actNo: actNo,
                memNo:mem.mem_no
            },
            error: function(responseText) {
                console.log(responseText);
            },
            success: function(res) {
                $this.parents().parents().parents('.box1').fadeout();
            }
        })
    })


///查看活動內容===================================
$('body').on('click', '.checkAct', function() {
        var $this = $(this);
        var hostAct = $this.siblings('input').val();
        localStorage.setItem("checkAct", JSON.stringify(hostAct));
    })
///查看活動內容===================================




//===============收藏活動=end======================




















});











				










 //ready==========






$(document).ready(function() {
    //打開燈箱

    $('.lightbox-btn').click(function() {
            $('#ff_lightbox').css({
                transform: 'scale(1) ',
                transition: '.5s linear'
            });
            var count = $(this).index();
            $('.m_content>li:eq(' + count + ')').fadeIn(1000).siblings().fadeOut(500);
            $('.m_sub_nav>li:eq(' + count + ')').addClass('selected').siblings().removeClass('selected');

        })
        //燈箱內點擊
    $('.m_sub_nav li').click(function() {
        var count = $(this).index();
        // console.log(count);
        $(this).addClass('selected').siblings().removeClass('selected');
        $('.m_content>li:eq(' + count + ')').delay(500).fadeIn(1000).siblings().fadeOut(500);
    })

    //關閉燈箱
    $('#close-btn').click(function() {
        $('#ff_lightbox').css({
            transform: 'scale(0)',
            transition: '.5s linear'
        })
    })

    //lightbox close-btn 變色
    $('#close-btn').hover(function() {
        $('#closeIt').css({
            color: '#ffc889',
            opacity: '1'
        });
        $('.closeIco').attr({
            src: 'img/close2.svg'
        });
    }, function() {
        $('#closeIt').css({
            color: 'white',
            opacity: '1'
        });
        $('.closeIco').attr({
            src: 'img/close.svg'
        });
    })
})

//會員頭像移動
$(document).ready(function() {
    // 先抓到滑鼠的座標


    $(document).mouseover(function(e) {



        var position = $('.m_user_img').offset();
        var imgX = position.left;
        var imgY = position.top;

        var X = (e.clientX - imgX) * 0.05 + 'px';
        var Y = (e.clientY - imgY) * 0.05 + 'px';



        // alert(X+' '+Y);

        $('.m_user_img').css({
            'transform': 'translate(' + X + ',' + Y + ')'
        })

        // var position = $('.m_user_lv').offset();
        // var lvX = position.left;
        // var lvY = position.top;

        // var X1 = (e.clientX-imgX)*0.001+'px';
        // var Y2 = (e.clientY-imgY)*0.001+'px';

        // 	$('.m_user_lv').css({
        // 	'transform':'translate('+X+','+Y+')'
        // })




    })

    $('#particles-js').css({
        // 'transform':'scale(1,1)',
        'opacity': '1'
    })

    $('#canvas').css({
        // 'transform':'scale(1,1)',
        'opacity': '1'
    })
})


$(function() {
    // 預設顯示第一個頁籤
    // 並先把 .tabs, .tabs li 及 .tab_content, .tab_content li 等元素取出
    // 同時也要取得 .tab_content 的寬
    var _default = 0,
        $block = $('.lightbox_content'),
        $tabs = $block.find('.m_sub_tab'),
        $tabsLi = $tabs.find('li'),
        $tab_content = $block.find('.m_tab_content'),
        $tab_contentLi = $tab_content.find('li'),
        _width = $tab_content.width();


    // 當滑鼠移到 .tabs li 上時要套用 .hover 樣式
    // 移出時要移除 .hover 樣式
    $tabsLi.hover(function() {
        var $this = $(this);

        // 若被滑鼠移上去的 li 是目前顯示的頁籤就不做任何動作
        if ($this.hasClass('active')) return;

        $this.toggleClass('hover');
    }).click(function() { // 當滑鼠點擊 .tabs li 時
        // 先取出被點擊及目前顯示的頁籤與索引
        var $active = $tabsLi.filter('.active').removeClass('active'),
            _activeIndex = $active.index(),
            $this = $(this).addClass('active').removeClass('hover'),
            _index = $this.index(),
            isNext = _index > _activeIndex;

        // 如果被點擊的頁籤就是目前已顯示的頁籤, 則不做任何動作
        if (_activeIndex == _index) return;

        // 依索引大或小來決定移動的位置
        $tab_contentLi.eq(_activeIndex).stop().animate({
            left: isNext ? -_width : _width
        }).end().eq(_index).css('left', isNext ? _width : -_width).stop().animate({
            left: 0
        });
        // console.log(isNext);
    });

    // 先把預設要顯示的頁籤加上 .active 樣式及顯示相對應的內容
    $tabsLi.eq(_default).addClass('active');
    $tab_contentLi.eq(_default).siblings().css({
        left: _width
    });
});
