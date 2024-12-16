//Intitialising map
var map = L.map('vector-map').setView([55.95151, -3.2365], 15);

//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//}).addTo(map);

//Add satellite imagery layer
L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    attribution: '&copy; <a href="https://www.google.com/maps">Google</a>',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    maxZoom: 20,    //max zoom in on map
    minZoom: 12     //min zoom out on map
    }).addTo(map);

    var sidePanel = document.getElementById('sidePanel');
        var toggleButton = document.getElementById('toggleButton');
        var treeInfo = document.getElementById('treeInfo');

    //gets markers and catches error if unsuccessful
    fetch('/markers')
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data).addTo(map);
            console.log(data);
        })
.catch(error => console.error(error));

    //add studysite border line using geojson
    fetch('/markers')
        .then(response => response.json())
        .then(data => {
            const geojsonData = data.geojson_data|safe ;
    L.geoJSON(geojsonData,{
        style: {
            color: 'black',}    //Border line color
    }).addTo(map);
    console.log(data);
            })
    .catch(error => console.error(error));
    
 