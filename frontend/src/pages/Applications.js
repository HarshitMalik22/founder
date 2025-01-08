import React from "react";
import "./Applications.css";

const Applications = ({ savedApplications }) => {
  return (
    <div className="applications-container">
      <h1>Your Applications</h1>
      {savedApplications && savedApplications.length > 0 ? (
        <div className="applications-list">
          {savedApplications.map((application, index) => (
            <div key={index} className="application-card">
              <img
                src={application.image}
                alt={`${application.name}'s profile`}
                className="application-image"
              />
              <div className="application-content">
                <h2>{application.name}</h2>
                <h4>Skills:</h4>
                <ul>
                  {application.skills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
                <h4>Past Experience:</h4>
                <p>{application.experience}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-applications">
          <p>You haven't applied to any idea yet.</p>
          <p>The applications you right-swipe on your dashboard will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default Applications;
