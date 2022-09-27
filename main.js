const d = document
const $form = d.getElementById('form')
const $input = d.getElementById('input')
const $container = d.getElementById('container')
const $small = d.getElementsByTagName('small')[0]
const $img = d.querySelector('.imgmove');
console.log($img)

const colorBg = {
    normal:  '#aaa67f ',
    rock:    '#b69e31',
    ghost:   '#70559b',
    steel:   '#b7b9d0',
    water:   '#6493eb',
    grass:   ' #74cb48',
    psychic: ' #fb5584',
    ice:     ' #9ad6df',
    dark:    ' #75574c',
    fairy:   ' #e69eac',
    fighting:' #c12238',
    flying:  ' #a891ec',
    poison:  ' #a43e9e',
    ground:  ' #dec16b',
    bug:     ' #a7b723',
    fire:    ' #f57d31',
    electric:' #f9cf30',
    dragon:  ' #7037ff',
    black: '#303030',
}

const miApi = async (pokemon) => {
    const baseURL = `https://pokeapi.co/api/v2/pokemon/`
        const conexion =await fetch (baseURL + pokemon)
        .then (response => response.json())
        .catch(reject => console.log(reject))
        return(conexion);
}


let pokemones = [];

// let pokemones = JSON.parse(localStorage.getItem('pokemones')) || []

// const saveLs = (pokemonList) => {
//     localStorage.setItem('pokemones', JSON.stringify(pokemonList))
// }

const searchPokemon = async e => {
    e.preventDefault();

    let saveInput =  $input.value;
    $input.value = '';

    const fetchedPokemon = await miApi(saveInput);

    if(!fetchedPokemon){
        $small.textContent = 'No existe el pokemon que buscas';
    return;
}

    else if(!saveInput){
        $small.textContent ='Por favor ingresa un número para buscar un pokemon';
        $form.reset();
        return;
} 
    else if (pokemones.some(pokemon => pokemon.id === fetchedPokemon.id)){
        $small.textContent ='Ya estas viendo el Pokemon ingresado'
        saveInput('');
        return;
}

    pokemones = [fetchedPokemon];
    $small.textContent = '';
    renderCard(pokemones);
    setCardBg(pokemones)
    $form.reset();
}
const deletePokemon = e => {
    if (!e.target.classList.contains('fa-xmark')) return;
    const filterId = Number(e.target.dataset.id);
    pokemones = pokemones.filter(pokemon => pokemon.id !== filterId);
    renderCard(pokemones);
}

const renderCard = pokemonList => {
    $container.innerHTML = pokemonList.map (pokemon => createHtml(pokemon)).join('');
}

$img.addEventListener('change', cambiarDisplay());
function cambiarDisplay(){
    setTimeout(function(){
        $img.style.display = "none";
    }, 2000);
}



const setCardBg = type => {
    const color = colorBg[type[0].types[0].type.name];
    $container.style.backgroundColor = `${color}`;
}

const createHtml = pokemon => {
    const {id, name, height, weight, types, stats, abilities} = pokemon;

    const imgPokemon = pokemon.sprites.other.dream_world.front_default;
    return `<div class="pokemonCard">
            <img src="./img/pokeball.png" alt="" class="shadow-pokeball">
            <div class="container__start">
            <i class="fa-solid fa-xmark" data-id="${id}"></i>
            <h2 class="pokemonName">${name}</h2>
            <p class="pokemonId">#${id}</p>
            </div>

            <div class="container__img">
            <i class="fa-solid fa-angle-left" data-id="${pokemon}"></i>
            <img src="${imgPokemon}" alt="${name}" class= "pokemon-img" />
            <i class="fa-solid fa-angle-right" data-id="${pokemon}"></i>
            </div>

            <div class="container__end">
            <div class="container__end_first">
            <p class="pokemonType">   ${types[0].type.name}</p>
            <p><i class="fa-solid fa-ruler-vertical"></i>: ${height / 10}m</p>
            <p><i class="fa-solid fa-weight-scale"></i>: ${weight /10}kg</p>
            </div>
            <div class="container__end_second">
            <p class = "description_tittle tittle">${abilities[0].ability.name}</p>
            <p class = "description"> Lorem ipsum dolor sit, amet consectetur adipisicing elit!</p>
            </div>
            <div class="container__end_third">
            <p class = "base_stats tittle">Base Stats</p>
            <p class = "stats">HP:   ${stats[0].base_stat}</p>
            <p class = "stats ">ATK: ${stats[1].base_stat}</p>
            <p class = "stats">DEF:  ${stats[2].base_stat}</p>
            <p class = "stats">SPD:  ${stats[3].base_stat}</p>
            <p class = "stats">SPATK: ${stats[4].base_stat}</p>
            <p class = "stats">SPDEF: ${stats[5].base_stat}</p>
            </div>
            </div>
            </div>`
}

$small.addEventListener('change', dejarDeMostrarError());
function dejarDeMostrarError(){
    setTimeout(function(){
        $small.style.display = 'none';
    }, 2000);
}
const init = () =>{
    renderCard(pokemones);
    $form.addEventListener('submit', searchPokemon)
    $container.addEventListener('click', deletePokemon)
}
init()
