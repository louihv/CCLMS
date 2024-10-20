import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './Logo-CC.png';
import './Navbar.css'; // Use a separate CSS file for styles
import Modal from './Modal'; // Import the Modal component

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      setVisible(window.scrollY <= lastScrollY || window.scrollY < 10);
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    setModalOpen(true); // Open the modal
  };

  const confirmLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <>
      <nav className={`navbar ${visible ? 'visible' : 'hidden'}`}>
        <img className="logo" src={logo} alt="Logo" />
        <ul className="navList">
          <li className="navItem"><Link to="/home" className="navLink">Home</Link></li>
          <li className="navItem"><Link to="/hogwartsherald" className="navLink">Hogwarts Herald</Link></li>
          <li className="navItem"><Link to="/dashboard" className="navLink">Wizarding Workspace</Link></li>
          <li className="navItem" onClick={handleLogout}><span className="navLink">Logout</span></li>
        </ul>
      </nav>
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        onConfirm={confirmLogout} 
      />
    </>
  );
};

export default Navbar;
