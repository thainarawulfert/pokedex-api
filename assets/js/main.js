const pokemonList = document.getElementById("pokemonList");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const limit = 5;
let offset = 0;

const maxRecords = 151;

function loadPokemonItens(offset, limit) {
  function convertPokemonToLi(pokemon) {
    let number = pokemon.order;
    if (number < 10) number = "00" + number;
    else if (number >= 10 && number < 100) number = "0" + number;
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="type-list">
                    ${pokemon.types
                      .map(
                        (type) =>
                          `<li class="type ${type}">${
                            type.charAt(0).toUpperCase() + type.slice(1)
                          }</li>`
                      )
                      .join("")}
                </ol>
    
                <img src="${pokemon.photo}" alt="${
      pokemon.name
    }" class="pokemon-img">
            </div>
        </li>
        `;
  }

  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join("");
  });
}

loadPokemonItens(offset, limit);

loadMoreBtn.addEventListener("click", () => {
  offset += limit;

  const qtdRecords = offset + limit;

  if (qtdRecords >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreBtn.parentElement.removeChild(loadMoreBtn);
  } else loadPokemonItens(offset, limit);
});
