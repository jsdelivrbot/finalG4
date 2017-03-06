//轉址
$(function() {
    $(window).resize(function() {
        wdth = $(window).width();
        if (wdth < 768) {
            goSmall();
        } else {
            goBig();
        }
    })
})

function goSmall() {
    window.location.href = "mobile.html";
}

function goBig() {
    window.location.href = "home.html";
}

//=============轉址=========





$(function() {
    _windowWidth = $(window).width();
    _windowHeight = $(window).height();
    forumShowAnim();
    shootingStar();
    var mem = JSON.parse(localStorage.getItem('mem'));
//========維持會員登入狀態=====

$('#logOut').click(function() {
        localStorage.clear('mem');
        $('.subMenu').removeClass('show');
        $('#navMemPhoto').css('display', 'none').siblings('#navMemInfo').css('display', 'none')
            .siblings('#signLeft').css('display', 'inline-block')
            .siblings('#signRight').css('display', 'inline-block');
    });


if (localStorage.mem) {
    $('.mainMenu.signArea').children('li').css('display', 'none');
    $('#navMemPhoto').css('display', 'inline-block').find('img').attr('src', mem.mem_img);
    $('#navMemInfo').css('display', 'inline-block').find('#navMemberName').text(mem.mem_name);
}


//==========end=========



    //導覽列 + 體驗帳號彈窗
    $('#navLogin').click(function(e) {
        e.preventDefault();
        onLogin();
        fadeOutAll();
        loginSwitch();
    });


    $('#navSignup').click(function(e) {
        e.preventDefault();
        onLogin();
        signUpSwitch();
        fadeOutAll();
    })


    $('.i-lightboxBg').click(backtoHome);
    $('.i-lightboxBg').click(offLogin);


    $('.join .button-square').click(onLogin);

    $('.login').children('input').on('focus',function(){
        $(this).siblings('p').remove();
    })


    $('.logOn').click(function() {
        if ($(this).text() == '我要登入') {
            loginSwitch();
        } else {
            signUpSwitch();
        }
    })


    $('body').on('click','.type li',function(){
        $('#typeInput').val($(this).text());
    })

    $('body').on('click','.loc li',function(){
        $('#locInput').val($(this).text());
    })


    $('.actSearch').click(function(){
        var d = $('#i-date-control').val();
        var date = d.split("~");
        if(date[1]==undefined){
            date = date[0];
        }else{
            date = '20'+date[0]+'~20'+date[1]
        }
        var searchAct = {
                'date':date ,
                'loc': $('#locInput').val(),
                'type': $('#typeInput').val()
            }    
        localStorage.setItem("searchAct", JSON.stringify(searchAct));
        window.location.href = "activity.html#secondPage";
    })




    //自動執行手風琴
    knowClockOn = setInterval(autoKnowTrans, 3000);
    _knowTransTimes = 1;

    //導覽列

    (function() {
        jQuery(window).bind('scrollstart', function() {
            $('#i-body #nav').stop(true, false).animate({ 'top': '-100px', 'opacity': 0 }, 500);
        });

        jQuery(window).bind('scrollstop', function(e) {
            $('#i-body #nav').stop(true, false).animate({ 'top': '0px', 'opacity': 1 }, 1000);
        });

    })();

    ///===================手風琴========================

    var accordion = $('#accordion > li'); //fix
    for (var i = 0; i <= accordion.length; i++) {
        $('#accordion .know:eq(' + i + ')').css({
            'animationName': 'aa',
            'animationDuration': 0.2 + i * 0.4 + 's'
        });
    }

    //手動執行手風琴
    accordion.hover(
        function() {
            closeKnowTrans();
            clearInterval(knowClockOn);
            var $this = $(this);
            $this.removeClass('fakeCover');
            $this.stop().animate({
                'width': '480px'
            }, 500).css({
                'transform': 'scale(1.1)',
                'z-index': '2'
            });
            $('.heading', $this).stop(true, true).animate({ 'margin-top': '280px', 'opacity': '0' }, 800);
            $('.knowDescription', $this).stop(true, true).slideDown(500);
            $('.pic', $this).stop(true, true).fadeIn();
            $('.description', $this).stop(true, true).fadeIn(500);
            $('.memberId', $this).stop(true, true).fadeIn(800);
        },
        function() {
            knowClockOn = setInterval(autoKnowTrans, 3000);
            var $this = $(this);
            $this.addClass('fakeCover');
            $this.stop().animate({
                'width': '215px'
            }, 500).css({
                'transform': 'scale(1)',
                'z-index': '0'
            });
            $('.heading', $this).stop(true, true).animate({ 'margin-top': '60px', 'opacity': '1' }, 800);
            $('.pic', $this).stop(true, true).fadeOut();
            $('.description', $this).stop(true, true).fadeOut(500);
            $('.knowDescription', $this).stop(true, true).slideUp(700);
            $('.memberId', $this).stop(true, true).fadeOut();
        }
    );

    //旋轉照片
    var gallery = $(".gallery"),
        _currdeg = 0,
        _currPos = 0;


    $(".gallery .pic").click(function() {
        var $this = $(this);
        var _movePos = $(this).index();
        var _moveDist = _movePos - _currPos;
        _currdeg = _currdeg - _moveDist * 45;
        _currPos = _movePos;
        gallery.css({
            "transform": "rotateY(" + _currdeg + "deg)"
        });

        $this.siblings().children('.picContainer').removeClass('shadow').children('a').css('display', 'none');
        $this.children('.picContainer').addClass('shadow').children('a').css('display', 'block');
        // $this.siblings().children('.picContainer')
        // $this.children('.picContainer').children('a').css('display', 'block');
    })

    var galleryTt = setInterval(autoRotateGallery, 3000);

    function autoRotateGallery() {
        if (_currPos >= 7) {
            _currPos = 0;
        } else {
            _currPos += 1;
        }

        _currdeg = _currPos * -45;
        gallery.css({
            "transform": "rotateY(" + _currdeg + "deg)"
        });
        $('.gallery .pic:eq(' + _currPos + ')').siblings().children('.picContainer').removeClass('shadow')
            .children('a').css('display', 'none');
        $('.gallery .pic:eq(' + _currPos + ')').children('.picContainer').addClass('shadow')
            .children('a').css('display', 'block');
        // $('.gallery .pic:eq(' + _currPos + ')').children('.picContainer').children('a').css('display', 'block');
        // $('.gallery .pic:eq(' + _currPos + ')').siblings().children('.picContainer').children('a').css('display', 'none');
    }


    $(".gallery .pic").hover(function() {
        clearInterval(galleryTt);
        var $this = $(this).children('.picContainer');
        $this.css({
            'box-shadow': '0px 0px 12px 2px #f1f1f1'
        });
        $this.children('.detail').css({ 'opacity': 1 });
    }, function() {
        var $this = $(this).children('.picContainer');
        galleryTt = setInterval(autoRotateGallery, 3000);
        $this.children('.detail').css({ 'opacity': 0 });
        $this.css({
            'box-shadow': 'none'
        });
    })

    //sideBar=================start========================================

    _sideMoved01 = 40;
    _sideMoved02 = 60;
    _sideMoved03 = 60;
    _sideMoved04 = 60;
    _sideMoved05 = 60;
    _sideMoved06 = 60;
    _sideBarPosX = 40;
    _sideBarPosY = 380;



    //桌機
    $(window).scroll(function() {
        // if (_windowWidth >= 768) {
        var _scrollTop = $(this).scrollTop();
        if (_scrollTop <= 100 * _windowHeight / 100 + 1) {
            clearCanvas();
            _sideMoved01 = 40;
            _sideBarPosY = 175;
            doFirst();
            $('.sideBar1').css({
                'transform': 'translateX(-25px)'
            });
            $('.sideBar1').siblings().css('transform', 'translateX(0px)')
                .children('span').removeClass('show').css('display', 'none');
            // $('.sideBar1').siblings().children('span').removeClass('show').css('display', 'none');
        } else if (_scrollTop > 130 * _windowHeight / 100 && _scrollTop <= 454 * _windowHeight / 100) {
            clearCanvas();
            _sideMoved02 = 40;
            _sideBarPosY = 145;
            doFirst();
            $('.sideBar2').css({
                'transform': 'translateX(-25px)'
            }).siblings().css('transform', 'translateX(0px)');
            // $('.sideBar2').siblings().css('transform', 'translateX(0px)');
        } else if (_scrollTop > 454 * _windowHeight / 100 && _scrollTop <= 534 * _windowHeight / 100) {
            clearCanvas();
            _sideMoved03 = 40;
            _sideBarPosY = 115;
            doFirst();
            $('.sideBar3').css({
                'transform': 'translateX(-25px)'
            }).siblings().css('transform', 'translateX(0px)');
            // $('.sideBar3').siblings().css('transform', 'translateX(0px)');
        } else if (_scrollTop > 534 * _windowHeight / 100 && _scrollTop <= 614 * _windowHeight / 100) {
            clearCanvas();
            _sideMoved04 = 40;
            _sideBarPosY = 85;
            doFirst();
            $('.sideBar4').css({
                'transform': 'translateX(-25px)'
            }).siblings().css('transform', 'translateX(0px)');
            // $('.sideBar4').siblings().css('transform', 'translateX(0px)');
        } else if (_scrollTop > 614 * _windowHeight / 100 && _scrollTop <= 690 * _windowHeight / 100) {
            clearCanvas();
            _sideMoved05 = 40;
            _sideBarPosY = 55;
            doFirst();
            $('.sideBar5').css({
                'transform': 'translateX(-25px)'
            }).siblings().css('transform', 'translateX(0px)');
            // $('.sideBar5').siblings().css('transform', 'translateX(0px)');
        } else if (_scrollTop > 690 * _windowHeight / 100) {
            clearCanvas();
            _sideMoved06 = 40;
            _sideBarPosY = 25;
            doFirst();
            $('.sideBar6').css({
                'transform': 'translateX(-25px)'
            }).siblings().css('transform', 'translateX(0px)');
            // $('.sideBar6').siblings().css('transform', 'translateX(0px)');
        }
    });


    $('.sideBar').hover(function() {
            $(this).children('span').addClass('show');
        }, function() {
            $(this).children('span').removeClass('show');
        })
        //=================待fix===







    $('.sideBar').click(function(e) {
        var $this = $(this);
        if (_windowWidth >= 768) {
            $this.css({
                'transform': 'translateX(-20px)'
            }).siblings().css('transform', 'translateX(0px)');
            // $(this).css({
            //     'transform': 'translateX(-20px)'
            // });
        }
        var myHtml = $('html,body');
        switch ($this.attr('id')) {
            case 'sideBar1':
                myHtml.animate({
                    scrollTop: 0
                }, 1000);
                break;
            case 'sideBar2':
                myHtml.animate({
                    scrollTop: 133 * _windowHeight / 100 + 1
                }, 1000);
                break;
            case 'sideBar3':
                myHtml.animate({
                    scrollTop: 456 * _windowHeight / 100 + 1
                }, 1000);
                break;
            case 'sideBar4':
                myHtml.animate({
                    scrollTop: 536 * _windowHeight / 100 + 1
                }, 1000);
                break;
            case 'sideBar5':
                myHtml.animate({
                    scrollTop: 616 * _windowHeight / 100 + 1
                }, 1000);
                break;
            case 'sideBar6':
                myHtml.animate({
                    scrollTop: 700 * _windowHeight / 100 + 1
                }, 1000);
                break;
        }
    })


}); //READY====================



