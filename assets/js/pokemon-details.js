const content = document.querySelector(".content");

pokeApi.getEntirePokemon().then((pokemon) => {
  console.log(pokemon);
  content.innerHTML += `
      <section class="pokemon ${pokemon.type}">
        <a class="arrow" href="assets/index.html" target="_self">&#8592;</a>
        <div class="title">
            <h1 class="name">${pokemon.name}</h1>
            <span class="number">#${pokemon.number}</span>
        </div>
        <ul class="types">
            ${pokemon.types
              .map((type) => `<li class="type ${type}">${type}</li>`)
              .join("")}
        </ul>    
        <img src=${pokemon.photo} alt=${pokemon.name} class="photo">
        <section class="details">
            <h2>About</h2>
            <ul>
              <li><p>base experience: ${pokemon.baseExperience}</p></li>
              <li><p>Height: ${pokemon.height}</p></li>
              <li><p>Weight: ${pokemon.weight}</p></li>
            </ul>
        </section>
      </section>  
    `;
});
