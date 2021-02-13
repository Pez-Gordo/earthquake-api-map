var map = L.map('map').fitWorld();

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicGV6IiwiYSI6ImNraWFlcDVsYTBpMW0ycnJreWRxdnNneXIifQ._2kq-bt8gs8Wmc5JIY-6NQ'
}).addTo(map);

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
