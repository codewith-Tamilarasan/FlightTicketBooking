// Authentication.js

import React, { createContext, useContext, useState } from 'react';

const AuthenticationContext = createContext();

export const useAuth = () => {
  return useContext(AuthenticationContext);
};

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [mail,setMail] = useState(null);

  
  const login = async(type,email) => {
     setMail(email);
    console.log(email);
    console.log(mail);
    if(type==='user')
    {
    setUser(true);
    }
    else if(type==='admin')
    {
      setAdmin(true);
    }

  };

  const logout = (type) => {
    if(type==='user')
    {
    setUser(null);
    }
    else if(type==='admin')
    {
      setAdmin(null);
    }

  };



  return (
    <AuthenticationContext.Provider value={{ user, login, logout,admin,mail }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
