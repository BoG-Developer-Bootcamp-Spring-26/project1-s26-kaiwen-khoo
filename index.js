// left side
const pokemonImg = document.getElementById('pokemonImage');
const pokemonName = document.getElementById('pokemonName');
const pokemonTypes = document.getElementById('pokemonTypes');

const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');

// right side
const infoTitle = document.getElementById('infoTitle');
const infoText = document.getElementById('infoDiv');

const infoButton = document.getElementById('infoButton');
const movesButton = document.getElementById('movesButton');

let pokemonId = 132;
let pokemonInfo = {}
let largestPokemonId = 1025;
getPokemon(pokemonId);

let infoSelected = true;

leftArrow.addEventListener("click", () => {
    if (pokemonId == 1) {
        pokemonId = largestPokemonId + 1;
    }
    pokemonId = pokemonId - 1;
    getPokemon(pokemonId);
    
});

rightArrow.addEventListener("click", () => {
    if (pokemonId == largestPokemonId) {
        pokemonId = 0;
    }
    pokemonId = pokemonId + 1;
    getPokemon(pokemonId);
    
});

infoButton.addEventListener("click", () => {
    if (!infoSelected) {
        infoSelected = true;
        infoButton.style.backgroundColor = "#7CFF79";
        movesButton.style.backgroundColor = '#E8E8E8';
        infoTitle.innerHTML = "Info";
        infoText.innerHTML = getInfo(pokemonInfo);
    }
});

movesButton.addEventListener("click", () => {
    if (infoSelected) {
        infoSelected = false;
        infoButton.style.backgroundColor = "#E8E8E8";
        movesButton.style.backgroundColor = '#7CFF79';
        infoTitle.innerHTML = "Moves";
        infoText.innerHTML = getMoves(pokemonInfo);
    }
});

async function getPokemon(id) {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+id);
    const data = await response.json(); // response.text() gives u string version of data
    pokemonInfo = data;
    console.log(data)
    pokemonImg.src = data.sprites.front_default;
    pokemonName.innerHTML = data.forms[0].name;

    if (infoSelected) {
        infoText.innerHTML = getInfo(data);
    } else {
        infoText.innerHTML = getMoves(data);
    }

    pokemonTypes.innerHTML = '';
    data.types.forEach(element => {
        let type = element.type.name;
        pokemonTypes.innerHTML += `<div class="pokemon-type ${type}">${type}</div>`;
    });
}

function getInfo(data) {
    return `height: ${(data.height * 0.1).toFixed(1)}m <br>`
    + `weight: ${(data.weight / 10).toFixed(1)}kg <br>`
    + data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join('<br>');
}

function getMoves(data) {
    return data.moves.map(move => `${move.move.name}`).join('<br>');
}
