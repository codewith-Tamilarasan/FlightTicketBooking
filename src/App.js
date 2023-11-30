// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserSignup from './Components/UserSignup';
import Login from './Components/Login';
import UserLogout from './Components/UserLogout';
import AdminLogout from './Components/AdminLogout';
import Content from './Components/Content';
import { useAuth, AuthenticationProvider } from './Components/Authentication';

function ProtectedRoute({ element: Element }) {
  const authentication = useAuth();
  if(Element===UserLogout)
  {
  const user = authentication ? authentication.user : null;
  return user ? <Element /> : <Navigate to="/" />;
  }
  else if(Element===AdminLogout)
  {
    const admin = authentication ? authentication.admin:null;
    return admin ? <Element /> : <Navigate to="/" />;
  }

  
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/user-login" element={<Login />} />
          <Route path="/user-login/private" element={<ProtectedRoute element={UserLogout} />} />
          <Route path="/admin-login/private" element={<ProtectedRoute element={AdminLogout} />} />
        </Routes>
      </Router>
    </div>
  );
}

function MainApp() {
  return (
    <AuthenticationProvider>
      <App />
    </AuthenticationProvider>
  );
}

export default MainApp;
