import { useState, useEffect } from 'react';

const CharacterSheet = () => {
  const [character, setCharacter] = useState({
    name: '',
    class: '',
    race: '',
    // Add other character attributes here
  });

  const [savedCharacters, setSavedCharacters] = useState([]);

  useEffect(() => {
    const savedCharacterData = localStorage.getItem('characterData');
    if (savedCharacterData) {
      setCharacter(JSON.parse(savedCharacterData));
    }

    const allSavedCharacters = localStorage.getItem('allCharacters');
    if (allSavedCharacters) {
      setSavedCharacters(JSON.parse(allSavedCharacters));
    }
  }, []);

  useEffect(() => {
    const updateSavedCharacters = () => {
      const allSavedCharacters = localStorage.getItem('allCharacters');
      if (allSavedCharacters) {
        setSavedCharacters(JSON.parse(allSavedCharacters));
      }
    };

    window.addEventListener('storage', updateSavedCharacters);

    return () => {
      window.removeEventListener('storage', updateSavedCharacters);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCharacter({ ...character, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('characterData', JSON.stringify(character));

    const updatedCharacters = [...savedCharacters, character];
    localStorage.setItem('allCharacters', JSON.stringify(updatedCharacters));

    setSavedCharacters(updatedCharacters);

    alert('Character data saved!');
  };

  const handleDeleteCharacter = (index) => {
    const updatedCharacters = savedCharacters.filter(
      (_, i) => i !== index
    );

    localStorage.setItem('allCharacters', JSON.stringify(updatedCharacters));
    setSavedCharacters(updatedCharacters);
  };
  return (
    <div>
      <h2>Character Sheet</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={character.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Class:
          <input
            type="text"
            name="class"
            value={character.class}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Race:
          <input
            type="text"
            name="race"
            value={character.race}
            onChange={handleInputChange}
          />
        </label>
        <br />
        
        <button type="submit">Save</button>
      </form>
      <div>
        <h3>Saved Characters:</h3>
        <ul>
          {savedCharacters.map((savedCharacter, index) => (
            <li key={index}>
              <p>Name: {savedCharacter.name}</p>
              <p>Class: {savedCharacter.class}</p>
              <p>Race: {savedCharacter.race}</p>
              <button onClick={() => handleDeleteCharacter(index)}>
                Delete Character
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharacterSheet;