import React, {useState} from 'react'
var map;
function initMap() {
    map = new window.google.maps.Map(
        document.getElementById('map'), {
        zoom: 2,
        center: new window.google.maps.LatLng(2.8, -187.3),
        mapTypeId: 'terrain'
    });
}


function mapMarkers(results) {
    var infoWindow = new window.google.maps.InfoWindow();
    for (var i = 0; i < results.features.length; i++) {
        var data = results.features[i].properties;
        var latLng = new window.google.maps.LatLng(data.latitude, data.longitude);
        var scale = Math.sqrt(Math.sqrt(data.confirmed))
        var marker = new window.google.maps.Marker({
            position: latLng,
            title: 'test',
            icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: '#f00',
                fillOpacity: 0.35,
                strokeWeight: 0,
                scale: scale
            },
            map: map
        });
        attachInfo(marker, data);
    }

    function attachInfo(marker, data) {

        (function (marker, data) {
            window.google.maps.event.addListener(marker, "click", function (e) {
                var contentString =
                    '<div id="content">' +
                    '<div>Country: ' + data.name + '</div>' +
                    '<div>Confirmed: ' + data.confirmed + '</div>' +
                    '<div>Deaths: ' + data.deaths + '</div>' +
                    '<div>Active: ' + data.active + '</div>' +
                    '<div>Recovered: ' + data.recovered + '</div>' +
                    "</div>";

                //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow
                infoWindow.setContent(contentString);
                infoWindow.open(map, marker);
            });
        })(marker, data);
    }

}

export const CovidMap = ({data}) => {
const [isDataLoaded, setDataLoaded] = useState(false);
    window.initMap = initMap.bind(this);
    if(data && !isDataLoaded){
        map.data.addGeoJson(data);
        mapMarkers(data);
        setDataLoaded(true);
    }
    return (
        <div>
            <h3>My Google Maps Demo</h3>
            <div id='map'></div>
        </div>
    )
}
