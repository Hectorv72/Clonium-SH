const fs       = require('fs');

const getPokemons = async ()=>{
    stat = await fs.readFileSync('pokemon.json'); 
    const json = JSON.parse(stat);
    
    return json;
}


const randomPokemon = async () => {
    const pokemons = await getPokemons();
    const pokemon = pokemons[Math.floor(Math.random()*pokemons.length)];

    return pokemon;
}


const verifResponse = (original,response) => {

    if( original === response ){
        return "correcto";
    }else{
        return "incorrecto";
    }

}

module.exports = {
    randomPokemon,
    verifResponse
}