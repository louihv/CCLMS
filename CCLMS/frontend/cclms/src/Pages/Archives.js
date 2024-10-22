import styles from './Archives.module.css';

function Archive() {
  const categories = ['Potions', 'Spells', 'Creatures', 'Places', 'Professors'];

  return (
    <div className={styles.archive}>
      <h2>Archive Library</h2>
      <ul>
        {categories.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Archive;
