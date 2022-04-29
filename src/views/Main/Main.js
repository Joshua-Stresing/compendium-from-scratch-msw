import React, { useEffect, useState } from 'react';
import { fetchCharacters } from '../../services/fetch';
import SearchBar from '../../components/controls/Search';

export default function Main() {
  const [character, setCharacter] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearch] = useState(false);
  const [filterSearch, setFilterSearch] = useState([]);
  const mappingData = isSearching ? filterSearch : character;

  useEffect(() => {
    const characterList = async () => {
      try {
        const list = await fetchCharacters();
        setCharacter(list);
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