//==================public Area==========================

function shootingStar() {
    var starDrop = 45;
    for (i = 1; i < starDrop; i++) {
        var dropLeft = rand(0, 1600);
        var dropTop = rand(-1000, 1400);

        $('.shootingStar').append('<div class="shoot" id="shoot' + i + '"></div>');
        $('#shoot' + i).css({
            'left': dropLeft,
            'top': dropTop,
            'animation': 'fall ' + rand(2, 30) + 's linear infinite'
        });
    }

}


//fadeout背景雜物
function fadeOutAll() {
    $('.activity').fadeOut();
    $('#accordion').fadeOut();
    $('.title').fadeOut();
    $('.forumGroup').fadeOut();
    $('.gallery').css('display', 'none');
    $('.scroll').fadeOut();
}

//切換登入註冊
function signUpSwitch() {
    $('.logOn').text('我要登入');
    $('.login h4').text('會員註冊');
    $('#i-loginBtn').val('註冊');
    $('#loginConfirmPsw').stop().fadeIn(400);
    $('#loginMemName').stop().fadeIn(400);
    $('#loginAccount').attr('placeholder', '*帳號(Email)').val('');
    $('#loginPsw').attr('placeholder', '*密碼(4~12個字元)').val('');
}
//切換登入註冊
function loginSwitch() {
    $('.logOn').text('我要註冊');
    $('.login h4').text('會員登入');
    $('#i-loginBtn').val('登入');
    $('#loginConfirmPsw').stop().slideUp(400);
    $('#loginMemName').stop().slideUp(400);
    $('#loginAccount').attr('placeholder', '*帳號(Email)');
    $('#loginPsw').attr('placeholder', '*密碼(4~12個字元)');
}
//雜物回來
function backtoHome() {
    $('.activity').fadeIn(500);
    $('#accordion').fadeIn(500);
    $('.title').fadeIn(500);
    $('.forumGroup').fadeIn(500);
    $('.gallery').css('display', 'block');
}


