console.log("clicked");

let countriesDataCache = null;
let populationDataCache = null;

function updateCard(cardId, name, flagSrc, year) {
  // Get the flag image element
  const flagElement = document.getElementById(`${cardId}-flag`);

  // Apply the fade-out effect to the current flag immediately
  flagElement.classList.add("flag-fade-out");

  // Update the flag with the new one immediately (no wait)
  flagElement.src = flagSrc;

  // Apply the fade-in effect to the new flag
  flagElement.classList.remove("flag-fade-out");
  flagElement.classList.add("flag-fade-in");

  // Update the year
  document.getElementById(`${cardId}-year`).querySelector("h2").textContent =
    `In ${year}`;

  // Update the country name
  document.getElementById(`${cardId}-name`).textContent = name;

  // Update the abbreviation
  document.getElementById(`${cardId}-abbr`).textContent = name
    .substring(0, 2)
    .toUpperCase();
}

async function fetchCountriesData() {
  if (countriesDataCache) {
    return countriesDataCache;
  }

  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    countriesDataCache = await response.json();
    return countriesDataCache;
  } catch (error) {
    console.error("Error fetching countries data:", error.message);
    return null;
  }
}

async function fetchPopulationData() {
  if (populationDataCache) {
    return populationDataCache;
  }

  try {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries/population",
    );
    populationDataCache = (await response.json()).data;
    return populationDataCache;
  } catch (error) {
    console.error("Error fetching population data:", error.message);
    return null;
  }
}

function getCountryFlag(countriesData, countryName) {
  // Find the country in the data
  const country = countriesData.find(
    (country) => country.name.common === countryName,
  );

  // Return the flag URL if found
  if (country && country.flags) {
    return country.flags.png; // Return the PNG flag URL
  }

  return 0;
}

async function getRandomPopulationWithFlag() {
  try {
    // Fetch the population and countries data
    const populationData = await fetchPopulationData();
    const countriesData = await fetchCountriesData();

    // Get a random country from the population data
    const randomCountry =
      populationData[Math.floor(Math.random() * populationData.length)];
    const countryName = randomCountry.country;

    // Get a random year and population
    const randomPopulationData =
      randomCountry.populationCounts[
        Math.floor(Math.random() * randomCountry.populationCounts.length)
      ];
    const year = randomPopulationData.year;
    const population = randomPopulationData.value;

    // Fetch the country flag using the country name
    const flagUrl = getCountryFlag(countriesData, countryName);

    if (flagUrl === 0) {
      console.log("Flag not found, trying again...");
      return await getRandomPopulationWithFlag(); // Recursively call the function
    }

    return {
      country: countryName,
      year: year,
      population: population,
      flagUrl: flagUrl,
    };
  } catch (error) {
    console.error("An error occurred:", error.message);
    return null;
  }
}

// Function to re-run the animation on click
function reRunAnimation(div) {
  div.classList.remove("fade-in-from-left", "fade-in-from-right");
  void div.offsetWidth; // Trigger reflow
  if (div.id === "left") {
    div.classList.add("fade-in-from-left");
  } else if (div.id === "right") {
    div.classList.add("fade-in-from-right");
  }
}

// Select the divs using their IDs
const leftDiv = document.getElementById("left");
const rightDiv = document.getElementById("right");
const pointsDiv = document.getElementById("points");
const lessormore = document.getElementById("lessOrMore");
const finalScore = document.getElementById("finalScore");
const closeModalButton = document.getElementById("closeModal");

let currentPopulationData = null;

let right = null;
let left = null;

async function init(div) {
  await getRandomPopulationWithFlag().then((countryData) => {
    if (div === leftDiv) {
      left = countryData.population;
    } else if (div === rightDiv) {
      right = countryData.population;
    }
    updateCard(
      div.id,
      countryData.country,
      countryData.flagUrl,
      countryData.year,
    );
  });
}

async function initialize() {
  await init(leftDiv);
  await init(rightDiv);
  hideLoadingScreen(); // Hide the loading screen once everything is loaded
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.style.display = "none"; // Hide the loading screen
}

let gameMode = getRandomGameMode(); // Randomly select the initial game mode

function more() {
  lessormore.innerText = "Which Country Has More Population";
  gameMode = "more";

  // Change text color to green for "more"
  lessormore.classList.remove("bg-red-500"); // Remove the red color (if any)
  lessormore.classList.add("bg-green-500"); // Add the green color

  // Trigger animation on text
  lessormore.classList.add("fade-in-down");

  // Remove animation after it's done so it can be re-triggered next time
  setTimeout(() => {
    lessormore.classList.remove("fade-in-down");
  }, 1000); // Remove animation after it finishes (1s)
}

function less() {
  lessormore.innerText = "Which Country Has Less Population";
  gameMode = "less";

  // Change text color to red for "less"
  lessormore.classList.remove("bg-green-500"); // Remove the green color (if any)
  lessormore.classList.add("bg-green-500"); // Add the red color

  // Trigger animation on text
  lessormore.classList.add("fade-in-down");

  // Remove animation after it's done so it can be re-triggered next time
  setTimeout(() => {
    lessormore.classList.remove("fade-in-down");
  }, 1000); // Remove animation after it finishes (1s)
}

function getRandomGameMode() {
  return Math.random() < 0.5 ? "more" : "less";
}

function main() {
  var points = 0;

  leftDiv.addEventListener("click", () => {
    if (
      (gameMode === "more" && left > right) ||
      (gameMode === "less" && left < right)
    ) {
      // First call to init
      init(rightDiv);

      // Add a delay before re-running the animation
      setTimeout(() => {
        reRunAnimation(rightDiv);
      }, 10); // 500ms delay (adjust as needed)

      points += 1;
      pointsDiv.textContent = `POINTS: ${points}`;
      gameMode = getRandomGameMode(); // Randomly switch game mode after each correct answer
      if (gameMode === "more") {
        more();
      } else {
        less();
      }
    } else {
      finalScore.textContent = points;
      lossModal.classList.remove("hidden");
      points = 0;
      pointsDiv.textContent = `POINTS: ${points}`;
    }
  });

  rightDiv.addEventListener("click", () => {
    if (
      (gameMode === "more" && right > left) ||
      (gameMode === "less" && right < left)
    ) {
      // First call to init
      init(leftDiv);

      // Add a delay before re-running the animation
      setTimeout(() => {
        reRunAnimation(leftDiv);
      }, 10); // 500ms delay (adjust as needed)

      points += 1;
      pointsDiv.textContent = `POINTS: ${points}`;
      gameMode = getRandomGameMode(); // Randomly switch game mode after each correct answer
      if (gameMode === "more") {
        more();
        // Show modal with points
      } else {
        less();
      }
    } else {
      finalScore.textContent = points;
      lossModal.classList.remove("hidden");
      points = 0;
      pointsDiv.textContent = `POINTS: ${points}`;
    }
  });
}

initialize().then(main);
// Close the modal and reset the game when 'Try Again' is clicked
closeModalButton.addEventListener("click", function () {
  lossModal.classList.add("hidden");
  points = 0;
  pointsDisplay.textContent = `POINTS: ${points}`;
});
