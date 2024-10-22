import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Welcome to the Wizard Dashboard</h1>
      <p className={styles.subheading}>Your portal to magical learning</p>
      <div className={styles.innerMenu}>
        <Link to="/archive" className={styles.menuButton}>
          <span className={styles.icon}>📚</span> Archive
        </Link>
        <Link to="/sorting" className={styles.menuButton}>
          <span className={styles.icon}>🎩</span> Sorting Hat
        </Link>
        <Link to="/enrollment" className={styles.menuButton}>
          <span className={styles.icon}>📝</span> Enrollment
        </Link>
        <Link to="/profile" className={styles.menuButton}>
          <span className={styles.icon}>👤</span> Profile
        </Link>
      </div>
      <div className={styles.quoteSection}>
        <blockquote>
          “It matters not what someone is born, but what they grow to be.” – Albus Dumbledore
        </blockquote>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <h3>Latest Announcements</h3>
          <p>No new announcements at this time.</p>
        </div>
        <div className={styles.card}>
          <h3>Upcoming Events</h3>
          <ul>
            <li>Potions Class - October 25</li>
            <li>Quidditch Match - November 1</li>
            <li>Magical Creatures Workshop - November 10</li>
          </ul>
        </div>
        <div className={styles.card}>
          <h3>Your Progress</h3>
          <p>Potions Mastery: 75%</p>
          <p>Charms 101: 50%</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