function offLogin() {
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
}

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
    $('.join').css({ 'animationDelay': '0s' });
}





//==================canvas=============

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
    _moving = 0;
}

window.addEventListener('load', doFirst, false);
//canvas ====================end============================


//隨機
function rand(min, max) {
    result = min + (Math.floor(Math.random() * (max - min + 1)));
    return result;
}


boxTt = setInterval(autoForumRotate, 3000);


function forumShowAnim() {
    for (var i = 0; i <= 8; i++) {
        $('.forumBox:eq(' + i + ')').css({ 'animation': 'boxRotate 0.' + rand(7000, 9999) + 's linear' })
    }
}

function autoForumRotate() {
    var _forumBoxLength = $('.forumBox').length;
    $('.forumBox').removeClass('rotate');
    for (var i = 0; i <= _forumBoxLength; i += 3) {
        $('.forumBox:eq(' + (rand(0, 2) + i) + ')').addClass('rotate');
    }
}


//手風琴
function autoKnowTrans() {
    closeKnowTrans();
    if (_knowTransTimes > 5) {
        _knowTransTimes = 1;
    }
    $('.know' + _knowTransTimes).removeClass('fakeCover');
    if (_windowWidth >= 768) {
        $('.know' + _knowTransTimes).animate({
            'width': '480px'
        }, 500).css({
            'transform': 'scale(1.1)',
            'z-index': '2'
        });
    } else {
        $('.know' + _knowTransTimes).animate({
            'height': '480px'
        }, 500).css({
            'z-index': '2'
        });
    }
    $('.heading', '.know' + _knowTransTimes).stop(true, true).fadeOut();
    $('.knowDescription', '.know' + _knowTransTimes).stop(true, true).slideDown(500);
    $('.pic', '.know' + _knowTransTimes).stop(true, true).fadeIn();
    $('.description', '.know' + _knowTransTimes).stop(true, true).fadeIn();
    $('.memberId', '.know' + _knowTransTimes).stop(true, true).fadeIn(800);
}

