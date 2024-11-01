import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css'; // Import the CSS module
import logo from './Images/Logo-CC.png'; // Ensure the path to your image is correct

const securityQuestions = [
  "What is your pet's name?",
  "What was the name of your first school?",
  "What is your mother's maiden name?"
];

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validations
    if (!firstName || !lastName || !email || !address || !contact || !password || !confirmPassword || !securityQuestion || !securityAnswer) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // Password strength validation
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/; // At least 8 chars, 1 number, 1 special char
    if (!passwordPattern.test(password)) {
      setError("Password must be at least 8 characters long and include a number and a special character.");
      setLoading(false);
      return;
    }

    // Email format validation (simple regex)
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email)) {
      setError("Invalid email format.");
      setLoading(false);
      return;
    }

    // Contact number validation (simple regex for 11 digits)
    const contactPattern = /^\d{11}$/;
    if (!contactPattern.test(contact)) {
      setError("Contact number must be 11 digits.");
      setLoading(false);
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
        securityQuestion,
        securityAnswer,
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      console.error(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.formContainer}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <h2 className={styles.title}>Create an Account</h2>
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
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="securityQuestion">Security Question</label>
            <select
              id="securityQuestion"
              value={securityQuestion}
              onChange={(e) => setSecurityQuestion(e.target.value)}
              required
              className={styles.input}
              aria-label="Security Question"
            >
              <option value="">Select a question...</option>
              {securityQuestions.map((question, index) => (
                <option key={index} value={question}>{question}</option>
              ))}
            </select>
          </div>
          
          {/* Security Answer Input */}
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="securityAnswer">Security Answer</label>
            <input
              type="text"
              id="securityAnswer"
              placeholder="Enter your answer"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              required
              className={styles.input}
              aria-label="Security Answer"
            />
          </div>

          {/* Other input fields remain unchanged */}
          
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
