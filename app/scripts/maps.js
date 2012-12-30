var map = L.map('main-map', {
    center: [53.357, -8.83],
    zoom: 9,
    minZoom: 9,
    maxZoom: 14,
    })

L.tileLayer('http://{s}.tile.cloudmade.com/da41d29fd31b4e8496d6f56f9dc70cbb/47926/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(map);

L.marker([53.342506846354354, -8.683533668518066]).addTo(map)
    .bindPopup('Athenry - <br> Newcastle course.');
L.marker([53.526878064558595,  -8.854808807373047]).addTo(map)
    .bindPopup('Tuam');

function onEachFeature(feature, layer) {
  var popupContent = "<p>I started out as a GeoJSON " +
      feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

  if (feature.properties && feature.properties.popupContent) {
    popupContent += feature.properties.popupContent;
  }

  layer.bindPopup(popupContent);
}


L.geoJson([routes, hqs], {

  style: function (feature) {
    return feature.properties && feature.properties.style;
  },

  onEachFeature: onEachFeature,

  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 8,
      fillColor: "#ff7800",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    });
  }
}).addTo(map);

