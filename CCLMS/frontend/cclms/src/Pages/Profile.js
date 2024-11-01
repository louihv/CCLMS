import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';

// House backgrounds and crests
import gryff from './Images/gryffindor-bg.png';
import raven from './Images/ravenclaw-bg.png';
import slyther from './Images/slytherin-bg.png';
import huffle from './Images/hufflepuff-bg.png';
import hufflcrest from './Images/hcrest.png';
import slythercrest from './Images/screst.png';
import gryffcrest from './Images/gcrest.png';
import ravencrest from './Images/rcrest.png';
import fallback from './Images/LogReg_BG.jpg'; // Fallback for background
import fallbackcrest from './Images/unsorted.png'; // Fallback for crest

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [hoveredHouse, setHoveredHouse] = useState(false); // State to track hover
    const navigate = useNavigate();


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('User not logged in');

                const { data } = await axios.get('http://localhost:5000/api/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setProfile(data);
                setFormData(data);
            } catch (err) {
                setError(err.message || 'Error fetching profile data');
            }
        };

        fetchProfile();
    }, []);

    useEffect(() => {
        const profileContainer = document.querySelector(`.${styles.profileContainer}`);
        if (profileContainer) profileContainer.style.opacity = 1;
    }, []);

    const houseBackgrounds = {
        gryffindor: gryff,
        hufflepuff: huffle,
        ravenclaw: raven,
        slytherin: slyther,
    };

    const houseCrests = {
        gryffindor: gryffcrest,
        hufflepuff: hufflcrest,
        ravenclaw: ravencrest,
        slytherin: slythercrest,
    };

    const houseKey = profile?.house?.toLowerCase() || null;

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/api/profile', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProfile(formData);
            setIsEditing(false);
        } catch (err) {
            setError('Error saving profile data');
        }
    };

    const handleHouseButtonClick = () => {
        navigate('/sortinghat');
    };

    if (error) return <div className={styles.error}>{error}</div>;
    if (!profile) return <div className={styles.loading}>Loading...</div>;

    return (
        <div
            className={styles.profileBody}
            style={{
                backgroundImage: houseKey ? `url(${houseBackgrounds[houseKey]})` : `url(${fallback})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                width: '100%',
            }}
        >
            <img
                alt="Profile Crest"
                className={styles.profileImage}
                src={houseCrests[houseKey] || fallbackcrest}
                onMouseEnter={() => setHoveredHouse(true)} // Start hover
                onMouseLeave={() => setHoveredHouse(false)} // End hover
            />

            {/* Conditional rendering of house description on hover */}
            {houseKey === 'gryffindor' && (
            <div className={`${styles.houseDescription} ${styles.gryffindorDesc}`}>
                Gryffindor: Where dwell the brave at heart. Bold deeds, daring spirits, and unwavering courage define this noble house.
            </div>
            )}
            {houseKey === 'hufflepuff' && (
            <div className={`${styles.houseDescription} ${styles.hufflepuffDesc}`}>
                Hufflepuff: Known for loyalty, patience, and fair play. Here, kindness and hard work are valued above all.
            </div>
            )}
            {houseKey === 'ravenclaw' && (
            <div className={`${styles.houseDescription} ${styles.ravenclawDesc}`}>
                Ravenclaw: The house of intellect and wit. Those who seek knowledge, creativity, and wisdom will always find a home here.
            </div>
            )}
            {houseKey === 'slytherin' && (
            <div className={`${styles.houseDescription} ${styles.slytherinDesc}`}>
                Slytherin: Ambition flows through every Slytherin. The cunning, resourceful, and determined rise to greatness within these walls.
            </div>
            )}

            <div className={`${styles.profileContainer} ${isEditing ? styles.editMode : ''}`}>
                <h2>Wizard Profile</h2>

                {isEditing ? (
                    <form>
                        {['firstName', 'middleName', 'lastName', 'email', 'address', 'contact'].map((field) => (
                            <p key={field}>
                                <strong>{`${field.charAt(0).toUpperCase() + field.slice(1)}:`}</strong>
                                <input
                                    type={field === 'email' ? 'email' : 'text'}
                                    name={field}
                                    value={formData[field] || ''}
                                    onChange={handleChange}
                                    className={styles.inputField}
                                    aria-label={field}
                                />
                            </p>
                        ))}
                        <button type="button" className={styles.saveButton} onClick={handleSave}>
                            Save
                        </button>
                        <button type="button" className={styles.cancelButton} onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </form>
                ) : (
                    <div className={styles.userContainer}>
                        <p><strong>Full Name:</strong> {`${profile.firstName} ${profile.middleName} ${profile.lastName}`}</p>
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
                        <button className={styles.editButton} onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
