// frontend/src/components/IdeaCard.js
import React from 'react';

const IdeaCard = ({ idea, role }) => (
    <div className="idea-card">
        <h3>{idea.title}</h3>
        <p>{idea.description.slice(0, 100)}...</p>
        <p>Salary: ${idea.salary}</p>
        <p>Equity: {idea.equity}</p>
        <button onClick={() => window.location.href = `/idea/${idea._id}`}>
            {role === 'developer' ? 'Apply' : 'View Details'}
        </button>
    </div>
);

export default IdeaCard;
