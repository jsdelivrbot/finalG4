$(function(){

adm=JSON.parse(sessionStorage.getItem('adm'))

$(".admName").prepend(adm.adm_name+"  您好");
   // adm=localStorage['adm'];
   // $(".admName").text(adm);   

/*=====================================
            後端搜尋
    =======================================*/
$("#adm-search").click(function(){
var act_class = $(this).prev().prev().val();
var act_str = '%'+$(this).prev().val()+'%'; 
console.log(act_class,act_str);
document.location.href="admin_act.php?act_class="+act_class+"&act_str="+act_str+"";
    // $.ajax({
    //     url: 'php/admin.php',//php,jsp and etc..
    //     type: 'POST',
    //     data: {
    //        act_class:act_class,
    //        act_str:act_str
    //     },
    //     dataType: "json",
    //     async: false,
    //     success: function(data, textStatus, jqXHR) {
    //         console.log('Success: ' + textStatus);
    //         console.log(data);

    //         for(var i=0;i<data.length;i++){
    //             var temp =  
    //         }
    //     },

    //     error: function(jqXHR, textStatus, errorThrown,data) {
    //         // Handle errors here
    //         console.log('Errors: ' + textStatus);
    //         // STOP LOADING SPINNER
    //          console.log(jqXHR);
    //          console.log(errorThrown);
    //     }

    // });     
})
/*=====================================
            修改專欄
    =======================================*/
$(".ad-spe_change").click(function(){
        var spe_change = $(this).parent().parent().children("td:first-child");
        $(this).parent().parent().parent().parent().css({'display':'none'});
        console.log(spe_change.text());
         $.ajax({
            url: 'php/admin.php',//php,jsp and etc..
            type: 'POST',
            data: {
               spe_change:spe_change.text()
            },
            dataType: "json",
            async: false,
            success: function(data, textStatus, jqXHR) {
                console.log('Success: ' + textStatus);
                console.log(data);
               console.log();
                $("#admTable").after(
                '<div class="ad-remove">'+
                '<form action="php/admin.php" method="post" enctype="multipart/form-data">'+
                '<table id="speChangeTable">'+
                  '<input name="spe_no" type="hidden" value="'+data[0].spe_no+'" />'+
                  
                  '<tr>'+
                    '<th>專欄標題</th>'+
                    '<td><input name="spe-title" type="text" value="'+data[0].spe_title+'"/></td>'+
                  '</tr>'+
                   '<tr>'+
                    '<th>專欄作者</th>'+
                    '<td><input name="spe_author" type="text" value="'+data[0].spe_author+'"/></td>'+
                  '</tr>'+
                  '<tr>'+
                    '<th>作者照片</th>'+
                    '<td><input name="spe_authorImg" type="file" /><img src="'+data[0].spe_authorImg+'" alt="" width="50" /></td>'+
                  '</tr>'+    
                  '<tr>'+                   
                    '<th>發表日期</th>'+
                    '<td><input name="spe_date" type="date" value="'+data[0].spe_date+'"/></td>'+
                  '</tr>'+                                     
                  '<tr>'+
                    '<th>專欄照片</th>'+
                    '<td><input name="spe_img" type="file" /><img src="'+data[0].spe_img+'" alt="" width="200" /></td>'+
                  '</tr>'+ 
                  '<tr>'+
                    '<th>專欄內容</th>'+
                    '<td><textarea name="spe_content" id="" cols="40" rows="10">'+data[0].spe_content+'</textarea></td>'+
                  '</tr>'+
              
                  '<tr>'+
                    '<th>確認修改</th>'+
                    '<td><input type="submit" name="" value="確定修改" class="btn-lg btn-blue" id="ad-spe-change">'+
                    '<input type="button" name="" value="取消修改" class="btn-lg btn-blue" id="ad-spe-cansel"></td>'+
                  '</tr>'+
                
                '</table>'+
                '</form>'+
                '</div>'
                
              );
              sendArea();      

            },

            error: function(jqXHR, textStatus, errorThrown,data) {
                // Handle errors here
                console.log('Errors: ' + textStatus);
                // STOP LOADING SPINNER
                 console.log(jqXHR);
                 console.log(errorThrown);
            }

        }); 
        speChange();       
})
function speChange(){
/*=====================================
            取消專欄編輯
    =======================================*/
    $("#ad-spe-cansel").click(function(){
    $('div').remove('.ad-remove');
    $('#knowTable').show();      
})
}

/*=====================================
            送出照片檢舉數
    =======================================*/
function pho_report(){
/*=====================================
            取消照片檢舉
    =======================================*/
    $("#pho-report").click(function(){
        $("#pho-reportNum").text(0);
    })
    $("#ad-pho-cansel").click(function(){
    $('div').remove('.ad-remove');
    $('#photoTable').show();      
})
  $("#ad-pho-change").click(function(){
    var pho_reportNo = $(this).parent().parent().parent().parent().children("input");
    var pho_reportNum = $(this).parent().parent().prev().children("td").children("p");
    console.log(pho_reportNo.val(),pho_reportNum.val());
    $.ajax({
        url: 'php/admin.php',//php,jsp and etc..
        type: 'POST',
        data: {
           pho_reportNo:pho_reportNo.val(),
           pho_reportNum:pho_reportNum.text()
        },
        dataType: "json",
        async: false,
        success: function(data, textStatus, jqXHR) {
            console.log('Success: ' + textStatus);
            console.log(data.pho_report);
            // pho_report.text(data.pho_report);
        },

        error: function(jqXHR, textStatus, errorThrown,data) {
            // Handle errors here
            console.log('Errors: ' + textStatus);
            // STOP LOADING SPINNER
             console.log(jqXHR);
             console.log(errorThrown);
        }

    });  
    $('div').remove('.ad-remove');
    $('#phoTable').show(); 
    document.location.href="admin_pho.php"; 
})  
}

/*=====================================
            編輯照片檢舉數
    =======================================*/
$(".ad-pho_change").click(function(){
        var pho_change = $(this).parent().parent().children("td:first-child");
        $(this).parent().parent().parent().parent().hide();
        console.log(pho_change.text());
         $.ajax({
            url: 'php/admin.php',//php,jsp and etc..
            type: 'POST',
            data: {
               pho_change:pho_change.text()
            },
            dataType: "json",
            async: false,
            success: function(data, textStatus, jqXHR) {
                console.log('Success: ' + textStatus);
                console.log(data);
               console.log();
                $("#admTable").after(
                '<div class="ad-remove">'+
                '<table id="phoChangeTable">'+
                  '<input type="hidden" value="'+data[0].pho_no+'" />'+
                  
                  '<tr>'+
                    '<th>照片名稱</th>'+
                    '<td>'+data[0].pho_name+'</td>'+
                  '</tr>'+     
                  '<tr>'+
                    '<th>會員名稱</th>'+
                    '<td>'+data[0].mem_name+'</td>'+
                  '</tr>'+                  
                  '<tr>'+
                    '<th>上傳日期</th>'+
                    '<td>'+data[0].pho_date+'</td>'+
                  '</tr>'+
                  '<tr>'+
                    '<th>照片</th>'+
                    '<td><img src="'+data[0].pho_path+'" alt="" width="200" /></td>'+
                  '</tr>'+
                  '<tr>'+
                    '<th>照片簡介</th>'+
                    '<td>'+data[0].pho_info+'</td>'+
                  '</tr>'+                  
                  '<tr>'+
                    '<th>拍攝地點</th>'+
                    '<td>'+data[0].pho_place+'</td>'+
                  '</tr>'+
                  '<tr>'+
                    '<th>被檢舉數</th>'+
                    '<td><p id="pho-reportNum">'+data[0].pho_report+'</p><input style="color:#000" type="button" id="pho-report" value="取消檢舉數" placeholder=""></td>'+
                  '</tr>'+
                  '<tr>'+
                    '<th>確認修改</th>'+
                    '<td><input type="submit" name="" value="確定修改" class="btn-lg btn-blue" id="ad-pho-change"><input type="button" name="" value="取消修改" class="btn-lg btn-blue" id="ad-pho-cansel"></td>'+
                  '</tr>'+
                
                '</table>'+
                '</div>'
                
              );   
              pho_report();
            },

            error: function(jqXHR, textStatus, errorThrown,data) {
                // Handle errors here
                console.log('Errors: ' + textStatus);
                // STOP LOADING SPINNER
                 console.log(jqXHR);
                 console.log(errorThrown);
            }

        });        
})

/*=====================================
            新增專欄圖片同步顯示
    =======================================*/

function fileChange(){
    var file = document.getElementById('spe_img').files[0];

    var fileName = file.name;


    /*=====================================
                fileReader
        =======================================*/
    //要new 一個FileReader
    var readFile = new FileReader();


    //以DataURL格式回傳結果，讀取圖檔和影片都使用此方法
    readFile.readAsDataURL(file);


readFile.addEventListener('load',function(){
        var image = document.getElementById('spe_imgShow');
        //.src是HTML的屬性
        //result是讀取到的內容
       
        image.src = readFile.result;
        //HTML不用加單位
        //EX:image.width=400;
        //css的屬性需要加單位
        image.style.maxWidth='200px';
        // image.style.maxHeight = '100%';    
},false);


}//fileChange end 圖片同步顯示
function fileChange2(){

    var file2 = document.getElementById('spe_authorImg').files[0];

    var fileName2 = file2.name;

    /*=====================================
                fileReader
        =======================================*/
    //要new 一個FileReader

    var readFile2 = new FileReader();

    //以DataURL格式回傳結果，讀取圖檔和影片都使用此方法

    readFile2.readAsDataURL(file2);


readFile2.addEventListener('load',function(){
        console.log("load");
        var image2 = document.getElementById('spe_authorImgShow');
        //.src是HTML的屬性
        //result是讀取到的內容
       
        image2.src = readFile2.result;
        //HTML不用加單位
        //EX:image.width=400;
        //css的屬性需要加單位
        image2.style.maxWidth='50px';
        // image.style.maxHeight = '100%';    
},false);



}//fileChange end 圖片同步顯示

/*=====================================
            新增專欄
    =======================================*/
$(".ad-spe_add").click(function(){    
$("#knowTable").hide();
$('div').remove('.ad-remove');
$("#admTable").after(
    '<div class="ad-remove">'+
    '<form action="php/admin.php" method="post" enctype="multipart/form-data">'+
    '<table id="speAddTable">'+
      
      '<tr>'+
        '<th>專欄標題</th>'+
        '<td><input type="text" name="spe_title" /></td>'+
      '</tr>'+
       '<tr>'+
        '<th>專欄作者</th>'+
        '<td><input type="text" name="spe_author" /></td>'+
      '</tr>'+                 
      '<tr>'+
        '<th>作者照片</th>'+
        '<td><input type="file" name="spe_authorImg" id="spe_authorImg" /><br><br><img width=50 src="" alt="" id="spe_authorImgShow" /></td>'+
      '</tr>'+   
      '<tr>'+
        '<th>專欄照片</th>'+
        '<td><input type="file" name="spe_img" id="spe_img" /><br><br><img src="" alt="" id="spe_imgShow" /></td>'+
      '</tr>'+                  
      '<tr>'+
        '<th>專欄內容</th>'+
        '<td><textarea name="spe_content" id="" cols="50" rows="10"></textarea></td>'+
      '</tr>'+
        '<th>確認修改</th>'+
        '<td><input type="submit" name="" value="確定修改" class="btn-lg btn-blue" id="ad-spe-add"><input type="button" name="" value="取消修改" class="btn-lg btn-blue" id="ad-spe-cansel"></td>'+
      '</tr>'+

    '</table>'+
    '</form>'+
    '</div>'

    );
    spe();
})
function spe(){
/*=====================================
            取消專欄新增
    =======================================*/
    $("#ad-spe-cansel").click(function(){
    $('div').remove('.ad-remove');
    $('#knowTable').show();      
})
    document.getElementById('spe_img').onchange = fileChange;
    document.getElementById('spe_authorImg').onchange = fileChange2;    
}

// $(".ad-spe_add").click(function(){

//         var spe_add = $(this).parent().parent().children("td:first-child");
//         $(this).parent().parent().parent().parent().css({'disspey':'none'});
//         console.log(spe_add.text());
//          $.ajax({
//             url: 'php/admin.php',//php,jsp and etc..
//             type: 'POST',
//             data: {
//                spe_add:spe_add.text()
//             },
//             dataType: "json",
//             async: false,
//             success: function(data, textStatus, jqXHR) {
//                 console.log('Success: ' + textStatus);
//                 console.log(data);
//                console.log();
//               // pla_report();      

//             },

//             error: function(jqXHR, textStatus, errorThrown,data) {
//                 // Handle errors here
//                 console.log('Errors: ' + textStatus);
//                 // STOP LOADING SPINNER
//                  console.log(jqXHR);
//                  console.log(errorThrown);
//             }

//         });        
// })

function sendArea(){
    
    $("#ad-act-cansel").click(function(){
    $('div').remove('.ad-remove');
    $('#actTable').show();   
});
    $("#ad-act-change").click(function(){
    var act_stateNo = $(this).parent().parent().parent().parent().children("input:first-child");
    var act_stateNum = $(this).parent().parent().prev().children("td").children("select");
    console.log('stateNo',act_stateNo.val(),'stateNum',act_stateNum.val());
    $.ajax({
        url: 'php/admin.php',//php,jsp and etc..
        type: 'POST',
        data: {
           act_stateNo:act_stateNo.val(),
           act_stateNum:act_stateNum.val()
        },
        dataType: "json",
        async: false,
        success: function(data, textStatus, jqXHR) {
            console.log('Success: ' + textStatus);
            console.log(data.act_state);
            document.location.href="admin_act.php"; 
        },

        error: function(jqXHR, textStatus, errorThrown,data) {
            // Handle errors here
            console.log('Errors: ' + textStatus);
            // STOP LOADING SPINNER
             console.log(jqXHR);
             console.log(errorThrown);
        }

    });
    
})  
}//send Area
/*=====================================
            修改活動狀態
    =======================================*/
$(".ad-act_change").click(function(){
        var act_change = $(this).parent().parent().children("td:first-child");
        $(this).parent().parent().parent().parent().css({'display':'none'});
        console.log(act_change.text());
         $.ajax({
            url: 'php/admin.php',//php,jsp and etc..
            type: 'POST',
            data: {
               act_change:act_change.text()
            },
            dataType: "json",
            async: false,
            success: function(data, textStatus, jqXHR) {
                console.log('Success: ' + textStatus);
                console.log(data);
               console.log();
                $("#admTable").after(
                '<div class="ad-remove">'+
                '<table id="actChangeTable">'+
                  '<input type="hidden" value="'+data[0].act_no+'" />'+
                  
                  '<tr>'+
                    '<th>活動名稱</th>'+
                    '<td>'+data[0].act_name+'</td>'+
                  '</tr>'+
                  '<tr>'+
                    '<th>活動照片</th>'+
                    '<td><img src="'+data[0].act_img+'" alt="" width="200" /></td>'+
                  '</tr>'+ 
                   '<tr>'+
                    '<th>活動類型</th>'+
                    '<td>'+data[0].actCla_name+'</td>'+
                  '</tr>'+                 

                  '<tr>'+
                    '<th>會員名稱</th>'+
                    '<td>'+data[0].mem_name+'</td>'+
                  '</tr>'+                  
                  '<tr>'+
                    '<th>開始日期</th>'+
                    '<td>'+data[0].act_startDate+'</td>'+
                  '</tr>'+
                  '<tr>'+
                    '<th>結束日期</th>'+
                    '<td>'+data[0].act_endDate+'</td>'+
                  '</tr>'+                  
                    '<th>活動內容</th>'+
                    '<td>'+data[0].act_info+'</td>'+
                  '</tr>'+
                  '<tr>'+

                  '<tr>'+
                    '<th>變更狀態</th>'+
                    '<td><select class="ad-act-state">'+
                                '<option value="0">待審核</option>'+
                                '<option value="1">通過</option>'+
                                '<option value="2">不合格</option>'+
                              '</select></td>'+
                  '</tr>'+
                  '<tr>'+
                    '<th>確認修改</th>'+
                    '<td><input type="submit" name="" value="確定修改" class="btn-lg btn-blue" id="ad-act-change">'+
                    '<input type="button" name="" value="取消修改" class="btn-lg btn-blue" id="ad-act-cansel"></td>'+
                  '</tr>'+
                
                '</table>'+
                '</div>'
                
              );
              sendArea();      

            },

            error: function(jqXHR, textStatus, errorThrown,data) {
                // Handle errors here
                console.log('Errors: ' + textStatus);
                // STOP LOADING SPINNER
                 console.log(jqXHR);
                 console.log(errorThrown);
            }

        });        
})



/*=====================================
            送出論壇文章檢舉數
    =======================================*/
function pla_report(){
/*=====================================
            取消論壇文章檢舉
    =======================================*/
    $("#pla-report").click(function(){
        $("#pla-reportNum").text(0);
    })
    $("#ad-pla-cansel").click(function(){
    $('div').remove('.ad-remove');
    $('#forumTable').show();      
})
  $("#ad-pla-change").click(function(){
    var pla_reportNo = $(this).parent().parent().parent().parent().children("input");
    var pla_reportNum = $(this).parent().parent().prev().children("td").children("p");
    console.log(pla_reportNo.val(),pla_reportNum.val());
    $.ajax({
        url: 'php/admin.php',//php,jsp and etc..
        type: 'POST',
        data: {
           pla_reportNo:pla_reportNo.val(),
           pla_reportNum:pla_reportNum.text()
        },
        dataType: "json",
        async: false,
        success: function(data, textStatus, jqXHR) {
            console.log('Success: ' + textStatus);
            console.log(data.pla_report);
            // pla_report.text(data.pla_report);
        },

        error: function(jqXHR, textStatus, errorThrown,data) {
            // Handle errors here
            console.log('Errors: ' + textStatus);
            // STOP LOADING SPINNER
             console.log(jqXHR);
             console.log(errorThrown);
        }

    });  
    $('div').remove('.ad-remove');
    $('#forumTable').show(); 
    document.location.href="admin_pla.php"; 
})  
}

/*=====================================
            編輯貼文
    =======================================*/
$(".ad-pla_change").click(function(){
        var pla_change = $(this).parent().parent().children("td:first-child");
        $(this).parent().parent().parent().parent().css({'display':'none'});
        console.log(pla_change.text());
         $.ajax({
            url: 'php/admin.php',//php,jsp and etc..
            type: 'POST',
            data: {
               pla_change:pla_change.text()
            },
            dataType: "json",
            async: false,
            success: function(data, textStatus, jqXHR) {
                console.log('Success: ' + textStatus);
                console.log(data);
               console.log();
                $("#admTable").after(
                '<div class="ad-remove">'+
                '<table id="plaChangeTable">'+
                  '<input type="hidden" value="'+data[0].pla_no+'" />'+
                  '<tr>'+
                    '<th>文章名稱</th>'+
                    '<td>'+data[0].pla_title+'</td>'+
                  '</tr>'+
                   '<tr>'+
                    '<th>文章類型</th>'+
                    '<td>'+data[0].plaCla_name+'</td>'+
                  '</tr>'+                 

                  '<tr>'+
                    '<th>會員名稱</th>'+
                    '<td>'+data[0].mem_name+'</td>'+
                  '</tr>'+                  
                  '<tr>'+
                    '<th>發文日期</th>'+
                    '<td>'+data[0].pla_date+'</td>'+
                  '</tr>'+
                  '<tr>'+
                    '<th>文章內容</th>'+
                    '<td>'+data[0].pla_content+'</td>'+
                  '</tr>'+
                  '<tr>'+
                    '<th>被檢舉數</th>'+
                    '<td><p id="pla-reportNum">'+data[0].pla_report+'</p><input id="pla-report" style="color:#000" type="button" value="取消檢舉數" placeholder=""></td>'+
                  '</tr>'+
                  '<tr>'+
                    '<th>確認修改</th>'+
                    '<td><input type="submit" name="" value="確定修改" class="btn-lg btn-blue" id="ad-pla-change"><input type="submit" name="" value="取消修改" class="btn-lg btn-blue" id="ad-pla-cansel"></td>'+
                  '</tr>'+
                
                '</table>'+
                '</div>'
                
              );
              pla_report();      

            },

            error: function(jqXHR, textStatus, errorThrown,data) {
                // Handle errors here
                console.log('Errors: ' + textStatus);
                // STOP LOADING SPINNER
                 console.log(jqXHR);
                 console.log(errorThrown);
            }

        });        
})
/*=====================================
            論壇檢舉
    =======================================*/
    // $(".ad-pla_report").click(function(){
    //     var pla_reportNo = $(this).parent().parent().children("td:first-child");
    //     var pla_report = $(this).parent().prev();
    //     console.log(pla_reportNo.text());
    //     $.ajax({
    //         url: 'php/admin.php',//php,jsp and etc..
    //         type: 'POST',
    //         data: {
    //            pla_reportNo:pla_reportNo.text()
    //         },
    //         dataType: "json",
    //         async: false,
    //         success: function(data, textStatus, jqXHR) {
    //             console.log('Success: ' + textStatus);
    //             console.log(data.pla_report);
    //             pla_report.text(data.pla_report);
    //         },

    //         error: function(jqXHR, textStatus, errorThrown,data) {
    //             // Handle errors here
    //             console.log('Errors: ' + textStatus);
    //             // STOP LOADING SPINNER
    //              console.log(jqXHR);
    //              console.log(errorThrown);
    //         }

    //     });        
    // })

/*=====================================
            活動審核
    =======================================*/
    $(".ad-act-state").change(function(){
        var act_state_no = $(this).parent().parent().children("td:first-child");
        var act_stateFinal= $(this).parent().prev();
        var act_state= $(this).children("option:selected").val();
        console.log(act_state);
        console.log(act_state_no.text());
        $.ajax({
            url: 'php/admin.php',//php,jsp and etc..
            type: 'POST',
            data: {
               act_state:act_state,
               act_state_no:act_state_no.text()
            },
            dataType: "json",
            async: false,
            success: function(data, textStatus, jqXHR) {
                console.log('lightBox Success: ' + textStatus);
                console.log(data);
                if(data.act_state==0){
                    act_stateFinal.html('<input type="hidden" name="" value="'+data.act_state+'"><p>待審核</p>');
                }else if(data.act_state==1){
                    act_stateFinal.html('<input type="hidden" name="" value="'+data.act_state+'"><p style="color:green">合格</p>');
                }else{
                    act_stateFinal.html('<input type="hidden" name="" value="'+data.act_state+'"><p style="color:red">不合格</p>');
                }
            },

            error: function(jqXHR, textStatus, errorThrown,data) {
                // Handle errors here
                console.log('Errors: ' + textStatus);
                // STOP LOADING SPINNER
                 console.log(jqXHR);
                 console.log(errorThrown);
            }

        });          
    });
    /*=====================================
                修改活動(可放在前面)
        =======================================*/
    // $(".ad-act_change").click(function(){

    //     var act_change = $(this).parent().parent().children("td:first-child");
    //     console.log(act_change.text());
    //      $.ajax({
    //         url: 'php/admin.php',//php,jsp and etc..
    //         type: 'POST',
    //         data: {
    //            act_change:act_change.text()
    //         },
    //         dataType: "json",
    //         async: false,
    //         success: function(data, textStatus, jqXHR) {
    //             console.log('lightBox Success: ' + textStatus);
    //             console.log(data);
    //            var startDate = new Date(data[0].act_startDate);
    //            var endDate = new Date(data[0].act_endDate);
    //            console.log(startDate.getDate()>9? startDate.getDate():'0'+startDate.getDate());
    //             $("#admTable").after('<div id="ad-actChange">'+
    //             '<form action="php/admin.php" method="post">'+
    //             '<table id="actChangeTable">'+
    //               '<tr>'+
    //                 '<th>活動名稱</th>'+
    //                 '<td><input type="text" name="act_name" value="'+data[0].act_name+'" placeholder=""></td>'+
    //               '</tr>'+
    //                '<tr>'+
    //                 '<th>活動類型</th>'+
    //                 '<td><input type="text" name="act_class" value="'+data[0].actCla_name+'" placeholder=""></td>'+
    //               '</tr>'+                 

    //               '<tr>'+
    //                 '<th>會員編號</th>'+
    //                 '<td><input type="text" name="mem_no" value="'+data[0].mem_name+'" placeholder=""></td>'+
    //               '</tr>'+                  
    //               '<tr>'+
    //                 '<th>活動開始日期</th>'+
    //                 '<td><input type="date" name="act_startDate" value="'+startDate.getFullYear()+'-'+(startDate.getMonth()+1 < 10 ? '0'+(startDate.getMonth()+1) : startDate.getMonth()+1) + '-'+(startDate.getDate()>9? startDate.getDate():'0'+startDate.getDate())+'" placeholder="">到<input type="time" name="" value="'+startDate.getHours() + ':'+(startDate.getMinutes()>9? startDate.getMinutes():'0'+startDate.getMinutes()) + ':0'+startDate.getSeconds()+'" placeholder=""></td>'+
    //               '</tr>'+
    //               '<tr>'+
    //                 '<th>活動結束日期</th>'+
    //                 '<td><input type="date" name="act_endDate" value="'+endDate.getFullYear()+'-'+(endDate.getMonth()+1 < 10 ? '0'+(endDate.getMonth()+1) : endDate.getMonth()+1) + '-'+(endDate.getDate()>9? endDate.getDate():'0'+endDate.getDate())+'" placeholder="">到<input type="time" name="" value="'+endDate.getHours() + ':'+(endDate.getMinutes()>9? endDate.getMinutes():'0'+endDate.getMinutes()) + ':0'+endDate.getSeconds()+'" placeholder=""></td>'+
    //               '</tr>'+
    //               '<tr>'+
    //                 '<th>活動地點</th>'+
    //                 '<td><input type="text" name="act_place" value="'+data[0].act_place+'" placeholder=""></td>'+
    //               '</tr>'+
    //               '<tr>'+
    //                 '<th>活動緯度</th>'+
    //                 '<td><input type="text" name="act_lat" value="'+data[0].act_lat+'" placeholder=""></td>'+
    //               '</tr>'+
    //               '<tr>'+
    //                 '<th>活動經度</th>'+
    //                 '<td><input type="text" name="act_lng" value="'+data[0].act_lng+'" placeholder=""></td>'+
    //               '</tr>'+
    //               '<tr>'+
    //                 '<th>活動人數</th>'+
    //                 '<td><input type="text" name="act_limit" value="'+data[0].act_limit+'" placeholder=""></td>'+
    //               '</tr>'+                                                                
    //               '<tr>'+
    //                 '<th>活動費用</th>'+
    //                 '<td><input type="text" name="act_price" value="'+data[0].act_price+'" placeholder=""></td>'+
    //               '</tr>'+
    //               '<tr>'+
    //                 '<th>活動圖檔</th>'+
    //                 '<td><input type="file" name="act_img" value="" placeholder=""  enctype="multipart/form-data"><img width="100" src="'+data[0].act_img+'" alt="" /></td>'+
    //               '</tr>'+
    //               '<tr>'+
    //                 '<th>活動介紹</th>'+
    //                 '<td><textarea name="act_info">'+data[0].act_info+'</textarea></td>'+
    //               '</tr>'+

    //               '<tr>'+
    //                 '<th>確認修改</th>'+
    //                 '<td><input type="submit" name="" value="確定修改" class="btn-lg btn-blue"></td>'+
    //               '</tr>'+

    //             '</table>'+
    //             '</form>'+
    //           '</div>');


    //         },

    //         error: function(jqXHR, textStatus, errorThrown,data) {
    //             // Handle errors here
    //             console.log('Errors: ' + textStatus);
    //             // STOP LOADING SPINNER
    //              console.log(jqXHR);
    //              console.log(errorThrown);
    //         }

    //     });     
    // })

    /*=====================================
                後端刪除活動
        =======================================*/
    $(".ad-act_delete").click(function(){
        var act_delete = $(this).parent().parent().children("td:first-child");
        console.log(act_delete);
        $.ajax({
            url: 'php/admin.php',//php,jsp and etc..
            type: 'POST',
            data: {
               act_delete:act_delete.text()
            },
            dataType: "json",
            async: false,
            success: function(data, textStatus, jqXHR) {
                console.log('lightBox Success: ' + textStatus);
                console.log(data);
                act_delete.parent().remove();
            },

            error: function(jqXHR, textStatus, errorThrown,data) {
                // Handle errors here
                console.log('Errors: ' + textStatus);
                // STOP LOADING SPINNER
                 console.log(jqXHR);
                 console.log(errorThrown);
            }

        });        
    })
    /*=====================================
                後端修改論壇
        =======================================*/
    $(".ad-pla_change").click(function(){
        console.log("click");
    $("#ad-plaChange ").css({
            "display":"block"
        })
    })
    $("#a-lb-x").click(function(){
         $("#ad-actAdd ").css({
            "display":"none"
        })
    })    



    /*================================
                 管理員刪除
    ===================================*/
    adm_delete();
    function adm_delete(){
        $(".ad-adm_delete").click(function(){
        var adm_delete=$(this).parent().parent().children("td:first-child");
        console.log("adm_delete",adm_delete.text());
         $.ajax({
            url: 'php/admin.php',//php,jsp and etc..
            type: 'POST',
            data: {
               adm_delete:adm_delete.text()
            },
            dataType: "json",
            async: false,
            success: function(data, textStatus, jqXHR) {
                console.log('lightBox Success: ' + textStatus);
                console.log(data);
                adm_delete.parent().remove();

            },

            error: function(jqXHR, textStatus, errorThrown,data) {
                // Handle errors here
                console.log('Errors: ' + textStatus);
                // STOP LOADING SPINNER
                 console.log(jqXHR);
                 console.log(errorThrown);
            }

        });

    })
        /*================================
            管理員帳號修改
    ===================================*/
    $(".ad-adm_change").click(function(){
        var adm_name=$(this).parent().prev().prev().prev().children("input");
        var adm_acc=$(this).parent().prev().prev().children("input");
        var adm_psw=$(this).parent().prev().children("input");
        var adm_no=$(this).parent().prev().prev().prev().prev().text();
        console.log(adm_name.val(),"adm_no",adm_no);
        $.ajax({
            url: 'php/admin.php',//php,jsp and etc..
            type: 'POST',
            data: {
               adm_no:adm_no,
               adm_nameChange:adm_name.val(),
               adm_accChange:adm_acc.val(),
               adm_pswChange:adm_psw.val()
            },
            dataType: "json",
            async: false,
            success: function(data, textStatus, jqXHR) {
                console.log('lightBox Success: ' + textStatus);
                console.log(data);
                alert(data.status);
            },

            error: function(jqXHR, textStatus, errorThrown,data) {
                // Handle errors here
                console.log('Errors: ' + textStatus);
                // STOP LOADING SPINNER
                 console.log(jqXHR);
                 console.log(errorThrown);
            }

        });

    })
}




    /*================================
            管理員新增
    ===================================*/
    $(".ad-admAdd").click(function(){
        var adm_name=$("#adm_name").val();
        var adm_acc=$("#adm_acc").val();
        var adm_psw=$("#adm_psw").val();
        $.ajax({
            url: 'php/admin.php',//php,jsp and etc..
            type: 'POST',
            data: {
               adm_name:adm_name,
               adm_account:adm_acc,
               adm_psw:adm_psw
            },
            dataType: "json",
            async: false,
            success: function(data, textStatus, jqXHR) {
                console.log('lightBox Success: ' + textStatus);
                console.log(data);
                $("#ad-before").before('<tr><td>'+data[0].adm_no+'</td><td><input type="text" value='+data[0].adm_name+' /></td><td><input type="text" value='+data[0].adm_acc+' /></td>'+
                 '<td><input type="text" value='+data[0].adm_psw+' /></td>'+
                  '<td><i class="fa fa-pencil-square-o ad-adm_change" aria-hidden="true"></i></td>'+
                  '<td><i class="fa fa-times ad-adm_delete" aria-hidden="true"></i></td> </tr>');
                $("#adm_name").val("");$("#adm_acc").val("");$("#adm_psw").val("");
                $("#adm_no").text(parseInt(data[0].adm_no)+1);


            },

            error: function(jqXHR, textStatus, errorThrown,data) {
                // Handle errors here
                console.log('Errors: ' + textStatus);
                // STOP LOADING SPINNER
                 console.log(jqXHR);
                 console.log(errorThrown);
            }

        });
        adm_delete();
    })






    /*================================
                會員權限變更
    ===================================*/
    $(".ad-changePower").click(function(){
        var mem_c = $(this).parent().prev("td");
        var mem_close=$(this).parent().prev("td").text();
        var mem_no = $(this).parent().parent().children("td:first-child").text();
        console.log(mem_no);
        if(mem_close=="停權"){
          mem_close=1;
        }else{
          mem_close=0;
        }
        $.ajax({
            url: 'php/admin.php',//php,jsp and etc..
            type: 'POST',
            data: {
               mem_close:mem_close,
               mem_no:mem_no
            },
            dataType: "json",
            async: false,
            success: function(data, textStatus, jqXHR) {
                console.log('lightBox Success: ' + textStatus);
                console.log(data);
                var color;
                if(data[0].mem_close==0){
                  color="<span style='color:green'>正常</span>";
                }else{
                  color="<span style='color:red'>停權</span>"
                }
                mem_c.html(color);
                console.log(data[0].mem_close);
            },

            error: function(jqXHR, textStatus, errorThrown,data) {
                // Handle errors here
                console.log('Errors: ' + textStatus);
                // STOP LOADING SPINNER
                 console.log(jqXHR);
                 // console.log(errorThrown);
            }

        });
         
})

/*=====================================
                 表格出現
    =======================================*/

// $('.adminMenu li').click(function(){
//     var text = $(this).children("a").text();
//     var num = $(this).index();
//     console.log(text);
//     $('#view table:eq('+ num +')').show().css({'width':'90%'});
//     $('table').not('#view table:eq('+ num +')').css({'display':'none','width':'0%'});
//     $('div').remove('.ad-remove');
//     $('.admin-title p').text(text);
//     // $('form').css({'width':'0%'});
// })





$('.adminMenu li').click(function(){
    $(this).addClass('show').siblings().removeClass('show');

})



    /*================================
                表格滑動
    ===================================*/
    // var _liLeng = $('#adminNav li').length;
    // for(var i = 0 ; i < _liLeng ; i++){
    //   $('.adminMenu li:eq('+ i +')').click(function(){
    //    $("div").remove("#ad-actChange");
    //    $("div").remove("#ad-plaChange");
    //     $("#ad-actAdd").css({
    //         'display':'none'
    //     })
    //     $(this).addClass('show').siblings().removeClass('show');
    //     var a = $(this).index();
          // $('#view table:eq('+ a +')').stop(true,false).animate({'left':'0'},500).siblings("table").animate({'left':'200%'},500);
        // $('#view table:eq('+ a +')').siblings("table").css({'display':'block'});
      // })

    // }  

    /*================================
            後端新增活動
    ===================================*/
    $(".ad-act_add").click(function(){
        console.log("click");
        $("#ad-actAdd ").css({
            "display":"block"
        })
    })
    $("#a-lb-x").click(function(){
         $("#ad-actAdd ").css({
            "display":"none"
        })
    })
})//init end
