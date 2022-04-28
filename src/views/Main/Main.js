import React, { useEffect, useState } from 'react';
import { fetchCharacters } from '../../services/fetch';
import SearchBar from '../../components/controls/Search';

export default function Main() {
  const [character, setCharacter] = useState([]);
  const [error, setError] = useState('');

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

  return (
    <div className="characters">
      <h1>Characters</h1>
      {error && <p>{error}</p>}
      {character.map((character) => (
        <div key={character.id}>
          <p>Name:{character.name}</p>
        </div>
      ))}
    </div>
  );
}
