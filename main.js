var earthquakeData;

var map = L.map('map').fitWorld();

L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=ypfODnzHuwl0bYyyvG3i', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    crossOrigin: true
}).addTo(map)

$.ajax({
	url: "getEarthquakeData.php",
	type: 'POST',
	dataType: "json",
	
	success: function(result) {
        console.log('populate options' , result);
    }
});
