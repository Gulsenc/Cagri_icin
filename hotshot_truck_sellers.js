// Function to create the map with base layers and overlays
function createMap(hotshotTruckSellers) {
    // Create the base layer
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Create a baseMaps object
    let baseMaps = {
        "Street Map": street,
    };

    // Create an overlay object to hold our overlay
    let overlayMaps = {
        "Hotshot Truck Sellers": hotshotTruckSellers
    };

    // Create the map
    let map = L.map("map", {
        center: [37.0902, -95.7129], // Centered on USA
        zoom: 4,
        layers: [street, hotshotTruckSellers]
    });

    // Add layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
}

// Load the hotshot truck sellers data and create markers
d3.json('hotshot_truck_sellers.json').then(function(data) {
    console.log('Data loaded:', data); // Debugging statement
    // Create a layer group for hotshot truck sellers markers
    let hotshotTruckSellersMarkers = L.layerGroup();

    data.forEach(function(d) {
        // Create a marker for each seller
        let marker = L.marker([d.Latitude, d.Longitude]).bindPopup(
            '<b>' + d.Name + '</b><br>Type: ' + d.Type + '<br>Address: ' + d.Address + '<br>Rating: ' + d.Rating + ' (' + d.Review_Count + ' reviews)'
        );
        hotshotTruckSellersMarkers.addLayer(marker);
    });

    // Call the createMap function with the hotshot truck sellers markers
    createMap(hotshotTruckSellersMarkers);
}).catch(function(error) {
    console.log('Error loading or parsing data:', error);
});
