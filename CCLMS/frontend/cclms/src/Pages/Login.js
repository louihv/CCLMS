import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './Images/Logo-CC.png';
import styles from './Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetError, setResetError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/home');
        } catch (err) {
            setError('Login failed. Please check your email and password.');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setResetError('');
        setSuccessMessage('');
    
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(resetEmail)) {
            setResetError('Please enter a valid email address.');
            return;
        }
    
        if (securityAnswer.trim() === '') {
            setResetError('Please answer the security question.');
            return;
        }
    
        try {
            // Verify security question and answer
            const response = await axios.post('http://localhost:5000/api/auth/verify-security', {
                email: resetEmail,
                securityAnswer,
            });
    
            if (response.status === 200) {
                // Prompt user for a new password
                const newPassword = prompt("Please enter your new password:");
                if (newPassword) {
                    // Update the password in the database
                    await axios.post('http://localhost:5000/api/auth/reset-password', {
                        email: resetEmail,
                        newPassword,
                    });
                    setSuccessMessage('Your password has been successfully reset. You can now log in.');
                }
            }
    
            setShowModal(false);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to verify security question. Please try again.';
            setResetError(errorMessage);
            console.error('Reset password error:', errorMessage);
        }
    };
    
    

    return (
        <div className={styles.loginContainer}>
            <div className={styles.formContainer}>
                <img className={styles.logo} src={logo} alt="Logo" />
                <h2 className={styles.title}>Login</h2>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.inputLabel}>EMAIL</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.inputLabel}>PASSWORD</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.input}
                        />
                        <a href="#" className={styles.link1} onClick={() => setShowModal(true)}>Forgot Password?</a>
                    </div>
                    <button type="submit" className={styles.button}>Login</button>
                </form>
                <hr />
                <a href="/register" className={styles.link}>Don't have an account? Register here</a>
            </div>

            {/* Modal for Password Reset */}
            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={() => setShowModal(false)}>&times;</span>
                        <h2>Reset Password</h2>
                        {resetError && <p className={styles.error}>{resetError}</p>}
                        {successMessage && <p className={styles.success}>{successMessage}</p>}
                        <form onSubmit={handleResetPassword}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="resetEmail" className={styles.inputLabel}>Enter your email</label>
                                <input
                                    type="email"
                                    id="resetEmail"
                                    placeholder="Enter your email"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                    required
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="securityQuestion" className={styles.inputLabel}>Security Question</label>
                                <select
                                    id="securityQuestion"
                                    value={securityQuestion}
                                    onChange={(e) => setSecurityQuestion(e.target.value)}
                                    required
                                    className={styles.input}
                                >
                                    <option value="">Select a question</option>
                                    <option value="What is your pet's name?">What is your pet's name?</option>
                                    <option value="What was the name of your first school?">What was the name of your first school?</option>
                                    <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="securityAnswer" className={styles.inputLabel}>Answer</label>
                                <input
                                    type="text"
                                    id="securityAnswer"
                                    placeholder="Your answer"
                                    value={securityAnswer}
                                    onChange={(e) => setSecurityAnswer(e.target.value)}
                                    required
                                    className={styles.input}
                                />
                            </div>
                            <button type="submit" className={styles.button}>Verify Security Question</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
