import React, { useEffect, useState } from 'react';
import { fetchCharacters } from '../../services/fetch';
import SearchBar from '../../components/controls/Search';

export default function Main() {
  const [character, setCharacter] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearch] = useState(false);
  const [filterSearch, setFilterSearch] = useState([]);
  const [load, setLoad] = useState(true);
  const mappingData = isSearching ? filterSearch : character;

  useEffect(() => {
    const characterList = async () => {
      try {
        const list = await fetchCharacters();
        setCharacter(list);
        setLoad(false);
      } catch (error) {
        setError(error.message);
      }
    };
    characterList();
  }, []);

  const charSearch = async () => {
    const data = await fetchCharacters(search);
    setCharacter(data);
  };

  const searching = () => {
    setIsSearch(!!search.length);
    // console.log('test', isSearching);
    const filter = character.filter((character) =>
      character.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilterSearch(filter);
  };

  if (load) return <h1>loading...</h1>;

  return (
    <>
      <>
        <SearchBar
          searching={searching}
          query={search}
          setQuery={setSearch}
          //   searchSubmit={charSearch}
        />
      </>
      <div className="characters">
        <h1>Characters</h1>
        {error && <p>{error}</p>}
        {mappingData.map((character) => (
          <div key={character.id}>
            <p>{character.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
