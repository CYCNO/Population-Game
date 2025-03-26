# Population Game 🌍

Welcome to the **Population Game**! This is a fun web-based game where players have to guess which country has a higher or lower population based on random data. The game presents two countries at a time, and you must select which one has more or less population. The goal is to score as many points as possible! 🎯

## Features ✨

- Interactive gameplay with random countries 🌎.
- Displays country flags, names, and population data 🇺🇳.
- Real-time point tracking 🏅.
- Game mode alternates between "Which country has more population?" and "Which country has less population?" 🔄.
- Mobile-responsive design 📱.

## How It Works 🛠️

1. **Loading Screen**: A "Loading..." screen appears while the game data is being fetched.
   
2. **Random Country Selection**: Two countries are randomly selected along with their population data. Their flags, names, and population year are displayed.
   
3. **Gameplay**: 
   - The player clicks on one of the countries, depending on whether the game mode is "more" or "less" population.
   - The game mode alternates after each correct selection.
   
4. **Scoring**: 
   - Score a point for choosing the country with the correct population.
   - Incorrect selections will end the game and show your final score in a modal 🏆.

5. **Game Reset**: After losing, click the "Try Again" button to restart the game 🔄.

## Play the Game 🎮

You can play the game right now at [cycno.is-a.dev/Population-Game](https://cycno.is-a.dev/Population-Game) 🌐.

## APIs Used 🌐

The game uses data fetched from the following APIs to get country details and population information:

1. **REST Countries API** (https://restcountries.com/v3.1/all) 🌍  
   - This API provides detailed information about all countries, including their names, flags, and other metadata.
   - The game uses this API to display the country flags and basic information such as the country name and abbreviation.
   
2. **CountriesNow API** (https://countriesnow.space/api/v0.1/countries/population) 📊  
   - This API provides population data for countries, including historical population counts over various years.
   - The game fetches this API to get random countries with population data and display the population and year in the game.

These APIs ensure that the game is up-to-date with the latest available data for countries and their populations.

## Technologies Used ⚙️

- **HTML** for structure 📝.
- **CSS** (Tailwind CSS) for styling 🎨.
- **JavaScript** for functionality ⚡.
- **Axios** for fetching data 📡.
- **REST API** for countries and population data 🌍.

## License 📝

This project is open source and available under the [MIT License](LICENSE) 🔓.

---

Enjoy the game and test your knowledge of world populations! 🌍💡
