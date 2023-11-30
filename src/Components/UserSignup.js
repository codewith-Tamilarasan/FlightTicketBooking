import React, { useState } from 'react';
import axios from 'axios';
import Home from './Home';
import {useNavigate} from "react-router-dom"

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user'); 

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const nav = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let apiUrl = 'http://localhost:3000/usersignup';
      if (userType === 'admin') {
        apiUrl = 'http://localhost:3000/adminsignup';
      }

      const response = await axios.post(apiUrl, {
        email,
        name,
        password,
      });

      if (response.status === 201) {
        nav('/');
        alert(`Successfully ${userType === 'user' ? 'User' : 'Admin'} Signed up`);
        console.log(`${userType === 'user' ? 'User' : 'Admin'} registered successfully!`, response.data);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        alert('User Email id is already found');
      } else {
        console.error('Error:', error.response?.data.error || 'Internal Server Error');
      }
    }
    setEmail('');
    setPassword('');
    setUsername('');

    
  };

  return (
    <div>
      <div>
        <Home />
      </div>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
          <h2 className="text-2xl font-semibold mb-4">User SignUp </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email:
              </label>
              <input
                className="w-full p-2 border rounded-md"
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username:
              </label>
              <input
                className="w-full p-2 border rounded-md"
                type="text"
                id="username"
                value={name}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password:
              </label>
              <input
                className="w-full p-2 border rounded-md"
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userType">
                Sign up as:
              </label>
              <select
                className="w-full p-2 border rounded-md"
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" type="submit">
              {`Submit as ${userType === 'user' ? 'User' : 'Admin'}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
