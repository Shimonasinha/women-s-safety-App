import React, { createContext, useState, useEffect } from 'react';

// Create UserContext
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State for user data

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse the user data from localStorage
    }
  }, []);

  // Function to log in and save user data
  const login = (userData) => {
    setUser(userData); // Update user state
    localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
  };

  // Function to log out and clear user data
  const logout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  // Provide user-related values and functions
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
