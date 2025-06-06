// Define an async function //
async function fetchPokemon() {
  const input = document.getElementById("pokemonInput").value.trim().toLowerCase(); // Get user input, trim any whitespace and convert to lowercase (for consistency and input validation) //
  const result = document.getElementById("result"); // Get the result div to display the output //
  result.innerHTML = "Loading..."; // Show loading message while fetching data //

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`); // Fetch data from the PokéAPI using the user input and store it in response variable//
    if (!response.ok) throw new Error("Pokémon not found"); // For invalid responses //

    const data = await response.json(); // Parse the JSON data from the response //
    
    // data from the API response //
    const name = data.name;
    const image = data.sprites.front_default; // Get the front default sprite of the Pokémon from API //
    const type = data.types.map(t => t.type.name); // Get all types of the Pokémon //
    const height = data.height / 10; // Convert height from decimetres to metres //
    const weight = data.weight / 10; // Convert weight from hectograms to kilograms //

    // Display the fetched data in the result div and update DOM //
    // Capitalize the first letter of the name for better presentation //
    result.innerHTML = `
      <h2>${name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      <img src="${image}" alt="${name}">
      <p><strong>Type:</strong> ${type}</p>
      <p><strong>Height:</strong> ${height} m</p>
      <p><strong>Weight:</strong> ${weight} kg</p>
    `;
  } catch (error) {
    result.innerHTML = `<p class="error">Pokémon not found</p>`; // Display error message if Pokémon is not found or any other error occurs //
  }
}

// Trigger the function when button is clicked //
document.getElementById("searchBtn").addEventListener("click", fetchPokemon);
