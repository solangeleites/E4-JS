const d = document
const $form = d.getElementById('form')
const $input = d.getElementById('input')
const $container = d.getElementById('container')
const $msgError = d.querySelector('.msgError')

const miApi = async (pokemon) => {
    const baseURL = `https://pokeapi.co/api/v2/pokemon/`
        const conexion =await fetch (baseURL + pokemon)
        .then (response => response.json())
        .catch(reject => console.log(reject))
        return(conexion);
}
let pokemones = JSON.parse(localStorage.getItem('pokemones')) || []

const saveLs = (pokemonList) => {
    localStorage.setItem('pokemones', JSON.stringify(pokemonList))
}
const searchPokemon = async e => {
    e.preventDefault();
    let saveInput =  $input.value;
    $input.value = '';

    const fetchedPokemon = await miApi(saveInput);

    if(!fetchedPokemon){
        $msgError.textContent = `No existe el Pokemon ingresado`
    return;
}
    if(!saveInput){
        $msgError.textContent =`Esta vacio. Por favor ingresa un valor`
    return;
} 
    else if (pokemones.some(pokemon => pokemon.id === fetchedPokemon.id)){
        $msgError.textContent =`Ya estas viendo el Pokemon ingresado`
    return;
}
    pokemones = [fetchedPokemon, ...pokemones];
    renderCard(pokemones);
    saveLs(pokemones);
    $form.reset();
}  
const renderCard = pokemonList => {
    $container.innerHTML = pokemonList.map (pokemon => createHtml(pokemon)).join('');
}
const convertHeight = metro => {
    let altura = metro / 10;
    return altura;
}
const convertKilos = kilo => {
    let peso = kilo / 10;
    return peso;
}
const createHtml = pokemon => {
    const imgPokemon = pokemon.sprites.other.dream_world.front_default
    return `<div class="pokemonCard">
            <p class="pokemonId">#${pokemon.id}</p>
            <img src="${imgPokemon}" alt="${pokemon.name}" class= "pokemonImg" />
            <h2 class="pokemonName">Nombre: ${pokemon.name}</h2>
            <p class="pokemonType">Tipo: ${pokemon.types[0].type.name}</p>
            <p>Altura: ${convertHeight(pokemon.height)}kg</p>
            <p>Peso: ${convertKilos(pokemon.weight)}cm</p>
            </div>`
}
const init = () =>{
    renderCard(pokemones);
    $form.addEventListener('submit', searchPokemon)
}
init()
