
function initMap() {
    markerb = [];
    markers =[];
    markerArray = [];
    var styles = [{
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#444444"
        }]
    }]
    var styledMap = new google.maps.StyledMapType(styles, { name: "Styled Map" });
    twCenter = { lat: 23.876571, lng: 121.091443 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: twCenter,
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    });


    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');


// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

function toggleBounce() {
  if (markera.getAnimation() !== null) {
    markera.setAnimation(null);
  } else {
    markera.setAnimation(google.maps.Animation.BOUNCE);
  }
}









    /*================================
              新建marker
    ===================================*/
    // markera = new google.maps.Marker({
    //     map: map,
    //     title: 'Hello World!',
    //     draggable: true,
    //     animation: google.maps.Animation.DROP,
    //     position: twCenter
    // });

/*=====================================
            設定zIndex
    =======================================*/
google.maps.InfoWindowZ=function(opts){
          var GM = google.maps,
              GE = GM.event,
              iw = new GM.InfoWindow(),
              ce;

             if(!GM.InfoWindowZZ){
                GM.InfoWindowZZ=Number(GM.Marker.MAX_ZINDEX);
             }

             GE.addListener(iw,'content_changed',function(){
               if(typeof this.getContent()=='string'){
                  var n=document.createElement('div');
                      n.innerHTML=this.getContent();
                      this.setContent(n);
                      return;
               }
               GE.addListener(this,'domready',
                               function(){
                                var _this=this;
                                _this.setZIndex(++GM.InfoWindowZZ);
                                if(ce){
                                  GM.event.removeListener(ce);
                                }
                                ce=GE.addDomListener(this.getContent().parentNode
                                                  .parentNode.parentNode,'mouseover',
                                                  function(){
                                                  _this.setZIndex(++GM.InfoWindowZZ);
                                });
                              })
             });

             if(opts)iw.setOptions(opts);
             return iw;
        }


     /*=====================================
                北中南東
        =======================================*/
    var north = document.getElementById("a-north");
    google.maps.event.addDomListener(north, 'click', function() {
        map.setZoom(9);
        map.setCenter(new google.maps.LatLng(25.105497, 121.397366));
    });
    var a_center = document.getElementById("a-center");
    google.maps.event.addDomListener(a_center, 'click', function() {
        map.setZoom(9);
        map.setCenter(new google.maps.LatLng(23.876571, 121.091443));
    });
    var south = document.getElementById("a-south");
    google.maps.event.addDomListener(south, 'click', function() {
        map.setZoom(9);
        map.setCenter(new google.maps.LatLng(22.876571, 120.991443));
    });
    var east = document.getElementById("a-east");
    google.maps.event.addDomListener(east, 'click', function() {
        map.setZoom(9);
        map.setCenter(new google.maps.LatLng(23.80083, 121.63528));
    });
       
lightBox();

} //initMap end


infoArray=[];
/*================================
        newMarker
===================================*/
function newMarker() {
    clearMarkers();
    // markerArray=[];
    // clearMarkers();
    
    for (var i = 0; i <act.length; i++) {

        console.log("creatMarker", parseFloat(act[i].act_lat), parseFloat(act[i].act_lng));
        tmp = new google.maps.LatLng(parseFloat(act[i].act_lat), parseFloat(act[i].act_lng));
        // var marker="marker";

        markerb = new google.maps.Marker({
            map: map,
            title: act[i].act_name,
            animation: google.maps.Animation.DROP,
            position: tmp,
            icon:"img/a_telescope.png"
        });
          console.log(act[i].act_name);
        
         var content = '<div id="iw-container"><div class="iw-title ff_lightbox_link">'+act[i].act_name+'</div>'+
         '<input type="hidden" value="'+act[i].act_no+'" /></div>';
         infowindow = new google.maps.InfoWindowZ({
            content: content
          });

        infowindow.open(map, markerb);

        infoArray.push(infowindow);

        markerArray.push(markerb);//用一個陣列將產出的marker存起來
        // console.log("markerArray", markerArray);
    }//for end
    google.maps.event.addListener(infowindow, 'domready', function() {
         lightBox();
        infowindow.addListener('click', lightBox);
    });
    console.log('infoWindow',infoArray);
    setInfoWindow();
        
}//new marker end

