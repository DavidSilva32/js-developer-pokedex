const pokeApi = {};

const convertPokemonApiDetailToPokemon = (pokeDetail) => {
  // Local Variables
  const pokemon = new Pokemon();
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  // Attributes
  pokemon.name = pokeDetail.name;
  pokemon.number = pokeDetail.id;
  pokemon.type = type;
  pokemon.types = types;
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
  pokemon.baseExperience = pokeDetail.base_experience;
  pokemon.height = pokeDetail.height;
  pokemon.weight = pokeDetail.weight;

  return pokemon;
};

pokeApi.getPokemonDetails = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then((pokemon) => convertPokemonApiDetailToPokemon(pokemon));
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
    .then((detailRequests) => Promise.all(detailRequests));
};

pokeApi.getEntirePokemon = (pokemon = 1) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

  return fetch(url)
    .then((response) => response.json())
    .then((details) => convertPokemonApiDetailToPokemon(details))
};
