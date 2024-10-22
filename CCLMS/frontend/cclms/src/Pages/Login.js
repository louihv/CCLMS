import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './Images/CC-Logo.png'; // Ensure the path to your image is correct
import styles from './Login.module.css'; // Import the CSS module

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token); // Store the token
            navigate('/home'); // Redirect to dashboard
        } catch (err) {
            setError('Login failed. Please check your email and password.');
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
                            id="email" // Add id for accessibility
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
                            id="password" // Add id for accessibility
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </div>
                    <button type="submit" className={styles.button}>Login</button>
                </form>
                <hr></hr>
                <a href="/register" className={styles.link}>Don't have an account? Register here</a>
            </div>
        </div>
    );
};

export default Login;
