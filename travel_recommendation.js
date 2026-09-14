// ===============================
// Get HTML elements
// ===============================

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");

const resultsTitle = document.getElementById("resultsTitle");
const recommendations = document.getElementById("recommendations");


// ===============================
// Load travel data from JSON
// ===============================

let travelData = null;

fetch("travel_recommendation_api.json")
    .then(response => {

        if (!response.ok) {
            throw new Error("Could not load JSON file");
        }

        return response.json();

    })

    .then(data => {

        travelData = data;

        console.log("Travel data loaded successfully");

    })

    .catch(error => {

        console.error("Error loading travel data:", error);

    });


// ===============================
// Search Button
// ===============================

searchBtn.addEventListener("click", function () {

    searchRecommendations();

});


// ===============================
// Press Enter to Search
// ===============================

searchInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        searchRecommendations();

    }

});


// ===============================
// Search Function
// ===============================

function searchRecommendations() {

    if (!travelData) {

        resultsTitle.textContent = "Please wait for the data to load.";

        return;

    }


    const keyword = searchInput.value.trim().toLowerCase();


    // Clear previous results

    recommendations.innerHTML = "";
    resultsTitle.textContent = "";


    // Empty search

    if (keyword === "") {

        resultsTitle.textContent =
            "Please enter a destination or keyword.";

        return;

    }


    let results = [];


    // ===============================
    // BEACH SEARCH
    // ===============================

    if (
        keyword === "beach" ||
        keyword === "beaches" ||
        keyword.includes("beach")
    ) {

        results = travelData.beaches;

        resultsTitle.textContent = "Beautiful Beaches";

    }


    // ===============================
    // TEMPLE SEARCH
    // ===============================

    else if (
        keyword === "temple" ||
        keyword === "temples" ||
        keyword.includes("temple")
    ) {

        results = travelData.temples;

        resultsTitle.textContent = "Amazing Temples";

    }


    // ===============================
    // COUNTRY SEARCH
    // ===============================

    else if (
        keyword === "country" ||
        keyword === "countries" ||
        keyword.includes("country")
    ) {

        travelData.countries.forEach(country => {

            country.cities.forEach(city => {

                results.push(city);

            });

        });

        resultsTitle.textContent = "Wonderful Countries";

    }


    // ===============================
    // Specific country search
    // ===============================

    else {

        travelData.countries.forEach(country => {

            if (country.name.toLowerCase().includes(keyword)) {

                country.cities.forEach(city => {

                    results.push(city);

                });

            }

        });


        // If no country found

        if (results.length === 0) {

            resultsTitle.textContent =
                "No recommendations found.";

            return;

        }

        resultsTitle.textContent =
            "Recommended Destinations";

    }


    // ===============================
    // Hide Home Intro
    // ===============================

    document.querySelector(".intro").style.display = "none";


    // ===============================
    // Display Results
    // ===============================

    displayRecommendations(results);

}


// ===============================
// Display Recommendation Cards
// ===============================

function displayRecommendations(results) {

    results.forEach(place => {

        const card = document.createElement("div");

        card.className = "recommendation-card";


        card.innerHTML = `

            <img
                src="${place.imageUrl}"
                alt="${place.name}"
            >

            <h2>
                ${place.name}
            </h2>

            <p>
                ${place.description}
            </p>

        `;


        recommendations.appendChild(card);

    });

}


// ===============================
// Clear Button
// ===============================

clearBtn.addEventListener("click", function () {

    searchInput.value = "";

    recommendations.innerHTML = "";

    resultsTitle.textContent = "";


    // Show Home Intro again

    document.querySelector(".intro").style.display = "block";

});