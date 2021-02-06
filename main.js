//var earthquakeData;
var lastDayEarthquakes = [];

var quakeIcon = L.icon({
    iconUrl: 'quakeIcon.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -37],
});

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
            var quakePos = result.earthquakeData.features[i].geometry.coordinates;
            var quakePopup = L.popup({
                maxWidth: 400
            }).setContent('On every stop sign we stop and wait for the rest to rejoin the group before we continue.');

            L.marker([quakePos[1], quakePos[0]], {icon: quakeIcon}).addTo(map).bindPopup(quakePopup)


        }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
    }

});
