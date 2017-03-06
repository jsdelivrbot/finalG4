$(document).ready(function() {
    
    createPosts();

    //===========會員===============
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

    //===========會員end=============================================================================================








    //=======手機導覽列=======

    $('#navButton').click(function() {
        if ($('.mainMenu.menu').hasClass('open')) {
            $('#nav').animate({ 'background-color': 'rgba(0,0,0,.6)' }, 500);
            $('body').css('overflow', 'visible');
            $('#navButton').children('i').attr('class', 'fa fa-bars');
            $('.mainMenu.menu').stop().animate({ 'left': '-100%' }, 400).removeClass('open');
        } else {
            $('#nav').animate({ 'background-color': '#020202' }, 500);
            $('.mainMenu.menu').stop().animate({ 'left': '0' }, 400).addClass('open');
            $('body').css('overflow', 'hidden');
            $('#navButton').children('i').attr('class', 'fa fa-times');
        }
    })


    //=======手機導覽列end======

    //搜尋貼文================
    var searchBar = $('#f-searchForum');

    searchBar.on('keyup', function() {
        $('.ff_posts').empty();
        $.ajax({
            url: 'php/searchForum.php',
            type: 'post',
            dataType: 'json',
            data: {
                keyword: searchBar.val()
            },
            success: function(res) {
                var len = 66;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].pla_content.length > len) {
                        res[i].pla_content = res[i].pla_content.substring(0, len - 1) + "...";
                    }
                    var temp = '<div class="ff_post"><div id="box"><input type="hidden" value="' + res[i].pla_no + '"><figure class="front"><div class="box-content">';
                    temp += '<h3 class="topic"><i class="fa fa-sticky-note" aria-hidden="true"></i><a href="#">';
                    temp += '主題：' + res[i].pla_title + '</a></h3><div class="f_user">';
                    temp += '<img src="' + res[i].mem_img + '"width="30" height="30">';
                    temp += '<p><a href="">' + res[i].name + '</a></p><p>' + res[i].pla_date + '發表</p></div>';
                    temp += '<div class="f_response"><i class="fa fa-eye" aria-hidden="true"></i><p>' + res[i].pla_view + '</p>';
                    temp += '<i class="fa fa-comment-o" aria-hidden="true"></i><p>' + res[i].pla_msg + '</p>'
                    temp += '<i class="fa fa-star-o" aria-hidden="true"></i><p>' + res[i].pla_collect + '</p>';
                    temp += '</div></div></figure><figure class="back"><div class="box-content"><p><a href="#">' + res[i].pla_content + '</a></p></div></figure><figure class="right"></figure><figure class="left"></figure><figure class="top"></figure><figure class="bottom"></figure></div></div>';
                    $('#f_posts0' + res[i].plaCla_no).append(temp);
                }
            }
        })
    })





    //==========搜尋貼文end===========

    //========收藏貼文========


    $('.social-icon .fa-star-o').click(function() {
        var $this = $(this);
        $this.removeClass('fa-star-o').addClass('fa-star');
        $.ajax({
            url: 'php/placoll.php',
            type: 'post',
            dataType: 'json',
            data: {
                plaNo: $this.parents('.social-icon').siblings('.f_btn').find('input').val(),
                memNo: mem.mem_no
            },
            error: function() {
                alert('送出失敗，請重試');
            },
            success: function(res) {
                if (res.msg == 'fail') {
                    alert('已經收藏過此則貼文');
                } else {
                    var count = $this.siblings('.collCount').text();
                    count++;
                    $this.siblings('.collCount').text(count);
                }

            }
        })
    })


    //==========收藏貼文end=======








    //=======貼文檢舉=====
    $('.reportPla').click(function() {
        if (localStorage.mem) {
            var pla_no = $(this).children('input').val();
            $.ajax({
                url: 'php/reportPla.php',
                type: 'post',
                dataType: 'json',
                data: {
                    plaNo: pla_no,
                    memNo: mem.mem_no
                },
                error: function() {
                    alert('送出失敗，請重試');
                },
                success: function(res) {
                    if (res.msg) {
                        alert('您已經檢舉過了，管理員審核中');
                    } else {
                        alert('檢舉成功');
                    }
                }
            })
        } else {
            alert('請先登入');
        }

    })


    //貼文檢舉======end====










    function createPosts() { //貼文產生================
        $.getJSON('php/forum.php', function(res) {
            var len = 66;
            for (var i = 0; i < res.length; i++) {
                if (res[i].pla_content.length > len) {
                    res[i].pla_content = res[i].pla_content.substring(0, len - 1) + "...";
                }
                var temp = '<div class="ff_post"><div id="box"><input type="hidden" value="' + res[i].pla_no + '"><figure class="front"><div class="box-content">';
                temp += '<h3 class="topic"><i class="fa fa-sticky-note" aria-hidden="true"></i><a href="#">';
                temp += '主題：' + res[i].pla_title + '</a></h3><div class="f_user">';
                temp += '<img src="' + res[i].mem_img + '"width="30" height="30">';
                temp += '<p><a href="">' + res[i].name + '</a></p><p>' + res[i].pla_date + '發表</p></div>';
                temp += '<div class="f_response"><i class="fa fa-eye" aria-hidden="true"></i><p>' + res[i].pla_view + '</p>';
                temp += '<i class="fa fa-comment-o" aria-hidden="true"></i><p>' + res[i].pla_msg + '</p>'
                temp += '<i class="fa fa-star-o" aria-hidden="true"></i><p>' + res[i].pla_collect + '</p>';
                temp += '</div></div></figure><figure class="back"><div class="box-content"><p><a href="#">' + res[i].pla_content + '</a></p></div></figure><figure class="right"></figure><figure class="left"></figure><figure class="top"></figure><figure class="bottom"></figure></div></div>';
                $('#f_posts0' + res[i].plaCla_no).append(temp);
            }
        });
    } //貼文產生===============end=======





    //新增貼文==========
    $('#editorSubmit').click(function() {
        var type;
        if ($('#editorType01').prop('checked') == true) {
            type = 1;
        } else if ($('#editorType02').prop('checked') == true) {
            type = 2;
        } else if ($('#editorType03').prop('checked') == true) {
            type = 3;
        } else {
            submitFail();
            return;
        }
        var content = CKEDITOR.instances.editor.getData();
        var title = $('#editorTitle').val();
        if (title == '') {
            submitFailTitle();
        } else {
            $.ajax({
                url: 'php/postForum.php',
                type: 'post',
                dataType: 'json',
                data: {
                    forumType: type,
                    forumTitle: title,
                    forumContent: content,
                    memNo: mem.mem_no
                },
                error: function() {
                    alert('送出失敗，請重試');
                },
                success: function(res) {
                    alert('送出成功');
                    $('.postForumPop').css('display', 'none');
                    window.location.reload();
                }
            })
        }

    }); //新增貼文=========end======

    function submitFailType() {
        $('.chooseGroup').css('outline', '3px solid red');
    }

    function submitFailTitle() {
        $('#editorTitle').css('outline', '3px solid red');
    }


    //editor 彈窗 =================

    $('.postForumPopBg').click(function() {
        $(this).parent('.postForumPop').css('display', 'none');
    })
    $('#postForum a').click(function(e) {
            e.preventDefault;
            $('.postForumPop').css('display', 'block');
        })
        //====================






    // scroll magic效果
    // var controller = new ScrollMagic.Controller();
    // var pinSubNav = new ScrollMagic.Scene({
    //  triggerElement:'#f_section2',
    //  triggerHook:0,

    // })

    // .setPin('#f_section2')
    // .addTo(controller);

    // var aaTop = $('#f_section2').offset().top;





    //popular box hover effect

    $('.pop-box').hover(function() {
        $(this).addClass('hover')
        $(this).siblings().addClass('fblur')
    }, function() {
        $(this).removeClass('hover')
        $(this).siblings().removeClass('fblur')

    })

    //=====留言新增=======
    $('.postMsg').click(function() {
        var $this = $(this);
        var text = $this.siblings('textarea');
        $.ajax({
            url: 'php/postMsg.php',
            type: 'post',
            dataType: 'json',
            data: {
                memNo: mem.mem_no,
                msgContent: text.val(),
                plaNo: $this.siblings('input').val()
            },
            error: function() {
                alert('送出失敗，請重試');
            },
            success: function(res) {
                var temp = '';
                temp += '<div class="main response-box"><div class="f_sub_user">';
                temp += '<img src="' + res.mem_img + '"width="80" height="80">';
                temp += '<div class="f_user_info"><span class="id">' + res.mem_name + '</span>';
                temp += '<p>' + res.msgDate + '回覆</p></div></div><div class="text">' + res.content + '</div>';
                temp += '<div class="f_btn"><button class="reportMsg"><input type="hidden" value="' + res.plaMsg_no + '"><a href="">檢舉</a></button></div></div>';
                $('.msgArea').before(temp);
                text.val('');
            }
        })

    })


    //========留言新增end==========



    //貼文內容切換

    $('body').on('click', '.ff_post', function(e) {
        e.preventDefault();
        $(this).parents('.ff_posts').fadeOut(500)
            .siblings('.post_text').delay(600).fadeIn(500);
        var plaNo = $(this).find('input').val();
        $.getJSON('php/linkForum.php', {
            pla_no: plaNo
        }, function(res) {
            $('.post_text').find('h3').text(res.pla_title)
                .siblings('.f_sub_user').children('img').attr('src', res.mem_img)
                .siblings().children('.id').text(res.mem_name)
                .siblings('p').text(res.pla_date);
            $('.social-icon').children('.viewCount').text(res.pla_view)
                .siblings('.collCount').text(res.pla_collect)
                .siblings('.shareCount').text(res.pla_share)
                .parents().siblings('.text').html(res.pla_content)
                .siblings('.f_btn').children('.reportPla').children('input').val(res.pla_no);
            $('.postMsg').siblings('input').val(res.pla_no);
        })
        $.getJSON('php/forumMsg.php', {
            pla_no: plaNo
        }, function(res) {
            var temp = '';
            for (var i = 0; i < res.length; i++) {
                temp += '<div class="main response-box"><div class="f_sub_user">';
                temp += '<img src="' + res[i].mem_img + '"width="80" height="80">';
                temp += '<div class="f_user_info"><span class="id">' + res[i].mem_name + '</span>';
                temp += '<p>' + res[i].msgDate + '回覆</p></div></div><div class="text">' + res[i].content + '</div>';
                temp += '<div class="f_btn"><button class="reportMsg"><input type="hidden" value="' + res[i].plaMsg_no + '"><a href="">檢舉</a></button></div></div>';
            }
            $('.msgArea').before(temp);
        })

    })


    //======留言檢舉======
    $('body').on('click', '.reportMsg', function(e) {
        e.preventDefault();
        if (localStorage.mem) {
            var plaMsg_no = $(this).children('input').val();
            $.ajax({
                url: 'php/MsgRepo.php',
                type: 'post',
                dataType: 'json',
                data: {
                    plaMsgNo: plaMsg_no,
                    memNo: mem.mem_no
                },
                error: function() {
                    alert('送出失敗，請重試');
                },
                success: function(res) {
                    if (res.msg) {
                        alert('您已經檢舉過了，管理員審核中');
                    } else {
                        alert('檢舉成功');
                    }
                }
            })
        } else {
            alert('請先登入');
        }

    })


    //==============留言檢舉end============



    //===============收藏===============


    $('.socialPop .fa').click(function() {
        if (localStorage.mem) {
            var $this = $(this).parents('.socialPop');
            var pla_no = $this.parents('.social-icon').siblings('.f_btn').find('input').val();
            $.ajax({
                url: 'php/shareForum.php',
                type: 'post',
                dataType: 'json',
                data: {
                    plaNo: pla_no
                },
                error: function() {
                    alert('送出失敗，請重試');
                },
                success: function(res) {
                    var count = $this.siblings('.shareCount').text();
                    count++;
                    $this.siblings('.shareCount').text(count);
                }
            })
        } else {
            alert('請先登入');
        }

    })




    //================收藏end=============







    for (var i = 1; i <= 3; i++) {
        $('#f_tab' + i).click(function() {
            $('.post_text').stop(true, false).fadeOut(300);
            $('.ff_posts').stop(true, false).fadeIn(300);
        })
    }





})
