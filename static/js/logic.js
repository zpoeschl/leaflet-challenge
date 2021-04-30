console.log("logic.js loaded");

// API geojson endpoint
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// perform GET request to queryUrl
d3.json(queryUrl).then(function(data) {
    // send data.features object to createFeatures function
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    // function to run for each feature in features array
    // give each feature a popup
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

    // create geojson layer containing features array
    // run onEachFeature once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
    });

    // send earthquakes layer to createMap function
    createMap(earthquakes);
}

function createMap(earthquakes) {

    // define map layer(s)
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
      });

    // define baseMaps object to hold base layers
    var baseMaps = {
        "Light Map": lightmap
    };

    // create overlap object to hold overlay earthquake layer
    var overlayMaps = {
        Earthquakes: earthquakes
    };

    // create map + light map and earthquake layers to display on load
    var myMap = L.map("mapid", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [lightmap, earthquakes]
    });

    // create layer control
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}