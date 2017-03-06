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

function initAutocomplete() {
  var styles= [
                  {
                      "featureType": "water",
                      "elementType": "geometry.fill",
                      "stylers": [
                          {
                              "color": "#444444"
                          }
                      ]
                  }
              ]

  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});

  twCenter={lat: 23.876571, lng: 121.091443};
  var map = new google.maps.Map(document.getElementById('map'), {
    center: twCenter,
    zoom: 7,
    // disableDefaultUI:true,
    mapTypeControl:false,
    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    
  });//map結束
    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
 

    //===========新建marker================
      markera = new google.maps.Marker({
        map: map,
        title: 'Hello World!',
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: twCenter
      });
      markera.addListener('click', toggleBounce);
    //==============marker結束===============

    var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Zero-Gravity</h1>'+
      '<div id="bodyContent">'+
      '<img src="img/a_001.jpg" width="100"><p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';


  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  markera.addListener('click', function() {
    infowindow.open(map, markera);
  });


  // Create the search box and link it to the UI element.
  input = document.getElementById('pac-input');
  searchBox = new google.maps.places.SearchBox(input);
  // map.controls[google.maps.ControlPosition.RIGHT_TOP].push(input);
  // input.style.left='0px';


  // //=============================
  //             自建div_controler
  // ===================================
  var conBar = document.getElementById('co');
  conBar.style.position='fixed';
  conBar.style.backgroundColor='rgba(0,0,0,0.7)';
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(conBar);

  // //=============================
  //             自建div_zero
  // ===================================
  var zero = document.getElementById('zero');
  zero.style.position='fixed';
  zero.style.backgroundColor='rgba(255,0,0,0.7)';
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(zero);

  //bounds界限
  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // [START region_getplaces]
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: '../img/a_001.jpg',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(50, 50)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
  // [END region_getplaces]
  //新建一個div，用來設置map的center
  // var centerControlDiv = document.createElement('div');
  // var centerControl = new CenterControl(centerControlDiv, map);

  // centerControlDiv.index = -1;
  // map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(centerControlDiv);
  //centerControl結束


  //自訂控制板
  // var contDiv = document.createElement('div');
  // contDiv.style.position='fixed';
  // contDiv.style.width='30%';
  // contDiv.style.height='100%';
  // contDiv.style.backgroundColor='rgba(0,0,0,0.5)';
  // contDiv.index=-1;
  // contDiv.innerHTML='<h1>控制板</h1><br><input>';
  // contDiv.appendChild(centerControlDiv);
  // contDiv.appendChild(input);
  // // contDiv.appendChild(searchBox);
  // map.controls[google.maps.ControlPosition.LEFT_TOP].push(contDiv);

  //===============Marker==============
  
}



function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  //生一個div出來
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Center Map';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    
    map.setCenter(twCenter);
  });

}
