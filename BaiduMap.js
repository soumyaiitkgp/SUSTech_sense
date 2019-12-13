//Create and initialize the map function: 
  function initMap() {
    createMap(); //Create a map
    setMapEvent(); //Set map events
    addMapControl(); //Controls are added to the map
    addMarker(); //Add marker to the map
  }

  //Create a map function: 
  function createMap() {
    var map = new BMap.Map("dituContent"); //Create a map in Baidu map container
    var point = new BMap.Point(113.89032913208007815, 22.79725829315185545); //The definition of a center point coordinates (changes here)
    map.centerAndZoom(point,14); //Center point and coordinate map set and the map is displayed on the map in the container
    window.map = map; //The map variable is stored in the global
  }

  //Map event set function: 
  function setMapEvent() {
    map.enableDragging(); //Enable map drag events, enabled by default (not write)
    map.enableScrollWheelZoom(); //Enable map wheel zoom
    map.enableDoubleClickZoom(); //Enabling the mouse to double-click to enlarge, enabled by default (not write)
    map.enableKeyboard(); //Enable keyboard arrow keys move the map
  }

  //Map control function: 
  function addMapControl() {
    //Add controls to a map of China "
    var ctrl_nav = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE });
    map.addControl(ctrl_nav);
   
    //Add scale control to the map
    var ctrl_sca = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
    map.addControl(ctrl_sca);
  }

  //The marking point array of latitude and longitude
  var markerArr = [{ title: "C", content: "茅洲河", point: "113.89732913208007815|22.80225829315185545", isOpen: 0, icon: { w: 23, h: 25, l: 0, t: 21, x: 9, lb: 12} }
];
  //Create marker
  function addMarker() {
    for (var i = 0; i <markerArr.length; i++) {
      var json = markerArr[i];
      var p0 = json.point.split("|")[0];
      var p1 = json.point.split("|")[1];
      var point = new BMap.Point(p0, p1);
      var iconImg = createIcon(json.icon);
      var marker = new BMap.Marker(point, { icon: iconImg });
      var iw = createInfoWindow(i);
      var label = new BMap.Label(json.title, { "offset": new BMap.Size(json.icon.lb - json.icon.x + 10, -20) });
      marker.setLabel(label);
      map.addOverlay(marker);
      label.setStyle({
        borderColor: "#808080",
        color: "#333",
        cursor: "pointer"
      });

      (function () {
        var index = i;
        var _iw = createInfoWindow(i);
        var _marker = marker;
        _marker.addEventListener("click", function () {
          this.openInfoWindow(_iw);
        });
        _iw.addEventListener("open", function () {
          _marker.getLabel().hide();
        })
        _iw.addEventListener("close", function () {
          _marker.getLabel().show();
        })
        label.addEventListener("click", function () {
          _marker.openInfoWindow(_iw);
        })
        if (!!json.isOpen) {
          label.hide();
          _marker.openInfoWindow(_iw);
        }
      })()
    }
  }
  //Create InfoWindow
  function createInfoWindow(i) {
    var json = markerArr[i];
    var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>" + json.content + "</div>");
    return iw;
  }
  //Create a Icon
  function createIcon(json) {
    var icon = new BMap.Icon("http://map.baidu.com/image/us_cursor.gif", new BMap.Size(json.w, json.h), { imageOffset: new BMap.Size(-json.l, -json.t), infoWindowOffset: new BMap.Size(json.lb + 5, 1), offset: new BMap.Size(json.x, json.h) })
    return icon;
  }

  try {
    initMap(); //Create and initialize the map
  }
  catch (e) { }