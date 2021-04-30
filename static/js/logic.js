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

