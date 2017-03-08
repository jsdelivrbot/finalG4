var act;
$(function(){
    
/*=====================================
            判斷是否有會員登入
    =======================================*/
col_no="";
mem = JSON.parse(localStorage.getItem('mem'));
if(localStorage.mem){
$("body").on("click",".act_col",function(){

    
    if($(".act_col").hasClass('fa-star')){
        alert("您已收藏過");
    }else{
        $(this).attr('class','fa fa-star act_col');
        
        $.ajax({
        url: 'php/activity.php',//php,jsp and etc..
        type: 'POST',
        data: {
            act_col:col_no,
            mem_no:mem.mem_no
        },
        dataType: "json",
        async: false,
        success: function(data, textStatus, jqXHR) {
            console.log('Success: ' + textStatus);
            console.log(data);

        },

        error: function(jqXHR, textStatus, errorThrown) {
            // Handle errors here
            console.log('Errors: ' + textStatus);
            console.log(jqXHR);
            console.log(errorThrown);
            // STOP LOADING SPINNER
        }

    }); 
        alert("收藏成功");
        console.log(col_no,'aaaaa',$("input[value="+col_no+"]").next().children().children().children().children("span").text());
        var txt = $("input[value="+col_no+"]").next().children().children().children().children("span").text();

        var num = parseInt(txt)+1;console.log('num',num);
        $("input[value="+col_no+"]").next().children().children().children().children("span").text(num+'人收藏');
    }
    
  
  })
  }else{
    $(".act_col").click(function(){
        alert("請先登入會員");
    })
  }
/*=====================================
            判斷是否從前端傳入活動搜尋
    =======================================*/
var searchAct = JSON.parse(localStorage.getItem('searchAct'));
if (localStorage.searchAct) {

    console.log(searchAct.date.split("~")[0]);

    $.ajax({
        url: 'php/activity.php',//php,jsp and etc..
        type: 'POST',
        data: {
            actSH_startDate:searchAct.date.split("~")[0],
            actSH_endDate:searchAct.date.split("~")[1],
            actSH_place:searchAct.loc,
            actSH_class:searchAct.type
        },
        dataType: "json",
        async: false,
        success: function(data, textStatus, jqXHR) {
            console.log('Success: ' + textStatus);
            console.log(data);
            act=data;
            newMarker();
    $('div').remove('.a-remove');

    /*================================
            有傳值的話撈全部資料
    ===================================*/
    var typeColor="skyblue";
    for(var i=0;i<act.length;i++){
        
        if(act[i].actCla_name=="天文攝影"){
            typeColor="#3D894A";
        }else if(act[i].actCla_name=="天文觀測"){
            typeColor="#E05142";
        }else if(act[i].actCla_name=="親子觀星"){
            typeColor="#EB9924";
        }else{
            typeColor="#3E98BC";
        }
        $('#a-add').after('<div class="col-xs-12 col-sm-6 col-md-6 a-remove ff_lightbox_link">'+
                                    '<input type="hidden" name="" value="'+act[i].act_no+'" class="a-act_no">'+
                                        '<div class="aa-box">'+
                                            '<div class="box-img">'+
                                                '<img src="'+act[i].act_img+'" alt="'+act[i].act_name+'" >'+
                                            '</div>'+
                                            '<div class="box-text">'+
                                                '<h4>'+act[i].act_name+'</h4>'+
                                                '<p class="aa-date">'+act[i].act_startDate+'</p>'+
                                                '<p class="aa-info">'+act[i].act_info+'</p>'+
                                                '<div class="aa-btn-area">'+
                                                    '<div class="social-icon">'+
                                                        '<i class="fa fa-star-o" aria-hidden="true"></i><span class="act_colPut">'+act[i].act_collect+'人收藏</span>'+
                                                    '</div>'+
                                                    '<div class="aa-btn btn-blue btn-lg">'+
                                                        '<a href="" class="ff_lightbox_link">熱烈報名中</a>'+
                                                        
                                                    '</div>'+
                                                    '<div class="clear"></div>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="aa-tag  style="background-color:'+typeColor+'">'+
                                                '<span>'+act[i].actCla_name+'</span>'+
                                            '</div>'+  
                                        '</div></div>'+
                                '<input type="hidden" name="" value="'+act[i].act_no+'" class="a-act_no">'
                                        );   

    }
    var str =$(".aa-tag").children("span").text();
            if(str.match("天文攝影")!=null){
            $(".aa-tag").css({'background-color':"#3D894A"});
        }else if(str.match("天文觀測")!=null){
            $(".aa-tag").css({'background-color':"#E05142"});
        }else if(str.match("親子觀星")!=null){
            $(".aa-tag").css({'background-color':"#EB9924"});
        }else{
            $(".aa-tag").css({'background-color':"#3E98BC"});
        }
    var len = 80; // 超過50個字以"..."取代
    $(".aa-info").each(function(i){
        if($(this).text().length>len){
            $(this).attr("title",$(this).text());
            var text=$(this).text().substring(0,len-1)+"...";
            $(this).text(text);
        }
    });
    // lightBox();  
        },

        error: function(jqXHR, textStatus, errorThrown) {
            // Handle errors here
            console.log('Errors: ' + textStatus);
            console.log(jqXHR);
            console.log(errorThrown);
            // STOP LOADING SPINNER
        }

    });
localStorage.clear('searchAct');     
}else{
    all();
}
/*=====================================
            lightBox Ajax
    =======================================*/

$("body").on("click",".ff_lightbox_link",function(e){



/*=====================================
            lightbox
    =======================================*/

// lightbox效果--主題被點擊後，lightbox跳出
    e.preventDefault();

    $('#ff_lightbox').css({
        transform: 'scale(1) ',
        transition:'.5s linear'

    })
    


$('#close-btn').click(function(){
    $('#ff_lightbox').css({
        transform: 'scale(0)',
        transition:'.5s linear'
    })
})


//lightbox close-btn
$('#close-btn').hover(function(){
    $('#closeIt').css({
        color: '#ffc889',
        opacity: '1'
    });
    $('.closeIco').attr({
        src: 'img/close2.svg'
    });
},function(){
    $('#closeIt').css({
        color: 'white',
        opacity: '1'
    });
    $('.closeIco').attr({
        src: 'img/close.svg'
    });
})//lightbox close-btn end
/*=====================================
            燈箱動態新增
    =======================================*/
    $('div').remove(".a-removeComm");

       
mem = JSON.parse(localStorage.getItem('mem'));
if(!localStorage.mem){
    mem_no=0;
}else{
    mem_no=mem.mem_no
}
    var act_no = $(this).next("input").val();
    $.ajax({
        url: 'php/activity.php',//php,jsp and etc..
        type: 'POST',
        data: {
            act_no:act_no,
            mem_no:mem_no
        },
        dataType: "json",
        async: false,
        success: function(data, textStatus, jqXHR) {
            console.log('lightBox Success: ' + textStatus);
            console.log(data);
                $(".aa_banner").css({
                    'background':'url('+data[0][0].act_img+')'
                });
                $("#a-lb-mem_name").text(data[0][0].mem_name);
                $("#a-lb-act_name").text(data[0][0].act_name);
                $("#a-lb-act_info").text(data[0][0].act_info);
                $("#a-lb-act_date").text(data[0][0].act_startDate+"~"+data[0][0].act_endDate);
                $("#a-lb-actCla_name").text(data[0][0].actCla_name);
                $("#a-lb-act_place").text(data[0][0].act_place);
                $("#a-lb-act_price").text(data[0][0].act_price);

                // if(data[0].actMs)
                if(data[1][0]!=0){
                    for(var i=0;i<data[1].length;i++){
                        $("#a-comm").append(
                            '<div class="comment ct1 a-removeComm"><div class="user"><div class="user-pic"><img src="'+data[1][i].mem_img+'" style="width:40px" height="40">'+
                            '</div><div class="user-info"><span><a href="">'+data[1][i].mem_name+'</a></span></div></div>'+'<div class="ct-content">'+
                            '<p>參加活動：'+data[1][i].act_name+'<span class="ct-stars"><i class="fa fa-star" aria-hidden="true"></i>'+
                            '<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i>'+
                            '<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></span></p>'+
                            '<p>'+data[1][i].actMsg_content+'</p>'+
                            '<p>'+data[1][i].actMsg_date+'</p></div>'+
                            '<div class="clear"></div></div>'
                        )                
                    }                    
                }else{
                    $("#a-comm").append(
                        '<div class="ct-content a-removeComm" style="color:#fff;text-align:center;padding-bottom:30px;font-size:20px;">尚無評論</div>'
                    );
                }
            if(data[2][0]){
                 if(data[2][0]==0){
                    $(".act_col").attr('class','fa fa-star-o act_col');
                }else{
                    $(".act_col").attr('class','fa fa-star act_col'); 
                }               
            }


        col_no=data[0][0].act_no;

        },

        error: function(jqXHR, textStatus, errorThrown) {
            // Handle errors here
            console.log('Errors: ' + textStatus);
            console.log(jqXHR);
            console.log(errorThrown);
            // STOP LOADING SPINNER
        }

    });  
    

})//lightbox end
/*=====================================
            特定標籤變色
    =======================================*/
$(".a-panel ul a").click(function(){
    
    var index = $(this).index();
    console.log("click",index);
    $(this).css({'background-color':'#86d4f5'});
    $(this).siblings().css({'background':'none'});
})
$(".a-all").click(function(){
    all();

})
/*=====================================
            jQuery撈全部Marker資料
    =======================================*/
//接著可透過JQuery或是自己弄個XMLHttpRequest的方式Send Form
//JQuery

function all(){
    $.ajax({
        url: 'php/activity.php',//php,jsp and etc..
        type: 'POST',
        data: {
            all:'1'
        },
        // cache: false,
        dataType: "json",
        async: false,
        // processData: false, // Don't process the files
        // contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function(data, textStatus, jqXHR) {
            // Handle errors here
            console.log('Success: ' + textStatus);
            //STOP LOADING SPINNER
            // console.log(data, textStatus, jqXHR);
            console.log(data);

            act=data;
            newMarker();
    $('div').remove('.a-remove');

    var typeColor="skyblue";
    for(var i=0;i<act.length;i++){
        
        if(act[i].actCla_name=="天文攝影"){
            typeColor="#3D894A";
        }else if(act[i].actCla_name=="天文觀測"){
            typeColor="#E05142";
        }else if(act[i].actCla_name=="親子觀星"){
            typeColor="#EB9924";
        }else{
            typeColor="#3E98BC";
        }
        $('#a-add').after('<div class="col-xs-12 col-sm-6 col-md-6 a-remove ff_lightbox_link">'+
                                    '<input type="hidden" name="" value="'+act[i].act_no+'" class="a-act_no">'+
                                        '<div class="aa-box">'+
                                            '<div class="box-img">'+
                                                '<img src="'+act[i].act_img+'" alt="'+act[i].act_name+'" >'+
                                            '</div>'+
                                            '<div class="box-text">'+
                                                '<h4>'+act[i].act_name+'</h4>'+
                                                '<p class="aa-date">'+act[i].act_startDate+'</p>'+
                                                '<p class="aa-info">'+act[i].act_info+'</p>'+
                                                '<div class="aa-btn-area">'+
                                                    '<div class="social-icon">'+
                                                        '<i class="fa fa-star-o" aria-hidden="true"></i><span class="act_colPut">'+act[i].act_collect+'人收藏</span>'+
                                                    '</div>'+
                                                    '<div class="aa-btn btn-blue btn-lg">'+
                                                        '<a href="" class="ff_lightbox_link">熱烈報名中</a>'+
                                                        
                                                    '</div>'+
                                                    '<div class="clear"></div>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="aa-tag" style="background-color:'+typeColor+'">'+
                                                '<span>'+act[i].actCla_name+'</span>'+
                                            '</div>'+  
                                        '</div></div>'+
                                '<input type="hidden" name="" value="'+act[i].act_no+'" class="a-act_no">'
                                        );   

    }

    var len = 80; // 超過50個字以"..."取代
    $(".aa-info").each(function(i){
        if($(this).text().length>len){
            $(this).attr("title",$(this).text());
            var text=$(this).text().substring(0,len-1)+"...";
            $(this).text(text);
        }
    });
    // lightBox();            
        },

        error: function(jqXHR, textStatus, errorThrown) {
            // Handle errors here
            console.log('Errors: ' + textStatus);
            // STOP LOADING SPINNER
        }

    });   
    
}



/*================================
      ajax  傳到googleMap 產生marker
===================================*/
function showLatLng(jsonStr){

    act = JSON.parse(jsonStr);
    // console.log(act[0].act_lat);
    // var str = "<table border='1'>";
    // str+="<tr><th>lat</th><td>"+act[0].act_lat+"</td></tr>";
    // str+="<tr><th>lng</th><td>"+act[0].act_lng+"</td></tr>";
    // str+="</table>";
    // document.getElementById("show").innerText=jsonStr;  
    // document.getElementById("showPanel").innerHTML=str;
    newMarker();
    // console.log(act[0]);

}
/*=====================================
            改變下方活動列表
    =======================================*/
function changeAct(data){
    $('div').remove('.a-remove');
    var act = JSON.parse(data);
    console.log(act );
    var typeColor="skyblue";
    for(var i=0;i<act.length;i++){
        // console.log(act[i].actCla_name);
        //   if(act[i].actCla_name=="天文攝影"){
        //     typeColor="#3D894A";
        // }else if(act[i].actCla_name=="天文觀測"){
        //     typeColor="#E05142";
        // }else if(act[i].actCla_name=="親子觀星"){
        //     typeColor="#EB9924";
        // }else{
        //     typeColor="#3E98BC";
        // }      

        $('#a-add').after('<div class="col-xs-12 col-sm-6 col-md-6 a-remove ff_lightbox_link">'+
                                        '<div class="aa-box">'+
                                            '<div class="box-img">'+
                                                '<img src="'+act[i].act_img+'" alt="'+act[i].act_name+'" >'+
                                            '</div>'+
                                            '<div class="box-text">'+
                                                '<h4>'+act[i].act_name+'</h4>'+
                                                '<p class="aa-date">'+act[i].act_startDate+'</p>'+
                                                '<p class="aa-info">'+act[i].act_info+'</p>'+
                                                '<div class="aa-btn-area">'+
                                                    '<div class="social-icon">'+
                                                        '<i class="fa fa-star-o" aria-hidden="true"></i><span class="act_colPut">'+act[i].act_collect+'人收藏</span>'+
                                                    '</div>'+
                                                    '<div class="aa-btn btn-blue btn-lg">'+
                                                        '<a href="" class="ff_lightbox_link">熱烈報名中</a>'+
                                                       
                                                    '</div>'+
                                                    '<div class="clear"></div>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="aa-tag style="background:'+typeColor+'">'+
                                                '<span>'+act[i].actCla_name+'</span>'+
                                            '</div>'+  
                                        '</div></div>'+
                                 '<input type="hidden" name="" value="'+act[i].act_no+'" class="a-act_no">'
                                    ); 


    }
    limitStr();
    // lightBox();
    var str =$(".aa-tag").children("span").text();

        // console.log('span',$(".aa-tag").children("span").text());
        // console.log('rrrrr',str.match("天文觀測"));

        var num=document.getElementsByClassName("aa-tag");
        var content= document.getElementsByClassName("aa-tag")[0].childNodes[0].textContent;
        var father =document.getElementsByClassName("aa-tag")[i];
        console.log(num);
        console.log('content',content);
        for(var i=0;i<num.length;i++){
            if(document.getElementsByClassName("aa-tag")[i].childNodes[0].textContent=="天文攝影"){
                document.getElementsByClassName("aa-tag")[i].style.backgroundColor="#3D894A";
            }else if(document.getElementsByClassName("aa-tag")[i].childNodes[0].textContent=="天文觀測"){
                document.getElementsByClassName("aa-tag")[i].style.backgroundColor="#E05142";
            }else if(document.getElementsByClassName("aa-tag")[i].childNodes[0].textContent=="親子觀星"){
                document.getElementsByClassName("aa-tag")[i].style.backgroundColor="#EB9924";
            }else{
                document.getElementsByClassName("aa-tag")[i].style.backgroundColor="#3E98BC";
            }
        }

}


function limitStr(){
    var len = 60; // 超過50個字以"..."取代
    $(".aa-info").each(function(i){
        if($(this).text().length>len){
            $(this).attr("title",$(this).text());
            var text=$(this).text().substring(0,len-1)+"...";
            $(this).text(text);
        }
    });    
}
/*=====================================
            getDate
    =======================================*/
function getDate(){

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange=function (){
    if( xhr.readyState == 4){
       if( xhr.status == 200 ){
        //modify here
        // console.log(xhr.responseText);
        showLatLng(xhr.responseText);
        changeAct(xhr.responseText);
       }else{
          console.log( xhr.status );
       }
   }
  }
  
  var url = "php/activity.php?act_startDate=" + text+"&act_endDate="+ text2;
  xhr.open("Get", url, true);
  xhr.send( null );
} 
/*=====================================
            getPlace
    =======================================*/
$(".a-getLatLng").click(function getPlace(){
  console.log("lat",$(this).children("input").val());
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange=function (){
    if( xhr.readyState == 4){
       if( xhr.status == 200 ){
        //modify here
        // console.log(xhr.responseText);
        showLatLng(xhr.responseText);
        changeAct(xhr.responseText);
       }else{
          console.log( xhr.status );
       }
   }
  }
  
  var url = "php/activity.php?act_lat=" + $(this).children("input").val();
  xhr.open("Get", url, true);
  xhr.send( null );
})
/*=====================================
            getStr
    =======================================*/
function getStr(){
  console.log(document.getElementById("a-getStr").value);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange=function (){
    if( xhr.readyState == 4){
       if( xhr.status == 200 ){
        //modify here
        // console.log(xhr.responseText);
        showLatLng(xhr.responseText);
        changeAct(xhr.responseText);
       }else{
          console.log( xhr.status );
       }
   }
  }
  
  var url = "php/activity.php?act_name=" + document.getElementById("a-getStr").value;
  xhr.open("Get", url, true);
  xhr.send( null );
}

/*=====================================
            getClass cla_no
    =======================================*/    
$(".a-getDate").click(function(){

  console.log("input",$(this).children("input").val());

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange=function (){
    if( xhr.readyState == 4){
       if( xhr.status == 200 ){
        //modify here
        // console.log(xhr.responseText);
        showLatLng(xhr.responseText);
        changeAct(xhr.responseText);
       }else{
          console.log( xhr.status );
       }
   }
  }
  
  var url = "php/activity.php?actCla_no="+$(this).children("input").val();
  xhr.open("Get", url, true);
  xhr.send( null );


})



/*=====================================
            彈出日曆
    =======================================*/
$('#multiple').hide();
$('#a-date-control').focus(function(){
    $('#multiple').show().css({
        'position':'absolute',
        'top':'30px',
        'left':0,
        'width':'320px',
        'height':'320px',
        'z-index':20
    });
});
// $(".pignose-calendar-button-group").click(function(){
//     getDate();
// })
$('body').on("click",function(evt) {
            console.log($(evt.target).parents("#multiple").length);
            if($(evt.target).parents("#multiple").length==0 && 
                evt.target.id != "a-date-control" && evt.target.class != "calendar-dark") {
                $('#multiple').hide();


    }
});

/*=====================================
        日曆            
=======================================*/
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
    text2 = '';
    if(date[0] !== null) {
        text += date[0].format('YYYY-MM-DD');
    }

    if(date[0] !== null && date[1] !== null) {
        // text += '~';
    } else if(date[0] === null && date[1] == null) {
        text += 'nothing';
    }

    if(date[1] !== null) {
        text2 = date[1].format('YYYY-MM-DD');
    }
    //操作區
    $box.text(text);
    console.log(text,"~",text2);
    $('#a-date-control').val(text+text2);
    getDate();
}//wrapperend


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
    // modal: true,
    buttons: true,
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
        (date[0] === null? 'null':date[0].format('YYYY-MM-DD')) + 
        '.' +
        '<br /><br />' +
        '<strong>Active dates</strong><br /><br />' +
        '<div class="active-dates"></div>');

        for(var idx in obj.storage.activeDates) {
            var date = obj.storage.activeDates[idx];
            if(typeof date !== 'string') {
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
    for(var i=0; i<times; /* Do not increase index */) {
        var year = moment().year();
        var month = 0;
        var day = parseInt(Math.random() * 364 + 1);
        var date = moment().year(year).month(month).date(day).format('YYYY-MM-DD');
        if($.inArray(date, disabledDates) === -1) {
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
});

// Disabled Weekdays Calendar.
$('.disabled-weekdays-calendar').pignoseCalendar({
    select: onClickHandler,
    disabledWeekdays: [0, 6]
});

// Disabled Range Calendar.
var minDate = moment().set('dates', Math.min(moment().day(), 2 + 1)).format('YYYY-MM-DD');
var maxDate = moment().set('dates', Math.max(moment().day(), 24 + 1)).format('YYYY-MM-DD');
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



/*================================
			fullpage
===================================*/
$('#fullpage').fullpage({
    //Navigation
    menu: '#menu',
    lockAnchors: false,
    anchors:['firstPage', 'secondPage'],
    navigation: false,
    navigationPosition: 'right',
    navigationTooltips: ['firstSlide', 'secondSlide'],
    showActiveTooltip: false,
    slidesNavigation: false,
    slidesNavPosition: 'top',

    //Scrolling
    css3: true,
    scrollingSpeed: 700,
    autoScrolling: true,
    fitToSection: true,
    fitToSectionDelay: 1000,
    scrollBar: false,
    easing: 'easeInOutCubic',
    easingcss3: 'ease',
    loopBottom: false,
    loopTop: false,
    loopHorizontal: true,
    continuousVertical: false,
    continuousHorizontal: false,
    scrollHorizontally: false,
    interlockedSlides: false,
    dragAndMove: false,
    offsetSections: false,
    resetSliders: false,
    fadingEffect: false,
    normalScrollElements: '#section1, .element2',
    scrollOverflow: false,
    scrollOverflowReset: true,
    scrollOverflowOptions: null,
    touchSensitivity: 15,
    normalScrollElementTouchThreshold: 20,
    bigSectionsDestination: top,

    //Accessibility
    keyboardScrolling: true,
    animateAnchor: true,
    recordHistory: true,

    //Design
    // controlArrows: true,
    // verticalCentered: true,
    // sectionsColor : ['#ccc', '#fff'],
    // paddingTop: '3em',
    // paddingBottom: '10px',
    // fixedElements: '#header, .footer',
    // responsiveWidth: 0,
    // responsiveHeight: 0,
    // responsiveSlides: false,

    //Custom selectors
    sectionSelector: '.section',
    slideSelector: '.slide',

    lazyLoading: true,

    //events
    onLeave: function(index, nextIndex, direction){
    	// $.fn.fullpage.setAllowScrolling(false);
    },
    afterLoad: function(anchorLink, index){},
    afterRender: function(){},
    afterResize: function(){},
    afterResponsive: function(isResponsive){},
    afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
    onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
});//fullpageEnd


})//$(function) end