var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/da41d29fd31b4e8496d6f56f9dc70cbb/{styleId}/256/{z}/{x}/{y}.png',
    cloudmadeAttribution = 'Map data &copy; 2013 OpenStreetMap contributors, Imagery &copy; 2013 CloudMade';

var minimal   = L.tileLayer(cloudmadeUrl, {styleId: 47926, attribution: cloudmadeAttribution}),
    midnight  = L.tileLayer(cloudmadeUrl, {styleId: 999,   attribution: cloudmadeAttribution});

var routes = L.geoJson(routes, {

  style: function (feature) {
    return feature.properties && feature.properties.style;
  },

  onEachFeature: onEachFeature,

});

var hqs = L.geoJson(hqs, {

  style: function (feature) {
    return feature.properties && feature.properties.style;
  },

  onEachFeature: onEachFeature,

  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 5,
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
    zoom: 9,
    maxZoom: 14,
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

  $('.nav-map a').click(function(e){
    var lat = $(this).data('lat');
    var lon = $(this).data('lon');
    map.setView([lat, lon] , 13);
    e.preventDefault();
  });
  $('.navbar a.all').click(function(e){
    var lat = 53.357;
    var lon = -8.83;
    map.setView([lat, lon] ,9);
    e.preventDefault();
  });


