import { useState, useEffect } from 'react';
import './styles/charsheet.css'


const CharacterSheet = () => {
  const [character, setCharacter] = useState({
    name: '',
    class: '',
    race: '',
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
  
  <form onSubmit={handleSubmit} className="character-form">
    <label className="character-label">
      <span className="character-span">Name:</span>
      <input
        type="text"
        name="name"
        value={character.name}
        onChange={handleInputChange}
        className="character-input"
      />
    </label>
    <br />
    <label className="character-label">
      <span className="character-span">Class:</span>
      <input
        type="text"
        name="class"
        value={character.class}
        onChange={handleInputChange}
        className="character-input"
      />
    </label>
    <br />
    <label className="character-label">
      <span className="character-span">Race:</span>
      <input
        type="text"
        name="race"
        value={character.race}
        onChange={handleInputChange}
        className="character-input"
      />
    </label>
    <br />
    <button type="submit" className="character-button">Save</button>
  </form>

      {/* Saved Characters */}
      <div className="saved-characters">
        <h3>Saved Characters:</h3>
        {savedCharacters.map((savedCharacter, index) => (
          <div className="character-sheet" key={index}>
            <table>
              <thead>
                <tr>
                  <th colSpan="2">{savedCharacter.name}s Character Sheet</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Character Name:</td>
                  <td>{savedCharacter.name}</td>
                </tr>
                <tr>
                  <td>Class:</td>
                  <td>{savedCharacter.class}</td>
                </tr>
                <tr>
                  <td>Race:</td>
                  <td>{savedCharacter.race}</td>
                </tr>
                {/* Add other character attributes */}
              </tbody>
            </table>
            <button onClick={() => handleDeleteCharacter(index)}>
              Delete Character
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterSheet;