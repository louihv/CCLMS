import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import styles from './Profile.module.css'; // Assuming you're using CSS modules

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false); // Track if user is in edit mode
    const [formData, setFormData] = useState({}); // Hold the form data when editing
    const navigate = useNavigate(); // Initialize the useNavigate hook

    // Fetch profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('User not logged in');
                    return;
                }
                const response = await axios.get('http://localhost:5000/api/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfile(response.data);
                setFormData(response.data); // Set the form data with the fetched profile data
            } catch (err) {
                setError('Error fetching profile data');
            }
        };
        fetchProfile();
    }, []);

    // Handle input changes in edit mode
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission to save changes
    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/api/profile', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProfile(formData); // Update the profile state with the new data
            setIsEditing(false); // Exit edit mode after saving
        } catch (err) {
            setError('Error saving profile data');
        }
    };

    // Function to navigate to the existing page
    const handleHouseButtonClick = () => {
        navigate('/sortinghat'); // Replace with the actual path to your existing page
    };

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (!profile) {
        return <div className={styles.loading}>Loading...</div>; // Loading state
    }

    // Determine house class based on profile house
    const houseClass = profile.house ? styles[profile.house.toLowerCase()] : '';

    return (
        <div className={`${styles.profileContainer} ${houseClass}`}>
            <h2>User Profile</h2>

            {isEditing ? (
                // Editable form when in edit mode
                <div>
                    <p>
                        <strong>First Name:</strong>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                    </p>
                    <p>
                        <strong>Middle Name:</strong>
                        <input
                            type="text"
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                    </p>
                    <p>
                        <strong>Last Name:</strong>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                    </p>
                    <p>
                        <strong>Email:</strong>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                    </p>
                    <p>
                        <strong>Address:</strong>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                    </p>
                    <p>
                        <strong>Contact:</strong>
                        <input
                            type="text"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                    </p>
                    
                    <button className={styles.saveButton} onClick={handleSave}>Save</button>
                    <button className={styles.cancelButton} onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                // Display profile when not in edit mode
                <div>
                    <p><strong>First Name:</strong> {profile.firstName}</p>
                    <p><strong>Middle Name:</strong> {profile.middleName}</p>
                    <p><strong>Last Name:</strong> {profile.lastName}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Address:</strong> {profile.address}</p>
                    <p><strong>Contact:</strong> {profile.contact}</p>
                    <p>
                        <strong>House:</strong> {profile.house}
                        {!profile.house && (
                            <button className={styles.navigateButton} onClick={handleHouseButtonClick}>
                                Get Sorted Now!
                            </button>
                        )}
                    </p>
                    <button className={styles.editButton} onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