function closeKnowTrans() {
    if (_windowWidth >= 768) {
        $('.know' + _knowTransTimes).addClass('fakeCover');
        $('.know' + _knowTransTimes).stop().animate({
            'width': '220px'
        }, 500).css({
            'transform': 'scale(1)',
            'z-index': '0'
        });
    } else {
        $('.know' + _knowTransTimes).stop().animate({
            'height': '200px'
        }, 500).css({
            'transform': 'scale(1)',
            'z-index': '0'
        });
    }
    $('.heading', '.know' + _knowTransTimes).stop(true, true).fadeIn();
    $('.pic', '.know' + _knowTransTimes).stop(true, true).fadeOut();
    $('.description', '.know' + _knowTransTimes).stop(true, true).fadeOut(500);
    $('.knowDescription', '.know' + _knowTransTimes).stop(true, true).slideUp(700);
    $('.memberId', '.know' + _knowTransTimes).stop(true, true).fadeOut();
    _knowTransTimes++;
}
//手風琴結束



//=====================PUBLIC END============


//日曆
$(function() {
    $('#multiple').hide();
    var dateControl = $('#i-wrapper #i-date-control');
    if (_windowWidth < 768) {
        dateControl.focus(function() {
            $('#multiple').show().css({
                'position': 'absolute',
                'top': '170px',
                'left': '0px',
                'right': '0px',
                'margin': 'auto',
                'width': '300px',
                'height': '300px',
                'transform': 'scale(1)',
                'z-index': 200
            });
        });
    } else {
        dateControl.focus(function() {
            $('#multiple').show().css({
                'position': 'absolute',
                'top': '30px',
                'left': '-40px',
                'width': '300px',
                'height': '300px',
                'transform': 'scale(0.8)',
                'z-index': 200
            });
        });
    }

    $('body').click(function(evt) {
        // console.log($(evt.target).parents("#multiple").length);
        if ($(evt.target).parents("#multiple").length == 0 &&
            evt.target.id != "i-date-control" && evt.target.class != "calendar-dark") {
            $('#multiple').hide();

        }
    });
})

