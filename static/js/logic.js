var newYorkCoords = [40.73, -74.0059];
var mapZoomLevel = 12;

// Create the createMap function.
function createMap(bikeStations) {
  
  // Create the tile layer that will be the background of our map.
  var background = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Create a baseMaps object to hold the lightmap layer.
  

  // Create an overlayMaps object to hold the bikeStations layer.
  var bikeStationsOverlay = bikeStations;

  // Create the map object with options.
  var myMap = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [background,bikeStationsOverlay]
    });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  var baseMaps = {
    Street: background
  };
  var overlayMaps = {
    BikeStations: bikeStationsOverlay
  };
  L.control.layers(baseMaps,overlayMaps).addTo(myMap);
}

// Create the createMarkers function.
function createMarkers(response) {
  var stationsArray = [];
  // Pull the "stations" property from response.data.
  for (var i = 0; i < response.data.stations.length; i++){
    var station = response.data.stations[i];

    if (station) {
      stationsArray.push(station)
      //console.log(station)
    };
  };
  // Initialize an array to hold the bike markers.
  var bikeMarkersArray = [];
  // Loop through the stations array.
  //console.log(stationsArray.length)
  for (var i = 0; i < stationsArray.length; i++){
    // For each station, create a marker, and bind a popup with the station's name.
    bikeMarker = L.marker([stationsArray[i].lat, stationsArray[i].lon]).bindPopup("<h1>" + stationsArray[i].name + "</h1>");
    // Add the marker to the bikeMarkers array.
    bikeMarkersArray.push(bikeMarker);
    
  };
  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  var bikeMarkerGroup = L.layerGroup(bikeMarkersArray);

  createMap(bikeMarkerGroup);
}
// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
url = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json"
d3.json(url).then(function(results){
  createMarkers(results)
  //console.log(results)
  //console.log(results.data.stations.length)
});
//console.log(stationInfo)
