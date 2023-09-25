// Global Variables
const pokemon_list = document.querySelector("#pokemon_list");
const loadMoreButton = document.querySelector("#loadMoreButton");
const limit = 10;
let offset = 0;
const maxRecords = 151;

const loadMorePokemons = (offset, limit) => {
  // Executing the API Request (pokeapi)
  pokeApi
    .getPokemons(offset, limit)
    .then((pokemons = []) => {
      // HTML Element li
      pokemon_list.innerHTML += pokemons
        .map(
          (pokemon) =>
            `<li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <aside class="details">
              <ul class="types">
                ${pokemon.types
                  .map((type) => `<li class="type ${type}">${type}</li>`)
                  .join("")}
              </ul>
              
              <a href="../../pokemon-detail.html"><img src=${pokemon.photo} alt="${pokemon.name}"></a>
            </aside>
            </li>`
        )
        .join("");
    })
    .catch((error) => console.log(error));
};

loadMorePokemons(offset, limit);

// Events
loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const nextPageQuantityRecord = offset + limit;

  if (nextPageQuantityRecord >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadMorePokemons(offset, newLimit);

    loadMoreButton.remove()
  } else {
    loadMorePokemons(offset, limit);
  }
});
