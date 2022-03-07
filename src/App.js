import React, {useState, useEffect} from 'react';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import axios from 'axios';
const pokeUrl = "https://pokeapi.co/api/v2/pokemon";


function App() {

  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(pokeUrl);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })

    return () => cancel();
    
  }, [currentPageUrl]);

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPreviousPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  if (loading) return "Loading..."
  
  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination 
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPreviousPage={prevPageUrl ? goToPreviousPage : null}
      />
    </>
  );
}

export default App;
