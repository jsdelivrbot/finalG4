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