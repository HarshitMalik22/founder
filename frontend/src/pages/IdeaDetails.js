// frontend/src/pages/IdeaDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const IdeaDetails = () => {
    const { id } = useParams();
    const [idea, setIdea] = useState({});
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchIdea = async () => {
            const res = await axios.get(`http://localhost:5000/api/ideas/${id}`);
            setIdea(res.data);
        };

        fetchIdea();
    }, [id]);

    const handleApply = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5000/api/ideas/${id}/apply`, { message }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Application submitted!');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to apply');
        }
    };

    return (
        <div>
            <h1>{idea.title}</h1>
            <p>{idea.description}</p>
            <p>Salary: ${idea.salary}</p>
            <p>Equity: {idea.equity}</p>
            <h3>Terms:</h3>
            <p>{idea.terms}</p>
            <textarea
                placeholder="Why should the founder choose you?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleApply}>Apply</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default IdeaDetails;
