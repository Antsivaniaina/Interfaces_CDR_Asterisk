import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SideBarItem from './sidebar-item';
import './styles.css';
import logo from '../../assets/images/note.png';
import LogoutIcon from '../../assets/icons/logout.svg';

function SideBar({ menu }) {
  const location = useLocation();
  const [active, setActive] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    menu.forEach((element) => {
      if (location.pathname === element.path) {
        setActive(element.id);
      }
    });
  }, [location.pathname]);

  const __navigate = (id) => {
    if (id === active && id === 3) {
      // Si le lien "Resultats" est déjà actif et on clique dessus, on masque le menu déroulant
      setShowDropdown(!showDropdown);
    } else {
      // Si on clique sur un autre lien, on met à jour l'état active et on masque le menu déroulant
      setActive(id);
      setShowDropdown(false);
    }
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-logo-container">
          <img src={logo} alt="logo" />
        </div>

        <div className="sidebar-container">
          <div className="sidebar-items">
            {menu.map((item, index) => (
              <div key={index} onClick={() => __navigate(item.id)}>
                <SideBarItem active={item.id === active} item={item} />
              </div>
            ))}
            {/* Afficher le menu déroulant s'il est actif */}
      
            
          </div>

          <div className="sidebar-footer" onClick={localStorage.removeItem('isLoggedIn')}>
            <span className="sidebar-item-label">Deconnexion</span>
            <img src={LogoutIcon} alt="icon-logout" className="sidebar-item-icon" />
          </div>        
        </div>
      </div>
    </nav>
  );
}

export default SideBar;