$(function() {
    $('#wrapper .version strong').text('v' + pignoseCalendar.VERSION);

    function onClickHandler(date, obj) {
        /**
         * @date is an array which be included dates(clicked date at first index)
         * @obj is an object which stored calendar interal data.
         * @obj.calendar is an element reference.
         * @obj.storage.activeDates is all toggled data, If you use toggle type calendar.
         */

        var $calendar = obj.calendar;
        var $box = $calendar.parent().siblings('.box').show();
        text = '';

        if (date[0] !== null) {
            text += date[0].format('YY-MM-DD');
        }

        if (date[0] !== null && date[1] !== null) {
            text += '~';
        } else if (date[0] === null && date[1] == null) {
            text += 'nothing';
        }

        if (date[1] !== null) {
            text += date[1].format('YY-MM-DD');
        }
        //操作區
        $box.text(text);
        $('#i-wrapper #i-date-control').val(text);
    } //end


    // Default Calendar
    $('.calendar').pignoseCalendar({
        select: onClickHandler
    });

    // Input Calendar
    $('.input-calendar').pignoseCalendar({
        buttons: true, // It means you can give bottom button controller to the modal which be opened when you click.
    });

    // Calendar modal
    var $btn = $('.btn-calendar').pignoseCalendar({
        modal: true, // It means modal will be showed when you click the target button.
        buttons: true,
        apply: function(date) {
            $btn.next().show().text('You applied date ' + date + '.');
        }
    });

    // Color theme type Calendar
    $('.calendar-dark').pignoseCalendar({
        theme: 'dark', // light, dark
        select: onClickHandler,
        lang: 'ch',
        multiple: true,
        select: function(dates, obj) {
            console.log('toggle active dates', obj.storage.activeDates);
        },
        select: onClickHandler
    });

    // Multiple picker type Calendar
    $('.multi-select-calendar').pignoseCalendar({
        multiple: true,
        select: onClickHandler
    });

    // Toggle type Calendar
    $('.toggle-calendar').pignoseCalendar({
        toggle: true,
        select: function(date, obj) {
            var $target = obj.calendar.parent().next().show().html('You selected ' +
                (date[0] === null ? 'null' : date[0].format('YY-MM-DD')) +
                '.' +
                '<br /><br />' +
                '<strong>Active dates</strong><br /><br />' +
                '<div class="active-dates"></div>');

            for (var idx in obj.storage.activeDates) {
                var date = obj.storage.activeDates[idx];
                if (typeof date !== 'string') {
                    continue;
                }
                $target.find('.active-dates').append('<span class="ui label default">' + date + '</span>');
            }
        }
    });

    // Disabled date settings.
    !(function() {
        // IIFE Closure
        var times = 30;
        var disabledDates = [];
        for (var i = 0; i < times; /* Do not increase index */ ) {
            var year = moment().year();
            var month = 0;
            var day = parseInt(Math.random() * 364 + 1);
            var date = moment().year(year).month(month).date(day).format('YY-MM-DD');
            if ($.inArray(date, disabledDates) === -1) {
                disabledDates.push(date);
                i++;
            }
        }

        disabledDates.sort();

        var $dates = $('.disabled-dates-calendar').siblings('.guide').find('.guide-dates');
        for (var idx in disabledDates) {
            $dates.append('<span>' + disabledDates[idx] + '</span>');
        }

        $('.disabled-dates-calendar').pignoseCalendar({
            select: onClickHandler,
            disabledDates: disabledDates
        });
    }());

    // Disabled Weekdays Calendar.
    $('.disabled-weekdays-calendar').pignoseCalendar({
        select: onClickHandler,
        disabledWeekdays: [0, 6]
    });

    // Disabled Range Calendar.
    var minDate = moment().set('dates', Math.min(moment().day(), 2 + 1)).format('YY-MM-DD');
    var maxDate = moment().set('dates', Math.max(moment().day(), 24 + 1)).format('YY-MM-DD');
    $('.disabled-range-calendar').pignoseCalendar({
        select: onClickHandler,
        minDate: minDate,
        maxDate: maxDate
    });

    // Multiple Week Select
    $('.pick-weeks-calendar').pignoseCalendar({
        pickWeeks: true,
        multiple: true,
        select: onClickHandler
    });

    // Disabled Ranges Calendar.
    $('.disabled-ranges-calendar').pignoseCalendar({
        select: onClickHandler,
        disabledRanges: [
            ['2016-10-05', '2016-10-21'],
            ['2016-11-01', '2016-11-07'],
            ['2016-11-19', '2016-11-21'],
            ['2016-12-05', '2016-12-08'],
            ['2016-12-17', '2016-12-18'],
            ['2016-12-29', '2016-12-30'],
            ['2017-01-10', '2017-01-20'],
            ['2017-02-10', '2017-04-11'],
            ['2017-07-04', '2017-07-09'],
            ['2017-12-01', '2017-12-25'],
            ['2018-02-10', '2018-02-26'],
            ['2018-05-10', '2018-09-17'],
        ]
    });

    // I18N Calendar
    $('.language-calendar').each(function() {
        var $this = $(this);
        var lang = $this.data('lang');
        $this.pignoseCalendar({
            lang: lang
        });
    });

    // This use for DEMO page tab component.
    $('.menu .item').tab();
});
//日曆===========end=====



