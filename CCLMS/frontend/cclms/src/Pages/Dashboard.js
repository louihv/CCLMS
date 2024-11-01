import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome to the Wizard Dashboard</h1>
          <p className={styles.subheading}>Your portal to magical learning</p>
        </header>

        <nav className={styles.innerMenu}>
          <Link to="/archive" className={styles.menuButton}>
            <span className={`${styles.icon} ${styles.archiveIcon}`}></span> Spellbound Archives
          </Link>
          <Link to="/sortinghat" className={styles.menuButton}>
            <span className={`${styles.icon} ${styles.hatIcon}`}></span> Sorting Hat
          </Link>
          <Link to="/enrollment" className={styles.menuButton}>
            <span className={`${styles.icon} ${styles.enrollIcon}`}></span> Course Enrollment
          </Link>
          <Link to="/profile" className={styles.menuButton}>
            <span className={`${styles.icon} ${styles.profileIcon}`}></span> Wizard Profile
          </Link>
          <Link to="/potion" className={styles.menuButton}>
            <span className={`${styles.icon} ${styles.potionIcon}`}></span> Potion Brew
          </Link>
          <Link to="/fortune" className={styles.menuButton}>
            <span className={`${styles.icon} ${styles.fortuneIcon}`}></span> Fortune Telling
          </Link>
        </nav>

        <section className={styles.quoteSection}>
          <blockquote className={styles.quote}>
            “It matters not what someone is born, but what they grow to be.” – Albus Dumbledore
          </blockquote>
        </section>

        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h3>Latest Announcements</h3>
            <ul>
              <li>Potions Class - October 25: Hands-on experience brewing potions!</li>
              <li>Quidditch Match - November 1: Gryffindor vs. Slytherin showdown!</li>
              <li>Magical Creatures Workshop - November 10: Handle magical creatures!</li>
              <li>Study Group Session - November 15: Prepare for finals with peers.</li>
              <li>End-of-Term Feast - December 20: Celebrate in the Great Hall!</li>
              <li>Library Extended Hours - November 5: Open late for finals week.</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3>Upcoming Events</h3>
            <ul>
              <li><strong>Potions Class:</strong> Learn potion-making on October 25!</li>
              <li><strong>Quidditch Match:</strong> Support your house on November 1!</li>
              <li><strong>Magical Creatures Workshop:</strong> Hands-on creature care on November 10!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
