import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate(); // React Router hook for navigation
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'founder',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
            console.log('Server Response:', res);
            if (res.data) {
                localStorage.setItem('token', res.data.token);
                alert('Signup successful!');
    
                // Redirect only if the role is 'founder'
                if (formData.role === 'founder') {
                    navigate('/dashboard');
                } else {
                    alert('Dashboard is only available for founders.');
                }
            } else {
                throw new Error('No data in response');
            }
        } catch (error) {
            console.error('Error Response:', error);
            setError(error.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h1>Signup</h1>
                <form onSubmit={handleSubmit} className="signup-form">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="signup-input"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="signup-input"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="signup-input"
                    />
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="signup-select"
                    >
                        <option value="founder">Founder</option>
                        <option value="developer">Developer</option>
                    </select>
                    <button type="submit" className="signup-button">Signup</button>
                    {error && <p className="signup-error">{error}</p>}
                </form>
            </div>
            <div className="role-info">
                <div className="role-card">
                    <h2>Sign in as a Developer</h2>
                    <p>Explore founders' business ideas and equity offers.</p>
                </div>
                <div className="role-card">
                    <h2>Sign in as a Founder</h2>
                    <p>Find developers with skills and experience to bring your ideas to life.</p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
