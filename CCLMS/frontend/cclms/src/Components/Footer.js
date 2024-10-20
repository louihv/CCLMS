import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(true); // Start with footer visible
  const [lastScrollY, setLastScrollY] = useState(0); // Track the last scroll position

  const handleScroll = () => {
    const currentScrollY = window.scrollY; // Current scroll position

    // Show footer if scrolling down, hide if scrolling up
    setIsVisible(currentScrollY >= lastScrollY); 
    setLastScrollY(currentScrollY); // Update last scroll position
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]); // Dependency on lastScrollY

  // Inline styles
  const styles = {
    footer: {
      position: 'fixed', // Fixed positioning
      bottom: 0, // Stick to the bottom of the viewport
      left: 0,
      right: 0,
      display: 'flex', // Flexbox for centering
      justifyContent: 'center', // Center text horizontally
      alignItems: 'center', // Center text vertically
      padding: '15px 0', // Padding above and below
      backgroundColor: '#1c1c1c', // Darker background
      color: '#fff', // White text for contrast
      boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.5)', // Shadow for depth
      width: '100%', // Full width
      opacity: isVisible ? 1 : 0, // Control opacity
      visibility: isVisible ? 'visible' : 'hidden', // Control visibility
      transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out', // Smooth transition
    },
    text: {
      margin: 0, // Remove default margin
      fontSize: '1em', // Font size
      textAlign: 'center', // Center text
      letterSpacing: '0.5px', // Slightly increase letter spacing
      cursor: 'pointer', // Change cursor on hover
      transition: 'color 0.3s ease', // Smooth color transition
    },
  };

  return (
    <footer style={styles.footer}>
      <p style={styles.text}>&copy; 2024 CharmCasters. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
