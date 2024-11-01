// src/components/Category.js
import React from 'react';
import styles from './Category.module.css'; // Import your modular CSS

const Category = ({ name, onSelect }) => {
  return (
    <div className={styles.category} onClick={onSelect}>
      <h3>{name}</h3>
    </div>
  );
};

export default Category;