//========停止滑動
(function() {

    var special = jQuery.event.special,
        uid1 = 'D' + (+new Date()),
        uid2 = 'D' + (+new Date() + 1);

    special.scrollstart = {
        setup: function() {

            var timer,
                handler = function(evt) {

                    var _self = this,
                        _args = arguments;

                    if (timer) {
                        clearTimeout(timer);
                    } else {
                        evt.type = 'scrollstart';
                        jQuery.event.dispatch.apply(_self, _args);
                    }

                    timer = setTimeout(function() {
                        timer = null;
                    }, special.scrollstop.latency);

                };

            jQuery(this).bind('scroll', handler).data(uid1, handler);

        },
        teardown: function() {
            jQuery(this).unbind('scroll', jQuery(this).data(uid1));
        }
    };

    special.scrollstop = {
        latency: 300,
        setup: function() {

            var timer,
                handler = function(evt) {

                    var _self = this,
                        _args = arguments;

                    if (timer) {
                        clearTimeout(timer);
                    }

                    timer = setTimeout(function() {

                        timer = null;
                        evt.type = 'scrollstop';
                        jQuery.event.dispatch.apply(_self, _args);

                    }, special.scrollstop.latency);

                };

            jQuery(this).bind('scroll', handler).data(uid2, handler);

        },
        teardown: function() {
            jQuery(this).unbind('scroll', jQuery(this).data(uid2));
        }
    };

})();








