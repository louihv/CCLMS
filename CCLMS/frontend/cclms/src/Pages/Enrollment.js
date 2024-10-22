import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Enrollment.module.css';

function Enrollment({ userId }) {
  const subjects = [
    'Defense Against the Dark Arts',
    'Transfiguration',
    'Potions',
    'Herbology',
    'Charms',
  ];

  const [selectedSubjects, setSelectedSubjects] = useState([]);

  useEffect(() => {
    const fetchEnrolledSubjects = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setSelectedSubjects(response.data.enrolledSubjects || []);
      } catch (error) {
        console.error('Error fetching enrollment:', error);
      }
    };

    fetchEnrolledSubjects();
  }, [userId]);

  const handleSubjectChange = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/enrollment/${userId}`, { subjects: selectedSubjects });
      alert('Enrolled successfully!');
    } catch (error) {
      console.error('Error enrolling subjects:', error);
    }
  };

  return (
    <div className={styles.enrollment}>
      <h2>Enrollment</h2>
      <form onSubmit={handleSubmit}>
        {subjects.map((subject, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={subject}
              value={subject}
              checked={selectedSubjects.includes(subject)}
              onChange={() => handleSubjectChange(subject)}
            />
            <label htmlFor={subject}>{subject}</label>
          </div>
        ))}
        <button type="submit" className={styles.submitButton}>
          Enroll Now
        </button>
      </form>
    </div>
  );
}

export default Enrollment;
