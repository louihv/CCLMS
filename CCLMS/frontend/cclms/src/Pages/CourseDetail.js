import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        const response = await axios.get(`http://localhost:5000/courses/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourse(response.data);
      } catch (err) {
        setError('Failed to fetch course details.');
      }
    };

    fetchCourse();
  }, [courseId]);

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      {/* Add more course details as needed */}
    </div>
  );
};

export default CourseDetail;
