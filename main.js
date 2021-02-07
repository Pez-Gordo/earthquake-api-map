var map = L.map('map').fitWorld();

var bwMap = L.tileLayer('https://api.maptiler.com/maps/toner/{z}/{x}/{y}.png?key=ypfODnzHuwl0bYyyvG3i', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    crossOrigin: true
}).addTo(map)

map.setZoom(3);

$.ajax({
	url: "./getEarthquakeData.php",
	type: 'GET',
	dataType: "json",
    
	
	success: function(result) {
        console.log('populate options' , result.earthquakeData.features[0]);
        for (var i = 0; i < result.earthquakeData.features.length; i++) {
            var quakePos = result.earthquakeData.features[i].geometry.coordinates;
            
            var mag = result.earthquakeData.features[i].properties.mag * 32 * 50;
            
            L.circle([quakePos[1], quakePos[0]], {
                color: 'red',
                fillColor: 'white',
                fillOpacity: 0.8,
                radius: mag,
                stroke: true,
                weight: 5, 
            }).addTo(map).bindPopup('Magnitude -> ' + result.earthquakeData.features[i].properties.mag + ' points.<br>' +
                                    'Place -> ' + result.earthquakeData.features[i].properties.place + '<br>' +
                                    'Type -> ' + result.earthquakeData.features[i].properties.type + '<br>' +
                                    'Time -> ' + result.earthquakeData.features[i].properties.time);        
        }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
    }

});
