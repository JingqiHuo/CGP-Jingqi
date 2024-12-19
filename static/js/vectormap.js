
// Initialize the map
const map = L.map('map').setView([55.958899, -3.244733], 15);

// Define tile layers
const satelliteLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}?access_token=' + mapboxApiKey, {
    tileSize: 512,
    zoomOffset: -1,
    zoom: 14, // Initial zoom level
    minZoom: 14, // Minimum zoom allowed
    attribution: '© Mapbox' // give creds
});

// Define a light tile layer from Mapbox for alternative view
const lightLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=' + mapboxApiKey, {
    tileSize: 512,
    zoomOffset: -1,
    zoom: 14, // Initial zoom level
    minZoom: 14, // Minimum zoom allowed
    attribution: '© Mapbox' // give creds
});

// Add the default light layer to the map
lightLayer.addTo(map);

// Load and add the GeoJSON boundary layer


// Create a layer control
const baseLayers = {
    'Light': lightLayer,
    'Satellite': satelliteLayer
};

L.control.layers(baseLayers).addTo(map);


// Adjust boundary color on base layer change
map.on('baselayerchange', function(event) {
    if (boundaryLayer) {
        boundaryLayer.setStyle({
            color: event.name === 'Satellite' ? 'white' : 'black'
        });
    }
});

// Marker and species data management
let treeFacts = {};
const speciesGroups = {};
let layerControl = L.control.layers(null, speciesGroups, { collapsed: false }).addTo(map);

// Fetch tree facts
fetch('vectormap/facts')
    .then(response => response.json())
    .then(data => {
        treeFacts = data;
    })
    .catch(error => console.error('Error loading facts:', error));

// Fetch and display all species data and fit map to marker bounds
fetch('vectormap/species')
    .then(response => response.json())
    .then(data => {
        updateMarkers(data, true);
    })
    .catch(error => console.error('Error loading species data:', error));

function updateMarkers(data, isSpecies = false) {
    const bounds = L.latLngBounds(); // define bounds to fit markers

    // Clear existing layers if needed
    if (isSpecies) {
        for (let species in speciesGroups) {
            speciesGroups[species].clearLayers();
        }
    } else {
        Object.values(speciesGroups).forEach(group => group.clearLayers());
    }

    // Define colors for each species
    const speciesColors = {
        'Maple Sycamore': '#FF0000', // Bright red
        'Common Yew': '#00FF00', // Bright green
        'Birch': '#FFFF00', // Bright yellow
        'Hawthorn': '#FF69B4', // Hot pink
        'Willow': '#800080', // Purple
        'Beech': '#FFA500', // Orange
        'Prunus': '#0000FF', // Bright blue
        'Oak': '#FFFFFF', // White
        'Ash': '#00FFFF', // Cyan
        'Elm': '#ADD8E6' // Light blue
    };
    
    // Loop through the tree data to create markers
    data.forEach(tree => {
        const [tree_id, dw_biomass, species, lat, lon] = tree;
        const color = speciesColors[species] || 'blue'; // Default color if species not listed
        // Add markers to the correct species group
        if (!speciesGroups[species]) {
            speciesGroups[species] = L.layerGroup().addTo(map);
            layerControl.addOverlay(speciesGroups[species], species);
        }

        // Create a circle marker for the tree
        const marker = L.circleMarker([lat, lon], {
            color: color,
            fillColor: color,
            fillOpacity: 0.7,
            radius: 5
        }).addTo(speciesGroups[species]);

        // Add click event to display tree information
        marker.on('click', () => {
            displayTreeInfo(tree_id, dw_biomass, species);
        });

        bounds.extend([lat, lon]); // Extend map bounds to include the marker
    });

    map.fitBounds(bounds); // Adjust map view to fit all markers

    // Style checkboxes in the layer control to match species colors
    setTimeout(() => {
        const labels = document.querySelectorAll('.leaflet-control-layers-overlays label');
        labels.forEach(label => {
            const checkbox = label.querySelector('input[type="checkbox"]');
            const speciesName = label.textContent.trim();
            const color = speciesColors[speciesName] || 'blue';
            checkbox.style.accentColor = color;  // Apply species color to checkbox
        });
    }, 100);
}

// Fetch biomass data and update markers based on range
function fetchBiomassData(minBiomass, maxBiomass, button) {
    fetch(`vectormap/biomass?min_biomass=${minBiomass}&max_biomass=${maxBiomass}`)
        .then(response => response.json())
        .then(data => {
            updateMarkers(data);

            // Update button states to indicate the selected range
            document.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        })
        .catch(error => console.error('Error loading biomass data:', error)); // Log error
}

// Attach click events to range buttons for filtering data
document.getElementById('range-all').addEventListener('click', function() { fetchAllData(this); });
document.getElementById('range-0-100').addEventListener('click', function() { fetchBiomassData(0, 100, this); });
document.getElementById('range-100-500').addEventListener('click', function() { fetchBiomassData(100, 500, this); });
document.getElementById('range-500-1000').addEventListener('click', function() { fetchBiomassData(500, 1000, this); });
document.getElementById('range-1000-1500').addEventListener('click', function() { fetchBiomassData(1000, 1500, this); });

// Fetch all data to populate map
function fetchAllData(button) {
    fetch('vectormap/species')
        .then(response => response.json()) // Parse json resp
        .then(data => {
            updateMarkers(data, true); // Update markers with all data

            // Highlight slected button
            document.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        })
        .catch(error => console.error('Error loading all species data:', error)); // Log error
}



