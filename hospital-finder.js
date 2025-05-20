let hospitalData = [];

// Load hospital data from a JSON file
fetch('hospitals.json')
    .then(response => response.json())
    .then(data => {
        hospitalData = data;
    })
    .catch(error => {
        console.error("Error loading hospital data:", error);
    });

// Add event listener to the Donate Now button
document.getElementById('donate-now').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

// Get user's position
function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    findNearestHospital(lat, lon);
}

// Error handling for geolocation
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

// Find nearby hospitals using OpenStreetMap (Nominatim)
function findNearestHospital(lat, lon) {
    const query = 'hospital';
    const radius = 0.50; // Roughly corresponds to about 10 km
    const nominatimURL = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=50&lat=${lat}&lon=${lon}&bounded=1&viewbox=${lon - radius},${lat + radius},${lon + radius},${lat - radius}`;

    fetch(nominatimURL)
        .then(response => response.json())
        .then(data => {
            let hospitalList = document.getElementById("hospital-list");
            hospitalList.innerHTML = '';  // Clear previous results

            const selectedBloodGroup = document.getElementById('blood-group').value;

            if (data.length > 0) {
                data.forEach(hospital => {
                    const displayNameParts = hospital.display_name.split(',');
                    const hospitalName = displayNameParts[0]; // Name is before the first comma
                    const address = displayNameParts.slice(1).join(',').trim(); // Rest is the address
                    
                    // Find matching hospital data
                    const matchedHospital = hospitalData.find(h => h.name.toLowerCase() === hospitalName.toLowerCase() && (selectedBloodGroup === "" || h.bloodGroup === selectedBloodGroup));

                    if (matchedHospital) {
                        let listItem = document.createElement('li');
                        listItem.innerHTML = `
                            <div class="hospital-row">
                                <span>${hospitalName}</span>
                                <span>${address}</span>
                                <span>${matchedHospital.bloodPackets}</span>
                            </div>
                        `;
                        hospitalList.appendChild(listItem);
                    }
                });
            } else {
                hospitalList.innerHTML = "<li>No hospitals found nearby.</li>";
            }
        })
        .catch(error => {
            console.error("Error fetching hospitals:", error);
            document.getElementById("hospital-list").innerHTML = "<li>Unable to fetch nearby hospitals.</li>";
        });
}

