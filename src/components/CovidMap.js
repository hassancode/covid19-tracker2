import React, { useEffect } from 'react'
var map;
function initMap() {
    map = new window.google.maps.Map(
        document.getElementById('map'), {
        zoom: 1,
        center: new window.google.maps.LatLng(2.8, -187.3),
        mapTypeId: 'terrain'
    });
}

var infowindow;


function mapMarkers(results) {
    for (var i = 0; i < results.features.length; i++) {
        var latLng = new window.google.maps.LatLng(results.features[i].properties.latitude, results.features[i].properties.longitude);
        var contentString =
            '<div id="content">' +
            '<div>Country: ' + results.features[i].properties.name + '</div>' +
            '<div>Confirmed: ' + results.features[i].properties.confirmed + '</div>' +
            '<div>Deaths: ' + results.features[i].properties.deaths + '</div>' +
            '<div>Active: ' + results.features[i].properties.active + '</div>' +
            '<div>Recovered: ' + results.features[i].properties.recovered + '</div>' +
            "</div>";
        

        var cityCircle = new window.google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            label: contentString,
            map: map,
            center: latLng,
            radius: Math.sqrt(results.features[i].properties.confirmed) * 1000
        });
        infowindow = new window.google.maps.InfoWindow({
            content: contentString
        });
        window.google.maps.event.addListener(cityCircle, 'click', function (e) {
            infowindow.setPosition(e.latLng);
            infowindow.setContent(this.label);
            infowindow.open(this.map);
        }, this);
    }
}

// function mapMarkers(results) {
//     //for (var i = 0; i < results.features.length; i++) {
//     results.features.forEach(feature => {
//         var latLng = new window.google.maps.LatLng(feature.properties.latitude, feature.properties.longitude);
//         var contentString =
//             '<div id="content">' +
//             '<div>Country: ' + feature.properties.name + '</div>' +
//             '<div>Confirmed: ' + feature.properties.confirmed + '</div>' +
//             '<div>Deaths: ' + feature.properties.deaths + '</div>' +
//             '<div>Active: ' + feature.properties.active + '</div>' +
//             '<div>Recovered: ' + feature.properties.recovered + '</div>' +
//             "</div>";
//         var infowindow = new window.google.maps.InfoWindow({
//             content: contentString
//         });

//         var cityCircle = new window.google.maps.Circle({
//             strokeColor: "#FF0000",
//             strokeOpacity: 0.8,
//             strokeWeight: 2,
//             fillColor: "#FF0000",
//             fillOpacity: 0.35,
//             label: contentString,
//             map: map,
//             center: latLng,
//             radius: Math.sqrt(feature.properties.confirmed) * 1000
//         });

//         window.google.maps.event.addListener(cityCircle, 'click', function (e) {
//             infowindow.setPosition(e.latLng);
//             infowindow.setContent(this.label);
//             infowindow.open(this.map);
//         });
//     });
// }

export const CovidMap = () => {
    window.initMap = initMap.bind(this);

    useEffect(() => {

        async function fetchData() {
            const data = fetch("https://covid19-data.p.rapidapi.com/geojson-ww", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "covid19-data.p.rapidapi.com",
                    "x-rapidapi-key": "dbf67c03a6mshcdf93c761d0bd26p1079a3jsn825caf63e790"
                }
            });
            const jsonData = (await data).json();
            const dataFromApi = await jsonData;

            map.data.addGeoJson(dataFromApi);
            mapMarkers(dataFromApi);
        }
        fetchData();
    }, [])

    return (
        <div>
            <h3>My Google Maps Demo</h3>
            <div id='map'></div>
        </div>
    )
}
