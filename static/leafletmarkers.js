//Intitialising map
var map = L.map('map').setView([55.95151, -3.2365], 15);

//Initialize the map
//let map = L.map('mapid').setView(L.latLng(55.95151, -3.2365), 15);

//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//}).addTo(map);

//Add satellite imagery layer
L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    attribution: '&copy; <a href="https://www.google.com/maps">Google</a>',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    maxZoom: 19,    //max zoom in on map
    minZoom: 12     //min zoom out on map
    }).addTo(map);

//let marker = L.circleMarker({radius:8}).addTo(map)
//
//marker.setstyle({
//    color: 'black',  //border color
//    weight: 2,      //border size
//    fillColor: 'green',  //fill color
//    fillOpacity: 1});