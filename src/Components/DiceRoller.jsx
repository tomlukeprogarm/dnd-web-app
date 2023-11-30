import  { useState } from 'react';

const DiceRoller = () => {
  const [result, setResult] = useState(null);
  const [diceValue, setDiceValue] = useState(6); // Default: 6-sided die

  const rollDice = () => {
    const randomNumber = Math.floor(Math.random() * diceValue) + 1;
    setResult(randomNumber);
  };

  const handleDiceChange = (e) => {
    setDiceValue(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <h2>Dice Roller</h2>
      <label>
        Select a dice:
        <select value={diceValue} onChange={handleDiceChange}>
          <option value={4}>D4</option>
          <option value={6}>D6</option>
          <option value={8}>D8</option>
          <option value={10}>D10</option>
          <option value={12}>D12</option>
          <option value={20}>D20</option>
        
        </select>
      </label>
      <button onClick={rollDice}>Roll Dice</button>
      {result && <p>Result: {result}</p>}
    </div>
  );
};

export default DiceRoller;
