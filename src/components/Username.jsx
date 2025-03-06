import React, { useState } from 'react';

const Username = () => {
  const [username, setUsername] = useState('');

  const validateForm = (value) => {
    // Add your validation logic here
    return value.length > 0;
  };

  const onChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    validateForm(value); // Call validateForm function
  };

  return (
    <div>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={onChange}
      />
    </div>
  );
};

export default Username;