function lightBox(){
/*=====================================
            lightbox
    =======================================*/

// lightbox效果--主題被點擊後，lightbox跳出
$('.ff_lightbox_link').click(function(e){
    e.preventDefault();

    $('#ff_lightbox').css({
        transform: 'scale(1) ',
        transition:'.5s linear'

    })
    
});

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
$(".ff_lightbox_link").click(function(){
    $('div').remove(".a-removeComm");
    var act_no = $(this).next("input").val();
    $.ajax({
        url: 'php/activity.php',//php,jsp and etc..
        type: 'POST',
        data: {
            act_no:act_no
        },
        dataType: "json",
        async: false,
        success: function(data, textStatus, jqXHR) {
            console.log('lightBox Success: ' + textStatus);
            console.log(data);
                $(".aa_banner").css({
                    'background':'url('+data[0][0].act_img+')'
                });

                $("#a-lb-act_name").text(data[0][0].act_name);
                $("#a-lb-act_info").text(data[0][0].act_info);
                $("#a-lb-act_date").text(data[0][0].act_startDate+"~"+data[0][0].act_endDate);
                $("#a-lb-actCla_name").text(data[0][0].actCla_name);
                $("#a-lb-act_place").text(data[0][0].act_place);
                $("#a-lb-act_price").text(data[0][0].act_price);

                // if(data[0].actMs)
                if(data[1][0]!=0){
                    for(var i=0;i<data.length;i++){
                        $("#a-comm").append(
                            '<div class="comment ct1 a-removeComm"><div class="user"><div class="user-pic"><img src="'+data[1][i].act_img+'">'+
                            '</div><div class="user-info"><span><a href="">'+data[1][i].mem_name+'</a></span></div></div>'+'<div class="ct-content">'+
                            '<p>參加活動：'+data[1][i].act_name+'<span class="ct-stars"><i class="fa fa-star" aria-hidden="true"></i>'+
                            '<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i>'+
                            '<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></span></p>'+
                            '<p>'+data[1][i].actMsg_content+'</p>'+
                            '<p>'+data[1][i].actMsg_content+'</p></div>'+
                            '<div class="clear"></div></div>'
                        )                
                    }                    
                }else{
                    $("#a-comm").append(
                        '<div class="ct-content a-removeComm" style="color:#fff;text-align:center;padding-bottom:30px;font-size:20px;">尚無評論</div>'
                    );
                }



        },

        error: function(jqXHR, textStatus, errorThrown) {
            // Handle errors here
            console.log('Errors: ' + textStatus);
            console.log(jqXHR);
            console.log(errorThrown);
            // STOP LOADING SPINNER
        }

    });    
})    
}
function setMapOnAll(map) {//把所有之前產出的marder都設成null
    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(map);
    }
}

// Removes themarkerArray from the map, but keeps them in the array.
function clearMarkers() {//將null值帶入setMapOnAll()
    setMapOnAll(null);
};

// // Shows anymarkerArray currently in the array.
// function showMarkers() {
//   setMapOnAll(map);
// }



/*=====================================
            改變infoWindow
    =======================================*/
function setInfoWindow(){
google.maps.event.addListener(infowindow, 'domready', function() {

    // Reference to the DIV that wraps the bottom of infowindow
    var iwOuter = $('.gm-style-iw');

    /* Since this div is in a position prior to .gm-div style-iw.
     * We use jQuery and create a iwBackground variable,
     * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
    */
    /*=====================================
                將XX弄掉
        =======================================*/
    iwOuter.next().css({'display':'none'});
    var iwBackground = iwOuter.prev();

    // Removes background shadow DIV
    iwBackground.children(':nth-child(2)').css({'display' : 'none'});

    // Removes white background DIV
    iwBackground.children(':nth-child(4)').css({'display' : 'none'});

    //Moves the infowindow 115px to the right.
    // iwOuter.parent().parent().css({left: '115px'});

    // Moves the shadow of the arrow 76px to the left margin.
    iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
    
    var left =iwBackground.children(':nth-child(3)').children(':nth-child(1)').children(':nth-child(1)');
    var right=iwBackground.children(':nth-child(3)').children(':nth-child(2)').children(':nth-child(1)');
    left.css({'background-color':'#48b5e9'});
    right.css({'background-color':'#48b5e9'});

    $(".iw-title").mouseover(function(){
        $(this).parent().parent().parent().parent().prev().children(':nth-child(3)')
        .children(':nth-child(1)').children(':nth-child(1)').css({'background-color':'#fa0'});
        $(this).parent().parent().parent().parent().prev().children(':nth-child(3)')
        .children(':nth-child(2)').children(':nth-child(1)').css({'background-color':'#fa0','z-index':'1000'});

        $(this).css({'background-color':'#fa0','z-index':'1000'});
    }).mouseout(function(){
        $(this).parent().parent().parent().parent().prev().children(':nth-child(3)')
        .children(':nth-child(1)').children(':nth-child(1)').css({'background-color':'#48b5e9','z-index':'1'});
        $(this).parent().parent().parent().parent().prev().children(':nth-child(3)')
        .children(':nth-child(2)').children(':nth-child(1)').css({'background-color':'#48b5e9','z-index':'1'});
        $(this).css({'background-color':'#48b5e9','z-index':'1'});       
    });


    // Moves the arrow 76px to the left margin.
    // iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

    // Changes the desired tail shadow color.
    iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(255, 255, 255, 1) 0px 1px 6px', 'z-index' : '1'});

    // Reference to the div that groups the close button elements.
    var iwCloseBtn = iwOuter.next();

    // Apply the desired effect to the close button
    // iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});

    // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
    if($('.iw-content').height() < 140){
      $('.iw-bottom-gradient').css({display: 'none'});
    }

    // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
    iwCloseBtn.mouseout(function(){
      $(this).css({opacity: '1'});
    });
  });   
}//change infoWindow end



