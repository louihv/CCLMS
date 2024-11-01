import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Enrollment.module.css';
import Modal from 'react-modal';

const Enrollment = () => {
  const subjects = [
    { id: 1, name: 'Defense Against the Dark Arts', description: 'Learn to defend against dark creatures using various spells and techniques.', credits: 3 },
    { id: 2, name: 'Transfiguration', description: 'Transform objects into other objects using complex magical principles.', credits: 4 },
    { id: 3, name: 'Potions', description: 'Brew magical potions with unique properties and effects.', credits: 3 },
    { id: 4, name: 'Herbology', description: 'Study magical plants and their uses in potions and remedies.', credits: 2 },
    { id: 5, name: 'Charms', description: 'Learn charms to enhance objects and perform various magical tasks.', credits: 3 },
    { id: 6, name: 'Divination', description: 'Explore the art of predicting the future using various methods.', credits: 3 },
    { id: 7, name: 'Care of Magical Creatures', description: 'Learn to care for and understand magical creatures.', credits: 3 },
    { id: 8, name: 'Ancient Runes', description: 'Study the ancient runes and their meanings in magic.', credits: 4 },
    { id: 9, name: 'Muggle Studies', description: 'Understand the non-magical world and its customs.', credits: 2 },
    { id: 10, name: 'Astronomy', description: 'Learn about the stars and celestial bodies from a magical perspective.', credits: 3 },
  ];

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [enrolledSubjects, setEnrolledSubjects] = useState([]);
  const [enrollmentMessage, setEnrollmentMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState(''); // 'enroll' or 'unenroll'
  const [subjectToModify, setSubjectToModify] = useState(null);

  useEffect(() => {
    const fetchEnrolledSubjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/users/subjects', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEnrolledSubjects(data); // Set enrolled subjects from the API
      } catch (err) {
        console.error('Error fetching enrolled subjects:', err);
      }
    };

    fetchEnrolledSubjects();
  }, []);

  const handleSubjectChange = (subjectId) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId) ? prev.filter((id) => id !== subjectId) : [...prev, subjectId]
    );
  };

  const openModal = (type, subject = null) => {
    if (type === 'enroll' && selectedSubjects.length === 0) {
      setEnrollmentMessage('Please select at least one subject to enroll.');
      return;
    }

    setActionType(type);
    setSubjectToModify(subject);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubjectToModify(null);
  };

  const confirmAction = () => {
    if (actionType === 'enroll') {
      enrollInSubjects();
    } else if (actionType === 'unenroll' && subjectToModify) {
      unenrollSubjects(subjectToModify.id);
    }
    closeModal();
  };

  const enrollInSubjects = async () => {
    if (selectedSubjects.length === 0) {
      setEnrollmentMessage('Please select at least one subject to enroll.');
      return;
    }

    if (selectedSubjects.length + enrolledSubjects.length > 5) {
      setEnrollmentMessage('You can only enroll in a maximum of 5 subjects.');
      return;
    }

    const newEnrolledSubjects = selectedSubjects
      .map((id) => subjects.find((subject) => subject.id === id))
      .filter((subject) => !enrolledSubjects.some((enrolled) => enrolled.id === subject.id));

    if (newEnrolledSubjects.length === 0) {
      setEnrollmentMessage('You cannot enroll in the same subject more than once.');
      return;
    }

    // Update the database with new enrolled subjects
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/users/enroll', {
        subjects: newEnrolledSubjects,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnrolledSubjects((prev) => [...prev, ...newEnrolledSubjects]);
      setEnrollmentMessage(`Successfully enrolled in: ${newEnrolledSubjects.map((subject) => subject.name).join(', ')}`);
      setSelectedSubjects([]); // Reset selections after enrollment
    } catch (err) {
      setEnrollmentMessage('Error enrolling in subjects.');
    }
  };

  const unenrollSubjects = async (subjectId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/users/unenroll', {
        subjectIds: [subjectId],
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnrolledSubjects((prev) => prev.filter((subject) => subject.id !== subjectId));
      setEnrollmentMessage(`Successfully unenrolled from: ${subjects.find((subject) => subject.id === subjectId).name}`);
    } catch (err) {
      setEnrollmentMessage('Error unenrolling from subject.');
    }
  };

  return (
    <div className="container">
        <div className="overlay1"></div>
    <div className={styles.enrollmentContainer}>
      <h2>Subject Enrollment</h2>

      <div className={styles.enrollmentContent}>
        <div className={styles.availableSubjects}>
          <h3>Available Subjects</h3>
          <table className={styles.subjectTable}>
            <thead>
              <tr>
                <th>Select</th>
                <th>Subject Name</th>
                <th>Description</th>
                <th>Credits</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedSubjects.includes(subject.id)}
                      onChange={() => handleSubjectChange(subject.id)}
                    />
                  </td>
                  <td>{subject.name}</td>
                  <td>{subject.description}</td>
                  <td>{subject.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className={styles.enrollButton} onClick={() => openModal('enroll')}>Enroll in Selected Subjects</button>
        </div>

        <div className={styles.enrolledSubjects}>
          <h3>Enrolled Subjects</h3>
          {enrolledSubjects.length > 0 ? (
            <ul>
              {enrolledSubjects.map((subject) => (
                <li key={subject.id} className={styles.enrolledItem}>
                  <span>{subject.name} - {subject.description} ({subject.credits} credits)</span>
                  <button onClick={() => openModal('unenroll', subject)} className={styles.unenrollButton}>Unenroll</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No subjects enrolled yet.</p>
          )}
        </div>
      </div>
      
      {enrollmentMessage && <p className={styles.enrollmentMessage}>{enrollmentMessage}</p>}

      <Modal 
        isOpen={isModalOpen} 
        onRequestClose={closeModal} 
        ariaHideApp={false} 
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2 className={styles.modalTitle}>{actionType === 'enroll' ? 'Confirm Enrollment' : 'Confirm Unenrollment'}</h2>
        <p className={styles.modalContent}>
          {actionType === 'enroll'
            ? `Are you sure you want to enroll in the selected subjects?`
            : `Are you sure you want to unenroll from ${subjectToModify ? subjectToModify.name : ''}?`}
        </p>
        <div className={styles.modalButtons}>
          <button onClick={confirmAction} className={styles.confirmButton}>Confirm</button>
          <button onClick={closeModal} className={styles.cancelButton}>Cancel</button>
        </div>
      </Modal>
    </div>
    </div>
  );
};

export default Enrollment;
