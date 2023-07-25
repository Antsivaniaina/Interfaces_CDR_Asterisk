import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';
//import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import Dashboard from './pages/Dashboard';
import Appel from './pages/Appel';
import Utilisateur from './pages/Utilisateur';

import { useState } from 'react';
import Login from './pages/login/Login';
import { useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => { 
    setIsLoggedIn(true);
  };

  const hanldeLogout = () => { 
    setIsLoggedIn(false);
  }; 

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedIn === 'true');
  }, []);
  
  return(
    <Router>
      <div className='dashboard-container'>
        {isLoggedIn ? (
          <>
            <SideBar menu={sidebar_menu} />
          
          <div className='dashboard-body'>
              <Routes>
                  <Route path="*" element={<div></div>} />
                  <Route exact path="/" element={< Dashboard/>} />
                  <Route exact path="/appel" element={< Appel/>} />
                  <Route exact path="/utilisateur" element={< Utilisateur/>} />
                  {/* <Route exact path="/products" element={< Notes/>} />
                  <Route exact path="/locations" element={<div></div>} /> */}
              </Routes>
          </div>
          </>
        ) : (
            <Login onLogin={handleLogin} />
        )}
      </div>
    </Router>
  )
}

export default App;