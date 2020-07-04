import React, { useEffect } from 'react'
import jsonData from '../data.json';
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
        // window.google.maps.event.addListener(marker, 'click', function (e) {
        //     infowindow.setPosition(e.latLng);
        //     //infowindow.setContent(this.label);
        //     infowindow.open(map);
        // });
        attachInfo(marker,data);


        //Attach click event to the marker.
       
    }

    function attachInfo(marker, data) {
        // window.google.maps.event.addListener(marker, 'click', function (e) {
        //     alert(e.title);
        //     infowindow.setContent(e.title);
        //     infowindow.open(map, marker);
        // });
        (function (marker, data) {
            window.google.maps.event.addListener(marker, "click", function (e) {
                //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                infoWindow.setContent("<div style = 'width:200px;min-height:40px'>" + data.confirmed + "</div>");
                infoWindow.open(map, marker);
            });
        })(marker, data);
    }

}

// function mapMarkers(results) {
//     var info = [];
//     var circles = [];

//     for (var i = 0; i < results.features.length; i++) {
//         var latLng = new window.google.maps.LatLng(results.features[i].properties.latitude, results.features[i].properties.longitude);
//         var contentString =
//             '<div id="content">' +
//             '<div>Country: ' + results.features[i].properties.name + '</div>' +
//             '<div>Confirmed: ' + results.features[i].properties.confirmed + '</div>' +
//             '<div>Deaths: ' + results.features[i].properties.deaths + '</div>' +
//             '<div>Active: ' + results.features[i].properties.active + '</div>' +
//             '<div>Recovered: ' + results.features[i].properties.recovered + '</div>' +
//             "</div>";

//         var cityCircle = new window.google.maps.Circle({
//             strokeColor: "#FF0000",
//             strokeOpacity: 0.8,
//             strokeWeight: 2,
//             fillColor: "#FF0000",
//             fillOpacity: 0.35,
//             label: contentString,
//             map: map,
//             center: latLng,
//             radius: Math.sqrt(results.features[i].properties.confirmed) * 1000
//         });
//         var infowindow = new window.google.maps.InfoWindow({
//             content: contentString
//         });
//         window.google.maps.event.addListener(cityCircle, 'click', function (e) {
//             infowindow.setPosition(e.latLng);
//             infowindow.setContent(this.label);
//             infowindow.open(this.map);
//         });
//     }
// }

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
            // const data = fetch("https://covid19-data.p.rapidapi.com/geojson-ww", {
            //     "method": "GET",
            //     "headers": {
            //         "x-rapidapi-host": "covid19-data.p.rapidapi.com",
            //         "x-rapidapi-key": "dbf67c03a6mshcdf93c761d0bd26p1079a3jsn825caf63e790"
            //     }
            // });
            // const jsonData = (await data).json();
            // const dataFromApi = await jsonData;
            var dataFromApi = jsonData;
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