$(function() { //=================ajax系列=========

        //======搜尋活動======
        
        $.ajax({
            type:'GET',
            url:'php/indexsearch.php',
            dataType:'json',
            success:function(res){
                var temp = "<ul>";
                for( var i=0;i<res.length;i++){
                    temp += "<li>"+res[i].place+"</li>";
                }
                temp += "</ul>";
                $('.loc').append(temp);
            }
        })


        //=======搜尋活動========


        //============know=========
        $.getJSON('php/indexKnow.php', function(res) {
                for (var i = 0; i < res.length; i++) {
                    var content = res[i].content.substr(0,100);
                    
                    $('.know:eq(' + i + ')').find('.pic>img').attr('src', res[i].authorImg);
                    $('.know:eq(' + i + ')').css({ 'background-image': 'url("' + res[i].spe_img + '")' })
                        .find('.memberId').text(res[i].author)
                        .siblings('.heading').text(res[i].title)
                        .siblings('.description').children('h2').text(res[i].title)
                        .siblings('p').text(content+'...');
                }
            })
            //===============know===============



        $.ajax({ //===============forum=============
                type: 'GET',
                url: 'php/indexForum.php',
                dataType: 'json',
                error:function(responseText){
                    console.log(responseText);
                },
                success: function(res) {
                    for (var i = 0; i < res.length; i++) {
                        var box = $('.forumBox:eq(' + i + ')');
                        var pla_title = res[i].pla_title.substr(0,15);
                        // box.find('.pic').children('img').attr('src', res[i].mem_img);
                        // box.find('.memberId').text(res[i].mem_name)
                        //     .siblings('h4').text(res[i].pla_title);
                        box.find('.memberId').text(res[i].mem_name)
                        .siblings('h4').text(pla_title+'...');
                          $('.forumBox:eq(' + i + ') .pic').children('img').attr('src', res[i].mem_img);
                           box.find('.contentMore>p').html(res[i].pla_content);
                    }
                }
            }) //===========forum=========




        //====================活動========
        $.ajax({
                type: 'GET',
                url: 'php/indexActivity.php',
                datatype: 'json',
                success: function(res) {
                    for (var i = 0; i < res.length; i++) {
                        var act = $('.act:eq(' + i + ')');
                        var act_info= res[i].act_info.substr(0,20);
                        var dataStart = res[i].startY + '.' + res[i].startM + '.' + res[i].startD;
                        var dataEnd = res[i].endY + '.' + res[i].endM + '.' + res[i].endD;
                        var temp = '<h3>' + res[i].act_name + '</h3><p>' + dataStart + '~' + dataEnd + '</p><span>' + act_info + '...</span>';
                        act.find('.pic>img').attr('src', res[i].act_img);
                        act.children('.content' + (i + 1)).append(temp);
                    }
                }
            }) //====================活動 end========







        //=====================gallery======
        $.ajax({
                type: 'GET',
                url: 'php/indexPhoto.php',
                dataType: 'json',
                success: function(res) {
                    for (var i = 0; i < res.length; i++) {
                        var gallery = $('.gallery .pic:eq(' + i + ')');
                        gallery.find('.photo').attr('src', res[i].pho_path);
                        gallery.find('.memPic').attr('src', res[i].mem_img)
                            .siblings('span').text(res[i].mem_name);
                    }
                }
            })
            //============gallery================end===============




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
                                    backtoHome();
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
            }) //===============會員註冊&&&登入================



    }) //ready====================





//==========only for ajax==========

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
//========== only for ajax end=============
