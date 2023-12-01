import { useState, useEffect } from 'react';
import './styles/profile.css'


const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');

    if (storedUsername) {
      setUsername(storedUsername);
    }

    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSave = () => {
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    alert('Changes saved successfully!');
  };

  return (
    <div className="container">

      <form className="profile-form">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleSave}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
