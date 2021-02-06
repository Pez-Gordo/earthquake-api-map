//var earthquakeData;
var lastDayEarthquakes = [];

var map = L.map('map').fitWorld();

L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=ypfODnzHuwl0bYyyvG3i', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    crossOrigin: true
}).addTo(map)

$.ajax({
	url: "./getEarthquakeData.php",
	type: 'GET',
	dataType: "json",
    
	
	success: function(result) {
        console.log('populate options' , result.earthquakeData.features[0]);
        for (var i = 0; i < result.earthquakeData.features.length; i++) {
            
        }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
    }

});
