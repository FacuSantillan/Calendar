import React, { useState } from 'react';
import { Link } from "react-router-dom";
import calendar from '../../assets/AssetsMenu/calendar.png';
import user from '../../assets/AssetsMenu/user.png';
import edit from '../../assets/AssetsMenu/edit.png';
import logout from '../../assets/AssetsMenu/logout.png'
import './style.css'; // Importa el archivo de estilos

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div>
      <div className={isOpen ? "overlay active" : "overlay"}></div>

      <div className={isOpen ? "sidebar active" : "sidebar"}>
        <div className="toggle-button" onClick={toggleSidebar}>
          ☰
        </div>
        <div className="sidebar-content">
          <ul>
          <Link className='link' to={"/admin"}><li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Reservas</li></Link>
          <Link className='link' to={"/admin/diasyhoras"}><li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Días y horarios</li></Link>
          </ul>
        </div>
        <div>
      <button onClick={clearLocalStorage} className='button-Logout'>Cerrar sesión</button>
        </div>
      </div>
      

      <div className="images-container" onClick={toggleSidebar}>
        <img className='img' src={calendar} alt='calendar'/>
        <img className='img' src={edit} alt='edit'/>
      </div>
      
    </div>
  );
};

export default Menu;
