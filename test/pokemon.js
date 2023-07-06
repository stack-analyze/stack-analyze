import axios from 'axios'

export default async function pokemonInfo(pokemon) {
  let result;
  
  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    result = data;
  } catch(err) {
    result = err.message;
  }
  
  return result;
}
