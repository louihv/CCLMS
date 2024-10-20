import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css'; // Import the CSS module
import logo from './Logo-CC.png'; // Ensure the path to your image is correct

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Initialize navigate here

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Start loading

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false); // Stop loading
      return;
    }

    // Optional: Email format validation (simple regex)
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email)) {
      setError("Invalid email format.");
      setLoading(false); // Stop loading
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        firstName,
        middleName,
        lastName,
        email,
        address,
        contact,
        password,
      });
      navigate('/login'); // Navigate to the login page after successful registration
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.'); // More specific error
      console.error(err.response?.data); // Log the error for debugging
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.formContainer}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <h2 className={styles.title}>Register</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className={styles.input}
              aria-label="First Name"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="middleName">Middle Name</label>
            <input
              type="text"
              id="middleName"
              placeholder="Enter your middle name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className={styles.input}
              aria-label="Middle Name"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className={styles.input}
              aria-label="Last Name"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
              aria-label="Email"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className={styles.input}
              aria-label="Address"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="contact">Contact Number</label>
            <input
              type="tel"
              id="contact"
              placeholder="Enter your contact number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              className={styles.input}
              aria-label="Contact Number"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              aria-label="Password"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={styles.input}
              aria-label="Confirm Password"
            />
          </div>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <hr />
        <a href="/login" className={styles.link}>Already have an account? Log in here</a>
      </div>
    </div>
  );
};

export default Register;
