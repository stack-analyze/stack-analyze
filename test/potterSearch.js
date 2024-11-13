import axios from 'axios'

export default async function potterSearch(search) {
  const url = 'https://potterapi-fedeperin.vercel.app/en/characters'
  let result;
  
  try {
    const { data } = await axios.get(url, {
      params: { search }
    })
    
    result = data;
  } catch(err) {
  	result = err.message;
  }
  
  return result
}
