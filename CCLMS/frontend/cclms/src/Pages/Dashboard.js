import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        const response = await axios.get('http://localhost:5000/courses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
      } catch (err) {
        setError('Failed to fetch courses.');
      }
    };

    fetchCourses();
  }, []);

  return (
    <div style={styles.dashboardContainer}>
      <h2 style={styles.title}>Your Courses</h2>
      {error && <p style={styles.error}>{error}</p>}
      <ul style={styles.courseList}>
        {courses.map(course => (
          <li key={course._id} style={styles.courseItem}>
            {course.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Inline styles
const styles = {
  dashboardContainer: {
    padding: '20px',
    backgroundColor: '#f4f4f9', // Light gray background for a clean look
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
    maxWidth: '800px', // Max width for better readability
    margin: '20px auto', // Center the container
  },
  title: {
    marginBottom: '20px',
    color: '#333', // Dark gray for better contrast
    fontSize: '2em', // Larger font size for the title
    fontWeight: '600', // Semi-bold font weight
  },
  error: {
    color: 'red',
    marginBottom: '10px', // Space below the error message
  },
  courseList: {
    listStyleType: 'none', // Remove default list styling
    padding: '0', // Remove default padding
  },
  courseItem: {
    backgroundColor: '#fff', // White background for list items
    padding: '15px',
    margin: '10px 0', // Space between items
    borderRadius: '5px', // Rounded corners
    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)', // Subtle shadow for items
    transition: 'background 0.3s ease', // Smooth transition for hover effect
  },
};

export default Dashboard;
