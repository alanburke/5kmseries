var mapAttribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
    mapServerUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    mapServerUrl = 'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png';

var minimal   = L.tileLayer(mapServerUrl, {styleId: 47926, attribution: mapAttribution}),
    midnight  = L.tileLayer(mapServerUrl, {styleId: 999,   attribution: mapAttribution});

var routeStyle = {
    "color": "red",
    "weight": 3,
    "opacity": 0.65
}

var routes = L.geoJson(routes, {

  style: routeStyle,

  onEachFeature: onEachFeature,

});

var hqs = L.geoJson(hqs, {

  style: function (feature) {
    return feature.properties && feature.properties.style;
  },

  onEachFeature: onEachFeature,

  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 6,
      fillColor: "#ff7800",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    });
  }

});


var map = L.map('main-map', {
    center: [53.357, -8.83],
    zoom: 10,
    maxZoom: 16,
    scrollWheelZoom: false,
    layers: [midnight, routes, hqs]

});

var baseMaps = {
    "Day": minimal,
    "Night": midnight
};

var overlayMaps = {
    "Routes": routes,
    "HQs": hqs
};

L.control.layers(baseMaps, overlayMaps).addTo(map);


function onEachFeature(feature, layer) {
  if (feature.properties && feature.properties.popupContent) {
    popupContent = feature.properties.popupContent;
  }

  layer.bindPopup(popupContent);
}

  $('.nav-map a, a.button').click(function(e){
    var lat = $(this).data('lat');
    var lon = $(this).data('lon');
    map.setView([lat, lon] , 14);
  });
  $('.navbar a.all').click(function(e){
    var lat = 53.357;
    var lon = -8.83;
    map.setView([lat, lon] ,9);
    e.preventDefault();
  });


