import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';
//import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import Dashboard from './pages/Dashboard';
import Appel from './pages/Appel';

function App () {
  return(
    <Router>
      <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />
          
          <div className='dashboard-body'>
              <Routes>
                  <Route path="*" element={<div></div>} />
                  <Route exact path="/" element={< Dashboard/>} />
                  <Route exact path="/appel" element={< Appel/>} />
                  {/* <Route exact path="/products" element={< Notes/>} />
                  <Route exact path="/locations" element={<div></div>} /> */}
              </Routes>
          </div>
      </div>
    </Router>
  )
}


//AFFICHAGE LOGIN
//  <div>
//       <h2>Connexion</h2>
//       {error && <p>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
//         <input type='password' placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} />
//         <button type='submit'>Se connecter</button>
//       </form>
//     </div>

export default App;