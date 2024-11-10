function initMap() {
    // Fetch store locations passed from EJS (from a global JavaScript variable)
    let storeLocations = window.storeLocations || [];

    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
        zoom: 12
    });

    // Create markers for each store location
    storeLocations.forEach(store => {
        new google.maps.Marker({
            position: { lat: store.latitude, lng: store.longitude },
            map: map,
            title: store.name
        });
    });
}
